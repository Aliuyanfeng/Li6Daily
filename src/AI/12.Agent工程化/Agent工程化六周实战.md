---
date: 2026-10-20 10:00:00
lastUpdated: 2026-10-30
title: 从能调到能上线——六周把大模型变成生产级 Agent
permalink: /pages/agent6w
categories:
  - AI
  - Agent工程化
---

# 从能调到能上线：六周把大模型变成生产级 Agent

> 这是一条从「会调 API」到「能交付系统」的完整路线。每一章对应一周，都有一个可运行的小项目、一组踩过的坑，以及一条可复用的工程原则。
> 系列代码以 Python 为主，模型接口以 OpenAI 兼容协议为基准（DeepSeek、通义、智谱、火山等国内模型基本都可直接对接）。

## 一、引言：能调用，和能上线，差着六周的距离

### 1.1 一个每个人都经历过的落差

第一次调通大模型 API，通常只要十分钟：

```python
from openai import OpenAI

client = OpenAI(api_key="sk-xxx", base_url="https://api.deepseek.com")
resp = client.chat.completions.create(
    model="deepseek-chat",
    messages=[{"role": "user", "content": "用一句话解释什么是 RAG"}],
)
print(resp.choices[0].message.content)
```

十分钟之后，你会产生一个错觉：**我已经会用大模型了**。

然后你开始做一个真实的产品需求，落差立刻出现：

| 你想要的 | 实际遇到的 |
| --- | --- |
| 返回结构化数据 | 模型返回了一段「当然可以！这是您要的 JSON：```json...```」 |
| 记住上一轮说的话 | 每次调用都像失忆，因为它本来就是无状态的 |
| 帮用户真的把文件删掉 | 模型只能输出文字，它没有手 |
| 回答公司内部的问题 | 它一本正经地编造了一个不存在的制度条款 |
| 自己拆解任务、多步完成 | 一次调用只能回答一个问题 |
| 让同事也能用 | 代码在本地开着终端，笔记本一合就没了 |

这六件事，恰好对应六周。

### 1.2 贯穿全篇的一条主线

所有工程手段，本质上都在解决同一个矛盾：**大模型是概率性的，而生产系统要求确定性**。

同一条 Prompt，今天答得好，明天可能答歪；同一个任务，这次三步完成，下次绕了八步。你没法用「上次跑通了」来证明它可靠。

于是整条路线的核心心法只有一句话：

> **确定性的部分交给代码，概率性的部分交给模型。**

这句话会在每一章里反复出现，每次的形态不同：

| 周 | 概率性在哪 | 用代码怎么收住 |
| --- | --- | --- |
| 1 | 输出格式自由 | JSON Schema + 校验重试 |
| 2 | 忘了说过什么 | 消息历史由代码管理，不由模型记忆 |
| 3 | 可能调错工具 | 参数校验 + 权限白名单 + 高危确认 |
| 4 | 可能编造事实 | 检索注入事实，Prompt 约束拒答 |
| 5 | 可能停不下来 | 最大轮次 + 成本阈值 + 终止条件 |
| 6 | 可能崩、可能泄露 Key | 服务化 + 环境变量 + 健康检查 |

### 1.3 六周的路线图

```text
第 1 周  能读  ── 单次调用 · 流式输出 · 结构化输出 · 异常处理
              ↓
第 2 周  能聊  ── 多轮对话 · 上下文窗口 · 记忆分层与持久化
              ↓
第 3 周  能做  ── 工具调用 · Schema 设计 · 权限边界 · MCP
              ↓
第 4 周  能记  ── RAG 知识库 · 切块检索 · 知识治理
              ↓
第 5 周  自主  ── Agent Loop · 规划执行观察 · 护栏 · 多 Agent
              ↓
第 6 周  上线  ── FastAPI 服务化 · 流式响应 · 云端部署 · 安全
```

每一周都不是下一周的前置依赖的「理论课」，而是一个能独立跑起来的小工具。**建议每一周结束时都让它真正跑一次**——哪怕只是个命令行脚本。

### 1.4 读完能带走什么

- 六个可运行的最小项目，代码结构可以直接改进自己的项目
- 一套判断标准：什么时候该用代码兜底，什么时候该相信模型
- 一张成本地图：钱花在哪、怎么会失控
- 一条上线 checklist，以及「完成」的重新定义

---

> **系列导航**：本文是六周路线的总纲与逐周详解。站内其他文章可作为配套参考——采样参数见 [Temperature、Top-p 与 Top-K](../07.采样参数/Temperature与Top-p与Top-K.md)，向量相似度原理见 [点积、模长、余弦相似度](../09.向量基础/点积-模长-余弦相似度.md)，Agent 运行模式谱系见 [Agent 的运行模式](../03.Agent/Agent的概念.md)，工具协议标准见 [MCP 协议详解](../04.MCP/MCP协议.md)。
>
> **读完本文想再往深处走**，站内有一组按"理论 → 架构"递进的材料：
>
> | 阶段 | 文章 | 讲什么 |
> | --- | --- | --- |
> | 设计模式 | [构建高效的 AI 智能体](../13.Agent设计模式/构建高效的AI智能体.md) | Anthropic 官方：五种工作流模式与何时才该用 agent |
> | 服务化 | [用稳定的接口扩展托管智能体](../13.Agent设计模式/用稳定的接口扩展托管智能体.md) | Anthropic 官方：如何把 agent 承载在长期运行的基础设施上 |
> | 工业实现（一） | [拆解 ZCode 架构实现](../13.Agent设计模式/拆解ZCode架构实现.md) | 用严格规范约束"改一个工具要走完哪 12 道关" |
> | 工业实现（二） | [拆解 DeepSeek Harness 架构](../13.Agent设计模式/拆解DeepSeekHarness架构.md) | 用插件化与能力接缝让"每个部件都可替换" |

## 二、第一周：能读——单次调用到底发生了什么

### 2.1 先把黑盒拆开：Next Token Prediction

大模型做的事，抽象到极致只有一件：**给定前面的文本，预测下一个 Token 的概率分布**。

这句话能解释你后面会遇到的所有「怪现象」：

**① 为什么流式输出是天然的**
模型本来就是一个一个往外吐 Token 的。非流式接口只是把吐出来的结果攒齐了一次性返回。所以流式不是「额外功能」，而是**更接近它本来工作方式**的用法。

