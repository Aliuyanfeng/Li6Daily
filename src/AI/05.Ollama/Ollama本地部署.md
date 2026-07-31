---
date: 2026-07-29 10:00:00
title: Ollama 本地部署参考手册
permalink: /pages/olm9f3
categories:
  - AI
  - Ollama
---

> **参考来源**：本文基础内容整理自 CSDN 博文《WINDOWS下最详尽的OLLAMA+DEEPSEEK-R1 本地部署手册》（作者 huang9604，2025-02，CC 4.0 BY-SA），原文：https://blog.csdn.net/huang9604/article/details/145457997 。原文侧重 Windows 图形化安装与基础命令；本文在其之上**补充了 API 调用、WebUI、Docker 部署**等原文未覆盖的部分，并以结构化方式重写，便于速查。

## 一、概述

**Ollama** 是一个开源的本地大模型运行框架，让你在个人电脑上一条命令拉取并运行 Llama、DeepSeek、Qwen 等开源模型，无需联网、数据不出本机。

- 官网：https://ollama.com
- 模型库：https://ollama.com/library
- 典型用途：本地对话、私有知识问答、离线开发调试、作为 Agent/MCP 的本地 LLM 后端。

本文以 **Windows + DeepSeek-R1** 为例，同时给出跨平台（Docker）与开发接入（API / WebUI）的进阶做法。

---

## 二、Windows 安装

### 1. 默认安装
1. 从官网 `ollama.com` 下载安装包（约 750MB），双击安装。
2. 默认安装路径：`C:\Users\<用户名>\AppData\Local\Programs\Ollama`，占用约 4.5G。
3. 安装完成后 Ollama 会自动启动，任务栏右下角出现羊驼图标即表示服务就绪（默认监听 `11434` 端口）。

### 2. 指定安装路径（以装到 D 盘为例）
若 C 盘空间紧张，可在 `cmd` 中带参数安装：
```cmd
:: 切换到安装包所在目录
D:
cd d:\Downloads
dir O*                      :: 确认 OllamaSetup.exe 存在
OllamaSetup.exe /DIR="d:\LLM\Ollama"
```
执行后弹出安装窗口，点 **Install** 即可安装到指定目录并自动启动。

---

## 三、配置

### 1. 修改模型文件存储位置
默认模型存放在 `C:\Users\<用户名>\.ollama\models`，可通过环境变量改到其他盘：

1. 右键右下角 Ollama 图标 → **Quit Ollama** 退出服务。
2. 打开「设置」→ 搜索「环境变量」→「编辑系统环境变量」→「环境变量」。
3. 在**系统变量**区点「新建」：
   - 变量名：`OLLAMA_MODELS`（必须大写）
   - 变量值：提前建好的目标目录，如 `d:\LLM\models`
4. 命令行执行 `set` 可验证变量已生效。
5. 若此前已下载模型，把旧目录 `C:\Users\<用户名>\.ollama\models` 内的文件**剪切**到新目录。
6. 重新启动 Ollama。

### 2. 关闭开机自启动
删除以下路径中的 Ollama 快捷方式即可：
```
C:\Users\<用户名>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\Ollama.lnk
```

> 提示：Ollama 在**无请求约 5 分钟后会自动释放模型占用的显存/内存**，不影响日常文本工作，无需手动停止。

---

## 四、常用命令速查

```cmd
ollama help         :: 查看全部命令
ollama serve        :: 启动服务（通常安装后已自启）
ollama run <模型>    :: 拉取并进入对话（如未拉取会自动下载）
ollama pull <模型>    :: 仅拉取模型，不进入对话
ollama list         :: 列出已下载模型
ollama ps           :: 查看正在运行的模型
ollama show <模型>    :: 查看模型信息（如 Modelfile、参数）
ollama stop <模型>    :: 停止运行中的模型
ollama rm <模型>      :: 删除模型
ollama cp <a> <b>     :: 复制模型
ollama push/pull     :: 推送到/从模型仓库拉取
```

