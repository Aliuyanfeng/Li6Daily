---
date: 2026-07-24 10:54:00
title: A2A 协议详解
permalink: /pages/a2a0f1
categories:
  - AI
  - A2A
---

## 一、A2A 是什么

**A2A（Agent2Agent Protocol，智能体间协议）** 是由 Google Cloud 于 **2025 年 4 月 9 日**（Cloud Next 2025）发布的**开放协议**，用于让**不同厂商、不同框架、不同部署环境**构建的 AI Agent 之间能够安全通信、协作与协调。

- 提出背景：模型调用工具已有标准（MCP，2024-11），但 **Agent 与 Agent 之间如何标准化地"委派子任务、交换结果"** 长期没有统一协议，企业只能为每个 Agent 对写定制胶水代码，集成复杂度呈 **O(N²)** 爆炸。
- 治理方式：A2A 不同于多数厂商主导的标准——它被**捐赠给 Linux Foundation**，由中立机构治理，定位为真正开放的基础设施，而非绑定锁定。
- 生态规模：发布即有 **50+ 技术与服务合作伙伴**共同贡献规范，包括 Atlassian、Salesforce、SAP、ServiceNow、LangChain、MongoDB、PayPal、Accenture、Deloitte 等。

### 与 MCP 的关系：互补，不竞争

> **MCP 解决"Agent 怎么接工具/数据"；A2A 解决"Agent 怎么对接另一个 Agent"。**

| 维度 | MCP | A2A |
|------|-----|-----|
| 提出方 | Anthropic（2024-11） | Google Cloud（2025-04） |
| 连接对象 | Agent ↔ 工具 / 数据源 | Agent ↔ Agent |
| 解决的问题 | 模型访问外部能力的标准化 | 多 Agent 之间的委派与协同 |
| 关注单元 | Tool / Resource / Prompt | Agent Card / Task / Message |
| 关系 | A2A 之上可以调用 MCP 暴露的工具 | 二者叠加构成完整 Agent 生态 |

```
            ┌─────────────────────────────────────────┐
            │              多 Agent 系统               │
            │                                           │
            │   Client Agent ──A2A──▶ Remote Agent      │
            │        │                    │             │
            │        └────── MCP ──────▶ 工具/数据库     │
            │        └────── MCP ──────▶ 文件系统        │
            └─────────────────────────────────────────┘
      A2A = Agent 横向协作   |   MCP = Agent 纵向接工具
```

---

## 二、核心概念

A2A 用一组清晰定义的组件，统一了"如何发现能力、如何发起并管理协作任务、如何交换多模态内容"。

### 1. 角色（两个 Agent）

| 角色 | 说明 |
|------|------|
| **Client Agent（客户端智能体）** | 任务的**发起方**，决定要做什么、选哪个远端 Agent 来执行 |
| **Remote Agent（远端智能体）** | 任务的**执行方**，接收请求并尝试通过消息或动作完成它 |
| **User** | 存在于协议中，主要承担**认证与授权**职责 |

> 角色并非固定：在更复杂的多跳协作中，一个 Agent 既可以是某任务的 Client，也可以是另一任务的 Server。

### 2. Agent Card（能力名片）★ 发现机制的核心

`AgentCard` 是一份**机器可读的 JSON 元数据文档**，相当于 Agent 的"数字名片"，对外**广告自身身份与能力**，让客户端 Agent 能自动发现并判断"谁能干这事"。

- **托管位置**：通常发布在知名 URI `https://${host}/.well-known/agent.json`（类似 `robots.txt` / 微服务注册中心的作用）。
- **包含信息**：名称、描述、服务端点 `url`、版本、**认证方式**（`authentication.schemes`，v0.2 起正式对齐 OpenAPI 认证方案）、能力开关（`streaming` / `pushNotifications` / `stateTransitionHistory`）、默认输入/输出模态，以及核心的 `skills` 列表。