**② 为什么有温度（Temperature）**
既然输出是概率分布，那就要有个东西决定「怎么采样」。温度低，偏向高概率词，输出稳定但死板；温度高，分布被拉平，有创意但容易跑偏。具体参数怎么调见 [Temperature、Top-p 与 Top-K](../07.采样参数/Temperature与Top-p与Top-K.md)，这里只记一条工程结论：**做数据抽取、格式转换这类任务，温度压到接近 0。**

**③ 为什么会幻觉**
模型在预测「下一个最像的 Token」，不是在「查证」。当上下文里没有答案时，它不会说「我不知道」，而是会生成一个**看起来最像答案**的文本。幻觉不是 bug，是它的工作原理在信息缺失时的自然结果。这就是第四周要引入 RAG 的根本原因。

**④ 为什么按 Token 计费**
因为计算量确实随 Token 数增长。输入和输出都算钱，而输出通常比输入贵。

### 2.2 最小可用调用：把该处理的异常都处理掉

```python
import time
from openai import OpenAI, APIError, APIConnectionError, RateLimitError, AuthenticationError

client = OpenAI(
    api_key=os.environ["LLM_API_KEY"],      # 从环境变量读，绝不写死
    base_url=os.environ.get("LLM_BASE_URL", "https://api.deepseek.com"),
    timeout=60.0,                            # 必须设，默认可能等到天荒地老
    max_retries=0,                           # 自己控制重试，别让 SDK 偷偷重试
)

def chat(messages, model="deepseek-chat", temperature=0.3):
    try:
        return client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=temperature,
        )
    except AuthenticationError:
        # 401：Key 错了或过期了。重试没有意义，尽早炸掉
        raise
    except RateLimitError:
        # 429：限流。退避后重试是有意义的
        time.sleep(2)
        return chat(messages, model, temperature)
    except APIConnectionError as e:
        # 网络问题
        raise RuntimeError(f"连不上模型服务：{e}") from e
    except APIError as e:
        # 5xx 等其他错误
        raise RuntimeError(f"模型服务返回错误：{e}") from e
```

**几个容易被忽略的点：**

| 要点 | 说明 |
| --- | --- |
| 401 不要重试 | Key 错了重试一万次还是错，只会浪费时间掩盖真实问题 |
| 自己管重试 | SDK 内置重试会在超时场景下叠加，导致一次请求卡几分钟 |
| 超时必须设 | 不设超时时，网络抖动会让整个服务挂起 |
| Key 从环境变量读 | 第一周就养成习惯，不要等到第六章再改 |

### 2.3 结构化输出：让代码能信任模型的结果

这是第一个真正的工程问题。

假设你要模型从一篇文章里抽摘要，希望拿到这样的结构：

```json
{"title": "文章标题", "summary": "三句话摘要", "tags": ["标签1", "标签2"]}
```

**朴素做法**：在 Prompt 里写「请返回 JSON」。结果你会收到：

```text
好的，这是您需要的结果：
```json
{"title": "...", "summary": "...", "tags": [...]}
```
希望对您有帮助！
```

`json.loads()` 直接抛异常。然后你开始写正则去抠代码块——**这是技术债的起点**。

**正确做法**：用 Pydantic 定义契约，做「校验 + 重试」闭环。

```python
from pydantic import BaseModel, Field, ValidationError

class ArticleSummary(BaseModel):
    title: str = Field(description="文章标题")
    summary: str = Field(description="三句话以内的摘要")
    tags: list[str] = Field(description="3 到 5 个主题标签")

def summarize(article: str, max_retry: int = 2) -> ArticleSummary:
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": article},
    ]
    last_err = None
    for attempt in range(max_retry + 1):
        resp = chat(messages, temperature=0)          # 抽取任务温度压到 0
        raw = resp.choices[0].message.content
        try:
            return ArticleSummary.model_validate_json(raw)
        except ValidationError as e:
            # 关键：把校验错误回喂给模型，让它自己修
            messages.append({"role": "assistant", "content": raw})
            messages.append({
                "role": "user",
                "content": f"上面这段输出不符合要求的 JSON Schema，错误是：\n{e}\n请只输出符合 Schema 的 JSON，不要任何解释文字。",
            })
            last_err = e
    raise ValueError(f"重试 {max_retry} 次后仍无法得到合法结构：{last_err}")
```

**为什么这个闭环有效**：模型看到自己上一次的输出和具体报错，修正成功率很高。这比你在 Prompt 里反复强调「一定要输出纯 JSON」有效得多——**让模型看到错误，比让它猜测更可靠。**

> 现在多数厂商还提供「原生结构化输出 / JSON Mode」。能用就用，但它只保证**语法是合法 JSON**，不保证**字段符合你的业务约束**。Pydantic 校验这一层不能省。

### 2.4 实战：文章总结器

把上面三块拼起来，就是一个能用的工具。

```text
summarizer/
├── main.py          # CLI 入口：读文件 → 调用 → 打印
├── llm.py           # 封装 chat()、异常处理
├── schema.py        # Pydantic 模型定义
└── prompts.py       # System Prompt 集中管理
```

`prompts.py` 里的 System Prompt 值得单独说：

```python
SYSTEM_PROMPT = """你是一个严谨的技术文章总结器。

要求：
1. 只依据用户提供的原文，不引入外部信息，不推测作者未表达的观点。
2. 如果原文信息不足以生成摘要，返回 {"error": "信息不足"}。
3. 只输出 JSON，不要 markdown 代码块，不要任何前后缀说明。
"""
```

注意第 2 条——**给模型一条「可以不回答」的路**。没有这条路，它只能硬编。

### 2.5 工程思维：本周的三条收获

**其一，尽早暴露错误。**
上面的 `chat()` 里，401 直接抛、不再重试。看似粗暴，实则是在**让错误在最接近原因的地方炸掉**。如果把它吞掉变成「返回空字符串」，你会在三天后发现是 Key 过期。

**其二，把经验沉淀成规则文件。**
写这类代码时你会反复踩同样的坑：忘了设 timeout、忘了把 temperature 压到 0、恰恰忘了在 Prompt 里要求纯 JSON。

这个仓库里的 `CODEBUDDY.md` 就是干这个的——把「本项目的约定」写成 AI 编程助手能读到的文件：

```markdown
## 本项目约定
- 所有 LLM 调用必须设 timeout，不允许裸调
- 结构化输出必须用 Pydantic 校验并实现重试
- API Key 一律从环境变量读取，禁止硬编码
- temperature 默认 0.3；数据抽取类任务必须用 0
```

**这类文件的价值不在于「写得漂亮」，而在于你只需要写一次，之后每次让 AI 帮你改代码，它都会遵守。** 这是「把经验固化成上下文」的第一步。

