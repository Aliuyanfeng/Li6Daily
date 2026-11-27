---
date: 2026-10-27 10:00:00
lastUpdated: 2026-10-30
title: 拆解 ZCode：一个生产级 Coding Agent Harness 的架构实现
permalink: /pages/zcode01
categories:
  - AI
  - Agent设计模式
---

> **本文定位**
>
> 本文是对智谱开源仓库 [zai-org/ZCode](https://github.com/zai-org/ZCode) 中 **Agent CLI 部分**的架构拆解。素材来自该仓库的公开文档与源码（`apps/zcode-cli/`），不涉及未公开实现。
>
> 阅读前提：了解 Agent Loop 的基本形态（思考 → 调用工具 → 观察结果）。如果还不熟，先看 [构建高效的 AI 智能体](./构建高效的AI智能体.md) 与 [从能调到能上线](../12.Agent工程化/Agent工程化六周实战.md)。
>
> **一条重要说明**：ZCode 是完整的 AI 编程工作台（含桌面端、Web、后端服务），本文只拆它的 **Agent 内核**。那份内核的价值在于——它把"手搓一个 coding agent"过程中会遇到的所有工程问题，用可复用的结构回答了。

## 一、先看结论：这个 harness 的六个关键决策

如果一个团队要从零写 coding agent，最该先看的不是它的功能列表，而是它的**架构约束**。ZCode 在 `apps/zcode-cli/AGENTS.md` 里写死了六条：

| # | 决策 | 一句话含义 |
| --- | --- | --- |
| 1 | **长程任务优先** | 不用 tool call 次数做硬停止，靠 token/context limit、取消、超时、权限拒绝收口 |
| 2 | **外部 I/O 全部收敛到 port/adapter** | 业务模块禁止直接调 `fs`、`fetch`、`child_process`、`process.env` |
| 3 | **tool 声明即契约** | `inputSchema`、`sideEffectScope`、`readOnly`、`needsApproval` 等由权限、调度、UI 共同消费 |
| 4 | **大结果不回灌模型** | 走 `resultBudget`、摘要、artifact，只把摘要和引用交给模型 |
| 5 | **`traceId` 贯穿一切** | 无法关联 trace 的行为被视为"不可观测"，应避免引入 |
| 6 | **错误是一等对象** | 默认向上冒泡，底层不 `process.exit`，不用错误文本做流程判断 |

这六条不是口号，后面每一节都会落到具体代码和文档位置上。

### 一个反直觉的事实：它不依赖 Agent 框架

`apps/zcode-cli/packages/core/package.json` 的依赖里，只有 `@zcode/contracts` 这类**同仓库内部包**，没有 LangChain、没有 LlamaIndex、也没有任何第三方 Agent SDK。

整个 `apps/zcode-cli` 的 `dependencies` 只有两个：`dotenv` 和 `proxy-agent`。

这和你在 [Agent 工程化六周实战](../12.Agent工程化/Agent工程化六周实战.md) 里读到的那条判断一致：**框架的价值是省掉样板，代价是遮住底层。** 一个要长期维护、要接多种 provider、要做权限和审计的 harness，样板必须自己掌控。

## 二、分层：五个 package 各管什么

`apps/zcode-cli` 是一个 turbo monorepo。抛开 TUI 和打包，Agent 内核的分层是：

```text
┌─────────────────────────────────────────────────┐
│  runner / bootstrap   进程入口、模型工厂、装配     │
└─────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────┐
│  core       Agent Loop、Tool Registry、          │
│             Executor、Permission、Scheduler      │
│             —— 只表达"意图"，不碰外部世界        │
└─────────────────────────────────────────────────┘
              ↓ 依赖接口（Port）
┌─────────────────────────────────────────────────┐
│  contracts  Port 接口 + Zod runtime schema       │
│             + 事件定义 + 模型契约                 │
└─────────────────────────────────────────────────┘
              ↑ 实现接口
┌─────────────────────────────────────────────────┐
│  adapters   fs / exec / http / storage / mcp     │
│             —— 所有副作用在这里落地               │
└─────────────────────────────────────────────────┘
```

**关键设计**：`core` 依赖 `contracts`（接口），`adapters` 实现 `contracts`。于是 `core` 完全不知道文件系统是本地磁盘还是远程沙箱，也不知道 HTTP 走的是哪个 provider。

这条边界在 `types.ts` 里体现得最直接——它从 `@zcode/contracts` 导入了 **50 多个 Port**：

```typescript
import type {
  FileSystemPort,        // 文件读写
  HttpClientPort,        // 网络请求
  ExecutionPort,         // 子进程执行
  SessionStorePort,      // 会话持久化
  ToolArtifactStorePort, // 大结果落盘
  ModelCatalogPort,      // 模型目录
  BrowserControlPort,    // 浏览器控制
  ...
} from "@zcode/contracts";
```

> **对你的启示**：哪怕你只写 200 行的小 agent，也值得把"读文件""跑命令"抽成一个接口。它带来的不是抽象优雅，而是**可测试性**——你可以在没有真实文件系统的情况下测完整个 loop。

## 三、Tool 声明：整个 harness 的契约中心

这是 ZCode 架构里最值得学的一块。

### ToolMetadata 到底声明了什么

`packages/core/src/tool/types.ts` 里定义了 `ToolMetadata`。摘出核心字段：

```typescript
export interface ToolMetadata {
  name: string;
  description?: string;
  modelInstructions?: readonly string[];   // 结构化使用规则
  readOnly: boolean;                       // 只读？
  destructive: boolean;                    // 是否破坏性？
  concurrentSafe: boolean;                 // 能否并发？
  requiresUserInteraction?: boolean;       // 是否要问用户？
  timeoutMs?: number;
  maxOutputBytes?: number;
  sideEffectScope: ModelToolSideEffectScope; // 副作用范围
  riskLevel: RiskLevel;
  needsApproval: boolean;
  providerVisible?: boolean;
  stopTurnOnSuccess?: boolean;             // 成功即终止 turn
}
```

这些字段不是文档约定，而是**被代码共同消费的运行时契约**。看它们的消费方：

| 字段 | 谁读它 | 用来做什么 |
| --- | --- | --- |
| `readOnly` / `destructive` | 权限系统 | 决定要不要审批 |
| `concurrentSafe` | Scheduler | 决定能否与其他 tool 并行 |
| `sideEffectScope` | 权限 + 沙箱 | 决定副作用边界在哪 |
| `maxOutputBytes` | Executor | 决定结果截断阈值 |
| `timeoutMs` | Executor | 决定超时 |
| `stopTurnOnSuccess` | Executor | 决定成功后是否结束 turn |
| `needsApproval` | 权限系统 | 是否强制确认 |

文档里那句总结很到位：

> **不要只注册 handler；tool 声明是权限、调度、prompt、adapter、executor、UI 和测试共同消费的契约。**

### toContracts()：把内部声明投影成模型可见契约

`registry.ts` 只有 147 行，但 `toContracts()` 这个方法是整个设计的关键：

```typescript
toContracts(): ModelToolContract[] {
  return Array.from(this.tools.values())
    .filter((entry) => entry.metadata.providerVisible !== false)
    .map((entry) => ({
      name: entry.metadata.name,
      description: toolDescriptionForProvider(entry.metadata),
      capability: entry.capability,
      executionMode: entry.executionMode,
      providerNative: entry.providerNative,
      inputSchema: entry.inputSchema,
      outputSchema: entry.outputSchema,
      readOnly: entry.metadata.readOnly,
      destructive: entry.metadata.destructive,
      concurrentSafe: entry.metadata.concurrentSafe,
      needsApproval: entry.metadata.needsApproval,
      sideEffectScope: entry.metadata.sideEffectScope,
      permission: entry.permission,
      resultBudget: entry.resultBudget,
      execute: undefined,          // ← 注意这一行
    }));
}
```

最后那行 `execute: undefined` 值得单独说：**执行函数被显式剔除了**。模型层只能看到"这个工具存在、叫什么、要什么参数、有什么风险"，永远拿不到执行句柄。

这就是前面翻译的 [用稳定的接口扩展托管智能体](./用稳定的接口扩展托管智能体.md) 里"大脑与手解耦"在一个更细粒度上的体现——**模型是决策者，代码是执行者**，而且这个分工在数据结构层面就被固定了。

### 描述拼接：modelInstructions 怎么变成模型可见文本

```typescript
function toolDescriptionForProvider(metadata: ToolMetadata): string | undefined {
  const description = metadata.description;
  const instructions = metadata.modelInstructions?.map((l) => l.trim()).filter(Boolean) ?? [];
  if (instructions.length === 0) return description;

  const usage = ["Usage:", ...instructions.map((i) => `- ${i}`)].join("\n");
  return description && description.length > 0 ? `${description}\n\n${usage}` : usage;
}
```

`modelInstructions` 是结构化的规则数组，最后被拼成 `Usage:` 列表。**好处是规则可以用代码生成、可以按能力条件化，而不是手写一大段 prompt 字符串。**

同一份 spec 还明确了一条容易被违反的规则：

> ZCode 不在 system prompt 中镜像普通 tool 列表、运行态元数据或 tool 使用规则；这些信息必须随 model request 的 `tools` 数组进入 provider。

**理由很实在**：如果 system prompt 里也写一份工具说明，两份说明一旦不同步，模型就会按错误的那份行事。**同一个事实只允许有一个来源。**

## 四、端到端链路：改一个 tool 要经过 12 道关

这是整份文档最有价值的部分。ZCode 把"改一个 tool"定义成一条 12 环节的链路——从设计文档一直到可观测性。

```text
 1. 设计文档        docs/design/v2/tool/*.md
 2. Contracts 层    Zod runtime schema + Port 接口
 3. Core Tool 声明  ToolEntry / registry
 4. System Prompt   模型可见工具说明
 5. Model Request   映射成 provider function tool
 6. 权限/Hook/Mode  审批、拦截、调度
 7. Executor/Handler 受控执行
 8. I/O Adapter     跨平台边界
 9. 结果序列化      预算与 artifact
10. Session Event   持久化、resume、compact
11. TUI/Debug       可观测性
12. 配置/兼容       能力与扩展
```

每一环都有明确的核对项。挑几个对我们写 agent 最有普适价值的：

### 第 2 环：Zod 是唯一 schema 源

> Zod runtime schema 是内置 tool 的唯一 schema 源；JSON Schema 通过统一 helper 派生。

**为什么重要**：如果 TS 类型和 JSON Schema 各写一份，它们必然会漂移。用一份 Zod 同时产出运行时校验和给模型看的 JSON Schema，才不会有"模型按 A 生成、代码按 B 校验"的断层。

### 第 6 环：权限在 executor 之前，不依赖调用点猜测

> 权限、调度和审批读取 tool 声明，不依赖调用点临时猜测。

这条排除了一个常见错误做法：在 handler 内部写 `if (toolName === 'rm') { 问用户 }`。ZCode 的做法是让权限系统**读声明**——`destructive: true` 加 `needsApproval: true` 就会自动触发审批，无论它叫什么名字。

### 第 6 环的一个精妙设计：Hook 与用户其实在"竞速"

> `PermissionRequest` hook 与交互 broker 是并发竞速关系：broker 应答通道必须在确认窗可见后立即建立，hook 卡死/失败只令其退赛，**不得阻塞用户应答，也不得转成 deny**。

这个细节很真实：如果串行执行——先跑 hook 再弹窗——那 hook 卡住时用户就永远等不到对话框。做成竞速，谁先给出结论谁生效。

### 第 7 环：handler 只表达意图

> handler 只表达业务意图；外部 I/O 走 port/adapter。

以及错误处理的边界：

> handler 在既有执行过程中发现可预期的 tool-specific 失败时返回稳定 `errorCode + message`；executor 通用组装结构化 error……**状态竞态、I/O 故障和取消仍走异常路径；不要为了消除所有 `throw` 而把不可预期故障伪装成业务拒绝。**

这条对"该用返回值还是抛异常"给出了清晰判据：**可预期的失败是返回值，不可预期的故障是异常。**

### 第 9 环：大结果不回灌

> 大输出写 artifact 后，tool result event 是否包含 uri/path、原始大小、返回大小、truncated、budgetStrategy。

还有一个容易踩的坑，它专门写出来了：

> 如果 tool result 需要把图片/PDF 等媒体回传给模型，provider-visible tool result 必须保留结构化 content block……**不能把媒体结果压成 JSON 字符串后再发给模型，也不能把 base64 作为普通 tool output 文本持久化。**

## 五、长程任务：为什么不能用"最多 20 轮"当护栏

你文章第五章里我写过"最大循环次数"是护栏之一。ZCode 的做法更进了一步——**它明确反对用轮次做硬停止**：

> 长程任务优先：核心 agent loop 默认面向可持续运行的复杂任务设计，**不用 tool call 次数做硬停止**。资源与安全边界应由 token/context limit 自动 compact、用户取消、权限拒绝、工具超时、输出截断、provider retry 上限等明确条件承担。

这个判断是对的。轮次上限的问题在于它**和任务复杂度无关**：一个需要 40 步的重构，和 40 次无效重试，看起来一样。

**真正该管的不是"跑了几轮"，而是"资源有没有失控"**：

| 维度 | 用什么收口 |
| --- | --- |
| 上下文长度 | token/context limit + 自动 compact |
| 成本 | 同上（token 即成本） |
| 时间 | 单工具超时 + 用户取消 |
| 安全性 | 权限拒绝 |
| 输出膨胀 | 结果截断 + artifact |
| 模型服务 | provider retry 上限 |

这六条每一条都对应一个**真实的物理约束**，而"20 轮"只是拍脑袋。

### 中途插话怎么处理

还有一个长程任务特有的问题：用户在 agent 干活时想插话。ZCode 的处理是：

> 运行中立即发送：抢占 Core 前台执行后，输入作为普通用户消息开启新 turn，不带 `user_steer`，**不并入已发出的 tool_result**；工具取消、结果配对、审批、队列提升与执行轮边界不变。

**关键约束是"不并入已发出的 tool_result"**——一旦 tool_result 已经发给模型，再往里塞用户消息会破坏 provider 要求的一问一答配对结构。

## 六、特殊 Tool 类型：真实世界的复杂度在这里

内置工具够用之后，你会发现真实需求分成了好几类。ZCode 把它们拆成六类，每类有独立的检查清单：

| 类型 | 例子 | 特殊之处 |
| --- | --- | --- |
| **Client-side tool** | 普通内置工具 | 由本进程 Executor 执行 |
| **Provider-native / server-side** | WebSearch | 由模型服务执行，本地只做投影 |
| **User-interaction tool** | AskUserQuestion | 需要人回答，不能写死在某个前端 |
| **Background / long-running** | 后台 subagent、后台 Bash | 有独立的生命周期和通知 |
| **Session-state tool** | Todo、CronCreate | 只改会话状态，不改工作区 |
| **Discovery-backed instruction** | Skill | 按需发现和加载 |

几个特别值得注意的点：

### Provider-native 工具的"双重身份"

> WebSearch 当前目标采用 side request 形态：主 loop 注册普通 `WebSearch` client-side tool；`web_search` provider-native contract 只在 `WebSearch` handler 内部 request 中出现。

这个设计很聪明：**对外它是个普通工具**（走完整的 Executor、权限、hook、resultBudget），**对内它借用 provider 的服务端搜索能力**。这样既享受了服务端搜索的效果，又不失本地权限控制。

同时还写了两个坑：

> - Anthropic-compatible 不等于 Anthropic-native；WebSearch 只能对已确认支持服务端搜索的 Anthropic baseURL host 单独 allowlist。
> - 恢复或新增直接暴露的 provider-native tool 时，必须确认它没有被 built-in registry 注册成同名 client-side tool，否则 `toContracts()` 会优先生成普通 function tool，adapter 不会进入 provider-native helper 分支。

**第一条对做国产模型适配的人特别有用**：很多厂商号称"Anthropic 兼容"，但兼容的是**消息格式**，不等于支持**服务端工具的语义**。

### session-state 工具的误用

> `readOnly` 只用于不会改变 session/workspace/system/network 状态的检查型 tool。会写入 session 状态的 tool 应声明 `sideEffectScope: "session"`……
> **不要为了免审批把 session mutation 标成 read-only。**

这句几乎是所有自研 agent 都会犯的错——为了让某个工具不问用户，把它标成只读。ZCode 直接禁止。

还有一条对"自主完成目标"很有警示：

> 用于完成 long-running target/goal 的 session-state tool 必须把"计划、todo、checklist、阶段完成、预算耗尽或停止工作**不是**完成证据"写进模型可见描述。

**"我把 todo 都打勾了"不等于"任务完成了"。**

### Background 工具的恢复陷阱

> 重臂 dwf run 时 `registerRuntimeBackgroundTask` 必须复位既有条目的**终态结算面**（notified / error / completedAt / exitCode / resultText / pid）而保留**身份面**（agentId / agentType / parentToolCallId / turnId / description / startedAt）。
> 根因：同进程 cancel 终态 → 未重启即 resume 时，残留的 `notified: true` 会让 `claimRuntimeBackgroundTaskNotification` 拒收，恢复 run 的终态模型通知被吞。

这是一个真实的 bug 记录：**取消后没重启就恢复，因为残留的 `notified: true` 标记，导致恢复后的完成通知被丢弃。** 解法是把"身份"和"结算状态"分开——身份要留，结算要清。

## 七、可观测性：traceId 是最高层级

ZCode 对 trace 的要求非常严格：

> 所有任务执行都必须携带可传播的 `traceId`。`traceId` 默认对应一次顶层 session 的完整任务链，session 内创建的子 session、subagent、重试任务、后台队列任务和异步 I/O 都应归属到同一个 `traceId`。

标识符的层级关系也定义清楚了：

```text
traceId                       一次完整任务链
  └── sessionId               会话
       └── turnId             一轮对话
            └── messageId     消息
                 └── toolCallId   工具调用
                      └── spanId  执行跨度
                           └── parentSpanId
```

外加一条硬约束：

> 任何异步任务、工具调用、外部 I/O、跨模块调用或子 session，如果无法关联到 `traceId`，都视为**不可观测行为，应避免引入**。

对 trace 的埋点位置也做了限制：

> Tool Agent Trace 统一在单调用 Executor 外层建立，handler 不单独埋点……Scope 必须覆盖 validation、hook、permission、handler、serialization 和结果预算全链路；**不为 streaming progress、background polling 或单条 output chunk 建 Span**。

**前半句保证"不会漏"，后半句保证"不会爆"。** 这两者都要才行——只在 handler 埋点会漏掉权限和序列化；对每个 chunk 都建 Span 会把 trace 系统压垮。

## 八、通用编译器：能力条件化的 schema

这一节是我认为整份文档里**最精妙的设计**，值得单独讲。

问题背景：某些 tool 的字段只对**部分模型能力**开放。比如 Read 工具，当模型支持 PDF 时才有 `pages` 参数。

朴素做法是两处都判断 `if (supportsPdf)`。但那会产生一种极难排查的故障：

> 禁止只修改 `getTools()` 返回的 descriptor，而让 executor 继续使用 registry 中的静态 schema；这会产生"**模型可生成、运行时必拒绝**"的断层。

ZCode 的做法是强制**同源**：

```text
       current turn model capability
                  │
      ┌───────────┼───────────┐
      ▼           ▼           ▼
provider tool   executor    handler
descriptor      ToolEntry   capability
/ JSON Schema   / Schema    branch
```

三者必须来自**同一份当前 turn 的能力快照**。还补充了三个细节：

- `false` / `undefined` 的能力值**不得回退到旧 session model**（否则 subagent 借用父模型时会串味）
- 动态 schema 解析**只能改变 provider/validation contract**，不得复制 handler、权限、hook、trace 生命周期
- `pages` 分支还要**独立检查 `supportsImages`**，因为"原生 PDF"和"页面图片"是两个能力

最后这条特别真实——很多人会把"能读 PDF"和"能看图片"当成一回事，实际是两套能力。

## 九、把 ZCode 的架构折成你的最小实现

看完这些，你可能会觉得"架构太重了"。但要注意：**ZCode 面对的是一个有桌面端、Web 端、多 provider、多用户、插件市场的产品**。你做个人用的 coding agent，需要的只是它的**判断**，不是它的**规模**。

我把它折成一张对照表：

| ZCode 的做法 | 你一个人的项目该怎么办 |
| --- | --- |
| 50+ 个 Port 接口 | 抽 3 个就够：`fs`、`exec`、`llm` |
| Zod + JSON Schema 双产出 | 直接用 Zod 的 `zodToJsonSchema` 一份搞定 |
| 12 环节端到端链路 | 记住 4 条：schema 同源、权限读声明、结果要截断、错误别吞 |
| 6 类特殊 tool | 先只做 client-side，遇到需求再拆 |
| traceId + span 全链路 | 先给每次 tool 调用打一行结构化日志（含 duration、成功/失败） |
| 权限 Hook 竞速 | 先做"危险命令列表 + 人工确认" |

**最小可用版本的骨架**，其实就是 ZCode 那 12 环里最核心的 4 环：

```python
def run_tool_call(tool_call, ctx):
    # 2. 校验：schema 与模型看到的是同一份
    entry = registry.get(tool_call.name)
    if entry is None:
        return tool_error("unknown tool")

    args = entry.input_schema.validate_json(tool_call.arguments)

    # 6. 权限：读声明，不猜工具名
    if entry.destructive or entry.needs_approval:
        if not ask_user(entry.name, args):
            return tool_error("rejected by user")

    # 7+8. 执行：handler 只表达意图，I/O 走 port
    try:
        raw = entry.handler(args, ctx.ports)
    except Exception as e:
        return tool_error(f"{type(e).__name__}: {e}")

    # 9. 结果：超限落盘，只回摘要
    return budget.apply(raw, entry.max_output_bytes)
```

**这 20 行里，每一段都对应 ZCode 一条明确的架构约束。** 剩下的都是规模问题，可以按需长出来。

## 十、这份拆解最值得带走的三条

**其一，声明比实现重要。**
`ToolMetadata` 那些字段之所以存在，是因为权限、调度、UI、测试都需要它们。你在写第一个工具时就想清楚"它只读吗、会有副作用吗、要不要审批"，比事后打补丁容易得多。

**其二，同一份事实只能有一个来源。**

- schema 只有 Zod 一份（JSON Schema 派生）
- 工具说明只进 `tools` 数组，不镜像到 system prompt
- 能力判断只有当前 turn 快照一份

这三条共同防的是同一类 bug：**两份数据不一致时，系统会按错误的那份行动。**

**其三，把"不可观测"当成设计禁忌。**
ZCode 那句"无法关联 trace 的行为应避免引入"很硬。对个人项目，它的轻量版是：**每引入一个新组件，先问它怎么被观测到**。答不上来就先别加。

---

> **延伸阅读**
>
> - 本文拆的是**基础设施层**。上层的设计模式与"何时该用 agent"，见 [构建高效的 AI 智能体](./构建高效的AI智能体.md)。
> - 如果把 harness 当作一个长期运行的服务来设计，见 [用稳定的接口扩展托管智能体](./用稳定的接口扩展托管智能体.md)。
> - 从零手写一个最小 agent 的六周路径，见 [从能调到能上线](../12.Agent工程化/Agent工程化六周实战.md)。
>
> **来源说明**：本文引用的架构约束与规范原文，均来自 `zai-org/ZCode` 仓库的 `apps/zcode-cli/AGENTS.md` 与 `apps/zcode-cli/docs/design/v2/tool/00-tool-change-chain.md`；`ToolMetadata`、`toContracts()` 的代码片段来自 `apps/zcode-cli/packages/core/src/tool/types.ts` 与 `registry.ts`。仓库版本以 ZCode v4.0.0 为参照，实现可能随仓库演进而变化。