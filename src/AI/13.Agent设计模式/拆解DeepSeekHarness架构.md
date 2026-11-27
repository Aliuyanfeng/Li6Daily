---
date: 2026-10-30 10:00:00
title: 拆解 DeepSeek Harness：把 Agent 拆成一棵可替换的插件树
permalink: /pages/zcode02
categories:
  - AI
  - Agent设计模式
---

> **本文定位**
>
> 本文拆解 DeepSeek Harness（下称 DSH）的 Agent 架构。素材来自本地安装的 DSH 发行版**自带官方中文文档**（`docs/architecture.zh.md`、`docs/agent-lifecycle.zh.md`、`docs/tool-execution-pipeline.zh.md`、`docs/subsystems/tools.zh.md` 等），不是外部推测。
>
> 与 [拆解 ZCode](./拆解ZCode架构实现.md) 的关系：ZCode 用**一份极其严格的规范文档**约束"改工具要走完 12 道关"；DSH 用**插件化架构**让"每个部件都能被替换"。两种思路解决的是同一个问题——**如何让一个 Agent 长期演进而不腐化**——但答案很不一样。
>
> 一点说明：DSH 的文档体系有 **241 篇中文文档**，本文只挑架构主干。想深入某一块，文末给了入口。

## 一、一句话概括：没有内核的 Agent

DSH 的架构文档开头就给了一个非常明确的立场：

> [Cordis](cordis-primer.zh.md) 是 dsh 底层的框架：插件向共享上下文贡献服务、类型化事件和可逆的副作用。**产品的每一部分都是插件，包括模型适配器、工具注册表、会话日志，以及 agent loop（智能体循环）本身**，因此每个都可以从配置替换。
>
> **不存在需要打补丁的特权内核**：扩展 dsh 的方式是把插件挂载到其他插件旁边，而各项注册都是副作用，会在其插件卸载时撤销。

这句话值得反复读。大多数 coding agent 的架构是：

```text
┌─────────────────┐
│   固定内核       │  ← 想改这里，只能 fork 或者打补丁
│  agent loop     │
│  工具执行       │
│  会话管理       │
└─────────────────┘
        ↑
   插件只能挂在这里
```

DSH 是：

```text
┌──────────────────────────────────────────┐
│            Cordis 上下文（ctx）           │
│  ┌────────┐ ┌────────┐ ┌────────┐       │
│  │agent   │ │tools   │ │sessions│  ...  │
│  │loop    │ │        │ │        │       │
│  └────────┘ └────────┘ └────────┘       │
│       ↑ 全部是插件，全部可替换            │
└──────────────────────────────────────────┘
```

**连 agent loop 本身都是插件**（`ctx.agentLoop`）。这是本文所有其他设计的前提。

## 二、Cordis 的五个概念

要理解 DSH，先理解它依赖的框架。`docs/cordis-primer.zh.md` 把 Cordis 归纳为五条：

| 概念 | 含义 |
| --- | --- |
| **插件** | 实现 Service 的对象，可带 `inject` 与 `apply(ctx)` |
| **上下文** | 服务的容器；一个服务占据稳定的 `ctx.<key>`（如 `ctx.tools`） |
| **`inject`** | 声明依赖；插件等待依赖就绪才启动 |
| **类型化事件** | 用 TS 声明合并注册事件名，以五种模式分发 |
| **可逆副作用** | 注册通过 `ctx.effect()` / `ctx.on()` 安装，卸载时撤销 |

第三点特别值得注意：

> 插件声明所需的服务后，会等待这些服务就绪才启动；**加载顺序通过服务依赖表达，而非手动编排启动序列。**

这句话解决的是插件系统的经典难题：**初始化顺序**。你不写 `initDatabase(); initTools(); initAgent();`，而是声明"我需要 `ctx.tools`"，框架自己算顺序。

### 五种事件分发模式

这是 Cordis 机制里最有设计感的部分：

| 模式 | 是否 await | 分发顺序 | 有返回值 |
| --- | --- | --- | --- |
| `emit` | 否 | 按注册顺序观察 | 否 |
| `waterfall` | 否 | 按注册顺序观察 | **是** |
| `parallel` | 是 | 全部并行 | 否 |
| `serial` | 是 | 按注册顺序 | 是 |
| `bail` | 否 | 按注册顺序，碰到 bail 值即停 | 是 |