**其三，区分「模型的问题」和「工程的问题」。**
输出带了一堆解释文字，这既是模型的问题，也是工程的问题——你不能靠 Prompt 祈祷，得靠校验兜底。等你熟练之后会发现：**大部分所谓的「模型不稳定」，本质是工程上没做好兜底。**

---

> **本周产出**：一个能读文件、输出结构化摘要、出错会自己修正的命令行工具。
> **下周问题**：它每次都失忆。用户问「刚才那篇讲的什么」，它答不上来。

## 三、第二周：能聊——多轮对话与记忆机制

### 3.1 一个反直觉的事实：模型根本没有记忆

很多人以为多轮对话是模型「记住了」。不是。

Chat Completions 接口是**完全无状态**的：服务器不保存任何东西。所谓的「对话」，是**你每次把完整历史重新发一遍**。

```python
# 第二轮请求实际长这样
messages = [
    {"role": "system",    "content": "你是一个技术顾问"},
    {"role": "user",      "content": "什么是向量数据库？"},      # 第一轮
    {"role": "assistant", "content": "向量数据库是……"},          # 第一轮的回答
    {"role": "user",      "content": "它和传统数据库有什么区别？"},  # 第二轮
]
```

**这一认知直接推出成本的真相**：第 10 轮对话，前 9 轮的内容会**全部重新计费一次**。

| 轮次 | 发送的 Token 量 | 累计成本 |
| --- | --- | --- |
| 第 1 轮 | 约 200 | 200 |
| 第 5 轮 | 约 1,000 | 3,000 |
| 第 10 轮 | 约 2,000 | 11,000 |
| 第 30 轮 | 约 6,000 | 93,000 |

对话越长，每说一句话越贵，而且是**平方级增长**。这是记忆机制必须存在的第二个理由——第一个理由是上下文窗口会满。

### 3.2 上下文窗口满了会怎样

每个模型有固定的上下文窗口（比如 32K、128K Token）。超出后有两个结局，都很糟：

- **报错**：请求直接被拒
- **静默截断**：某些实现会悄悄砍掉最早的消息，模型开始「忘记」开头说了什么，而你不会收到任何提示

关键是：**窗口大小和价格是一件事的两个方面**。能塞进去的内容越多，每次调用越贵。

### 3.3 记忆分层：三种策略，按需组合

不要一上来就做「向量记忆」「长期记忆」，先按成本从低到高排：

| 策略 | 做法 | 成本 | 适用 |
| --- | --- | --- | --- |
| **滑动窗口** | 只保留最近 N 轮 | 最低 | 短任务、客服类 |
| **摘要压缩** | 把老对话压成一段摘要 | 中 | 长会话 |
| **持久化落库** | 存 SQLite/Redis，按需取回 | 中 | 跨会话、用户画像 |
| **检索式记忆** | 把历史切片存向量库，按 query 召回 | 最高 | 超长期、多主题 |

**实践中通常的组合是「滑动窗口 + 摘要压缩」**——既控制成本，又不至于忘掉关键信息。

```python
def build_context(history: list[dict], keep_recent: int = 10, summary: str = "") -> list[dict]:
    """history 是完整对话历史；返回要发给模型的消息列表"""
    if len(history) <= keep_recent:
        return history

    recent = history[-keep_recent:]
    older = history[:-keep_recent]

    # 老对话压成摘要，只保留一次
    if not summary and older:
        summary = summarize_history(older)   # 再调一次模型做压缩

    prefix = [{"role": "system", "content": f"以下是更早对话的摘要：\n{summary}"}] if summary else []
    return prefix + recent
```

**这里的取舍**：摘要会丢细节。如果用户问「你刚才说那个数值是多少」，摘要里可能就没这个数了。所以**滑动窗口保留的轮次要够**，通常 5–10 轮足够覆盖「刚才」。

### 3.4 角色扮演与 Prompt 工程化

带人设的对话，最容易犯的错是**把人设写死在代码里**：

```python
# ❌ 反例
system = "你是一个毒舌的编程导师，说话要尖刻，但要有真材实料"
```

改一个人设就要改代码，测试同事没法自己调。正确做法是**配置驱动**：

```python
# persona.yaml
personas:
  strict_mentor:
    name: 严厉导师
    temperature: 0.7
    system: |
      你是一位有 15 年经验的编程导师。你的风格是：
      - 直接指出问题，不绕弯子，但针对代码不针对人
      - 每条建议必须给出可执行的具体做法
      - 不确定的地方明确说「我不确定」，绝不编造 API

  friendly_reviewer:
    name: 温和评审
    temperature: 0.5
    system: |
      你是一位耐心的代码评审者……
```

```python
def load_persona(key: str) -> dict:
    cfg = yaml.safe_load(open("persona.yaml"))["personas"][key]
    return cfg
```

**收益不只是「方便改」**：人设变成了**数据**，可以版本化、可以 A/B 测试、可以让人设和代码解耦。这也是后面做多 Agent 时每个 Agent 能拥有不同人格的基础。

### 3.5 实战：带记忆的角色扮演机器人

```text
chatbot/
├── main.py           # CLI 循环：读输入 → 拼上下文 → 调模型 → 存历史
├── memory.py         # build_context()、summarize_history()
├── persona.yaml      # 人设配置
└── store.py          # SQLite 持久化
```

SQLite 的存在让「重启后还记得」成为可能：

```python
import sqlite3

def init_db():
    conn = sqlite3.connect("chat.db")
    conn.execute("""
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            role TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.execute("CREATE INDEX IF NOT EXISTS idx_session ON messages(session_id)")
    return conn
```

**注意 `session_id`**：没有它，所有会话会混在一起。这是第二周就要建立的意识——**多用户是常态，不是特例**。

### 3.6 工程思维：「它看到了什么上下文？」

这是本周最值钱的一条排错习惯。

模型输出不对劲时，人的第一反应是「模型变笨了」或「Prompt 没写好」。但**九成情况下，是它看到的上下文和你以为的不一样**：

- 历史被截断了，它没看到前文
- 摘要丢掉了关键信息
- 上一轮的 `assistant` 消息格式不对，被 API 忽略了
- 拼接时两个消息之间漏了分隔，语义粘连

所以排错第一步永远是：**把实际发给模型的完整 `messages` 打印出来，逐条读一遍。**

```python
import json
def debug_dump(messages, path="debug_context.json"):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(messages, f, ensure_ascii=False, indent=2)
    logger.info("上下文已 dump：共 %d 条消息，约 %d 字符", len(messages), sum(len(m["content"]) for m in messages))
```