对话模式内快捷键：
- `/bye`：退出对话
- `/help` 或 `/?`：查看简单帮助

---

## 五、模型拉取与运行（DeepSeek-R1 示例）

```cmd
ollama run deepseek-r1          :: 默认拉取并运行 7b 版本
ollama run deepseek-r1:1.5b    :: 指定更小版本（低配机器友好）
```

- 首次运行会自动从 registry 拉取模型，随后直接在终端对话框中交互。
- **模型大小选择参考显存**：例如 8G 显卡可选 7b（约 4.5G）；显存更小可选 1.5b / 7b 以下版本。模型库地址：https://ollama.com/library/deepseek-r1
- 其他常用模型：`qwen2.5`、`llama3.1`、`phi3` 等，命名规则一致。

---

## 六、进阶补充（原文未覆盖部分）

> 以下为原文未涉及的开发接入与部署方式，作为补充内容。

### 1. API 调用（REST）
Ollama 自带兼容 OpenAI 风格的本地 REST API，默认地址 `http://localhost:11434`。

**生成（无上下文）** `POST /api/generate`：
```bash
curl http://localhost:11434/api/generate -d '{
  "model": "deepseek-r1",
  "prompt": "用一句话解释什么是向量数据库",
  "stream": false
}'
```

**对话（带历史）** `POST /api/chat`：
```bash
curl http://localhost:11434/api/chat -d '{
  "model": "deepseek-r1",
  "messages": [{"role":"user","content":"你好"}],
  "stream": false
}'
```

**Python 调用**（推荐用官方库）：
```python
import ollama
resp = ollama.chat(
    model="deepseek-r1",
    messages=[{"role": "user", "content": "用一句话解释什么是向量数据库"}]
)
print(resp["message"]["content"])
```

### 2. WebUI（可视化界面）
终端对话不够直观，可接图形界面：

- **Open WebUI**（原 Ollama WebUI）：功能最全，支持多模型、对话管理、RAG。
  ```bash
  docker run -d -p 3000:8080 -e OLLAMA_BASE_URL=http://host.docker.internal:11434 \
    -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
  ```
- **Chatbox**：轻量桌面客户端，下载即用，填入 `http://localhost:11434` 即可连接本地 Ollama。

### 3. Docker 部署（跨平台 / 服务器）
适合 Linux 服务器或无图形界面环境：
```bash
:: 启动 Ollama 服务容器
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama

:: 在容器内拉取并运行模型
docker exec -it ollama ollama run deepseek-r1
```
若使用 NVIDIA GPU，需先安装 `nvidia-container-toolkit`，并加 `--gpus all` 参数。

---

## 七、常见问题

| 问题 | 可能原因 / 解法 |
|------|----------------|
| 下载慢或失败 | 网络受限，可换网络环境；或用文中提供的网盘安装包；Docker 镜像可配国内加速源 |
| 显存不足（OOM） | 换更小模型（如 1.5b）；关闭其他占显存程序；Docker 部署确认正确挂载 GPU |
| 端口 11434 被占用 | 检查是否有其他 Ollama 实例；或修改服务监听端口 |
| 模型回答突然变慢 | 空闲超过 5 分钟后模型被释放，下次请求需重新加载，属正常现象 |
| API 连不上 | 确认 Ollama 服务已启动（右下角图标），且请求地址为 `localhost:11434` |
| GPU 未生效（只用 CPU） | 确认显卡驱动/CUDA 正常；Docker 方式需 `--gpus all` |

---

## 八、小结

本地部署 Ollama 的核心三步：**安装 → 配置存储路径 → `ollama run` 拉模型对话**。日常使用掌握 `run / pull / list / rm` 即可；若要接入自己的应用，用 `11434` 端口的 REST API 或官方 SDK；想要图形界面就接 Open WebUI / Chatbox；服务器或无界面环境用 Docker 一行跑起。

> 记忆口诀：**装好 Ollama，设好 MODELS 路径，run 一下就能聊；要开发走 API，要好看来 WebUI，要上服务器用 Docker。**