`waterfall` 是**环绕中间件**：

> 监听器接收 `(...args, next)`。调用 `next()` 会执行下游监听器；下游返回值通过 `next()` 返回当前包装层，可由该层包装后继续向外返回。**不调用 `next()` 直接返回则短路。**

配套的设计原则也写清楚了：

> 对于单决策事件，短路是设计意图。策略监听器在拥有决策权时可以**不调用 `next()` 直接返回**，而仅做标注或观察的监听器则必须委托。

**这两句话合起来定义了一套清晰的责任划分**：有权拒绝的人可以拦断，只做观察的人必须放行。这样权限系统、审计日志、遥测可以挂在同一条链上而不互相干扰。

## 三、Profile 与组合包：组装的层次

DSH 不是"一个配置"，而是**层层叠加出来的插件树**：

```text
起点：空条目列表
  ↓ 叠加 profile 中有序的组合包
  ↓ 叠加 profile 的 cordis.patch.yml
  ↓ 叠加 home patch
  ↓ 叠加 --patch overlay
最终：运行中的插件树
```

两个核心概念：

- **profile** —— 存放在 Harness home 中的具名组装，列出自己叠放的组合包
- **组合包（bundle）** —— Cordis 配置项及其挂载代码的分发格式，**插入的内容始终可被其上各层 patch**

随发行版交付的 profile 有五个：`web`、`headless`、`sdk`、`sdk-minimal`、`acp`。

它们的共享基础是 `dsh-base`：模型适配器、工具、持久化、沙箱与审批策略、设置、凭据、遥测。在此之上：

| profile | 增加什么 |
| --- | --- |
| `web` | 浏览器应用（`dsh-web-app`） |
| `headless` | 不带服务器的一次性运行器 |
| `sdk` | SDK JSON-RPC 服务器 |
| `acp` | 仅用于自动化的 ACP 服务器 |
| `sdk-minimal` | **刻意保留的例外**：不应用 `dsh-base`，拥有完整显式配置树 |

**`sdk-minimal` 这个例外很说明问题**：架构允许"不按默认路径来"，而不是逼所有人接受同一套基础。

调试手段也很直接：

```sh
dsh --profile web --dump-config
```

文档说得很硬气：

> 它打印出的任何条目，都可以由你自己的 patch 替换。

## 四、核心包与 ctx 键

DSH 的每个核心能力都占一个 `ctx` 键：

| 包 | 职责 | `ctx` 键 |
| --- | --- | --- |
| `core/session` | 仅追加的 `SessionEvent` 日志和内存存储 | `ctx.sessions` |
| `core/system-prompt` | 提示词片段与工具 schema 的组装 | `ctx.systemPrompt` |
| `core/tools` | 作用域化的工具注册表和带把关的执行流水线 | `ctx.tools` |
| `core/agent` | `Agent` 接口、活跃 agent 注册表和 `agent/*` 事件 | `ctx.agents` |
| `core/agent-loop` | 实现该接口的默认驱动器 | `ctx.agentLoop` |
| `core/scope` | 按 agent 划分作用域的注册原语 | 库，无 ctx 键 |
| `llm/llm` | 消息与流式词汇表，以及适配器 seam | `ctx.llm` |

注意 `core/agent` 和 `core/agent-loop` 是**分开的两个包**：一个定义接口，一个提供默认实现。这意味着**你可以换掉默认的 loop，而不用改任何调用方**。

## 五、能力接缝（Seam）：替换一个提供方，改变整个产品

这是 DSH 架构里我认为最有价值的思想。

### 什么是 seam

> 一个 **seam** 是一项可替换能力，包含三种角色：声明接口的 **Service Definition**、实现它的 **Service Provider**，以及使用它的 **Consumer**（通常是面向模型的工具）。
>
> 一个包可以合并承担多个角色，但**单一角色本身不是 seam**；添加一项能力意味着把三者一并设计。

### 它带来的效果

文档给了一个极好的例子：

> seam 正是替换一个提供方就能改变整个产品的原因。**文件系统与进程提供方共享同一个执行世界**，因此把它们指向远程沙箱，也就把 Bash、PTY 和 LSP 一并搬了过去，无需提供方专用 fork。

