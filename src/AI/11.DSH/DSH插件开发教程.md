---
date: 2026-09-03 09:35:45
title: DSH 插件开发教程
permalink: /pages/dsh001
categories:
  - AI
  - DSH
---
# DSH 插件开发教程 —— 从零开始写一个 DeepSeek Harness 插件

> 面向读者：**没接触过 DSH 插件开发的人**。不需要了解 DSH 内部实现，只要会基本的 JavaScript / Node.js，跟着做就能写出、跑通并发布一个自己的插件。
>
> 本教程的所有 API 和示例均来自三个真实插件的源码（本目录下的 `dsh-soul`、`dsh-rewind`、`dsh-share-page`）与 DSH 官方文档，可直接对照阅读。

---

## 目录

- [1. 这份教程讲什么](#1-这份教程讲什么)
- [2. 背景知识：先弄懂 5 个词](#2-背景知识先弄懂-5-个词)
- [3. 插件能做什么](#3-插件能做什么)
- [4. 开发前的准备](#4-开发前的准备)
- [5. 实战一：十分钟写一个最小插件](#5-实战一十分钟写一个最小插件)
- [6. 宿主端（index.mjs）开发详解](#6-宿主端indexmjs开发详解)
- [7. 客户端（client/index.mjs）开发详解](#7-客户端clientindexmjs开发详解)
- [8. 调试与排错（真实踩坑记录）](#8-调试与排错真实踩坑记录)
- [9. 发布到 npm](#9-发布到-npm)
- [10. 进阶：动态插件（另一条路线）](#10-进阶动态插件另一条路线)
- [11. 附录](#11-附录)

---

## 1. 这份教程讲什么

**DSH（DeepSeek Harness）** 是一个 AI Agent 运行框架：它启动后提供一个 Web 界面（`http://127.0.0.1:3080`），里面有会话、Agent、工具系统、系统提示词、设置页等。你可以把它类比成"一个可以装扩展的 AI 工作台"。

**DSH 插件** 就是给这个工作台"加功能"的 npm 包。装上插件后，你可以：

- 给 Web 界面加一个新的设置页、按钮、面板；
- 给 Agent 增加它可调用的工具（Tool）；
- 往系统提示词里注入自定义内容（比如人设、规则）；
- 添加 `/xxx` 斜杠命令；
- 注册 HTTP 接口、读写配置文件、和外部服务交互。

**学完本教程你将能够：** 从零建一个插件项目 → 装进本地 DSH 调试 → 处理常见报错 → 发布到 npm 给别人安装。

---

## 2. 背景知识：先弄懂 5 个词

### 2.1 一张图看懂 DSH 的结构

```text
┌─────────────────────────────────────────────────────────┐
│  浏览器（你看到的 Web 页面）                              │
│  = Client（客户端）                                      │
│  React 界面：会话区、输入框、设置页……                     │
│  ← 插件的 client/index.mjs 在这里跑                      │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTP（页面 ↔ 本地服务）
┌───────────────────────┴─────────────────────────────────┐
│  本地 Node.js 服务（dsh 启动）                            │
│  = Host（宿主端）                                        │
│  Agent 循环、工具执行、会话存储、HTTP 路由……              │
│  ← 插件的 index.mjs 在这里跑                             │
└─────────────────────────────────────────────────────────┘
```

**关键认知：一个插件有两半**。

| 半区 | 文件 | 运行在 | 能干什么 |
|---|---|---|---|
| 宿主端（Host） | `index.mjs` | Node.js 进程 | 读写文件、执行命令、注册工具/命令/提示词/HTTP 接口 |
| 客户端（Client） | `client/index.mjs` | 浏览器页面 | 画 UI、响应点击、调用宿主端的接口 |

两半可以只写一半：纯客户端插件（如 `dsh-rewind`）的宿主端 `index.mjs` 就是空的。

### 2.2 五个核心概念

| 概念 | 是什么 | 好比 |
|---|---|---|
| **Host / Client** | 两个运行环境：Node.js 服务端 / 浏览器页面 | 后端 / 前端 |
| **Profile** | 一份"装配清单"目录（`$DSH_HOME/profiles/<名字>`），记录装了哪些插件 | 手机的"分身/配置档案" |
| **Bundle** | 一个插件 npm 包 | 一个 App |
| **cordis.patch.yml** | 插件的"自我介绍卡"，声明"我要以什么 id 装进配置树" | App 的注册信息 |
| **Cordis** | DSH 底层的插件框架，提供 `ctx.provide / ctx.inject / ctx.effect` 等机制 | 插件系统的"插座标准" |

配置树的叠加顺序（后叠加的覆盖先叠加的）：

```text
空配置
 → 官方基础 bundle 的 patch
 → 每个已安装插件的 cordis.patch.yml
 → profile 自己的 cordis.patch.yml
 → $DSH_HOME/cordis.patch.yml（用户全局）
 → 启动参数 --patch 指定的覆盖层
```

### 2.3 插件的两种形态

| 形态 | 怎么来的 | 适合 |
|---|---|---|
| **npm 包插件**（本教程主线） | 写一个 npm 包，用 `dsh plugin add` 安装进 profile，随 DSH 启动加载 | 正式、可发布、可持久的功能 |
| **动态插件**（第 10 节简介） | 在会话里用 `cordis_define` / `cordis_run` 等工具现场定义，代码存于进程内 | 临时试验、一次性小功能，重启即消失 |

本目录下的三个插件都是 npm 包插件，也推荐初学者从这条路入手。

---

## 3. 插件能做什么

先用三个真实插件建立"体感"，它们就在你眼前（本目录）：

| 插件 | 一句话功能 | 用到的能力 |
|---|---|---|
| `dsh-soul` | 个性化设置：昵称、回复风格、输出语言 | HTTP 接口 + 斜杠命令 + 系统提示词 + Agent 工具 + 设置页 UI（**全栈，功能最全**） |
| `dsh-rewind` | 会话回溯：跳回任意历史轮次 | 纯客户端：会话 fork + 输入框上方时间轴 UI |
| `dsh-share-page` | 把会话导出为可分享的静态网页 | Agent 工具 + HTTP 接口 + 客户端分享对话框 |

### 能力总览（宿主端）

| 能力 | 注册方式 | 效果 |
|---|---|---|
| HTTP 接口 | `webServer.register(...)` | 提供 `/api/xxx` 给页面调用 |
| 斜杠命令 | `commands.register(...)` | 输入框里出现 `/你的命令` |
| 系统提示词 | `systemPrompt.section(...)` | 每次请求都注入一段提示词 |
| Agent 工具 | `tools.register(defineTool(...))` | 模型可以调用你的函数 |
| 会话注入 | `agent.inject(createUserMessage(...))` | 向所有活动会话塞一条上下文消息 |
| 提供服务 | `ctx.provide(...)` | 给其他代码暴露自己的方法 |

### 能力总览（客户端）

| 能力 | 挂载点（Slot） | 效果 |
|---|---|---|
| 设置页栏目 | `settings.section` | 设置对话框里多一个栏目（如「个性化」） |
| 输入框上方 | `conversation.input.dock` | 聊天输入框上方面板（如回溯时间轴） |
| 每轮消息尾部 | `conversation.chat.assistant-actions` | 给每条回复加按钮 |
| 多语言词典 | `ctx.locale.register(...)` | UI 文案支持中英文 |

---

## 4. 开发前的准备

### 4.1 环境要求

1. **Node.js ≥ 20**（Windows 用户建议通过 nvm 管理）；
2. **DSH 已安装**（终端能执行 `dsh --help`）；
3. **一个可用的 profile**。DSH 自带 `web` profile（`dsh web` 就是启动它），首次使用会自动初始化。profile 目录在：

```text
Windows:  C:\Users\<你>\.dsh\profiles\web\
（若设置了 DSH_HOME 环境变量，则在 $DSH_HOME\profiles\web\）
```

4. 建议装 pnpm（`dsh plugin` 内部转发给 pnpm 安装包）。

### 4.2 认识 profile 目录（可选，有助于理解）

```text
profiles/web/
├── package.json      # 记录装了哪些插件（dependencies）
├── dsh.profile       # manifest：bundle 列表
├── cordis.patch.yml  # 这个 profile 自己的配置层
└── node_modules/     # 插件包被安装到这里（重要，见第 8 节的"复制坑"）
```

### 4.3 建议的练习姿势

新建一个空白目录作为你的插件项目（本教程以 `dsh-hello` 为例），和 DSH 源码无关、随时可删。

---

## 5. 实战一：十分钟写一个最小插件

目标：写一个叫 `dsh-hello` 的插件，它提供：

1. 一条斜杠命令 `/hello`，回复一句话；
2. 一个 HTTP 接口 `GET /api/hello`，返回 JSON。

（客户端 UI 第 7 节再加。）

### 5.1 目录结构

```text
dsh-hello/
├── package.json          # 包描述 + DSH 装载声明
├── cordis.patch.yml      # 配置层：声明插件 id
├── index.mjs             # 宿主端入口
├── client/index.mjs      # 客户端入口（本节可先空着，第 7 节补）
└── README.md
```

### 5.2 写 `package.json`

这是插件最"讲究"的一个文件，逐字段解释：

```json
{
  "name": "dsh-hello",
  "version": "0.1.0",
  "description": "我的第一个 DSH 插件",
  "type": "module",
  "main": "index.mjs",
  "license": "MIT",
  "keywords": ["dsh", "dsh-plugin", "hello"],

  "peerDependencies": {
    "@deepseek-ai/cordis": "^4.0.1"
  },

  "dsh": {
    "bundle": {
      "patch": "./cordis.patch.yml"
    },
    "client": {
      "inject": [
        "@deepseek-ai/dsh-client-locale"
      ],
      "platform": "web"
    }
  },

  "exports": {
    ".": { "default": "./index.mjs" },
    "./client": "./client/index.mjs",
    "./cordis.patch.yml": "./cordis.patch.yml",
    "./package.json": "./package.json"
  },

  "files": [
    "index.mjs",
    "client",
    "cordis.patch.yml",
    "README.md"
  ]
}
```

| 字段 | 作用 |
|---|---|
| `type: "module"` + `main: "index.mjs"` | ESM 包，宿主端入口指向 `index.mjs` |
| `dsh.bundle.patch` | 告诉 DSH：装载本包时，把这份 patch 文件叠进配置树 |
| `dsh.client.inject` | 客户端 bundle 需要哪些官方模块（见 7.2 节） |
| `dsh.client.platform` | 客户端跑在 `web` 平台 |
| `exports["./client"]` | 让 DSH 能解析到你的客户端入口 |
| `files` | 发布到 npm 时真正包含的文件 |

> `peerDependencies` 声明"宿主环境会提供这些依赖"，插件自己不打包它们。

### 5.3 写 `cordis.patch.yml`

```yaml
- insert:
    - id: hello
      name: dsh-hello
```

含义：往配置树里插入一行插件，`id` 是它在配置树里的名字（自取，建议全小写），`name` 必须等于 npm 包名。

### 5.4 写宿主端 `index.mjs`

```js
// index.mjs — dsh-hello 宿主端入口
const name = 'hello'

/**
 * @param {object} ctx - cordis 上下文，插件的"总插座"
 */
export async function apply(ctx) {
  // —— 1. 注册斜杠命令 /hello ——
  // inject(['commands'], ...) 表示：等 'commands' 服务就绪后再执行回调
  ctx.inject(['commands'], (cmdCtx) => {
    cmdCtx.commands.register({
      name: 'hello',
      description: '打个招呼',
      input: { hint: '[名字]' },
      async handler(invocation) {
        const who = String(invocation.rawInput || '').trim() || '世界'
        return { kind: 'success', text: `你好，${who}！这是来自 dsh-hello 的问候。` }
      },
    })
  })

  // —— 2. 注册 HTTP 接口 GET /api/hello ——
  ctx.inject(['webServer'], (wsCtx) => {
    wsCtx.webServer.register({
      kind: 'exact',
      path: '/api/hello',
      handler: async (req, res) => {
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ ok: true, message: 'hello from dsh-hello' }))
      },
    })
  })
}

export { name }
```

就这么多。**两个固定约定**：

1. 导出 `name`（插件名，小写）；
2. 导出 `apply(ctx)`（装载函数，DSH 启动时会调用它一次）。

### 5.5 装进 profile 并运行

```powershell
# 在插件项目目录执行：把当前目录作为本地包装进 web profile
cd D:\AliuProject\dsh-plugin\dsh-hello
dsh plugin --profile web add ./

# 启动（dsh web 是 dsh --profile web 的别名）
dsh --profile web
```

> 注意：`dsh web` 这个别名命令**不能再接收全局选项**（如 `--patch`），需要全局选项时写全称 `dsh --profile web ...`。

### 5.6 验证

1. 浏览器打开 `http://127.0.0.1:3080`；
2. 输入框输入 `/hello 小刘` → 应看到回复「你好，小刘！……」；
3. 另开终端：`curl http://127.0.0.1:3080/api/hello` → 应返回 JSON。

**不想启动也能先验证配置**（只做配置树叠加检查，不启动服务）：

```powershell
dsh --profile web --dump-config
```

输出里能看到 `hello` 这一行，说明 patch 已正确合入。

---

## 6. 宿主端（index.mjs）开发详解

### 6.1 `ctx` 的四个核心方法

`apply(ctx)` 里的 `ctx` 是 cordis 上下文，记住四个方法就够了：

| 方法 | 用途 | 什么时候用 |
|---|---|---|
| `ctx.provide(name, service)` | 对外提供一个服务对象 | 想让别的代码调用你的能力 |
| `ctx.inject([names], callback)` | 声明**硬依赖**：等这些服务可用后再执行回调 | 要用 `webServer` / `commands` / `systemPrompt` / `tools` 等 |
| `ctx.get(name)` | 取一个**可选**服务，可能返回 `undefined` | 服务可缺省，缺了就跳过 |
| `ctx.effect(setup, tag)` | 登记一个副作用，返回清理函数 | 定时器、监听器、DOM 操作等需要"善后"的东西 |

真实插件中的惯用法（摘自 `dsh-soul/index.mjs`，有删减）：

```js
// 可选服务：agents 服务不在就安静跳过
function injectPromptToAllAgents(ctx, config) {
  const agents = ctx.get('agents')
  if (!agents || typeof agents.list !== 'function') return
  for (const agent of agents.list()) {
    try { agent.inject(/* … */); } catch (err) { /* … */ }
  }
}

// 副作用清理：插件卸载/重载时自动执行清理函数
ctx.effect(() => {
  const disposeSection = spCtx.systemPrompt.section({ /* … */ })
  return () => disposeSection?.()   // 返回清理函数
}, 'dsh-soul: system prompt section')
```

> **生命周期铁律**：凡是你注册出去的东西（section、listener、定时器），都要能被清理。优先使用 DSH API 自带的 disposer 返回值，配合 `ctx.effect()` 挂到插件生命周期上——插件停止、更新、重载时 cordis 会自动调用清理函数，避免"幽灵残留"。

### 6.2 宿主端可用的服务清单

从三个真实插件中验证过的服务名：

| 服务名 | 提供 | 典型用法 |
|---|---|---|
| `webServer` | HTTP 路由注册 | `webServer.register({ kind: 'exact', path, handler })` |
| `commands` | 斜杠命令注册 | `commands.register({ name, description, input, handler })` |
| `systemPrompt` | 系统提示词分区 | `systemPrompt.section({ name, order, text })` |
| `tools` | Agent 工具注册 | `tools.register(defineTool({...}))` |
| `agents` | 活动 Agent 列表 | `agents.list()` → `agent.inject(msg)` |
| `sessionPersistence` | 会话持久化读取 | `dsh-share-page` 用来读会话数据 |
| `logger` | 日志 | `logger.warn('[插件名] ...')` |

> 服务名以你当前 DSH 版本实际注册的为准。拿不准时，可以用第 10 节的 `cordis_inspect_list` 工具在会话里直接列出当前所有可用服务。

### 6.3 能力一：HTTP 接口（webServer）

```js
ctx.inject(['webServer'], (wsCtx) => {
  wsCtx.webServer.register({
    kind: 'exact',          // 精确匹配路径
    path: '/api/hello',
    handler: async (req, res) => {   // 原生 Node.js req/res
      // 读 POST body 的写法：
      // let raw = ''
      // for await (const chunk of req) raw += chunk
      // const body = JSON.parse(raw)

      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ ok: true }))
    },
  })
})
```

- `handler` 就是原生 `(req, res)`，没有框架封装，自己处理 method、body、错误；
- 惯例：返回 `{ ok: true/false, ... }` 结构，出错时 `{ ok: false, error: '...' }`。

### 6.4 能力二：斜杠命令（commands）

```js
ctx.inject(['commands'], (cmdCtx) => {
  cmdCtx.commands.register({
    name: 'hello',                       // /hello
    description: '打个招呼',
    input: { hint: '[show|reset|名字]' }, // 输入框里的灰色提示
    async handler(invocation) {
      const raw = String(invocation.rawInput || '').trim()
      if (raw === 'show') {
        return { kind: 'success', text: '当前配置：…' }
      }
      return { kind: 'error', text: `未知参数：${raw}` }
    },
  })
})
```

- `invocation.rawInput`：命令后面的原始文本（`/hello 小刘` → `'小刘'`）；
- 返回 `{ kind: 'success' | 'error', text }`，`text` 会直接显示在会话里；
- 关键字子命令注意大小写策略（参考 `dsh-soul`：关键字比较前 `toLowerCase()`，昵称等内容保留原样）。

### 6.5 能力三：系统提示词（systemPrompt）

```js
ctx.inject(['systemPrompt'], (spCtx) => {
  const disposeSection = spCtx.systemPrompt.section({
    name: 'hello:rules',   // 分区名，用 '插件:用途' 命名避免冲突
    order: 0,              // 数字越小越靠前
    text: () => '【插件注入】回答时保持专业严谨。',  // 每次请求时调用
  })
})
```

- `text` 是**函数**，每次组装提示词时实时调用，所以可以读最新的配置；
- 返回空字符串表示该分区本此不注入；
- 要更新提示词内容时，标准做法是：先 `disposeSection()` 移除旧分区，再重新注册（见 `dsh-soul` 的 `registerSection()`）——这样 DSH 会丢弃旧缓存，下一次请求立即用新内容。

### 6.6 能力四：Agent 工具（tools + @deepseek-ai/dsh-tools）

给模型增加一个可调用的工具，比如「设置人设」（摘自 `dsh-soul`，有删减）：

```js
// 注意：@deepseek-ai/dsh-tools 是可选依赖且 ABI 敏感，
// 真实插件用"动态 import + 守卫"防止宿主版本不匹配时整个插件挂掉
ctx.inject(['tools'], (toolsCtx) => {
  import('@deepseek-ai/dsh-tools').then(({ defineTool, TOOL_RUNTIME_SCHEDULER }) => {
    if (typeof TOOL_RUNTIME_SCHEDULER !== 'symbol') {
      throw new Error('requires @deepseek-ai/dsh-tools ^0.1.0-rc.6')
    }
    toolsCtx.tools.register(defineTool({
      name: 'set_persona',
      description: '调整当前个性化人设。当用户明确要求改变称呼、语气或风格时使用。',
      parameters: {
        nickname: { type: 'string', description: '用户昵称。' },
        style: {
          type: 'string',
          enum: ['professional', 'casual'],
          description: '回复风格：professional=专业严谨，casual=轻松自然。',
        },
      },
      output: {
        schema: {
          type: 'object',
          additionalProperties: false,
          required: ['ok'],
          properties: {
            ok: { type: 'boolean' },
            message: { type: 'string' },
          },
        },
      },
      async execute(args) {
        // args 即模型按 parameters 传来的参数
        return { ok: true, message: `昵称已设为 ${args.nickname}` }
      },
    }))
  }).catch((err) => {
    toolsCtx.logger?.warn?.('[dsh-hello] tool not registered: ' + err.message)
  })
})
```

要点：

- `description` 和参数的 `description` 写得越清楚，模型调用越准——**这是给模型看的文档**；
- 参数与返回值必须可 JSON 序列化；
- `execute` 只负责业务结果；展示层（工具卡片 UI）是另一套机制，初学阶段不必管。

### 6.7 能力五：向活动会话注入上下文（agents + agent.inject）

配置变化后，让**正在进行**的会话立即感知（摘自 `dsh-soul`，有删减）：

```js
import { createUserMessage } from '@deepseek-ai/dsh-llm'

function injectToAllAgents(ctx, text) {
  const agents = ctx.get('agents')
  if (!agents) return
  for (const agent of agents.list()) {
    try {
      agent.inject(createUserMessage({
        content: [{ type: 'text', text }],
        source: {                       // 标记消息来源（惯例，便于追溯）
          kind: 'plugin',
          plugin: 'dsh-soul',
          form: 'snapshot',
          sections: [{ name: 'soul:persona', text }],
        },
      }))
    } catch { /* 单个失败不影响其他会话 */ }
  }
}
```

行为特点（官方语义，务必记住）：

- `inject()` 把内容放进 Agent 的**待处理上下文**，在**下一次模型请求**时生效；
- 它**不会**主动触发新请求，也**不会**改写历史消息。

### 6.8 配置持久化

没有专门的配置 API，惯例是读写 DSH 用户数据目录下的 JSON 文件（摘自 `dsh-soul`）：

```js
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { homedir } from 'node:os'

function configPath() {
  // $DSH_HOME/xxx-config.json；未设置 DSH_HOME 时用 ~/.dsh
  return join(process.env.DSH_HOME || join(homedir(), '.dsh'), 'hello-config.json')
}

async function saveConfig(config) {
  await mkdir(join(configPath(), '..'), { recursive: true })
  await writeFile(configPath(), JSON.stringify(config, null, 2), 'utf8')
}
```

---

## 7. 客户端（client/index.mjs）开发详解

客户端没有构建步骤：**手写 JS + 官方已加载的 React**，DSH 的模块加载器直接在浏览器里执行你的文件。

### 7.1 文件骨架

```js
// client/index.mjs — dsh-hello Web UI 插件
window.__ModuleLoader__.load({
  id: 'dsh-hello',
  factory: (require) => {
    const module = { exports: {} }

    // ① 拿 React（17+ 的 jsx-runtime 约定）
    const { jsx: h, jsxs: hs, Fragment } = require('react/jsx-runtime')
    const React = require('react')
    // ② 拿官方 UI 组件库（按钮、输入框、开关等）
    const ui = require('@deepseek-ai/dsh-client-ui-primitives')

    // ③ jsx-runtime 的"坑"：h(type, props, child) 的第三个参数是 key，
    //    直接这样传 child 会被当成 key 丢掉！用一个包装函数统一把 children 塞进 props：
    const e = (type, props, ...children) => {
      const p = props || {}
      if (children.length === 0) return h(type, p)
      if (children.length === 1) return h(type, { ...p, children: children[0] })
      return hs(type, { ...p, children })
    }

    // —— 你的 React 组件 ——
    function HelloPanel(props) {
      const [text, setText] = React.useState('')
      return e('div', { style: { padding: 12 } },
        e('div', null, 'Hello 面板'),
        e(ui.Input ?? 'input', {
          value: text,
          onChange: (ev) => setText(ev.target?.value ?? ev),
        }),
        e('p', null, `你输入了：${text}`),
      )
    }

    // ④ cordis 装配：inject 声明硬依赖的服务，apply 里注册 UI
    const inject = ['slots', 'locale']

    function apply(ctx) {
      // 多语言词典（可选）
      ctx.effect(() => ctx.locale.register('hello', {
        zh: { 'panel.title': '打招呼' },
        en: { 'panel.title': 'Say Hello' },
      }), 'dsh-hello: dictionaries')

      // 把组件注册进"设置页栏目"槽位
      ctx.slots.inject('settings.section', () => ctx.slots.register({
        name: 'settings.section',
        id: 'hello-settings',       // 全局唯一
        order: 60,                  // 栏目排序
        label: () => '打招呼',       // 左侧导航文字
        locale: 'hello',
      }, HelloPanel))
    }

    exports.apply = apply
    exports.inject = inject
    return module.exports
  },
})
```

骨架里四件事必须理解：

1. **`window.__ModuleLoader__.load({ id, factory })`**：客户端插件的装载协议，`id` 与包名一致；
2. **jsx-runtime 的 children 坑**：必须用 `props.children` 传子元素（上面 `e()` 包装已解决），否则界面空白且难排查；
3. **`exports.inject`**：声明本插件要注入的 cordis 服务（`slots`、`locale` 等），之后才能安全使用 `ctx.slots` / `ctx.locale`；
4. **槽位注册**：`ctx.slots.inject('槽位名', () => ctx.slots.register(配置, 组件))` —— `slots.inject` 表示"等这个槽位可用后再注册"。

### 7.2 客户端能 require 到哪些模块？

| 模块 | 怎么来的 | 用途 |
|---|---|---|
| `react`、`react/jsx-runtime` | 平台预置 | 画界面 |
| `@deepseek-ai/dsh-client-ui-primitives` | 平台预置 | 官方按钮/输入框/开关等基础组件 |
| `@deepseek-ai/dsh-client-locale` | 需在 `package.json` 的 `dsh.client.inject` 声明 | 多语言 |
| `@deepseek-ai/dsh-client-ui-conversation` | 需在 `dsh.client.inject` 声明 | 会话相关 UI 契约 |
| `@deepseek-ai/dsh-client-runtime` | 需在 `dsh.client.inject` 声明 | **会话运行时服务**（`sessions.fork`、`workspaces.archiveSession` 等） |

两个重要限制（来自 `dsh-soul` 的实测注释）：

- 平台只预置 seed 一小撮模块，第三方插件**不能**直接 `require('@deepseek-ai/dsh-client-runtime/client')`；
- 需要会话写操作（fork 等）时，像 `dsh-rewind` 那样在 `package.json` 声明 `"@deepseek-ai/dsh-client-runtime"`，并在组件的 `inject` 里拿 `sessions` / `workspaces` 服务。

### 7.3 客户端 ↔ 宿主端通信

客户端插件调用宿主端能力，最常用的方式就是**fetch 你在宿主端注册的 HTTP 接口**：

```js
// 客户端：读宿主端 /api/hello
async function loadFromHost() {
  const origin = globalThis.location?.origin ?? 'http://dsh.internal'
  const response = await fetch(new URL('/api/hello', origin))
  const payload = await response.json().catch(() => ({}))
  if (!response.ok || payload.ok !== true) {
    throw new Error(payload.error || `HTTP ${response.status}`)
  }
  return payload
}
```

### 7.4 客户端状态管理

浏览器里的 `React.useSyncExternalStore` 需要一个 store。第三方插件拿不到官方内部 store 工具，**自己实现一个极简的**（摘自 `dsh-soul`，可整段复制）：

```js
const createSnapshotStore = (init) => {
  let state = init
  const listeners = new Set()
  const notify = () => { for (const fn of [...listeners]) fn() }
  return {
    getSnapshot: () => state,
    subscribe: (fn) => { listeners.add(fn); return () => listeners.delete(fn) },
    update: (mutator) => { const next = { ...state }; mutator(next); state = next; notify() },
    set: (next) => { state = next; notify() },
  }
}

// 组件里使用：
function useStore(store) {
  return React.useSyncExternalStore(store.subscribe, store.getSnapshot)
}
```

如果面板很简单，直接 `useState` 也完全够用——别为小事上框架。

### 7.5 常用槽位速查

| 槽位名 | 位置 | 参考 |
|---|---|---|
| `settings.section` | 设置对话框的左侧栏目 | `dsh-soul` |
| `conversation.input.dock` | 聊天输入框上方 | `dsh-rewind`（回溯时间轴，`order: 600`） |
| `conversation.chat.assistant-actions` | 每轮回复尾部 | `dsh-rewind`（每轮「↩」按钮） |

> 槽位的准确契约（props、注册协议）以你当前 DSH 版本为准。想看"现在有哪些槽位、各自长什么样"，在 DSH 会话里让 Agent 用 `cordis_inspect_list` / `Slots.listSubTree` 查（见第 10 节），比猜靠谱得多。

---

## 8. 调试与排错（真实踩坑记录）

以下坑全部来自本目录插件的真实开发过程，遇到问题先对照此表。

### 8.1 最大的坑：改了源码，页面没反应

**根因**：`dsh plugin add ./xxx` 走 pnpm 的 `file:` 协议，pnpm 会把整个包**复制**一份到 profile 的 `node_modules`——服务跑的是那份副本，不是你的源码目录。

```text
改源码 → 副本不动 → 页面纹丝不动
重启服务也没用（重启 ≠ 重装包）
```

**修法（三选一）**：

```powershell
# 方法一：重装刷新副本（最常用）
dsh plugin --profile web add ./dsh-hello
# 重装后 rev 自动变化，浏览器硬刷新 Ctrl+Shift+R

# 方法二（开发期推荐）：把 profile 的 package.json 里 "file:D:/..." 
# 改成 "link:D:/..."，pnpm 建软链，改源码即实时生效

# 方法三：npm pack + npm i -g / npm link 组合（发布前的整包验证用）
```

**自检三连**（纯读，不改任何东西）：

```powershell
# 1) 副本和源码是否一致
diff $HOME\.dsh\profiles\web\node_modules\dsh-hello\index.mjs .\index.mjs

# 2) 服务是否在吐新客户端产物（有输出说明 bundle 已生效）
curl.exe -s http://127.0.0.1:3080/ | findstr "dsh-hello"

# 3) 配置层是否合入（不启动服务）
dsh --profile web --dump-config
```

### 8.2 常见报错对照表

| 报错 / 症状 | 原因 | 解决 |
|---|---|---|
| `Cannot find package 'dsh-hello' imported from …\profiles\web\` | 配置树里有这行插件，但包没装进 profile 的 `node_modules` | 先 `dsh plugin add`，再启动 |
| `dsh web --patch ./x.yml` 报 `web takes none of …` | `web` 别名命令不能吃全局选项 | 写全称 `dsh --profile web --patch …` |
| 客户端组件不渲染 / 页面报错 | 用了 JSX 语法；或 `h(type, props, child)` 把 child 当成了 key | 客户端是纯 JS：禁 JSX/TS/import，用 `e()` 包装 |
| 设置栏目不显示 | 插件没装进当前 profile / DSH 未完全重启 / 页面没刷新 | 重启 + 硬刷新 |
| 配置保存了但 Agent 行为没变 | `agent.inject()` 只在下一次请求生效 | 先发一条新消息再观察 |
| `service "x" is not declared` | 用了 `ctx.x` 但没在 `inject` 里声明 | 改 `ctx.get('x')` + 判空，或真硬依赖就声明 `inject: ['x']` |
| 工具注册后模型看不见 | `dsh-tools` ABI 不匹配，守卫把它拦了 | 确认 `@deepseek-ai/dsh-tools` 版本与宿主匹配 |
| 发布报 403 | npm 上已存在同版本号 | 升 `version` 再发 |

### 8.3 调试技巧

- 宿主端：在 `index.mjs` 里临时 `console.log`（DSH 启动它的终端能看到）；调试完记得删；
- 客户端：浏览器 DevTools Console 看报错；Network 面板确认 `/plugins/<名字>/client.js` 是否返回了新代码；
- 配置层：`dsh --profile web --dump-config` 随时检查合并结果，不用启动；
- 最小复现：把插件裁到只剩一个 `apply` 里的一句 `console.log`，确认装载链路通，再逐个加功能。

---

## 9. 发布到 npm

### 9.1 发布前检查

```bash
npm pack --dry-run
```

确认列表里包含且仅包含：

```text
index.mjs
client/index.mjs
cordis.patch.yml
package.json
README.md
```

> 安全红线：**不要**把 token、密钥、个人配置、本地绝对路径打进包里。

### 9.2 手动发布

```bash
npm login
npm version patch        # 或 minor / major，遵循语义化版本
npm publish --access public
```

### 9.3 自动发布（推荐：GitHub Release + OIDC 可信发布）

`dsh-soul` 的做法（`.github/workflows/publish.yml`）：发布 GitHub Release → CI 校验 tag 与 `package.json` 版本一致 → `npm pack --dry-run` → 幂等检查 → `npm publish`（OIDC，无需保存 token）。首次需在 npmjs.com 的包设置里配置一次 Trusted Publishing（仓库 / 工作流文件名），此后零 token 维护。

> 细节提醒：Draft 状态的 Release 不会触发发布；npm 已淘汰 Classic Token，手动发布如遇 2FA 请改用 Granular Access Token（90 天有效，需轮换）——能上 OIDC 就别用 token。

### 9.4 别人怎么装你的插件

```bash
dsh plugin --profile web add dsh-hello
dsh --profile web
```

---

## 10. 进阶：动态插件（另一条路线）

除了 npm 包插件，DSH 还支持**在会话里现场定义的动态插件**：让 Agent 使用 `cordis_define`（提交代码）→ `cordis_run`（激活）等工具，代码以纯 JS 函数体的形式存于运行时，**进程重启即消失**。

与 npm 包插件的关键差异：

| 维度 | npm 包插件（本教程主线） | 动态插件 |
|---|---|---|
| 存放 | npm 包 / profile | 进程内（Plugin / Package / Run 模型） |
| 代码形式 | 标准 ESM 文件 | 纯 JS 函数体，返回 `{ apply(ctx) }` |
| 客户端写 UI | jsx-runtime | 必须 `React.createElement(...)`，禁 JSX |
| 依赖服务 | `ctx.inject` / `ctx.get` | 同样是 `ctx.inject` / `ctx.get` |
| 定时器 | Node 原生 | 必须声明 `inject: ['timer']`，用 `ctx.timeout / ctx.interval` |
| 客户端调宿主 | HTTP 接口 | `harness.handle(method, handler)` + `host.call(method, args)`，参数必须无损 JSON |
| 适合 | 正式功能、可发布 | 试验、一次性自动化 |

**动态插件的开发心法**（来自官方 `cordis-plugin-development` 技能文档，同样值得包插件作者参考）：

1. **先查再写**：不要凭服务名猜 API。用 `cordis_inspect_list` 列出当前 Host/Client 的所有服务、事件、槽位、主题 token，再用 `cordis_inspect_query` 读准确签名，最后动手；
2. **选最近的平台**：数据在宿主就写宿主端，UI 属于页面就写客户端；Slot props 已经给的数据不要绕道宿主再拉一遍；
3. **内部对象别序列化**：Service 实例、会话快照、Slot props 是"活的内部数据"，不要 `JSON.stringify` 整个对象、不要整棵复制——只提取需要的标量字段；
4. **每个贡献都可回收**：listener、section、定时器全部挂到 `ctx.effect`，插件停止时自动清理。

即使你只写 npm 包插件，第 1、2、4 条也是通用的好习惯。

---

## 11. 附录

### A. 插件模板（复制即用）

```text
dsh-hello/
├── package.json          # 见 5.2，改 name/description 即可
├── cordis.patch.yml      # - insert: [{ id: hello, name: dsh-hello }]
├── index.mjs             # 见 5.4
├── client/index.mjs      # 见 7.1（不需要 UI 时可给最小骨架）
└── README.md
```

客户端最小骨架（不需要 UI 时也建议保留，保持两半结构完整）：

```js
window.__ModuleLoader__.load({
  id: 'dsh-hello',
  factory: () => {
    const exports = {}
    exports.inject = []
    exports.apply = function () {}
    return exports
  },
})
```

### B. 宿主端 API 速查表

```js
export async function apply(ctx) {
  ctx.provide('myService', { /* 方法 */ })            // 提供服务
  ctx.inject(['webServer'], (c) => c.webServer.register({ kind: 'exact', path, handler }))  // HTTP
  ctx.inject(['commands'], (c) => c.commands.register({ name, description, input, handler })) // /命令
  ctx.inject(['systemPrompt'], (c) => c.systemPrompt.section({ name, order, text }))  // 提示词
  ctx.inject(['tools'], (c) => c.tools.register(defineTool({ name, description, parameters, output, execute }))) // 工具
  ctx.get('agents')?.list()                           // 活动 Agent → agent.inject(msg)
  ctx.effect(() => 清理函数, '标签')                    // 副作用托管
  ctx.get('可选服务')                                  // 可选依赖（判空）
}

export const name = 'hello'
```

### C. 客户端 API 速查表

```js
window.__ModuleLoader__.load({
  id: '包名',
  factory: (require) => {
    const { jsx: h, jsxs: hs } = require('react/jsx-runtime')   // children 必须放 props.children
    const React = require('react')
    const ui = require('@deepseek-ai/dsh-client-ui-primitives')

    const inject = ['slots', 'locale']                          // 硬依赖的服务
    function apply(ctx) {
      ctx.effect(() => ctx.locale.register('ns', { zh: {...}, en: {...} }), 'tag')
      ctx.slots.inject('settings.section', () => ctx.slots.register({
        name: 'settings.section', id: '唯一id', order: 60, label: () => '栏目名',
      }, MyComponent))
    }
    const exports = {}; exports.apply = apply; exports.inject = inject
    return exports
  },
})
```

### D. 本机可读的参考资料

| 资料 | 位置 |
|---|---|
| 全栈插件范例（HTTP+命令+提示词+工具+设置页） | 本目录 `dsh-soul/`（重点看 `index.mjs` 与 `client/index.mjs`） |
| 纯客户端插件范例（会话 fork + 槽位） | 本目录 `dsh-rewind/`（README 含大量踩坑记录） |
| 工具+导出型插件范例 | 本目录 `dsh-share-page/` |
| 官方 DSH 启动器 / Profile / patch 机制说明 | `D:\DevTools\nvm\v24.18.1\node_modules\@deepseek-ai\dsh\README.zh.md` |
| 官方「动态 Cordis 插件开发」技能文档 | `…\@deepseek-ai\dsh\config\agent-presets\cordis\skills\cordis-plugin-development\SKILL.md` |
| 官方「组合配置编辑」技能文档（patch 语法、realm 规则） | `…\skills\editing-cordis-compositions\SKILL.md` |

### E. 开发清单（Checklist）

发布前逐项打勾：

- [ ] `package.json`：`name` / `version` / `main` / `dsh.bundle.patch` / `exports["./client"]` / `files` 齐全
- [ ] `cordis.patch.yml` 的 `name` 与包名一致，`id` 全小写且不与已有插件冲突
- [ ] 宿主端导出 `name` + `apply`；所有注册项都有清理路径（`ctx.effect`）
- [ ] 客户端没有 JSX / TS / `import`；children 都通过 `props.children` 传入
- [ ] 用了会话运行时能力（fork 等）→ `dsh.client.inject` 已声明 `@deepseek-ai/dsh-client-runtime`
- [ ] `dsh --profile web --dump-config` 能看到你的插件行
- [ ] `npm pack --dry-run` 的文件列表干净、无敏感信息
- [ ] 改源码后已重装（或已改 `link:`）并硬刷新浏览器

---

*本教程基于 DSH 0.1.x 生态与三个真实插件源码整理。插件 API 仍在演进中，遇到与本教程不符的行为，以你安装的 DSH 版本的运行时自省结果（`cordis_inspect_list`）与官方文档为准。*