养成这个习惯，能省掉大量「猜模型为什么不听话」的时间。

---

> **本周产出**：一个重启后还记得你、但不会把账单撑爆的对话机器人。
> **下周问题**：它只会说话。你让它「把那个文件删掉」，它回你一句「好的，请你自己删」。

## 四、第三周：能做——工具调用与控制边界

### 4.1 工具调用到底发生了什么

这是最容易被误解的一环。**模型从来没有真正执行过任何代码。**

完整流程是：

```text
1. 你把「有哪些工具、每个工具要什么参数」告诉模型（tools 参数）
2. 模型判断需要调用工具，输出一个结构化的「调用意图」：
   {"name": "read_file", "arguments": "{\"path\": \"a.txt\"}"}
   —— 注意：这只是 JSON 文本，什么都没执行
3. 你的代码解析这个 JSON，找到对应函数，真正执行
4. 你把执行结果作为一条 role="tool" 的消息，回传给模型
5. 模型基于结果继续生成
```

**模型是「决策者」，代码是「执行者」。** 这个分工是后面所有安全设计的基石——因为**执行权始终在你手里**。

### 4.2 工具 Schema：描述质量决定成功率

很多人工具调不通，怀疑模型笨，其实是**描述写得太差**。

```python
# ❌ 反例：模型不知道什么时候该用它
{
    "name": "search",
    "description": "搜索",
    "parameters": {"type": "object", "properties": {"q": {"type": "string"}}},
}

# ✅ 正例
{
    "name": "search_documents",
    "description": (
        "在当前知识库中搜索相关文档片段。"
        "适用于：查找事实、定义、政策条款等需要引用的内容。"
        "不适用于：计算数值、查询实时数据（用 fetch_realtime_data）。"
        "返回最相关的 5 个片段，每个含来源路径。"
    ),
    "parameters": {
        "type": "object",
        "properties": {
            "query": {
                "type": "string",
                "description": "检索关键词，用自然语言短句，不要用布尔运算符",
            },
            "top_k": {
                "type": "integer",
                "description": "返回片段数，默认 5，最大 20",
                "default": 5,
            },
        },
        "required": ["query"],
    },
}
```

**三条经验：**

| 要点 | 说明 |
| --- | --- |
| 写清「什么时候用」和「什么时候不用」 | 边界比能力更重要，模型容易滥用工具 |
| 参数描述写格式示例 | 「日期用 YYYY-MM-DD」比「日期」有效得多 |
| 工具名要有语义 | `search_documents` 比 `search` 好，避免和别的工具混淆 |

### 4.3 最小工具循环

```python
import json

TOOLS = {"read_file": read_file, "list_dir": list_dir, "write_file": write_file}

def run_tool_loop(messages, max_rounds=5):
    for _ in range(max_rounds):
        resp = client.chat.completions.create(
            model="deepseek-chat",
            messages=messages,
            tools=TOOL_SCHEMAS,
        )
        msg = resp.choices[0].message

        # 模型不调工具了，说明它认为可以直接回答
        if not msg.tool_calls:
            return msg.content

        messages.append(msg)                       # 把助手的调用意图加进历史

        for tc in msg.tool_calls:
            name = tc.function.name
            try:
                args = json.loads(tc.function.arguments or "{}")
            except json.JSONDecodeError:
                result = "参数不是合法 JSON，请重新生成"
            else:
                # 关键：白名单 + 校验 + 异常兜底
                if name not in TOOLS:
                    result = f"未授权的工具：{name}"
                else:
                    try:
                        result = TOOLS[name](**args)
                    except Exception as e:
                        # 把异常文本回传给模型，让它自己纠错
                        result = f"工具执行失败：{type(e).__name__}: {e}"

            messages.append({
                "role": "tool",
                "tool_call_id": tc.id,
                "content": str(result)[:8000],     # 截断，防止结果撑爆上下文
            })
    return "达到最大轮次仍未完成"
```

**四个防御点，缺一不可：**

1. **白名单**（`name not in TOOLS`）：模型可能幻觉出一个不存在的工具名
2. **参数校验**：模型给的参数可能是错的、缺的、类型不对的
3. **异常兜底**：工具自己会崩（文件不存在、权限不足）
4. **结果截断**：一个 `cat` 大文件就可能把上下文撑爆

### 4.4 控制边界：危险操作必须停下来

工具越强，越要设边界。三条硬规则：

**规则一：权限白名单（路径隔离）**

```python
from pathlib import Path

WORKSPACE = Path("/data/agent_workspace").resolve()

def safe_path(user_path: str) -> Path:
    """把用户/模型给的路径限制在 workspace 内，防目录穿越"""
    p = (WORKSPACE / user_path).resolve()
    if not p.is_relative_to(WORKSPACE):      # Python 3.9+ 用 str(p).startswith
        raise PermissionError(f"路径越界：{user_path}")
    return p
```

**光靠 Prompt 说「不要访问工作区外」是不够的**——Prompt 可以被注入绕过，代码不会。

**规则二：高危操作二次确认**

```python
DANGEROUS = {"delete_file", "execute_shell", "send_email", "update_database"}

def dispatch(name, args):
    if name in DANGEROUS:
        print(f"\n⚠️  即将执行高危操作：{name}")
        print(f"   参数：{json.dumps(args, ensure_ascii=False)}")
        if input("   确认执行？(yes/no) ").lower() != "yes":
            return "用户已拒绝该操作"
    return TOOLS[name](**args)
```

**规则三：只读与可写工具分离**

给模型两个明确不同的工具，而不是一个带 `mode` 参数的万能工具。这样在 Schema 层面就能看出风险等级，也便于做权限分级（比如某类用户只允许用只读工具）。

### 4.5 MCP 与 Skill：工具的标准化的两个方向

工具写多了会遇到两个问题：**① 换一个宿主应用就要重写一遍；② 工具描述占用的上下文越来越多。**

**MCP（Model Context Protocol）** 解决第一个：它把工具做成独立的 Server，任何兼容 MCP 的客户端都能接入。一套工具，多处复用。协议细节见 [MCP 协议详解](../04.MCP/MCP协议.md)。

**Skill** 解决第二个，思路正好相反：不是把工具全塞给模型，而是**把「一套做事的流程和方法」打包成一个可被按需加载的模块**。模型平时只看到一个简短的能力摘要，真正用到时才加载完整内容。

| 对比 | MCP | Skill |
| --- | --- | --- |
| 解决的问题 | 工具跨应用复用 | 工具太多撑爆上下文 |
| 形态 | 独立进程 + 标准协议 | 可加载的指令/脚本包 |
| 类比 | USB 接口 | 一份操作手册 |

