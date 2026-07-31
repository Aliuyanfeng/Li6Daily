---
date: 2026-07-22 10:00:00
title: MCP 协议详解
permalink: /pages/mcp7d2
categories:
  - AI
  - MCP
---

## 一、MCP 是什么

**MCP（Model Context Protocol，模型上下文协议）** 是由 Anthropic 于 2024 年底提出的**开放标准协议**，用于让 LLM 应用以统一方式与外部数据源、工具对接。

- 类比：**MCP 之于 AI 工具，如同 USB-C 之于硬件接口**——一套标准接百种设备。
- 解决的核心问题：在 MCP 之前，每个应用要接每个工具都要写一套定制集成，是 **M × N** 的复杂度；MCP 让"工具按标准实现一次，任意兼容客户端复用"，降为 **M + N**。

### 三者角色
| 角色 | 说明 | 例子 |
|------|------|------|
| **Host（宿主）** | 运行 LLM 的应用，管理多个 Client、编排工具调用 | Claude Desktop、VS Code + Copilot、自建 Agent |
| **MCP Client** | 由 Host 为每个 Server 创建，负责与该 Server 通信（1:1） | 宿主内的连接实例 |
| **MCP Server** | 暴露能力的程序，可被本地或远程部署 | 文件系统 Server、GitHub Server、数据库 Server |

```
┌─────────────────── Host（宿主应用） ───────────────────┐
│  LLM 引擎                                           │
│   ├─ MCP Client A ═══════▶ MCP Server A（文件系统）  │
│   ├─ MCP Client B ═══════▶ MCP Server B（GitHub）    │
│   └─ MCP Client C ═══════▶ MCP Server C（数据库）    │
└───────────────────────────────────────────────────────┘
       （每个 Client 与对应 Server 1:1 连接）
```

---

## 二、MCP 的核心能力（原语）

MCP Server 可以向 Client 暴露以下几类能力：

| 能力 | 方向 | 说明 |
|------|------|------|
| **Tools（工具）** | Client → Server | 模型可调用的函数（查询/写操作），有 `tools/list`、`tools/call` |
| **Resources（资源）** | Client → Server | 类文件的数据源（日志、schema、文档），由应用决定如何使用 |
| **Prompts（提示模板）** | Client → Server | 预置的可复用提示词模板 |
| **Sampling（采样）** | Server → Host | 反向能力：Server 请求 Host 的 LLM 完成一段生成 |
| **Roots（根目录）** | Host → Server | Host 告知 Server 可访问的目录边界（安全隔离） |
| **Logging（日志）** | Server → Client | Server 向 Client 推送日志消息 |

> 关键区分：**Tools 由模型主动调用**（带副作用/动作）；**Resources 由应用读取**（被动上下文，如把文件内容喂给模型）。

---

## 三、传输层（Transport）

MCP 的通信建立在**传输层**之上，目前主要两种：

1. **stdio（标准输入输出）**
   - Server 作为 Host 的**本地子进程**启动，通过 stdin/stdout 收发 JSON-RPC 消息。
   - 优点：简单、安全（不暴露网络端口）、适合本地工具。
2. **Streamable HTTP / SSE（远程）**
   - 客户端用 **HTTP POST** 发送请求；服务端通过 **SSE（Server-Sent Events）** 流式推送响应与通知。
   - 优点：支持远程/云部署、多客户端共享同一 Server。

### 消息格式：JSON-RPC 2.0
MCP 所有消息都符合 **JSON-RPC 2.0** 规范，分三类：
- **请求（Request）**：带 `method` 和 `id`，期待响应。
- **响应（Response）**：带对应 `id` 和 `result` 或 `error`。
- **通知（Notification）**：带 `method` 但无 `id`，单向、无需回复。

```json
// 请求示例
{ "jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {} }

// 响应示例
{ "jsonrpc": "2.0", "id": 1, "result": { "tools": [ ... ] } }

// 通知示例（无 id）
{ "jsonrpc": "2.0", "method": "notifications/resources/updated", "params": { "uri": "file:///log.txt" } }
```

---

## 四、客户端与 MCP Server 的交互流程

整个交互分为三个阶段：**初始化 → 正常运行 → 关闭**。下面用「Host 端的 Client」与「MCP Server」的视角，逐步拆解。

### 阶段 1：初始化握手（Initialization）

建立连接后，先完成**协议版本协商**与**能力声明**，双方才知道对方"能做什么"。

```
Client                                          Server
  │                                                │
  │  ── initialize ───────────────────────────▶   │
  │     { protocolVersion,                       │
  │       capabilities: { tools, resources },     │
  │       clientInfo: { name, version } }         │
  │                                                │
  │  ◀──────────── initialize result ───────────   │
  │     { protocolVersion,                        │
  │       capabilities: { tools, resources,       │
  │                      prompts, logging },       │
  │       serverInfo: { name, version } }         │
  │                                                │
  │  ── notifications/initialized ────────────▶   │   （通知，无响应）
  │                                                │
  │        ← 此后进入正常操作阶段 →                │
```

