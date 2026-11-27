---
date: 2026-11-27 16:30:00
title: Token 全面解析：切分、上下文窗口、用量估算与计费
permalink: /pages/tokn27
categories:
  - AI
---

# Token 全面解析：切分、上下文窗口、用量估算与计费

> 面向读者：**写过代码、想搞清楚账单和上下文限制的工程师**。不要求读过 NLP 教材。
>
> 数据约定：凡标「实测」的，都给出环境、命令与输出，可在本机复现；凡标「官方」的，都给出页面链接与抓取日期（2026-11-27）。价格与模型规格变动很快，**引用前请回原链接复核**。

---

## 〇、先给结论

如果只记五条，记这五条：

1. **Token 不是字符，也不是单词**，而是分词器（tokenizer）按「训练语料里的频率」切出来的片段：高频组合是 1 个 token，低频内容被拆成好几段，最坏情况退化为单字节。
2. **为什么不用字符或单词**：字符序列太长（注意力算力随长度平方涨），单词表无限大（永远有没见过的词）。Token 是在「序列长度」与「词表大小」之间的折中，并且**任何输入都能编码**。
3. **1 个汉字在实测中是 0.78~1.06 个 token**，不是「1~2 个」；但有中文标点的句子会因字节回退明显变差。**英文一个单词约 1 token**。
4. **上下文窗口 = 输入 + 输出共享的池子**。计费 = 输入 token × 输入单价 + 输出 token × 输出单价，再按缓存命中与时段分档。
5. **成本大头通常不是「那 1000 行代码」，而是多轮循环里反复重发的上下文**。固定前缀提高缓存命中率，比抠字省得更多。

下面逐条展开，每个数字都给得出处。

---

## 一、Token 到底怎么切出来的

### 1.1 一个容易忽略的前提：模型看不见「字」

神经网络只能吃数字。所以「文本 → token」是两步：

```
"tokenization" ──分词器──▶ ["token", "ization"] ──查表──▶ [12345, 6789] ──▶ 模型
```

- 第一步是文本层面的切分规则（本文重点）；
- 第二步是查词表（vocabulary），把片段换成整数 ID；
- 生成时反向进行：模型逐个吐 ID，分词器拼回字符串。这就是「自回归」。

### 1.2 BPE：从字节出发，贪心地合并高频组合

主流分词器（GPT 系、Llama、Qwen）的核心算法是 **BPE（Byte Pair Encoding，字节对编码）**。它 1994 年作为一种数据压缩算法提出，后来被引入神经机器翻译，再由 GPT-2 用到语言模型上。

**训练阶段**（离线做一次，产出词表）：

1. 文本按 UTF-8 拆成**字节**，初始词表 = 256 个字节 → 256 个 token，因此**任何字符都能表示**；
2. 统计相邻两个 token 组合的出现频率；
3. 把**最高频的那一对**合并成新 token，加入词表；
4. 重复 2~3，直到词表达到目标大小（几万到二十万）。

**编码阶段**：用同样的合并顺序，把输入里能合并的组合依次合并。

**实测演示**：我写了一个极简 BPE（为便于理解而写的实现，不是生产分词器），语料里刻意放了 `token / tokenize / tokenization` 与几个中文词，运行 `node bpe.mjs 300`：

```text
训练语料预分词结果: the | cat | sat | on | the | mat | . | the | cat | is | happy |
                    a | low | low | low | low | lowest | newer | newest | wider | widest |
                    token | tokenize | tokenizer | tokenization | tokens | 中文 | 中文 | 中文字符 | 分词 | 分词器 | 词元
基础词表(字节级): 256
学习到的合并次数: 44
最终词表规模: 300
前 25 次合并（按频次贪心，括号内为合并时频次）:
  1. a + t (5)
  2. l + o (5)
  3. lo + w (5)
  4. t + o (5)
  5. to + k (5)
  6. tok + e (5)
  7. toke + n (5)
  ...
  15. ä + ¸ (3)
  16. ä¸ + Ń (3)
token          → [ token ]
tokenization   → [ tokeniz ][ at ][ i ][ on ]
lowest         → [ lowest ]
widest         → [ widest ]
cat            → [ cat ]
happy          → [ happy ]
```

三个现象，后文都会用到：

- **合并按频次贪心**：`at`、`lo`、`low` 先被合并，所以 `lowest` 能整体成为 token；而 `tokenization` 在这么小的语料里出现次数不够，被切成 4 段。
- **高频整词保留，低频被拆**：这只说明「频率决定边界」，不代表现实中 `token` 一定是 1 个 token——取决于真实训练语料。
- **中文在字节起点上吃亏**：`ä + ¸`、`ä¸ + Ń` 这些看似乱码的合并，正是 UTF-8 下汉字 3 个字节被拆开的样子（实测：`中文` 的 UTF-8 字节为 `e4 b8 ad e6 96 87`）。中文要在同一套词表里压缩得好，必须在训练中把整字合并出来，否则一个字要花 2~3 个 token。

> 脚本全文见附录 A，可直接复制运行复现。

### 1.3 字节回退：为什么「永远不会查不到字」

传统分词器遇到词表外的词只能输出 `<UNK>`（unknown），信息直接丢失。GPT-2 的做法（论文第 2.2 节）是**字节级 BPE**：

- 基础词表只有 256 个字节，论文原文："a byte-level version of BPE only requires a base vocabulary of size 256"；若改用完整 Unicode 符号表，则在加入任何多符号 token 之前，基础词表就会超过 130,000。
- 为了让字节可见，官方 `encoder.py` 里的 `bytes_to_unicode()` 做了一层「字节 → 可见字符」的可逆映射，例如空格映射为 `Ġ`。源码注释说明理由是避免把空白或控制字符喂给 BPE。