理解这两者之后，你会意识到：**第三章讲的不是「怎么加工具」，而是「怎么在加工具的同时不把事情搞砸」。**

### 4.6 工程思维：工具膨胀会让 AI 变笨

这是本章最重要的一条因果链：

```text
Agent 想做的事太多
      ↓
给它挂的工具越来越多（30 个、50 个）
      ↓
工具 Schema 全都要放进 Prompt
      ↓
提示词膨胀到几万 Token
      ↓
模型在长上下文中选择困难 → 调错工具、漏调工具、参数瞎填
      ↓ 这就是「AI 降智」的真实成因
```

**它不是模型变笨了，是你让它在一堆选项里挑，它挑不准。**

对应的三条设计原则：

**① 职责单一。** 一个 Agent 只干一类事。一个「什么都能干」的 Agent，最后什么都干不好。

**② 工具数量设上限。** 实践中一个 Agent 挂 **5–8 个工具**是比较舒服的区间。超过 10 个就该考虑拆分 Agent 或引入 Skill 按需加载。

**③ 遵循 Unix 哲学。** 做小而专的工具，用组合解决大问题：

```text
❌ 一个 create_report_with_charts_and_export 工具
✅ list_files → read_file → summarize → write_file 四个小工具
```

后者的好处不只是「能让模型组合」，还在于**每一步都可观测、可审计、可中断**——这在第五章做自主 Agent 时会变得至关重要。

---

> **本周产出**：一个能读文件、列目录、写入文件（写入前要确认）的文件管理助手。
> **下周问题**：它能操作文件了，但你问它「公司差旅报销标准是多少」，它还是只会编。

## 五、第四周：能记——外脑与知识治理

### 5.1 幻觉的工程解法：别指望它「知道」

模型编造公司制度，不是因为「学得不够」，而是因为**它压根没学过**，而它又不会说「我不知道」——它的工作方式就是生成最像答案的文本。

**Prompt 能做的只有一部分**：明确要求「资料里没有就说不知道」。这能降低幻觉率，但不能消除。

真正的解法是把答案**放在它眼前**：

```text
用户提问
   ↓
检索相关资料（从你自己的文档里找）
   ↓
把资料 + 问题一起给模型
   ↓
模型基于资料回答，并注明出处
```

这就是 RAG。**它的本质不是「让模型更聪明」，而是「让它有据可依」。**

> 站内已有 [RAG 完整链路与架构选型](../02.RAG/完整链路与架构选型/index.md) 十二篇深度文章，覆盖切块策略、混合检索、重排、模型选型与评估体系。本节只给**最小可用版本**，重点讲「怎么把它用对」而不重复架构细节。

### 5.2 最小可用 RAG：四十行跑通

先跑通，再优化。用 ChromaDB 做向量库，本地零依赖起步：

```python
import chromadb
from chromadb.utils import embedding_functions

client = chromadb.PersistentClient(path="./kb")           # 持久化到磁盘
embedder = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name="BAAI/bge-small-zh-v1.5"                   # 中文小模型，够用且快
)
collection = client.get_or_create_collection(
    name="docs",
    embedding_function=embedder,
    metadata={"hnsw:space": "cosine"},
)

# ---------- 建库：切块 + 入库 ----------
def ingest(path: str, content: str, chunk_size: int = 500, overlap: int = 80):
    chunks = []
    for i in range(0, len(content), chunk_size - overlap):
        chunk = content[i : i + chunk_size].strip()
        if chunk:
            chunks.append(chunk)
    collection.add(
        documents=chunks,
        metadatas=[{"source": path, "offset": i} for i in range(len(chunks))],
        ids=[f"{path}#{i}" for i in range(len(chunks))],
    )

# ---------- 检索 ----------
def retrieve(question: str, top_k: int = 5) -> list[dict]:
    res = collection.query(query_texts=[question], n_results=top_k)
    return [
        {"text": doc, "source": meta["source"]}
        for doc, meta in zip(res["documents"][0], res["metadatas"][0])
    ]

# ---------- 带引用作答 ----------
def answer(question: str) -> str:
    docs = retrieve(question)
    if not docs:
        return "知识库中没有找到相关内容。"

    context = "\n\n".join(f"[{i+1}] （来源：{d['source']}）\n{d['text']}" for i, d in enumerate(docs))
    messages = [
        {"role": "system", "content": (
            "你是知识库问答助手。严格遵守：\n"
            "1. 只依据下面的【资料】回答，不得引入资料之外的信息。\n"
            "2. 每个结论后用 [编号] 标注来源。\n"
            "3. 资料中找不到答案时，直接回答「资料中未提及此内容」，不要推测。"
        )},
        {"role": "user", "content": f"【资料】\n{context}\n\n【问题】{question}"},
    ]
    return chat(messages, temperature=0).choices[0].message.content
```

**注意三个设计点：**

| 设计 | 原因 |
| --- | --- |
| `metadatas` 存来源 | 没有出处的答案，用户没法验证，也就没法信任 |
| 强制标注 `[编号]` | 引用是防幻觉最有效的手段之一——它逼模型真的去看资料 |
| `if not docs: return` | 检索不到就直接拒答，**不要给模型硬凑的机会** |

### 5.3 切块粒度：最影响效果的一步

切块是 RAG 里最不起眼、却最影响效果的一步。

| 切得太碎 | 切得太大 |
| --- | --- |
| 检索精准，但片段不完整，回答缺上下文 | 上下文完整，但噪声多，检索不准 |
| 一句话一个块，答不了「为什么」 | 一整章一个块，向量被平均成模糊的语义 |

**实用起点**：中文正文 300–600 字一块，重叠 10%–20%。然后**用真实问题去测**，而不是凭感觉调。

对于有明确层级的文档（Markdown、规章制度、技术手册），**按标题结构切比按字数切好得多**——一个「2.3 报销标准」小节天然就是一个完整的语义单元。

### 5.4 知识库治理：比算法更重要的运营工作

这是最容易被跳过、也最容易被低估的部分。

**一个知识库的效果，八成取决于里面装了什么，两成取决于怎么检索。**

常见的「知识污染」：

| 污染类型 | 后果 | 处理 |
| --- | --- | --- |
| **过时文档**（2021 版制度） | 检索到旧答案，错误且有出处，比没答案更糟 | 加 `effective_date` 元数据，检索时过滤 |
| **重复内容**（同一制度三个版本） | top-k 被同一内容占满，浪费上下文 | 入库前去重，或按 `version` 只保留最新 |
| **无关文档**（会议纪要、草稿） | 干扰检索 | 入库前做准入审核 |
| **权限混杂** | 员工 A 检索到员工 B 才该看的内容 | 元数据带 `acl`，检索时强制过滤 |

