---
date: 2026-07-24 15:29:29
title: ONNX Runtime 动态库（.dll）安装与 MinGW-w64 对接
permalink: /pages/ort001
categories:
  - AI
  - 推理环境
---

# ONNX Runtime 动态库（.dll）安装与 MinGW-w64 对接

> 本文承接《[MinGW-w64 安装教程](./MinGW-w64安装教程.md)》。MinGW-w64 提供 GCC 编译环境，ONNX Runtime 提供 AI 模型**推理引擎**。两者搭配，即可在 Windows 上用 C/C++ 编译并运行 ONNX 模型的本地推理程序。
>
> 重点：本文讲的是**动态库（`.dll`）**用法——程序运行时才加载 `onnxruntime.dll`，而非静态链接。

---

## 一、ONNX Runtime 是什么

- **ONNX Runtime（ORT）** 是微软开源的**跨平台推理引擎**，专门用于执行 ONNX（Open Neural Network Exchange）格式的模型。
- 它把训练框架（PyTorch / TensorFlow / 飞桨等）导出的模型，统一在一个高性能运行时里跑起来，支持 CPU、CUDA、TensorRT、DirectML、OpenVINO 等多种**执行提供方（Execution Provider, EP）**。
- 提供 **C API**（最稳定、跨编译器友好）和 **C++ API**（更现代但涉及 STL/ABI），以及 Python / C# / Java 等绑定。

> 一句话：**PyTorch 训练 → 导出 ONNX → ONNX Runtime 推理**。本教程只装「推理侧」的运行时动态库。

---

## 二、下载 Windows x64 动态库包

打开 ONNX Runtime 的 GitHub Releases：

```
https://github.com/microsoft/onnxruntime/releases
```

在最新稳定版（撰写时为 **v1.27.1**）的 Assets 中，下载 **Windows x64 的 C++ CPU 包**：

```
onnxruntime-win-x64-1.27.1.zip
```

- 下载地址示例：
  ```
  https://github.com/microsoft/onnxruntime/releases/download/v1.27.1/onnxruntime-win-x64-1.27.1.zip
  ```
- 如需 **GPU（CUDA）** 加速，选同名带 `-gpu-` 的包：`onnxruntime-win-x64-gpu-1.27.1.zip`（需另装对应 CUDA/cuDNN）。
- 版本号会随时间更新，请认准 `onnxruntime-win-x64-X.Y.Z.zip` 这个命名规律。

---

## 三、解压与目录结构

把 `.zip` 解压到**无中文、无空格**的路径，例如：

```
C:\Tools\onnxruntime-win-x64-1.27.1
```

解压后的关键内容：

| 路径 | 说明 |
|------|------|
| `include/onnxruntime_c_api.h` | **C API 头文件**（与 MinGW 对接最稳） |
| `include/onnxruntime_cxx_api.h` | C++ API 头文件（注意 ABI，见第六节） |
| `lib/onnxruntime.lib` | MSVC 生成的**导入库**（COFF 格式） |
| `onnxruntime.dll` | **核心运行时动态库**（CPU 推理必需） |
| `onnxruntime_providers_*.dll` | 各执行提供方库（如 CUDA / TensorRT，GPU 包才有） |

> ⚠️ **关键点**：`onnxruntime.dll` 是程序**运行时**要找的库。编译时只需头文件和导入库，运行时必须让系统能找到这个 `.dll`。

---

## 四、让程序运行时能找到 onnxruntime.dll

两种常用做法（任选其一）：

1. **放到系统 PATH**（推荐开发期）：
   把 ONNX Runtime 根目录（即 `onnxruntime.dll` 所在目录）加入系统环境变量 `Path`，方法同 MinGW 教程的第四步。

2. **放到可执行文件旁边**（推荐发布/部署）：
   把 `onnxruntime.dll` 复制到你的 `.exe` 同一目录下，部署时一起带走，最省心。

> 验证：在 CMD 输入 `where onnxruntime.dll`，能显示路径即配置成功。

---

## 五、用 MinGW-w64（GCC）编译对接

### 方案 A（推荐）：用 C API + 生成 MinGW 导入库

官方包里的 `onnxruntime.lib` 是 **MSVC 的 COFF 导入库**，MinGW 的 `ld` 不一定能直接吃。最稳妥的方式是用 MinGW 自带的 `gendef` + `dlltool` 从 `onnxruntime.dll` **反向生成一个 MinGW 兼容的 `.a` 导入库**：

```shell
:: 进入 ONNX Runtime 的 lib 目录
cd C:\Tools\onnxruntime-win-x64-1.27.1\lib

:: 1. 从 dll 导出符号定义
gendef ..\onnxruntime.dll > onnxruntime.def

:: 2. 生成 MinGW 导入库 libonnxruntime.a
dlltool -d onnxruntime.def -l libonnxruntime.a -D ..\onnxruntime.dll
```