```json
{
  "name": "web-research-agent",
  "description": "使用网络搜索研究主题并返回结构化摘要",
  "version": "1.0.0",
  "url": "https://agents.example.com/web-research",
  "capabilities": { "streaming": true, "pushNotifications": false },
  "authentication": { "schemes": ["bearer"] },
  "defaultInputModes": ["text"],
  "defaultOutputModes": ["text", "data"],
  "skills": [
    {
      "id": "research_topic",
      "name": "Research Topic",
      "description": "搜索网络并返回结构化摘要",
      "tags": ["web", "search"],
      "examples": ["调研 A2A 协议的最新进展"],
      "inputModes": ["text"],
      "outputModes": ["text", "data"]
    }
  ]
}
```

### 3. Task（任务）★ 协作的状态单元

当 Client 向 Server 发消息，Server 判定需要一次**有状态的**操作（如"生成报告""订机票""总结文档"）时，就创建并维护一个 `Task`。它是 A2A 中**最基本的协作单元**。

- 由 Server 生成唯一 `id`（常为 UUID），并通过 `sessionId` 关联同一会话的多个 Task。
- 内部保存**交互历史**（`history`：`Message[]`）与**产出物**（`artifacts`：`Artifact[]`）。
- 经历一套明确的**生命周期状态**（见第四节）。

### 4. Message（消息）与 Part（内容块）

- **Message**：Task 执行过程中 Client 与 Server 之间交流的内容（思考、用户上下文、指令、错误、状态等），带 `role`（user / agent），可含多个 `Part`。
- **Part**：Message 与 Artifact 的**基本组成单位**，标识内容类型：
  - `TextPart`（文本）
  - `FilePart`（文件，base64 或 URI，可带 mimeType）
  - `DataPart`（结构化 JSON 数据）

```json
// Part 示例
{ "type": "text", "text": "这是一段分析结论" }
{ "type": "file", "file": { "name": "report.pdf", "mimeType": "application/pdf", "bytes": "base64..." } }
{ "type": "data", "data": { "score": 0.92, "lang": "zh" } }
```

### 5. Artifact（产出物）

Server 完成任务后生成的**目标结果**叫 Artifact，**不可变**、可命名、可含多个 Part。流式响应可分批次把内容**追加（append）**到已有 Artifact 上。

---

## 三、传输层与消息格式

A2A 完全**构建在成熟的 Web 标准之上**，不发明新传输：

| 层 | 技术 | 作用 |
|----|------|------|
| 应用层 | **JSON-RPC 2.0** | 结构化请求/响应/通知 |
| 传输 | **HTTP** | 标准 C/S 通信（请求-响应） |
| 实时 | **SSE（Server-Sent Events）** | 长任务的流式进度推送 |
| 认证 | **OpenAPI 兼容方案** | OAuth2 / Bearer / ApiKey / Basic |

- **认证不在协议内交换身份**：令牌等材料在**带外（out-of-band）**获取，再放进 **HTTP 请求头**传输，协议本身只声明需要哪种 scheme。
- A2A 暴露的端点小而固定：Agent Card（能力清单）、Task 提交、状态查询、SSE 流式端点。

### 核心 JSON-RPC 方法

| 方法 | 说明 |
|------|------|
| `tasks/send` | 发送消息以创建/推进一个 Task，同步返回结果 |
| `tasks/sendSubscribe` | 发送并**订阅 SSE 流**，持续接收进度与产物更新 |
| `tasks/get` | 按 `id` 查询 Task 的当前状态与产物 |
| `tasks/cancel` | 取消某个 Task |
| `tasks/pushNotification/set` | 配置 Webhook，让 Server 主动推送完成通知 |
| `tasks/pushNotification/get` | 读取当前推送配置 |
| `tasks/resubscribe` | 断线后重新订阅某个 Task 的事件流 |
| `agents/card`（可选） | 直接获取 Agent Card（通常走 `/.well-known/agent.json`） |

---

## 四、交互流程与任务生命周期

### 1. 端到端协作步骤