**一个反直觉的结论**：知识库不是越大越好。**一个精心维护的 500 篇文档，效果通常远好于一个放任堆积的 5000 篇。** 与其急着把整个网盘灌进去，不如先想清楚「哪些文档是可信的、当前的、该被引用的」。

### 5.5 工程思维：检索是接口，不是「向量库」

这句话值得单独强调：

> **关键词是「检索」，不是「向量库」。生成是骨架，检索是可替换的插件。**

很多人上手就把 RAG 等同于「装个 Chroma / Milvus」，然后把整个架构绑死在这个选择上。但检索的本质是：

```python
def retrieve(question: str) -> list[Document]:
    ...
```

**它只是一个「给问题、返回相关文档」的接口。** 这个接口背后可以接：

| 实现 | 适用场景 |
| --- | --- |
| 向量检索 | 语义相近、措辞不同 |
| BM25 / 关键词 | 精确匹配编号、专有名词 |
| SQL 查询 | 「上季度华东区销售额」这类结构化问题 |
| 图数据库 | 多跳关系（「A 的上级的部门负责人是谁」） |
| 混合检索 | 绝大多数生产场景的实际选择 |
| 直接调搜索引擎 | 实时信息 |

**接口化带来的好处**：你可以先用最简单的 BM25 上线，后面发现语义召回不够再换向量，再后面加重排——业务代码一行都不用改。

反过来，如果一开始就把 `chroma_client.query()` 写进业务逻辑里，换方案时就得动弹整个系统。

> 关于混合检索、重排、索引参数调优的深入内容，见 [召回](../02.RAG/完整链路与架构选型/04.召回.md) 与 [重排](../02.RAG/完整链路与架构选型/05.重排.md)。

---

> **本周产出**：一个能基于你自己文档回答、并给出出处的知识库助手。
> **下周问题**：它一次只能回答一个问题。你让它「把这个项目的文档都读一遍，整理成一份报告」，它做不到。

## 六、第五周：自主——Agent Loop 与多 Agent 协作

### 6.1 从「指令驱动」到「目标驱动」

前四周的系统都是**指令驱动**的：你说一句，它做一件。

第五周要跨到**目标驱动**：你说「整理一份报告」，它自己决定先做什么、再做什么、什么时候停。

```text
指令驱动：人 → 拆解任务 → 逐步下指令 → 模型执行
目标驱动：人 → 给出目标 → Agent 自己拆解、执行、检查 → 交付
```

这个跨越带来能力，也带来风险。前面所有章节的护栏，在这一周全部要用上。

> 关于 Workflow 与 Agent 的控制流差异、各类运行模式的谱系对比，见 [Agent 的运行模式](../03.Agent/Agent的概念.md)。

### 6.2 Agent Loop 骨架：思考 → 行动 → 观察

自主 Agent 的核心就是一个循环：

```text
┌─────────────────────────────────────────┐
│  1. 思考（Thought）：当前状态如何？下一步做什么？ │
│              ↓                           │
│  2. 行动（Action）：调用一个工具             │
│              ↓                           │
│  3. 观察（Observation）：工具返回了什么       │
│              ↓                           │
│  4. 判断：目标达成了吗？还需要继续吗？         │
│       ↓ 否                    ↓ 是        │
│    继续循环              输出结果 / 结束     │
└─────────────────────────────────────────┘
```

代码骨架和第三章的工具循环非常像，**但多了三样东西**：

```python
def agent_loop(goal: str, max_steps: int = 15, max_cost: float = 0.5):
    messages = [
        {"role": "system", "content": AGENT_SYSTEM_PROMPT},
        {"role": "user", "content": f"目标：{goal}"},
    ]
    total_tokens = 0

    for step in range(max_steps):
        # 1) 每一步都检查预算
        if total_tokens > estimate_tokens_for_cost(max_cost):
            return f"已达成本上限（{max_cost} 元），中止。当前进度：{summarize(messages)}"

        resp = client.chat.completions.create(
            model="deepseek-chat", messages=messages, tools=TOOLS, temperature=0.2
        )
        total_tokens += resp.usage.total_tokens if resp.usage else 0
        msg = resp.choices[0].message

        # 2) 模型认为完成了
        if not msg.tool_calls:
            return msg.content

        messages.append(msg)
        for tc in msg.tool_calls:
            result = dispatch_guarded(tc)      # 白名单 + 校验 + 高危确认，全在这里
            messages.append({"role": "tool", "tool_call_id": tc.id, "content": result})
            log_step(step, tc.function.name, result)   # 3) 全程可观测

    return f"达到最大步数（{max_steps}），中止。已执行：{summarize(messages)}"
```

**自动化带来的成本变化，必须有清醒认知：**

> **一次自主任务 = 十几次调用的钱。Token 就是成本，长度就是价格。**

前四周一次任务花几分钱，自主 Agent 一次可能花几毛甚至几块。而且它可能在中途跑偏，越跑越贵。**这是护栏必须存在的直接原因。**

### 6.3 护栏设计：让 AI 自主，不等于放弃设计

四道护栏，缺一不可：

| 护栏 | 做法 | 防的是什么 |
| --- | --- | --- |
| **轮次上限** | `max_steps`，通常 10–20 | 死循环、反复尝试同一个失败操作 |
| **成本阈值** | 累计 token 折钱，超限中止 | 越跑越贵的失控 |
| **高危确认** | 危险操作停下来等人确认 | 不可逆的破坏 |
| **进度约束** | 每步记录，重复动作检测 | 原地打转 |

**「重复动作检测」很实用**——Agent 常见的一种失败是反复调用同一个工具、拿到同样的错误、再做一次同样的尝试：

```python
seen = set()
key = f"{tc.function.name}:{tc.function.arguments}"
if key in seen:
    result = "你已经用完全相同的参数调用过这个工具，结果没有变化。请换个思路，或向用户说明卡在哪里。"
else:
    seen.add(key)
    result = dispatch_guarded(tc)
```

**这条设计的意义在于**：它把「卡住」变成一个**可表达的失败**，而不是一个跑满 15 轮的死循环。

> 自主性的边界，恰恰是最需要工程设计的地方。**循环的边界、状态、终止条件，全是工程设计的体现**——这一点和「让 AI 自由发挥」看起来矛盾，实际上是自主系统能落地的前提。