生成后得到 `lib\libonnxruntime.a`，之后编译链接：

```shell
g++ main.cpp ^
  -IC:\Tools\onnxruntime-win-x64-1.27.1\include ^
  -LC:\Tools\onnxruntime-win-x64-1.27.1\lib ^
  -lonnxruntime ^
  -o app.exe
```

> 说明：`-lonnxruntime` 会链接到 `libonnxruntime.a`（我们刚生成的导入库），运行时再去找 `onnxruntime.dll`。

### 方案 B（备选）：直接链接 MSVC 的 .lib

部分 MinGW 版本可直接识别 MSVC 导入库，可尝试跳过 `gendef` 步骤，直接：

```shell
g++ main.cpp -IC:\Tools\onnxruntime-win-x64-1.27.1\include -LC:\Tools\onnxruntime-win-x64-1.27.1\lib -lonnxruntime -o app.exe
```

若出现 `undefined reference` 或 `file not recognized` 等链接错误，退回**方案 A**。

---

## 六、最小推理示例（C API）

下面代码仅演示**环境创建 + 模型会话加载**，证明动态库已正确链接（需准备一个真实的 `model.onnx`）：

```cpp
#include <onnxruntime_c_api.h>
#include <cstdio>

int main() {
    // 获取 ONNX Runtime C API 接口
    const OrtApi* ort = OrtGetApiBase()->GetApi(ORT_API_VERSION);

    OrtEnv* env = nullptr;
    ort->CreateEnv(ORT_LOGGING_LEVEL_WARNING, "demo", &env);

    OrtSessionOptions* so = nullptr;
    ort->CreateSessionOptions(&so);

    OrtSession* session = nullptr;
    // Windows 下模型路径需为宽字符
    const wchar_t* model_path = L"model.onnx";
    OrtStatus* status = ort->CreateSession(env, model_path, so, &session);

    if (status != nullptr) {
        printf("加载模型失败：%s\n", ort->GetErrorMessage(status));
        ort->ReleaseStatus(status);
    } else {
        printf("ONNX Runtime 会话创建成功！版本：%s\n",
               OrtGetApiBase()->GetVersionString());
    }

    if (session) ort->ReleaseSession(session);
    ort->ReleaseSessionOptions(so);
    ort->ReleaseEnv(env);
    return 0;
}
```

编译运行：

```shell
g++ main.cpp -IC:\Tools\onnxruntime-win-x64-1.27.1\include -LC:\Tools\onnxruntime-win-x64-1.27.1\lib -lonnxruntime -o app.exe
app.exe
```

预期输出类似 `ONNX Runtime 会话创建成功！版本：1.27.1`。

> 💡 **为什么用 C API 而不是 C++ API？** C++ API 大量使用 STL 容器/字符串，不同编译器（MinGW GCC vs MSVC）的 STL 实现 ABI 不兼容，跨编译器调用容易崩溃。C API 只传裸指针，最安全。我们前面选了 **UCRT** 版 MinGW，与 ORT 的 MSVC UCRT 构建同源，但 STL 仍不同，**推理代码仍建议走 C API**。

---

## 七、常见问题排查

1. **「由于找不到 onnxruntime.dll，无法继续执行代码」**
   → 运行时找不到 DLL。把 `onnxruntime.dll` 所在目录加入 `Path`，或把 DLL 复制到 `.exe` 旁边。

2. **链接报 `undefined reference to OrtGetApiBase`**
   → 导入库没链上。确认 `-L` 路径正确且 `libonnxruntime.a` 已生成（方案 A）；或改回直接链 MSVC `.lib`（方案 B）。

3. **`file not recognized: file format not recognized`**
   → 直接链了 MSVC `.lib` 但 MinGW 不认。用 `gendef` + `dlltool` 生成 `.a` 后再链。

4. **用 C++ API 运行崩溃**
   → STL/ABI 跨编译器不兼容。改用 C API（见第六节）。

5. **需要 GPU 加速**
   → 下载 `-gpu-` 包，除 `onnxruntime.dll` 外，还需把 `onnxruntime_providers_cuda.dll` 等放入可达路径，并在代码中启用 CUDA EP。

---

## 八、记忆要点

> **ONNX Runtime = ONNX 模型推理引擎；下载 `onnxruntime-win-x64-X.Y.Z.zip` → 解压 → `onnxruntime.dll` 加入 Path 或放 exe 旁 → MinGW 用 `gendef`+`dlltool` 从 dll 生成 `.a` 导入库 → `-lonnxruntime` 链接 → 用 C API 写推理代码。**
> **动态库（.dll）的核心：编译靠头文件+导入库，运行靠能找到 `onnxruntime.dll`。**