代价：罕见内容（生僻字、新 emoji、Base64 串、压缩数据）只能退化成**单字节 token**，长度暴涨。这就是「同一个字换个模型 token 数就变了」的根因。

### 1.4 四种主流分词算法

| 算法 | 核心思路 | 训练方式 | 典型使用者 | 特点 |
| --- | --- | --- | --- | --- |
| **BPE** | 从字节/字符出发，反复合并最高频的相邻对 | 贪心合并 | GPT 系、Llama 3、Qwen | 实现简单、速度快，对高频组合友好 |
| **Byte-level BPE** | BPE + 字节映射 | 同上 | GPT-2 之后几乎成为默认 | 任何输入都能编码，罕见内容退化为多字节 |
| **WordPiece** | 从字符出发，按**似然**而非频次决定合并（BERT 推理时按**贪心最长匹配**切分） | 贪心 + 打分 | BERT | 非词首子词加 `##` 前缀，如 `un` + `##aff` + `##able` |
| **SentencePiece** | 把空格当普通字符（转义为 `▁`），直接在原始句子上训练；提供 BPE 与 Unigram 两种模式 | 训练框架 | Llama 早期、T5、多语言模型 | 不依赖预分词，可无损还原原文（lossless detokenization） |
| **Unigram LM** | 假设句子由子词「生成」，用 EM 求最大似然子词表 | 概率模型 | SentencePiece 的 `unigram` 模式、ALBERT | 「自上而下裁剪」，粒度更灵活 |

一句话区分：**BPE / WordPiece 是自下而上合并，Unigram 是自上而下裁剪**，都属于「子词（subword）分词」。

> 核查备注：Llama 早期实现确实使用 SentencePiece（`llama/tokenizer.py` 中 `SentencePieceProcessor`），但其 README 未明写「BPE」，故本表只写「SentencePiece」，不写成「BPE + SentencePiece」。

### 1.5 预分词：隐藏的第二个变量

BPE 并不直接对整串合并。它**先按一层规则切成小块**，再在小块内部合并。这层规则叫 **pre-tokenization**，它决定了「一个 token 不能跨越空格或换行」。

`o200k_base` 与 `cl100k_base` 的分块正则直接暴露了机制（tiktoken 源码 `openai_public.py`，为可读性简化）：

```text
[^\r\n\p{L}\p{N}]?[\p{Lu}\p{Lt}\p{Lm}\p{Lo}\p{M}]*[\p{Ll}\p{Lm}\p{Lo}\p{M}]+(?i:'s|'t|'re|'ve|'m|'ll|'d)?
| [\p{Lu}\p{Lt}\p{Lm}\p{Lo}\p{M}]+[\p{Ll}\p{Lm}\p{Lo}\p{M}]*
| \p{N}{1,3}
| ?[^\s\p{L}\p{N}]+[\r\n/]*
| \s*[\r\n]+
| \s+(?!\S)
| \s+
```

两个直接影响账单的细节：

1. **`\p{N}{1,3}`**：长数字串按 1~3 位切分。**实测**：`20261127` 在两套词表下都被切成 `['202', '611', '27']`，8 位数字 = 3 个 token。订单号、时间戳、请求 ID 都格外费 token。
2. **前导空格并入 token**：`" the"` 与 `"the"` 是两个不同 token（实测英文句子切分为 `['The', ' quick', ' brown', ' fox', ' jumps', ' over', ' the', ' lazy', ' dog', '.']`）。

另外注意一个跨模型差异：**Qwen2 的正则用 `\p{N}`（单数字），而不是 `\p{N}{1,3}`**。所以同一串数字，在 GPT 系与 Qwen 下的 token 数并不相同。

### 1.6 不同模型的分词器差异