- Client 在 `initialize` 中声明自己支持的 capabilities（如是否支持 sampling）。
- Server 回告自己暴露的能力（tools/resources/prompts 等），并协商 `protocolVersion`（取双方都支持的最高版本）。
- Client 收到结果后发送 `notifications/initialized` 通知，握手完成。

### 阶段 2：正常运行（Operation）

握手完成后，进入双向交互。最典型的两条链路是**工具发现 + 工具调用**，以及资源/提示的读取。

#### （1）工具发现：`tools/list`
```
Client ── tools/list ─────────────────────▶ Server
Client ◀── { tools: [                      ── Server
              { name:"query_db",
                description:"查询数据库",
                inputSchema:{ type:"object",
                  properties:{ sql:{type:"string"} } } } ] }
```
Client 用返回的工具清单（含名称、描述、入参 JSON Schema）构建给 LLM 的"可用工具列表"。

#### （2）工具调用：`tools/call`
模型决定调用某工具后，Client 代发调用并拿回结果：
```
Client ── tools/call ─────────────────────▶ Server
        { name:"query_db",
          arguments:{ sql:"SELECT * FROM users" } }

Client ◀── { content:[                    ── Server
              { type:"text",
                text:"[{id:1,name:'Ali'}]" } ],
            isError:false }
```
- `arguments` 必须符合工具声明的 `inputSchema`。
- 结果以 `content` 数组返回（可含 text / image / resource 多种块）。
- Client 把结果作为**新一段 Context 回灌给 LLM**，模型据此继续推理（即 ReAct 循环中的 Observation）。

#### （3）资源与提示
```
resources/list  → 列出可用资源（文件/数据源）
resources/read   → 读取某资源内容（按 uri）
prompts/list     → 列出提示模板
prompts/get      → 取某个模板并填充参数
```

#### （4）Server 反向请求：Sampling
Server 也能"反过来"请求 Host 的 LLM 能力（需 Client 在 initialize 时声明支持 sampling）：
```
Server ── sampling/createMessage ────────▶ Host(LLM)
Server ◀── { content:"模型生成结果" } ────── Host
```
这让 Server 具备"思考"能力（例如根据上下文自动补全参数），而不只是被动执行。

#### （5）通知与日志
运行中 Server 可主动推送：
- `notifications/resources/updated`：资源内容变了，提示 Client 刷新。
- `notifications/message`（Logging）：上报日志，便于调试。

### 阶段 3：关闭（Shutdown）
```
Client ── shutdown ──────────────────────▶ Server   （请求）
Client ◀── {} ──────────────────────────── Server   （确认）
Client ── notifications/exit ────────────▶ Server   （通知，进程退出）
```
Client 先发 `shutdown` 请求并等确认，再发 `exit` 通知，Server 结束进程/连接。

---

## 五、完整时序图（一次工具调用全链路）

```
用户提问          Host/Client        MCP Server         LLM
   │                 │                   │                │
   │ "查用户表"      │                   │                │
   ├────────────────▶│                   │                │
   │                 ├─ initialize ────▶ │  (握手)         │
   │                 │◀─ initialized ────┤                │
   │                 ├─ tools/list ────▶ │                │
   │                 │◀─ 工具清单 ───────┤                │
   │                 ├──────────────────────────────────▶│ 给工具列表
   │                 │◀──────────────────────────────────┤ 决定调 query_db
   │                 ├─ tools/call(query_db)────────────▶│
   │                 │◀─ 查询结果 ───────────────────────┤
   │                 ├──────────────────────────────────▶│ 结果回灌上下文
   │                 │◀──────────────────────────────────┤ 生成最终回答
   │◀────────────────┤                                   │
   │   回答 + 引用    │                   │                │
```

---

## 六、MCP 与 Function Calling 的区别

| 对比项 | Function Calling | MCP |
|--------|------------------|-----|
| 提出方 | OpenAI 等模型厂商 | Anthropic（开放标准） |
| 层级 | 模型能力（"模型决定调哪个函数"） | 传输/集成协议（"应用如何连工具"） |
| 关注点 | 让模型输出结构化调用意图 | 定义 Client/Server 如何通信、发现、鉴权 |
| 复用性 | 每个应用各自实现接入 | 一次实现 Server，任意兼容客户端复用 |
| 关系 | MCP 的 `tools/call` 可以承载 Function Calling 的语义 | 二者互补，不冲突 |

> 一句话：**Function Calling 解决"模型想调函数"，MCP 解决"应用怎么把函数接进来并管起来"。**

---

## 七、核心价值与最佳实践

- **解耦**：工具实现与 Host 无关，Server 可独立迭代、独立部署。
- **安全边界**：通过 Roots 限制可访问目录，通过权限控制工具调用（配合 Human-in-the-Loop）。
- **可组合**：一个 Host 同时连多个 Server，能力按需拼接。
- **最佳实践**：
  1. 工具描述（description）写清楚，模型才能正确选工具。
  2. 入参用 JSON Schema 严格约束，减少非法调用。
  3. 远程 Server 务必做鉴权与传输加密。
  4. 危险操作叠加人工确认，避免模型误调。

> 记忆口诀：**MCP = 统一接口标准；Host 管编排、Client 一对一连、Server 供能力；先 initialize 协商，再 tools/list 发现、tools/call 调用，结果回灌 LLM 续推。**