这句话点破了很多自研 agent 做远程执行时的痛点：如果你在 Bash 工具内部写死了"用本地 `child_process`"，那想支持远程沙箱就得改工具；而如果执行能力是一个 seam，**你只换 Provider，所有依赖它的工具自动跟着走**。

这和前面翻译的 [用稳定的接口扩展托管智能体](./用稳定的接口扩展托管智能体.md) 是同一个思路——那篇讲 Anthropic 怎么把 "大脑" 和 "手" 解耦；DSH 把它落到了插件系统的粒度上。

## 六、轮次流程：一个 turn 里发生了什么

DSH 文档用一段伪代码精确描述了循环。这是全文技术密度最高的一段：

```text
turn/start
  claim next-step input plus one queued message
  snapshot Session model selection; assemble prompt sections + step-admitted tool schemas
  -> agent/pre-step; project runtime context at fallback
                                     reject | enter(messages, startsRequestSeries?)
     reject, or a first enter rewritten empty -> close the turn with no step
     step/start
     agent/request -> prepareCall (cancellation commits neither system nor users)
     reconcile system/message using the prepared call capability
     append entered messages as user/message; reconcile retained runtime context
     log request/header and request/context as needed
     derive and freeze model history from the log
     stream the bound prepared call -> llm/stream -> agent/assistant-stream start
       agent/assistant-stream chunk*
       assistant/message | assistant/attempt -> agent/assistant-stream end
     tool/call* -> tools/pre-execute -> tools/execute -> tools/post-execute -> tool/result*
     step/end
     tools owe another request, or next-step input arrived -> claim -> next step
  -> agent/turn-stopping
turn/end
```

### 术语先说清

> 一个**步骤**是一次模型请求加上它调用的工具。一个**轮次**包含零个或多个步骤：它在领取首条输入之前打开，并在不再欠下任何工作时关闭。

**步骤（step）≠ 轮次（turn）**。一轮可能有很多步。这个区分很重要，因为后面所有"该在哪一层拦"的讨论都依赖它。

### 三个值得学的细节

**① 取消的原子性**

> `agent/request -> prepareCall`（**取消既不提交 system 也不提交 users**）

如果用户在 prepareCall 期间取消，系统提示词和用户消息都不会被写进日志。这避免了"日志里有半次请求"的脏数据。

**② 重试不重复副作用**

> 重试不重复组装或 `agent/pre-step`。

重试只是重新发请求，不会重新跑一遍上下文组装、不会重新跑一遍 input 拦截钩子。**副作用必须只发生一次。**

**③ 事件分两类**

> `turn/*`、`step/*`、`system/message`、`user/message`、`assistant/message`、`assistant/attempt` 和 `tool/*` 是**持久会话事件**；其余是分属三个事件域的**实时扩展点**。

这个划分贯穿全篇：

- **会话事件**：追加到日志、可回放、重载后仍在 → 用于持久事实
- **Agent 事件**（`agent/*`）：携带活跃 Agent，用于观察或拦截进行中的工作
- **能力事件**（`fs/*`、`tools/*`、`telemetry/*`）：不引入循环依赖地附加策略和适配器

**"模型可见即已记录"** 是这条设计的基石：

> 每个模型请求都必须能从日志重建。新增模型可见输入需要会话事件。

## 七、会话日志：模型上下文的唯一来源

> 会话日志是模型所见上下文的来源。`deriveMessages()` 从中投影出模型历史。

这句话的份量在于：**上下文不是"攒"出来的，是"推导"出来的**。你不维护一个 `messages[]` 数组一路 append，而是从事件日志重新推导。

好处是 fork、恢复、转录、遥测、持久化**全部从同一份事实派生**，不会出现"内存里的历史和磁盘上的历史不一致"。

### 一个真实的失败案例

文档里记录了一条很具体的取舍：

> 每个 `assistant/message` 都嵌入产生其组装内容的精确紧凑带时间 stream；`assistant/attempt` 保留已到达 settlement 的失败、重试、取消与 stream error attempt，且不添加模型历史。
>
> 如果进程在 settlement 前硬中断，则**不会留下持久 attempt stream**。

**"进程崩了，没结算的这次尝试就不留痕"** —— 这是有意的：留半条流比不留更危险，因为你无法判断它是否完整。

### 格式迁移的严格规则