| 模型 / 分词器 | 类型 | 词表规模 | 中文表现 | 出处 |
| --- | --- | --- | --- | --- |
| GPT-2 | byte-level BPE | 50,257 | 极差（英文语料主导） | GPT-2 仓库 `encoder.py` / 论文 §2.2 |
| GPT-3.5 / GPT-4（`cl100k_base`） | byte-level BPE | 100,277（`n_vocab` 实测值） | 中等：常用字多为 1 token，但**含中文标点的整句会劣化**（见下表） | 本机实测（tiktoken 0.14.0） |
| GPT-4o 起（`o200k_base`） | byte-level BPE | 200,019（`n_vocab` 实测值） | 较好：同一句 19 token → 14 token | 本机实测 |
| Llama 3 | BPE（与 tiktoken 同源的正则实现） | 128,000 基词 + 256 特殊 token，README 称 "TikToken-based" | 中等 | Meta `llama-models` README；词表数以 [Meta-Llama-3-8B 的 tokenizer.json](https://huggingface.co/NousResearch/Meta-Llama-3-8B) 实测 |
| Qwen2 / Qwen2.5 | BPE（`qwen.tiktoken`） | 151,643（HF `tokenizer.json` 实测） | 较好 | [Qwen2.5-7B-Instruct](https://huggingface.co/Qwen/Qwen2.5-7B-Instruct) 的 `tokenizer.json` |
| BERT（`bert-base-chinese`） | WordPiece | 21,128 | 以单字为主，形声字也多是单 token | BERT 仓库 `tokenization.py` |

**实测对比：同一句话，两套词表差 5 个 token**

| 文本 | `cl100k_base` | `o200k_base` |
| --- | --- | --- |
| `我们今天要去北京开会`（10 字） | 8 token | 7 token |
| `我们今天要去北京开会，顺便买点水果。`（18 字） | **19 token** | **14 token** |
| `The quick brown fox jumps over the lazy dog.` | 10 token | 10 token |
| `function tokenize(text) { return text.split(/\s+/); }` | 13 token | 13 token |

`cl100k_base` 之所以在带标点的中文句上「反向翻车」，是因为逗号后的 `顺便买` 落成了字节片段（实测片段：`['我们','今','天','要','去','北京','开','会','，','\xe9\xa1','\xba', …]`）；`o200k_base` 则切成了 `['我们','今天','要','去','北京','开','会','，','顺','便','买','点','水果','。']`。**这就是第 4 节「不能死记」的第一手证据。**

另一个常被引用的「名场面」是 GPT-2 的 `SolidGoldMagikarp` 一类低频 token：它们在训练语料里几乎没被更新，模型遇到时行为异常。这提示一件事——**词表里的条目，模型不一定真的「见过」**。

### 1.7 分词器会不会被淘汰：BLT 的尝试

2024 年 12 月，Meta 发表 **BLT（Byte Latent Transformer）**，用「按熵动态切分的字节 patch」替代固定词表 token，论文标题是 *Patches Scale Better Than Tokens*，摘要称其首次在大规模下证明了「不依赖固定词表的字节级模型」的可行性，并在推理效率与鲁棒性上有改善。

需要注意：这仍属于研究阶段，主流商用模型依然使用固定的子词词表。**本文所有估算方法的前提（词表固定、token 可离线计数）在中短期内仍然成立。**

---

## 二、为什么不用字符或者单词当基础单位

这是本文最值得讲清楚的一节：**Token 不是「更细的字符」或「更粗的单词」，而是算力与泛化能力共同逼出来的折中解。**

### 2.1 如果以「字符」为单位

- **序列太长**：1000 字文本 = 1000 个时间步；Transformer 的注意力计算量随序列长度**平方**增长，显存与延迟都会爆。
- **信息密度太低**：`the` 被拆成 `t`/`h`/`e` 三步预测，模型还要额外层数把字母拼成语义。
- **对中文不公平**：一个汉字的信息量接近一个英文单词，按字符切会让中文序列比英文长好几倍。

### 2.2 如果以「单词」为单位

- **词表无限大**：新词、错拼、专有名词、emoji、URL、代码变量名，永远「没见过」。要么放弃（`<UNK>` 丢信息），要么把词表撑到几十万甚至上百万，嵌入矩阵与输出层参数、显存、成本同步上涨。
- **形态无法共享**：`talk / talks / talked / talking` 是 4 个独立符号，学不到同源关系；子词视角下共享 `talk`。
- **多语言无法统一**：中日韩、阿拉伯语、代码没有空格分词，也不好定义「词」。

### 2.3 Token 折中了什么

| 维度 | 字符级 | 单词级 | **Token（子词）级** |
| --- | --- | --- | --- |
| 序列长度 | 最长 | 最短 | 中等（实测英文 4.4 字节/token、中文 3.8 字节/token、Go 代码 3.4~3.6 字节/token） |
| 词表大小 | 极小 | 无限 | 固定（几万~二十万） |
| 未见词 | 能编码但很长 | 只能 `<UNK>` | **能编码**：退化为子词/字节 |
| 形态共享 | 差 | 差 | **好**（`-ing`、`-tion` 共享） |
| 多语言 | 都能编码但低效 | 难统一 | **统一**（同一套字节起点） |
| 训练效率 | 低 | 一般 | **高**（高频词 1 个 token 到位） |

一句话：**Token 的粒度由数据决定，不由规则决定。** 高频的东西（英文常用词、代码关键字、标点）自然合成一个 token，低频的东西自然被拆开。词表就是训练语料分布的一张「频率快照」。

代价也要说清楚：**分词器把「词法」固化进了模型**。模型看到的边界是人类语料的统计结果，不是语言学定义；分词器一旦定下就无法更改，不同分词器之间的 token 数**不可直接比较**。这就是「估算公式永远不准」的根源。

---

## 三、Token 与上下文窗口

### 3.1 定义

- **Token**：模型读写文本的最小单位，也是计费单位，输入输出都按 token 计量。
- **上下文窗口（context window）**：单次推理能看到的最大 token 总数。
- **最大输出长度**：单次最多生成多少 token，通常是**独立参数**（如 `max_tokens`），与上下文窗口不是同一个配额池。

### 3.2 窗口里装了什么

很多人以为「窗口 = 我能输入的字数」，其实它装的是**这一轮请求的全部内容**：

```text
┌──────────────────── Context Window ────────────────────┐
│ system prompt                                          │
│ 工具定义（Tools / MCP 的 JSON schema）                  │  ← Agent 场景下最容易被忽略的固定开销
│ 历史消息（user / assistant 多轮）                       │
│ 历史工具调用与工具返回值                                 │  ← 读一次大文件，可能就占掉几十 K
│ 你这次的问题                                             │
│ ─────────────── 到这里是输入（input）───────────────    │
│ 模型正在生成的输出（output，边生成边占位）               │
└────────────────────────────────────────────────────────┘
```

两个工程上很重要的推论：

1. **历史会累积**。多轮对话每轮都要把之前的消息重发一遍，第 N 轮成本不是「第 N 轮的问题」，而是「前 N-1 轮 + 第 N 轮」。
2. **模型没有记忆**。「它忘了前面说的」通常不是记性差，而是历史被截断、被摘要压缩，或根本没进窗口。

### 3.3 工程上意味着五件事

**（1）上下文不是越大越划算。** 拉满窗口的代价有三层：费用（输入 token 线性上涨）、延迟（prefill 要处理全部输入）、质量（长上下文中的「中间遗忘」现象在多篇公开研究中被反复观测到——**塞进去 ≠ 用得上；具体数据本文未复核，不作量化断言**）。

**（2）系统提示与工具定义是「每轮都付」的固定成本。** 一个挂了几十个 MCP 工具的 Agent，每轮光工具 schema 就可能吃掉数万 token。

**（3）上下文必须做分层预算。**

| 预算项 | 建议策略 |
| --- | --- |
| 系统提示 + 工具定义 | 控制住总量；工具按需加载，不要全量常驻 |
| 历史对话 | 滑动窗口 + 摘要压缩；超阈值把旧轮次折叠成摘要 |
| 工具返回值 | 只回灌必要字段；大结果先落盘，按需读取 |
| 输出预留 | 始终设 `max_tokens`；推理模型的「思考」内容同样占位与计费 |

**（4）「把整个代码库塞进窗口」是工程陷阱。** 正确做法是检索（RAG）或按需读取文件。

**（5）窗口口径要看官方文档，且要分清是「输入上限」还是「输入 + 输出合计」。** 各家定义不一致，跨模型迁移代码时必须重新核对。

### 3.4 当前窗口规格（2026-11-27 抓取）

| 厂商 | 型号 | 窗口 | 输出上限 | 出处 |
| --- | --- | --- | --- | --- |
| DeepSeek | deepseek-flash | 1M | 384K | [官方定价页](https://api-docs.deepseek.com/zh-cn/quick_start/pricing/) |
| DeepSeek | deepseek-v4-pro | 1M | 384K | 同上 |
| Google | Gemini 2.5 Pro / 2.5 Flash | 1,048,576 | 65,536 | [Gemini 2.5 Pro 模型页](https://ai.google.dev/gemini-api/docs/models/gemini-2.5-pro) |

::: warning 规格会变，型号也会变
- Gemini 2.5 Pro / 2.5 Flash 已被标注为 **deprecated**（官方 pricing 页原文），升级或迁移时务必回官方页核对替代型号与价格。
- 我没有逐一核对所有厂商的窗口口径，上表**只列了我实际读到原文的条目**。比价时请自行查各家 pricing 页。
:::

---

## 四、1 个汉字、1 个英文单词大概多少 token

### 4.1 官方给的经验值

DeepSeek 官方「Token 用量计算」页的原文：

> - 1 个英文字符 ≈ 0.3 个 token。
> - 1 个中文字符 ≈ 0.6 个 token。

同页明确补充：「因为不同模型的分词不同，所以换算比例也存在差异，**每一次实际处理 token 数量以模型返回为准**，您可以从返回结果的 `usage` 中查看。」

> 来源：[DeepSeek API Docs · Token 用量计算](https://api-docs.deepseek.com/zh-cn/quick_start/token_usage/)（抓取于 2026-11-27）

### 4.2 实测：OpenAI 两套词表上的真实数字

以下为**本机实测**（tiktoken 0.14.0 + Python 3.11.4，完整复现方法见附录 B）：

| 文本 | 字符数 | UTF-8 字节 | `cl100k_base` | `o200k_base` |
| --- | --- | --- | --- | --- |
| 我们今天要去北京开会 | 10 | 30 | 8（0.80/字） | 7（0.70/字） |
| 我们今天要去北京开会，顺便买点水果。 | 18 | 54 | 19（**1.06/字**） | 14（**0.78/字**） |
| The quick brown fox jumps over the lazy dog. | 44 | 44 | 10（0.23/字符） | 10（0.23/字符） |
| function tokenize(text) { return text.split(/\s+/); } | 53 | 53 | 13（0.25/字符） | 13（0.25/字符） |
| 20261127 | 8 | 8 | 3 | 3 |

可以读出四个结论：

1. **常用汉字 ≈ 0.7~1.1 token**。注意：初稿里我按「3 字节/字 ÷ 2 字节/token ≈ 1.5」推过 1.5 token/字，**这个推导错了**——汉字在词表里大多是「整字 token」，不是被合并出来的两字节片段。**用字节数外推 token 数，在中文上会系统性高估。**
2. **英文 ≈ 0.23~0.3 token/字符**，与 DeepSeek 官方给的 0.3 一致；一个 5 字母英文单词约 1 token。
3. **标点与「非词表内组合」才是刺客**：`cl100k_base` 因为词表里没有「便」「买」等简体字（训练语料繁体/英文占比高），逗号之后整段退化为字节，18 字反而要 19 个 token。
4. **数字按 1~3 位切**：8 位数字 = 3 token。

### 4.3 千行代码实测

**实测**：1000 行 Go 代码（合成样本：56 行注释、47 个 `func` 声明、869 个非空行，共 18,822 字符 / 20,984 字节）

| 分词器 | token 数 | 字节/token | token/行 |
| --- | --- | --- | --- |
| `cl100k_base` | **6,142** | 3.42 | 6.14 |
| `o200k_base` | **5,896** | 3.56 | 5.90 |

结论：**1000 行普通 Go 代码约 6,000 个 token**（每行约 6 token、每 token 约 3.5 字节）。代码的字节/token 比明显高于英文自然语言（英文约 4.4 字节/token），因为关键字、缩进、符号大量重复，会被合并。

### 4.4 可以直接用的估算函数

```python
def estimate_tokens_code(text: str) -> int:
    """代码类文本估算：实测约 3.4~3.6 字节/token，取 3.5。"""
    return int(len(text.encode("utf-8")) / 3.5)

def estimate_tokens_en(text: str) -> int:
    """英文为主：实测约 4.4 字节/token（含空格），取 4.5 偏保守。"""
    return int(len(text.encode("utf-8")) / 4.5)

def estimate_tokens_zh(text: str) -> int:
    """中文为主：按「字」而不是按「字节」估。
    常用字 0.7~1.1 token/字；含大量简体外生僻字时上浮到 1.2 以上。"""
    return int(len(text) * 1.0)
```

三个系数 3.5 / 4.5 / 1.0 都来自本文实测，属于**经验值**：对英文、代码较准，对中文只在「常用字 + 标准标点」条件下成立。**换模型就必须重新校准**，上线前用真实请求的 `usage` 回归一轮。

### 4.5 为什么不能死记

| 原因 | 说明 |
| --- | --- |
| **分词器不同** | 同一句中文，`cl100k_base` 19 token、`o200k_base` 14 token（实测） |
| **词表会升级** | GPT-3.5/4 → GPT-4o 换过词表，同一文本 token 数直接变了 |
| **标点/字形是变量** | 简体、繁体、全角符号、emoji，命中率差异巨大，退化时按字节计 |
| **隐藏开销** | 系统提示、工具定义、图片占位、特殊 token 都算钱，但你数的只是「文本长度」 |
| **内容形态** | 代码、JSON、日志、Base64、压缩数据的字节/token 比完全不同 |
| **推理内容** | 推理模型的「思考」token 通常按输出计费，肉眼看不见却进账单 |
| **官方比例也只是「大致」** | DeepSeek 自己就写了「大致如下」「以接口返回为准」 |

**正确的做法只有两条**：

1. **在线**：读响应里的 `usage`（输入/输出分别多少），做成本监控与告警。
2. **离线**：用**目标模型自己发布的分词器**数——OpenAI 用 tiktoken 的 `cl100k_base` / `o200k_base`；Llama 3 用官方 `tokenizer.json`；Qwen 用 `qwen.tiktoken`；DeepSeek 官方文档也提供了离线 tokenizer 压缩包。

---

## 五、Tokenization 是怎么工作的

把前面的内容串成一条完整管线：

```text
原文
 │
 ├─ ① 规范化（Normalization，可选）
 │      Unicode 归一化（NFC/NFKC）、大小写处理、控制字符清理
 │      SentencePiece 把空格转义为 ▁；GPT 系把前导空格并入 token
 │
 ├─ ② 预分词（Pre-tokenization）
 │      按正则切成不跨词、不跨空白的小块（见 1.5 节）
 │
 ├─ ③ 子词切分（BPE / WordPiece / Unigram）
 │      在小块内部按词表合并或求最优切分
 │
 ├─ ④ 查表（Vocabulary lookup）
 │      片段 → 整数 ID；词表外内容由字节级方案回退
 │
 └─ ⑤ 附加特殊 token
         BOS / EOS / <|im_start|> 等控制符号会被插入，同样占窗口、同样计费
 │
 ▼
ID 序列 ──▶ 模型前向计算 ──▶ 逐 token 输出 ──▶ 反查表拼回字符串
```

**工程上要抓住三个接口点**：

- **输入侧**：`messages` 里的工具定义、图片占位符都会折算成 token。图片按尺寸估算，DeepSeek 文档明确说这是估算值，以接口返回为准。
- **输出侧**：`max_tokens` 约束的是输出；不设上限容易被长输出扣费。
- **网络侧**：中文字符串用 JSON 传输时若被 `\u4e2d` 转义，字节数会膨胀约 3 倍。**按字节估算 token 时，务必用原始字符串**，否则会高估（这个坑我在第一版估算里踩过）。

---

## 六、1000 行代码消耗多少 token、成本多少

### 6.1 用量

以 4.3 节实测为基准：1000 行 Go ≈ **6,000 token**。不同内容的保守/乐观区间：

| 形态 | 字节/token（经验值） | 1000 行 token 估算 |
| --- | --- | --- |
| 压缩/加密数据、大量 emoji 与生僻字符 | ≈ 1（退化为字节） | ≈ 21,000 |
| 稀疏代码、长字符串、少关键字 | ≈ 2.5 | ≈ 8,400 |
| **普通业务代码（Go / Python / TS）** | **≈ 3.5（实测 3.42~3.56）** | **≈ 6,000** |
| 高重复模板代码 | ≈ 4.5 | ≈ 4,700 |

工程上按「**1000 行 ≈ 6,000 token，留 2 倍余量算 1 万**」做容量规划。

### 6.2 单次成本（用官方价目表算）

> 来源：[DeepSeek API Docs · 模型 & 价格](https://api-docs.deepseek.com/zh-cn/quick_start/pricing/)（抓取于 2026-11-27），单位：元 / 百万 token。

| 项目 | deepseek-flash（空闲 / 高峰） | deepseek-v4-pro（空闲 / 高峰） |
| --- | --- | --- |
| 输入（缓存命中） | 0.02 / 0.04 | 0.15 / 0.30 |
| 输入（缓存未命中） | 1 / 2 | 4.5 / 9.0 |
| 输出 | 4 / 8 | 13.5 / 27.0 |

**场景**：贴入 6,000 token 代码（未命中缓存），让它输出 500 token 改动建议。

| 模型 | 空闲时段 | 高峰时段 |
| --- | --- | --- |
| deepseek-flash | 6,000×1 + 500×4 = 8,000 → **0.008 元** | 6,000×2 + 500×8 = 16,000 → **0.016 元** |
| deepseek-v4-pro | 6,000×4.5 + 500×13.5 = 33,750 → **0.0338 元** | 6,000×9 + 500×27 = 67,500 → **0.0675 元** |

即便写 1000 行新代码（输出 6,000 token），deepseek-flash 高峰时段也只有 12,000×0.000008 = 0.096 元。

### 6.3 真正的成本在哪：轮数而不是行长

Agent 场景里，1000 行代码往往不是最大开销。读文件、跑测试、贴堆栈，每一步工具返回都会变成下一轮的输入。

```text
单轮输入 ≈ system prompt + 工具定义 + 历史消息 + 历史工具返回 + 本轮问题
N 轮总输入 ≈ Σ 各轮输入（未计缓存命中折扣）
总费用 = Σ(输入 token × 输入单价) + Σ(输出 token × 输出单价)
```

**做成本治理，优先动这三处**：

1. **提高缓存命中率**：把固定内容（系统提示、工具定义、稳定文档）放最前，临时内容放最后。DeepSeek 的缓存命中价只有未命中价的 **2%（flash）/ 3.3%（pro）**，收益最大。
2. **压缩工具返回**：只回灌需要的字段，别把整个网页或整份日志灌进去。
3. **限制输出**：设 `max_tokens`，要求「只给 diff」而不是「重写整个文件」。

---

## 七、百万 token 怎么计费

### 7.1 计费公式

各家结构基本一致：

```text
费用 = 输入 token 数 ÷ 1,000,000 × 输入单价
     + 输出 token 数 ÷ 1,000,000 × 输出单价
```

在此之上叠加多个维度：

| 维度 | 含义 | 实例 |
| --- | --- | --- |
| **输入 / 输出分开计价** | 生成比读取贵 | 见 7.3 表 |
| **缓存命中 / 未命中** | 重复前缀可命中 | DeepSeek 命中价为未命中的 2%；Claude 官方文档称「多数模型缓存读命中为输入价的 0.1x」 |
| **缓存写入** | 首次写入可能要加价 | Claude：5 分钟缓存写入 1.25x、1 小时缓存写入 2x 基础输入价 |
| **时段定价** | 高峰 / 空闲不同价 | DeepSeek 空闲价为高峰的一半 |
| **推理/思考内容** | 思考 token 按输出计 | Gemini 官方定价页标注「Output price (including thinking tokens)」 |
| **多模态折算** | 图片、音频折算 token | 按尺寸估算，有单张上限 |
| **按次/按页计费** | 搜索、抓取、OCR、语音 | DeepSeek 的 Search / Fetch 按每 1000 次成功请求 5 元 |

**DeepSeek 高峰时段（官方原文）**：北京时间周一至周五（不含中国法定节假日）9:00-12:00、14:00-18:00。注意两点——是**北京时间**，且**中午 12:00-14:00 属于空闲时段**。

### 7.2 一张完整的月度账单

**示例**：一个月消耗「输入 1,000 万（未命中）+ 输入 1,000 万（命中）+ 输出 200 万」，全部在**高峰时段**，用 deepseek-v4-pro。

| 项目 | 用量 | 单价（元/百万，高峰） | 小计 |
| --- | --- | --- | --- |
| 输入（缓存未命中） | 10,000,000 | 9.0 | 90.0 元 |
| 输入（缓存命中） | 10,000,000 | 0.30 | 3.0 元 |
| 输出 | 2,000,000 | 27.0 | 54.0 元 |
| **合计** | 22,000,000 | — | **147 元** |

这张表最能说明问题：**同样 1000 万输入 token，命中缓存只值未命中的 1/30**。所以「怎么排布 prompt」比「怎么省字」更影响账单。同样的用量如果全在空闲时段，总价减半（73.5 元）。

### 7.3 「输出比输入贵多少」：各家实测倍数

按「输出单价 ÷ 未命中输入单价」计算，数据取自各家官方价目表（2026-11-27）：

| 厂商 | 型号 | 输入 | 输出 | 倍数 | 出处 |
| --- | --- | --- | --- | --- | --- |
| DeepSeek | deepseek-flash | 1 / 2 | 4 / 8 | **4.0x** | [定价页](https://api-docs.deepseek.com/zh-cn/quick_start/pricing/) |
| DeepSeek | deepseek-v4-pro | 4.5 / 9.0 | 13.5 / 27.0 | **3.0x** | 同上 |
| OpenAI | gpt-5 | $1.25 | $10.00 | **8.0x** | [pricing 页](https://platform.openai.com/docs/pricing) |
| OpenAI | gpt-5.1 | $1.25 | $10.00 | **8.0x** | 同上 |
| Anthropic | Claude Sonnet 4.5 | $3 / MTok | $15 / MTok | **5.0x** | [Claude 定价文档](https://platform.claude.com/docs/en/about-claude/pricing) |
| Anthropic | Claude Opus 4.1（已退役，仅部分云平台） | $15 / MTok | $75 / MTok | **5.0x** | 同上 |
| Google | Gemini 2.5 Pro（≤200k 输入） | $1.25 | $10.00 | **8.0x** | [Gemini 定价页](https://ai.google.dev/gemini-api/docs/pricing) |
| Google | Gemini 2.5 Flash | $0.30 | $2.50 | **8.33x** | 同上 |

结论：**主流区间是 3~8 倍，个别轻量型号略高于 8 倍（Gemini 2.5 Flash 为 8.33x）**。所以「输出通常是输入的 3~8 倍」可以说，但写成「普遍规律、不会超过 8 倍」就是错的。

::: warning 型号状态提醒
- `Claude Opus 4.1` 官方已标注 **retired**（仅保留在 Google Cloud 与 Bedrock 上），新项目不要选它；
- `Gemini 2.5 Pro / 2.5 Flash` 已在官方定价页标注 **deprecated**。
- 表中型号只用于展示「倍数关系」，**选型请以各家当前价目表为准**。
:::

### 7.4 追问：为什么成本会这么高

先摆正位置：**相对人工时间，API 的边际成本极低**。一次 1 万 token 的代码审查只要几分钱，工程师改 1000 行代码的时间成本是它的几千倍。所谓「贵」，是**规模化调用 + 多轮循环下的总量贵**。

成本由四块构成：

**（1）自回归：输出为什么贵**

- 生成是**串行**的：第 t 个 token 必须等前 t-1 个算完。
- 推理分两段：**prefill**（一次性并行处理全部输入，吃满算力）与 **decode**（逐 token 生成，受显存带宽约束，GPU 利用率低）。
- 输入可批处理、可缓存，输出不行。**输出单价高，本质是「算力利用率差异」的价格映射**。

**（2）上下文长度：为什么长窗口贵**

- 注意力计算量随序列长度平方增长，KV Cache 显存随长度线性增长。
- 长上下文单请求占用显存更多、可并发批更小，单位 token 摊薄成本上升。

**（3）模型规模**

- 参数越多，每个 token 要读的权重越多。decode 阶段瓶颈通常在**显存带宽**而非算力，这就是「大模型慢」的物理原因。

**（4）工程与服务成本**

- 硬件折旧、电力、跨区冗余、限流与隔离所需的容量预留、安全与合规审核、可用性保障，都要摊进单价。

**为什么价格在往下走？** 三个工程手段：MoE 让单次推理只激活部分参数；服务端复用公共前缀的 KV Cache；把非实时请求调度到低价时段。DeepSeek 的「缓存命中」与「空闲时段」两档定价，正是这些手段的直接对外体现。

**结论（标注为推断）**：token 定价大致是「算力 + 显存带宽 + 服务成本」的组合映射，而非按文本量卖的流量费。这解释了为什么「输入便宜、输出贵、命中缓存近乎免费、空闲时段半价」在主流厂商间反复出现。

::: tip 一个我核实不了的数
网上流传「每百万 token 的推理成本约 x 美元」之类的量级，但厂商未披露单卡吞吐与折旧模型，我本次也未能取得可引用的官方或第三方来源（抓取 NVIDIA 开发者博客与第三方分析站均连接失败）。**所以本文不给这个数字**——算不出来的东西，不如不写。
:::

---

## 八、常见误区速查

| 误区 | 事实 |
| --- | --- |
| 「1 个汉字 = 1~2 个 token」 | 实测常用汉字 0.7~1.1 token/字；含标点的简中句子在 `cl100k_base` 上会劣化到 1.06/字 |
| 「1 个英文单词 = 1 个 token」 | 大致成立（5 字母常用词），但 `0.23~0.3 token/字符` 更可靠 |
| 「按 UTF-8 字节 ÷ 3 估中文 token」 | 会系统性高估。汉字多是整字 token，不是字节片段（我第一版就是这么估错的） |
| 「上下文窗口 = 我能输入的字数」 | 窗口 = 输入 + 输出，且含系统提示、工具定义、历史、工具返回 |
| 「模型记得前面说的话」 | 不记得。历史每轮重发，超出部分会被截断或压缩 |
| 「开超长上下文就不用 RAG 了」 | 能塞进去 ≠ 能用好；费用、延迟、中间信息丢失都要付成本 |
| 「估算公式是常数」 | 系数随分词器、内容形态、模型版本变化，必须用 `usage` 校准 |
| 「输出和输入一样便宜」 | 输出单价通常是输入的 3~8 倍，思考内容同样计费 |
| 「换模型后旧系数还能用」 | 不能。词表换了，同一文本 token 数就变了 |
| 「按 JSON 序列化后的字符串估 token」 | 会高估数倍，`\u4e2d` 转义让中文膨胀 3 倍 |

---

## 九、一张速查表

```text
【切分】UTF-8 字节 →（BPE 合并）→ 子词 token → 整数 ID
【兜底】任何输入都能编码；生僻/罕见内容退化为多字节 token
【粒度】高频 1 token，低频多 token；边界由训练语料频率决定，不由规则决定

【中文】常用字 0.7~1.1 token/字（实测）；含标点的简中句在 cl100k 上会劣化
【英文】0.23~0.3 token/字符；常用单词 ≈ 1 token；约 4.4 字节/token
【代码】约 3.4~3.6 字节/token；1000 行 Go ≈ 6,000 token
【数字】按 1~3 位切分；8 位数字 ≈ 3 token

【窗口】输入 + 输出共享；系统提示、工具定义、历史、工具返回每轮都占位
【计费】输入×输入单价 + 输出×输出单价（分缓存命中/未命中、高峰/空闲）
【倍数】输出价为未命中输入价的 3~8 倍（个别轻量型号 8.3x）
【省钱】固定前缀前置提命中 > 压缩工具返回 > 限制输出 > 删历史
【准确】永远以响应里的 usage 为准；离线用目标模型自己的分词器
```

---

## 附录 A：极简 BPE 演示脚本（Node.js）

```js
// 从字节出发，按频次贪心合并，直到达到目标词表规模。
// 仅用于演示「词表如何从字节长出来」，不是生产分词器实现。

const TRAIN = `
the cat sat on the mat. the cat is happy.
a low low low low lowest newer newest wider widest
token tokenize tokenizer tokenization tokens
中文 中文 中文字符 分词 分词器 词元
`;

function bytesToUnicode() {
  const bs = [];
  for (let i = 33; i <= 126; i++) bs.push(i);
  for (let i = 161; i <= 172; i++) bs.push(i);
  for (let i = 174; i <= 255; i++) bs.push(i);
  const cs = bs.slice();
  let n = 0;
  for (let b = 0; b < 256; b++) {
    if (!bs.includes(b)) {
      bs.push(b);
      cs.push(256 + n++);
    }
  }
  const m = new Map();
  for (let i = 0; i < bs.length; i++) m.set(bs[i], String.fromCharCode(cs[i]));
  return m;
}

const b2u = bytesToUnicode();
const enc = new TextEncoder();
const preTokenize = (text) => text.toLowerCase().match(/[\p{L}\p{N}]+|[^\s\p{L}\p{N}]+/gu) ?? [];
const toSymbols = (word) => [...enc.encode(word)].map((b) => b2u.get(b));

function countPairs(words) {
  const stats = new Map();
  for (const syms of words) {
    for (let i = 0; i + 1 < syms.length; i++) {
      const key = syms[i] + '\u0000' + syms[i + 1];
      stats.set(key, (stats.get(key) ?? 0) + 1);
    }
  }
  return stats;
}

function applyMerge(words, a, b) {
  return words.map((syms) => {
    const out = [];
    for (let i = 0; i < syms.length; ) {
      if (i + 1 < syms.length && syms[i] === a && syms[i + 1] === b) {
        out.push(a + b);
        i += 2;
      } else {
        out.push(syms[i++]);
      }
    }
    return out;
  });
}

const baseVocab = [...b2u.values()];
let words = preTokenize(TRAIN).map(toSymbols);
const merges = [];
const TARGET = Number(process.argv[2] ?? 300);

while (baseVocab.length + merges.length < TARGET) {
  const stats = countPairs(words);
  if (stats.size === 0) break;
  const [key, count] = [...stats].reduce((a, b) => (b[1] > a[1] ? b : a));
  const [a, b] = key.split('\u0000');
  words = applyMerge(words, a, b);
  merges.push({ a, b, count });
}

console.log('基础词表(字节级):', baseVocab.length);
console.log('学习到的合并次数:', merges.length);
console.log('最终词表规模:', baseVocab.length + merges.length);
merges.slice(0, 25).forEach((m, i) => console.log(`  ${i + 1}. ${m.a} + ${m.b} (${m.count})`));
```

保存为 `bpe.mjs`，运行 `node bpe.mjs 300`。

## 附录 B：可复现的 token 计数（tiktoken）

本文第 4.2、4.3 节的实测数据由下面的脚本产出。环境：Windows + Python 3.11.4 + tiktoken 0.14.0。

```python
# pip install tiktoken
import tiktoken

SAMPLES = {
    "中文短句": "我们今天要去北京开会",
    "中文长句": "我们今天要去北京开会，顺便买点水果。",
    "英文": "The quick brown fox jumps over the lazy dog.",
    "代码": 'function tokenize(text) { return text.split(/\\s+/); }',
    "数字": "20261127",
}

for name in ("cl100k_base", "o200k_base"):
    enc = tiktoken.get_encoding(name)
    print("=" * 50, name, "n_vocab =", enc.n_vocab)
    for label, text in SAMPLES.items():
        ids = enc.encode(text)
        print(f"{label}: chars={len(text)} tokens={len(ids)}", [enc.decode([i]) for i in ids])

# 1000 行代码样本
code = open("sample_1000.go", encoding="utf-8", newline="").read()
for name in ("cl100k_base", "o200k_base"):
    enc = tiktoken.get_encoding(name)
    n = len(enc.encode(code))
    print(name, "tokens =", n, "bytes/token = %.2f" % (len(code.encode("utf-8")) / n))
```

::: tip 两个环境坑
1. `cl100k_base` / `o200k_base` 首次使用会下载词表文件，网络不通时直接失败；离线环境可预置 `TIKTOKEN_CACHE_DIR` 缓存目录。
2. 这些词表**只代表 OpenAI 的分词器**，不能用来推测 DeepSeek、Qwen、Llama 的 token 数。要数目标模型，请用它官方发布的分词器。
:::

## 附录 C：本文实测环境

| 项目 | 值 |
| --- | --- |
| 操作系统 | Windows 11 |
| Node.js | v24.18.1 |
| Python | 3.11.4（tiktoken 0.14.0）；另用 3.12.14 做过 UTF-8 字节统计 |
| 数据抓取日期 | 2026-11-27 |

## 参考来源

- [DeepSeek API Docs · 模型 & 价格](https://api-docs.deepseek.com/zh-cn/quick_start/pricing/)（窗口 1M / 输出 384K / 三档单价 / 高峰时段定义）
- [DeepSeek API Docs · Token 用量计算](https://api-docs.deepseek.com/zh-cn/quick_start/token_usage/)（0.3 token/英文字符、0.6 token/中文字符，及「以接口返回为准」）
- [tiktoken（OpenAI）](https://github.com/openai/tiktoken)（`cl100k_base` / `o200k_base` 定义与预分词正则）
- [GPT-2 官方仓库 encoder.py](https://github.com/openai/gpt-2/blob/master/src/encoder.py)（`bytes_to_unicode`）
- GPT-2 论文《Language Models are Unsupervised Multitask Learners》第 2.2 节（字节级 BPE 与 256 基词表）
- [sentencepiece](https://github.com/google/sentencepiece)（BPE / Unigram 两种模式、`▁` 转义、无损还原）
- [BERT 官方 tokenization.py](https://github.com/google-research/bert/blob/master/tokenization.py)（贪心最长匹配与 `##` 子词）
- [Meta llama-models README](https://github.com/meta-llama/llama-models/blob/main/README.md)（Llama 3 "TikToken-based"）
- [Qwen2.5-7B-Instruct](https://huggingface.co/Qwen/Qwen2.5-7B-Instruct) 的 `tokenizer.json`（BPE，151,643）
- [BLT: Byte Latent Transformer](https://arxiv.org/abs/2412.09871)
- [OpenAI API 定价](https://platform.openai.com/docs/pricing)、[Claude 定价文档](https://platform.claude.com/docs/en/about-claude/pricing)、[Gemini API 定价](https://ai.google.dev/gemini-api/docs/pricing)
