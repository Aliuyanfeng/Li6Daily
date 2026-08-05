---
date: 2026-08-05 15:00:00
title: OpenAI Responses API 与 Chat Completions API 区别及优劣势
permalink: /pages/7c1d2e
categories:
  - AI
  - OpenAI API
---

> 本文对比 OpenAI 两代对话接口：**Chat Completions API**（当前标准）与 **Responses API**（2025-03 推出的下一代统一接口）。用请求/响应示例说明格式差异，并给出各自优劣势与选型建议。

## 背景：为什么会存在两个 API

OpenAI 的接口演进大致分三代：

1. **Completions API**（`/v1/completions`，已淘汰）：只补写下一条文本。
2. **Chat Completions API**（`/v1/chat/completions`，当前主流）：消息数组 + 角色，支持多轮、函数调用、流式、JSON 模式。
3. **Responses API**（`/v1/responses`，2025-03 推出）：官方定位为**面向 Agent 的下一代核心接口**，融合了 Chat Completions 的易用性与 Assistants API 的内置工具/状态能力，目标是逐步统一两者。

简单说：**Chat Completions 是「无状态的问答接口」，Responses 是「带状态、可编排工具的 Agent 接口」**。

## 一、Chat Completions API

最经典的请求/响应。你负责维护完整的 `messages` 历史，每轮都把全部上下文发给服务端。

### 请求格式

```http
POST /v1/chat/completions
```

```json
{
  "model": "gpt-4o",
  "messages": [
    { "role": "system",    "content": "你是一个简洁的助手。" },
    { "role": "user",      "content": "用一句话解释什么是向量。" }
  ],
  "temperature": 0.7
}
```

### 响应格式

```json
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "choices": [
    {
      "index": 0,
      "message": { "role": "assistant", "content": "向量是带方向与大小的有序数字列表，用来表示对象的特征。" },
      "finish_reason": "stop"
    }
  ],
  "usage": { "prompt_tokens": 28, "completion_tokens": 22, "total_tokens": 50 }
}
```

### Python SDK 示例

```python
from openai import OpenAI

client = OpenAI()
messages = [{"role": "user", "content": "你好"}]

resp = client.chat.completions.create(model="gpt-4o", messages=messages)
reply = resp.choices[0].message.content

# 多轮：需要自己把历史拼回去
messages.append({"role": "assistant", "content": reply})
messages.append({"role": "user",      "content": "再举一个例子"})
```

## 二、Responses API

请求用 `input` 字段承载内容（可以是字符串，也可以是结构化 item 数组）；多轮对话通过 `previous_response_id` 让服务端自动「接上」上一轮的上下文，**不需要**自己重发全部历史。

### 请求格式

```http
POST /v1/responses
```

```json
{
  "model": "gpt-4o",
  "input": "用一句话解释什么是向量。"
}
```

多轮时带上上一轮返回的 id：

```json
{
  "model": "gpt-4o",
  "input": "再举一个例子",
  "previous_response_id": "resp_abc123"
}
```

### 响应格式

```json
{
  "id": "resp-abc123",
  "object": "response",
  "status": "completed",
  "output": [
    {
      "type": "message",
      "role": "assistant",
      "content": [
        { "type": "output_text", "text": "向量是带方向与大小的有序数字列表，用来表示对象的特征。" }
      ]
    }
  ],
  "usage": { "input_tokens": 12, "output_tokens": 22, "total_tokens": 34 }
}
```

### 内置工具（核心差异点）

Responses API 原生支持把工具「交给模型」自动调度，例如联网搜索：

```json
{
  "model": "gpt-4o",
  "input": "今天旧金山的天气怎么样？",
  "tools": [ { "type": "web_search_preview" } ]
}
```

模型会在 `output` 里返回工具调用与结果，应用无需自己写调度循环。同理还支持 `file_search`（知识库检索）、`computer_use`（操作电脑）、以及函数工具。

### Python SDK 示例

```python
from openai import OpenAI

client = OpenAI()
resp = client.responses.create(model="gpt-4o", input="你好")
print(resp.output_text)          # 直接拿到文本

# 多轮：只传新输入 + 上一轮 id
resp2 = client.responses.create(
    model="gpt-4o",
    input="再举一个例子",
    previous_response_id=resp.id,
)
print(resp2.output_text)
```

## 三、核心差异对比

| 维度 | Chat Completions | Responses |
| --- | --- | --- |
| 状态管理 | 无状态，自己维护 messages 历史 | 有状态，`previous_response_id` 自动续接 |
| 输入字段 | `messages`（role/content 数组） | `input`（字符串或 item 数组） |
| 输出结构 | `choices[].message` | `output[]`（item 列表，含 type） |
| 内置工具 | 需自行实现调度（函数调用） | 原生 `web_search` / `file_search` / `computer_use` |
| 多模态 | 依赖 messages 的 content 数组 | 原生 `input` item 支持更统一 |
| 结构化输出 | `response_format` / JSON 模式 | 原生 `text.format` 结构化输出 |
| 流式 | 支持（SSE） | 支持（事件流，粒度更细） |
| 生态成熟度 | 极成熟，几乎所有库/框架兼容 | 较新，生态在快速补齐 |
| 官方定位 | 当前标准，长期可用 | 面向 Agent 的下一代核心接口 |

## 四、各自优劣势

### Chat Completions API

**优势**
- 极简、稳定，文档与示例海量，几乎所有 SDK、代理、网关、第三方模型都兼容。
- 无状态带来完全可控：历史怎么拼、怎么裁剪、怎么缓存，都由你决定。
- 心智负担低，做一个普通聊天/问答/脚本调用非常顺手。

**劣势**
- 多轮、工具编排、上下文管理要自己写大量样板代码。
- 没有内置工具，检索/联网/函数调度都需自行实现循环。
- 每轮重发全量历史，长对话 token 成本与延迟更高。

### Responses API

**优势**
- 内置工具与状态管理，**Agent / 多步任务**的样板代码大幅减少。
- `previous_response_id` 让服务端管上下文，长对话不必反复上传历史。
- 原生结构化输出、细粒度流式事件，更适合生产级 Agent。
- 是官方重点投入的方向，新能力（computer use、增强检索等）优先在此提供。

**劣势**
- 较新，部分老库/中间件/自建兼容层尚未全面支持。
- 与既有 Chat Completions 代码不兼容，迁移有成本。
- 抽象层级更高，「黑盒」感更强，调试工具调度链路时需要适应新结构。

## 五、怎么选

- **新项目、尤其是 Agent / 工具调用 / 长程多轮**：优先选 **Responses API**。
- **简单问答、脚本、需要最大兼容性、或依赖只支持 Chat Completions 的框架**：继续用 **Chat Completions**。
- **已在跑的 Chat Completions 服务**：不必急着迁移；官方目前仍长期支持 Chat Completions，可等新功能确实需要在 Responses 上实现时再平滑切换。

> 一句话：**Chat Completions 是「把模型当函数调用」，Responses 是「把模型当能调用工具的智能体」。**

## 六、小结

两者并非完全替代关系，而是覆盖不同复杂度：Chat Completions 胜在简单与兼容，Responses 胜在状态与编排。理解 `messages` vs `input`、`choices` vs `output`、`previous_response_id` 这几个关键差异，基本就能在两者之间正确选型。