```
Server Agent                         Client Agent
─────────────                       ─────────────
托管 AgentCard                        │
  at /.well-known/agent.json          │
        │                             │
        │◀── ① 发现 AgentCard ────────┤
        │                             │
        │◀── ② tasks/send(Task) ─────┤
        │     执行任务……              │
        │── ③ SSE/推送：进度+Artifact─▶│
        │                             │
        │── ④ 返回最终 Artifact ─────▶│
        │                             │
        │◀── ⑤ tasks/get 取结果 ──────┤  （或已随流拿到）
```

### 2. 任务状态机（Task Lifecycle）

```
        tasks/send
   ┌──────────────────┐
   │   submitted      │  已接收，尚未开始处理
   └────────┬─────────┘
            │
            ▼
   ┌──────────────────┐
   │    working       │  Agent 正在处理（可经 SSE 流式回报进度）
   └───┬──────────┬───┘
       │          │
   需要澄清      完成
       │          │
       ▼          ▼
┌────────────┐  ┌────────────┐
│input-required│  │ completed  │  成功，Artifact 可取
└─────┬──────┘  └────────────┘
      │ 用户/上游补充后继续
      └────────────▶ working
            │
   失败/取消
       ▼
  ┌─────────┐   ┌─────────┐
  │ failed  │   │ canceled │
  └─────────┘   └─────────┘
```

- **input-required** 是典型的人机协同闸门（Human-in-the-Loop）：远端 Agent 需要澄清才继续。
- 长任务（数小时的研究）靠 **SSE 流**或 **Webhook 推送**保持两端同步，不必反复轮询。

---

## 五、能力发现（三种 Discovery）

| 方式 | 说明 |
|------|------|
| **Open Discovery** | 通过 `/.well-known/agent.json` 公开获取，最通用 |
| **Curated Discovery** | 通过 Agent 注册中心/目录按条件检索（适合组织内编排） |
| **Private Discovery** | 在企业内部、带鉴权的私有渠道分发 Agent Card |

---

## 六、设计原则

A2A 规范基于五条原则设计：

1. **拥抱 Agent 能力（Embrace agentic capabilities）**：允许 Agent 以自然、非结构化的方式协作，即便彼此**不共享记忆、工具与上下文**。
2. **基于现有标准（Build on existing standards）**：HTTP、SSE、JSON-RPC 之上构建，易与现有系统集成。
3. **默认安全（Secure by default）**：企业级认证/授权，与 OpenAPI 认证方案对齐。
4. **支持长任务（Support long-running tasks）**：从秒级快任务到数小时深度研究皆可承载。
5. **模态无关（Modality agnostic）**：除文本外，支持音频、视频等多模态内容。

---

## 七、核心价值、安全要点与最佳实践

### 核心价值
- **打破孤岛**：给异构 Agent 一套"通用语言"，避免 O(N²) 定制集成。
- **动态编排**：Client 可在运行时拉取 Agent Card、比较 skills，自动选最合适的专家 Agent 委派子任务。
- **多模态协作**：通过 `Part` 协商正确的内容格式与 UI 能力（如生成图像、视频）。

### 安全要点 ⚠️
- **Agent Card 默认未鉴权（base profile）**：任何能访问 `/.well-known/agent.json` 的人都可读到完整技能面，构成**能力枚举/侦察**风险。
  - **生产建议**：将 Agent Card 置于鉴权之后，或仅在内网段暴露。
- **认证走带外**：令牌不入协议体，放 HTTP 头；Server 必须校验 scheme 与令牌。
- **危险操作加 Human-in-the-Loop**：`input-required` 状态天然适合做审批闸门。

### 最佳实践
1. `skills` 的 `description` / `examples` 写清楚，Client 才能正确选型。
2. 长任务务必开启 `streaming` 或 `pushNotifications`，避免盲等。
3. 远程 Agent 必须做传输加密（HTTPS）与身份认证。
4. Artifact 设为不可变，分片追加（append）而非覆盖，保证可追溯。

> 记忆口诀：**A2A = Agent 横向协作标准；AgentCard 做发现、Task 做状态单元、Message/Part/Artifact 做内容；先发现名片，再 tasks/send 建任务，working 中靠 SSE/推送同步，completed 取 Artifact；与 MCP 互补——MCP 接工具，A2A 接 Agent。**