> JSONL v0 使用 `session.jsonl[.zstd]`，v1 及后续版本使用小写 `session.vN.jsonl[.zstd]`；**已提交 generation 路径绝不重命名、替换或删除**。
>
> 每个相邻迁移包只负责一个 `vN -> vN+1` 步骤。

**只追加、每一代只升一级** —— 这让历史数据永远可读，也让迁移可以逐步验证。

## 八、工具定义：模型能看到什么，看不到什么

`docs/subsystems/tools.zh.md` 给出了 `ToolDefinition` 的完整定义。最关键的是这一句：

> 注册表的 `schemas()` 通过**显式允许列表**构建面向模型的 `ToolSchema[]`；`output`/`execute`/`projectContent`/`finalizeContent`/`timeoutMs`/`isConcurrencySafe`/`presentCall`/`presentResult` **绝不能泄漏到模型请求中**。

这和 [拆解 ZCode](./拆解ZCode架构实现.md) 里那个 `execute: undefined` 是同一个思想的两种实现：**用白名单，而不是黑名单**。黑名单的漏洞是"漏了一个"，白名单的漏洞是"忘了一个"——后者的失败方式是能力变弱，前者的失败方式是泄漏内部实现。

### 四个回调的职责边界

`ToolDefinition` 把"结果处理"拆成了四个阶段，边界划得非常清楚：

| 回调 | 时机 | 约束 |
| --- | --- | --- |
| `output.render` | 工具返回 JSON 值后 | 纯函数，把值投影成 ContentBlock |
| `projectContent` | `tools/post-execute` 之前 | 安装执行准备好的内容；策略替换仍然权威 |
| `finalizeContent` | **所有**归一化结果（含流水线失败） | **必须 total、不得抛异常** |
| `presentCall` / `presentResult` | UI 展示 | **纯函数、无副作用**（因为回放时也会调用） |

代码注释里那两句解释特别值得抄下来：

> /** 同步的最后一公里转换……该回调必须是 total 的，且不得抛出异常。 */

> /** 纯函数且无副作用：UI 可能在实时流式**以及**会话日志回放期间调用它，因此它只能依赖 `args`。 */

**第二句是关键**：UI 的展示函数会被回放调用，所以它不能依赖任何运行时状态。如果你在里面读了当前时间、读了全局变量，回放出来的界面就和当时看到的不一样了。

### timeoutMs 是"合作式预算"

这一条定义极有启发：

> 协作式工具调用超时预算（毫秒）。省略表示无截止时间。由 `@deepseek-ai/dsh-tool-call-timeout-policy`（一个 `tools/execute` 包装器）强制执行；**它永远不会发送给模型**——`schemas()` 只白名单 name/description/parameters。
>
> **声明它就等于承诺：此工具会把 `exec.signal` 转发给一个可在信号中止时达到静默的合作式实现。**

注意最后一句：**写 `timeoutMs` 不是"设置一个超时"，而是立一个契约**。如果你声明了超时却不转发 signal，那超时机制只是假装有效。

同一份代码注释里还留了一句很诚实的话：

> /** 执行器会通过 around-dispatch 的信号替换保留调用方取消的语义，并且不会放弃这个 promise，但它**无法硬杀同进程代码**。 */

**没法硬杀同进程代码** —— 这是 JS 运行时的事实，文档没有掩饰。

### 并发安全默认是关闭的

> /** 与兄弟工具调用重叠的纯同步分类器。**只有 `true` 才选择加入**；省略、抛异常、非 `true` 返回以及无效的 `defineTool` 参数都视为互斥。此元数据永不模型可见。 */

默认互斥、显式开启才并行——**这是并发设计中正确的默认值**。反过来的话，一个新工具作者只要忘了写判断，就会意外并发。

## 九、工具执行流水线：策略挂在哪里

`docs/tool-execution-pipeline.zh.md` 用一张流程图展示了完整管线。我把它压成线性的：