### 6.4 ReAct 与 Plan-and-Execute：两种编排思路

| | ReAct | Plan-and-Execute |
| --- | --- | --- |
| 思路 | 边走边想，每步根据观察决定下一步 | 先出完整计划，再逐步执行 |
| 优点 | 灵活，能应对意外 | 可控、可预览、便于人工审批 |
| 缺点 | 容易跑偏，难预测总成本 | 计划可能一开始就错，且不擅长应对中途变化 |
| 适用 | 探索型任务（查资料、排错） | 流程型任务（写报告、做迁移） |

**实践中的折中**：先生成计划 → 让人确认 → 执行 → 最后总结。这样既有全局视角，又保留人在环上。

```python
# 第一步：只要计划，不执行
plan = llm_plan(goal)          # 返回 ["1. 列出所有文档", "2. 逐个读取", "3. 汇总", ...]
print("执行计划：", plan)
if input("确认执行？(yes/no) ") != "yes":
    return "已取消"

# 第二步：按计划执行，允许中途调整
for i, step_desc in enumerate(plan):
    result = agent_loop(step_desc, max_steps=5)
    if is_blocked(result):
        plan = llm_replan(goal, plan, i, result)   # 计划失败了，重新规划
```

### 6.5 多 Agent 拆分：为什么必须拆

回到第三章那条因果链，它在自主场景下更严重：

```text
Agent 做的事过多
      ↓
需要挂的工具越来越多（搜索、读文件、写文件、发邮件、查数据库……）
      ↓
提示词（含所有工具 Schema + 所有历史）不断膨胀
      ↓
模型在长上下文中选择困难，调错工具、跑偏、忘目标
      ↓
这就是「AI 降智」的真实机制
```

**拆分的正确姿势是按「职责」拆，不是按「数量」拆：**

| 角色 | 职责 | 工具 |
| --- | --- | --- |
| **主 Agent（Orchestrator）** | 理解目标、拆解任务、分派、汇总 | 无，或只有「调用子 Agent」 |
| **检索 Agent** | 只负责查资料 | 搜索、文档读取 |
| **执行 Agent** | 只负责操作 | 文件读写、命令执行 |
| **审核 Agent** | 只负责挑错 | 无工具，纯判断 |

**关键设计：主 Agent 不要挂具体工具。** 它只做「拆解」和「分派」，工具都在子 Agent 手里。这样每个 Agent 的上下文都很短，各自只专注一件事。

```python
def orchestrate(goal: str) -> str:
    plan = planner_agent(goal)                     # 只拆解
    results = []
    for task in plan:
        agent = pick_agent(task)                   # 按任务类型选子 Agent
        results.append(agent.run(task))            # 子 Agent 独立上下文
    return summarizer_agent(goal, results)         # 汇总
```

### 6.6 工程思维：自主性越高，人越要在环上

这是第五周最反直觉、也最重要的一条：

> **让 AI 自主，不等于放弃设计。**

| 环节 | 谁负责 |
| --- | --- |
| 拆解目标 | 主 Agent |
| 执行步骤 | 子 Agent |
| **设定验收标准** | **人** |
| **审批高危动作** | **人** |
| **判断结果是否可用** | **人** |

一个成熟的自主系统，不是「人完全不管」，而是**人退到「定义目标、设定边界、验收结果」的位置**，把中间的执行交给 Agent。

检查点应该设在：

- 计划生成后（花大钱之前）
- 高危操作前（不可逆之前）
- 结果交付前（对外发布之前）

---

> **本周产出**：一个能自己拆解任务、多步执行、有轮次与成本护栏、关键节点会停下来问你的 Agent。
> **下周问题**：它只能在你的终端里跑。同事想用，你得把电脑开着给他演示。

## 七、第六周：上线——服务化与云端部署

### 7.1 CLI 与服务的本质区别

前五周的东西都是**命令行脚本**。它和服务差在四个地方：

| 维度 | CLI 脚本 | 线上服务 |
| --- | --- | --- |
| 生命周期 | 跑完就结束 | 常驻，随时响应 |
| 输入 | 终端交互 | HTTP 请求（可能并发） |
| 状态 | 进程内存里 | 必须外置（会话要持久化） |
| 失败 | 报错，人重跑 | 自动恢复，不能让整个服务挂 |

**最关键的一条认知**：CLI 里可以 `input()` 等用户确认，服务里**没有终端**。第六章所有「高危操作等人确认」的逻辑，在服务化时必须重新设计——通常是改成「提交审批任务 → 返回 pending → 人工审批后回调」。

### 7.2 FastAPI 最小集

```python
# app.py
import os
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

app = FastAPI(title="Agent 服务")

class ChatRequest(BaseModel):
    session_id: str
    message: str

@app.get("/health")
def health():
    """健康检查：部署平台靠它判断服务是否存活"""
    return {"status": "ok"}

@app.post("/chat")
def chat_endpoint(req: ChatRequest):
    try:
        reply = answer_with_memory(req.session_id, req.message)
        return {"reply": reply}
    except Exception as e:
        # 关键：不要把内部异常细节暴露给调用方
        raise HTTPException(status_code=500, detail="服务内部错误，请稍后重试")
```

启动：

```bash
uvicorn app:app --host 0.0.0.0 --port 8000
```

**三个容易踩的坑：**

| 坑 | 说明 |
| --- | --- |
| `--host 0.0.0.0` | 默认是 `127.0.0.1`，只监听本机，外部访问不到 |
| 会话状态 | 不能存在进程内存里——多进程/重启就丢，必须落库 |
| 异常处理 | 直接把 `str(e)` 返给用户，可能泄露路径、Key、内部结构 |

### 7.3 流式响应：体验上的分水岭

Agent 一次任务可能要几十秒。等全部算完再返回，用户会以为卡死了。流式能显著改善体感：

```python
@app.post("/chat/stream")
def chat_stream(req: ChatRequest):
    def event_generator():
        for chunk in stream_agent(req.session_id, req.message):
            # SSE 格式：每行以 data: 开头，两个换行结束
            yield f"data: {json.dumps({'delta': chunk}, ensure_ascii=False)}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")
```

前端用 `EventSource` 或 `fetch` + `ReadableStream` 接收即可。

**注意**：流式下错误处理变复杂了——响应头已经发出去了，中途出错不能改状态码，只能**在数据流里发一个错误事件**，前端要能识别。

### 7.4 云端部署：三件必须做对的事

**① 密钥绝不进代码库**

```python
# ❌ 绝对不能
client = OpenAI(api_key="sk-xxxxxxxx")

# ✅ 唯一正确方式
client = OpenAI(api_key=os.environ["LLM_API_KEY"])
```

```bash
# 部署平台的环境变量配置里设置，不写进任何文件
LLM_API_KEY=sk-xxxx
LLM_BASE_URL=https://api.deepseek.com
```

```gitignore
.env
*.db
__pycache__/
```

**已经提交过 Key 的话，删掉 commit 也没用**——它还在 git 历史里。必须去平台**吊销并重新生成**。

**② 进程必须被守护**

裸跑 `uvicorn` 挂在一个 SSH 会话里，会话一断服务就死。生产环境要用进程管理器（systemd / supervisor / Docker restart policy），保证崩溃自动重启、开机自启。

**③ 状态必须外置**

```python
# ❌ 重启就丢
sessions = {}

# ✅ 重启不丢
def get_history(session_id: str) -> list[dict]:
    rows = db.query("SELECT role, content FROM messages WHERE session_id=? ORDER BY id", (session_id,))
    return [{"role": r["role"], "content": r["content"]} for r in rows]
```

### 7.5 AI Coding 工作流：规格先行

到这一周，代码量已经不是几十行了。这时候用 AI 写代码，最容易出的问题是：**它写得很顺，但写的东西不是你要的。**

解法是 **SDD（Spec-Driven Development，规格先行）**：

```text
① 先写规格（人）
   - 接口契约：输入输出字段、错误码
   - 边界条件：空输入怎么办、超时怎么办
   - 验收标准：什么样的响应算通过

② 再让 AI 按规格实现
   - 把规格文件作为上下文一起给
   - 一次只让它实现一个明确的模块

③ 人来验收
   - 对照规格逐条检查，而不是「看起来能跑就行」
```

**为什么有效**：AI 擅长「按明确的约束实现」，不擅长「猜你想要什么」。**规格就是给它的确定性边界。**

这也呼应了第一章的规则文件思路——把项目约定写进 `CODEBUDDY.md`，把当前任务规格写进设计文档，两者共同构成了 AI 编码的上下文。

### 7.6 工程思维：重新定义「完成」

前五周，「完成」的标准是「在我机器上跑通了」。

第六周之后，标准要改：

| 阶段 | 「完成」的含义 |
| --- | --- |
| 前五周 | 我的终端里能跑 |
| **上线后** | **公网可访问、有人真的在用、挂了能自动恢复** |

这个定义很苛刻，但它逼着你把下面这些事做完：

- 有人访问 → 必须有健康检查、有日志、能定位问题
- 真的在用 → 必须有并发处理、会话隔离、限流
- 挂了能恢复 → 必须有守护、有重启策略、状态不丢

**上线即暴露。** 你写的每一个没处理的异常、每一个硬编码的 Key、每一个存在内存里的状态，都会在真实流量下现形。

---

> **本周产出**：一个公网可访问、支持流式、重启不丢会话、Key 从环境变量读取的 Agent 服务。

## 八、结语：AI 时代开发者的角色重构

### 8.1 六周回顾：一条从概率到确定的收敛路径

| 周 | 能力 | 用代码收住了哪种不确定性 |
| --- | --- | --- |
| 1 | 能读 | 输出格式自由 → JSON Schema + 校验重试 |
| 2 | 能聊 | 无状态失忆 → 历史由代码管理 |
| 3 | 能做 | 调错工具 → 白名单 + 校验 + 二次确认 |
| 4 | 能记 | 编造事实 → 检索注入 + 强制引用 + 拒答 |
| 5 | 自主 | 停不下来 → 轮次 + 成本 + 重复检测 |
| 6 | 上线 | 崩溃泄露 → 守护 + 环境变量 + 状态外置 |

六周下来，你会发现一个规律：**每一周新增的能力，都伴随一套新的约束。** 能力越大，约束越多。这不是限制，而是能力能真正落地的前提。

### 8.2 角色的变化

这条路线走完，开发者做的事发生了根本变化：

| 以前 | 现在 |
| --- | --- |
| 写实现 | **设计系统边界** |
| 定义函数签名 | **定义验收标准** |
| 修 bug | **设计护栏，让失败变得可观测** |
| 追求代码量 | **追求系统在不确定输入下的稳定性** |

代码本身，越来越不是瓶颈。真正稀缺的是三件事：

**① 架构决策。** 该不该拆 Agent？检索用哪种？状态放哪？这些判断没有标准答案，只有场景权衡。

**② 验收标准。** AI 写的代码「能跑」很容易，「做对了」很难。定义什么叫做对了，是人的活。

**③ 安全边界。** 什么操作要让 AI 自动做，什么必须人确认，什么绝对不能做——这条线划在哪，只有懂业务的人能定。

### 8.3 三条可以带走的判断

如果这篇长文你只记住三句话，我希望是这三句：

> **其一，确定性的部分交代码，概率性的部分交模型。**
> 不要指望靠 Prompt 解决格式、边界、安全问题。能写代码兜底的，就写代码兜底。

> **其二，工具越多，AI 越笨。**
> 不是模型退化，是你在让它于长上下文中做选择。职责单一、拆 Agent、用 Skill 按需加载，都是在给它减负。

> **其三，AI 负责写代码，人负责设计系统。**
> 这句话不是安慰，而是当下分工的真实描述。代码的生产成本正在趋近于零，而系统设计的成本没有降低。

### 8.4 下一步可以做什么

如果这套路线你已经走完，几条自然的延伸方向：

- 把 Agent 接入真实的业务系统（订单、工单、监控），做**工具设计**而不是玩具
- 建立**效果评估集**，让每次改动都可量化——参考 [评估体系](../02.RAG/完整链路与架构选型/09.评估体系.md) 的思路，RAG 之外的场景同样适用
- 研究**成本优化**：缓存、小模型分流、上下文压缩
- 探索**多 Agent 协作**的工程化协议，参考 [A2A 协议](../05.A2A/A2A协议.md)
- 读两个真实生产实现的架构：[ZCode](../13.Agent设计模式/拆解ZCode架构实现.md) 用严格规范约束每一次工具改动，[DeepSeek Harness](../13.Agent设计模式/拆解DeepSeekHarness架构.md) 用插件化让每个部件都可替换。它们回答了本文没展开的问题：**当 agent 要活很多年、要很多人在上面改，架构该怎么长**

---

**写在最后**：这套路线的每一周，最难的都不是写代码，而是想清楚「这一步到底交给谁」。技术栈会更替，模型会换代，但这个判断不会过时。