```text
模型产出 tool-call 块
   ↓
[写日志] tool/call            ← 执行之前先落盘
   ↓
[UI] 显示 pending 卡片
   ↓
tools/pre-execute 瀑布       ← hooks、权限、沙箱
   ├─ deny → 跳过工具体
   └─ ask  → ctx.approval 一次性询问
              ├─ 允许一次 → 继续
              └─ 拒绝/取消/无法回答 → 跳过
   ↓
已注册的单调守卫             ← deny 或弃权；身份受保护
   ↓
tools/execute 瀑布           ← 超时、重试、指标（环绕分发）
   ↓
工具 execute() 本体
   ├─ fs/write-intent 或 fs/edit-intent（文件工具专属闸门）
   └─ 工具自有会话事件（todo/write、fs/observed 等）
   ↓
projectContent               ← 安装执行准备好的内容
   ↓
tools/post-execute 瀑布      ← 接受、阻止、替换、追加上下文
   ↓
归一化                       ← 流水线/结果快照抛错 → isError
   ↓
finalizeContent              ← 最后一公里内容不变式
   ↓
[写日志] tools/result        ← 单一面向模型的结果
   ↓
[UI] 显示完成卡片；批次结算后注入 additionalContexts
```

### 三个设计要点

**① 日志先于执行**

`tool/call` 事件在**执行之前**就被记录。这意味着即使工具把进程搞崩了，日志里也知道"它曾经要执行什么"。

**② 策略与工具解耦**

文档的原话：

> 这样一来，钩子便可跨越不同工具系列，而无需让工具与某个策略服务耦合。

权限、沙箱、审计都挂在 `tools/pre-execute` 这个瀑布上，工具本体完全不知道它们存在。

**③ 守卫与瀑布的分工**

注意管线里有两个不同的东西：

- `tools/pre-execute` **瀑布**：可以 await、可以询问用户、可以异步
- **注册的单调守卫**：同步、只能 deny 或弃权

为什么分开？因为**守卫需要是不可重排序的**。文档说：

> `ctx.approval` 在单调守卫之前处理询问，而**不得重新排序**的所有者策略仍作为已注册的守卫。

问用户可以等（异步），但某些硬策略必须同步执行且顺序固定。

## 十、能力事件：不需要循环依赖的扩展点

`docs/architecture.zh.md` 提到三个事件域，其中第三个是：

> **能力事件**无需导入循环即可向某个 seam（`fs/*`、`tools/*`、`telemetry/*`）附加策略和适配器。

这个设计解决了一个很实际的问题：**工具需要知道文件系统操作发生了什么，但不能 import 文件系统模块**（否则就是循环依赖）。

用事件的话：`tool-fs` 监听 `fs/*` 事件来实现"先读后编辑"检查——

> 文件系统的先读后编辑检查位于 `tool-fs` 之下，通过 `fs/*` 事件实现。

**"你必须先读过文件才能编辑它"** 这条规则，不需要编辑器工具和读取工具互相知道对方。

## 十一、新行为该放哪：一张归属表

这是我见过的最实用的架构文档设计——DSH 直接给了一张表，回答"想加功能，该挂在哪"：

| 目标 | 机制 |
| --- | --- |
| 添加模型提供方 | 在 `ctx.llm` 上注册其适配器 |
| 添加面向模型的能力 | 在 `ctx.tools` 上注册；其 schema 加入提示词组装 |
| **让某个会话拥有不同的能力集合** | 组装一个 agent preset；服务行需 `isolate` realm |
| 添加 shell 执行 | 注册 `ctx.shell` 后端 |
| 添加持久化终端执行 | 注册 `ctx.terminals` 后端 |
| 添加用户命令 | 在 `ctx.commands` 上注册；**无需模型轮次**即可分派 |
| 管理后台任务 | 在 `ctx.jobs` 上注册；`job_*` 工具读取或停止 |
| 限制所启动的进程 | 使用 `ctx.sandbox` 后端；消费方在启动进程前包装 argv |
| 拦截请求、工具或轮次 | 使用相应 `agent/*` 或 `tools/*` 事件 |
| 添加模型可见上下文 | 调用 `agent.inject()`；落到下一次获准的请求中 |
| 添加持久会话状态 | 扩展 `SessionEventMap` |
| 将注册项限定到单个 agent | 使用该 agent 的 `agent.ctx` |

**这张表的价值在于它消灭了"这个功能该放哪"的争论**。而且它明确写了：

> 新行为附加到已有文档记录的扩展点。**改动循环本身时，本映射随之更新。**

## 十二、和 ZCode 对比：两种收敛路径

两篇拆解写下来，可以把两个 harness 的思路放在一起看：

| 维度 | ZCode | DSH |
| --- | --- | --- |
| 约束载体 | 一份 29 万字符的**规范文档** | **架构本身**（插件 + seam） |
| 如何防止腐化 | 改工具必须走完 12 环节清单 | 能力接缝让替换成本恒定 |
| 工具契约 | `ToolMetadata` 声明 + `toContracts()` 投影 | `ToolDefinition` + `schemas()` 白名单 |
| 副作用控制 | 外部 I/O 全部收敛到 port/adapter | 注册即副作用，卸载即撤销 |
| 扩展方式 | 沿既定链路修改 | 把插件挂到旁边 |
| 上下文来源 | Session Event → message history | Session Event → `deriveMessages()` |
| 循环可替换性 | 未强调 | **loop 本身是插件** |
| 适合场景 | 多端产品、强合规 | 可裁剪内核、按需组装 |

有意思的是，**两者对"模型能看到什么"给出了完全一致的答案**：

- ZCode：`toContracts()` 里 `execute: undefined`
- DSH：`schemas()` 显式白名单，`execute`/`output`/`timeoutMs` 等绝不外泄

**这大概不是巧合，而是"生产级 agent"的必然选择**：一旦模型能看到执行细节，它就会试图利用；而利用执行细节正是提示注入的攻击面。

## 十三、如果你要自己动手，能抄走什么

DSH 的架构对一个个人项目来说显然过重（241 篇文档、5 个 profile、Cordis 框架）。但它有几条判断可以直接搬：

**① 把"循环"和"接口"分开**

DSH 把 `core/agent`（接口）和 `core/agent-loop`（默认实现）拆成两个包。你哪怕只有 200 行代码，也可以让 `run_agent()` 是一个函数，而 `Agent` 是一个 Protocol/Interface。**换实现时不改调用方。**

**② 用白名单投影，而不是黑名单过滤**

```python
# ❌ 黑名单：哪天加了新字段就泄漏了
schema = {k: v for k, v in tool.items() if k not in ("execute", "handler")}

# ✅ 白名单：漏了只会让模型少看到一个字段
schema = {k: tool[k] for k in ("name", "description", "parameters")}
```

**失败的方向不同，后果差很远。**

**③ 把"事件"当扩展点，不要靠 import**

想让"必须先读后写"这条规则生效，不需要让写工具知道读工具的存在。定义一个 `fs/before-write` 事件，谁关心谁监听。

**④ 超时是契约，不是配置**

如果你声明了 `timeout=30s` 却不把取消信号传给下游，那这 30 秒只是让调用方白等。**要么真能取消，要么别声明。**

## 十四、三条总结

**其一，可替换性是长期可维护的唯一解。**
不是"设计得好看"，而是**替换成本恒定**。DSH 换一个文件系统提供方，Bash/PTY/LSP 全部跟着走——因为它们是同一个 seam 的消费者。

**其二，默认要安全。**
并发默认关闭、`schemas()` 用白名单、`ask` 无法回答时默认 deny、迁移只追加不删改。**每一条都把"出错"导向可恢复的方向。**

**其三，文档即架构。**
ZCode 用文档约束行为，DSH 让文档成为架构的一部分（那张"新行为放哪"的表、`--dump-config` 能打出所有可替换条目）。**当文档能回答"我该改哪里"，架构才真正可演进。**

---

> **延伸阅读**
>
> - 姊妹篇：[拆解 ZCode：一个生产级 Coding Agent Harness 的架构实现](./拆解ZCode架构实现.md)
> - 设计模式层：[构建高效的 AI 智能体](./构建高效的AI智能体.md)
> - 长期运行的服务化：[用稳定的接口扩展托管智能体](./用稳定的接口扩展托管智能体.md)
> - 从零手写最小 agent：[从能调到能上线](../12.Agent工程化/Agent工程化六周实战.md)
>
> **来源说明**：本文引用的架构表述与代码片段，均取自 DSH 发行版自带的中文文档：`docs/architecture.zh.md`（架构总览与轮次流程）、`docs/cordis-primer.zh.md`（Cordis 五概念与事件分发模式）、`docs/agent-lifecycle.zh.md`（轮次/步骤时序）、`docs/tool-execution-pipeline.zh.md`（工具执行流水线）、`docs/subsystems/tools.zh.md`（`ToolDefinition` 完整定义）。文档随发行版附带，实现可能随版本演进。