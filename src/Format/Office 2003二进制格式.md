---
date: 2026-09-10 14:16:05
title: Office 2003 二进制文件格式
categories:
  - Format
  - Office
permalink: /pages/65ea19
---

Office 2003 及更早版本的 Word、Excel、PowerPoint 文档，通常使用一套基于 OLE Compound File 的二进制文件格式。常见扩展名包括：

- Word：`.doc`
- Excel：`.xls`
- PowerPoint：`.ppt`
- 复合文档：`.vsd`、`.msg`、`.mpp` 等

这些文件与 Office 2007 之后常见的 `.docx`、`.xlsx`、`.pptx` 不同。后者本质上是 ZIP 容器中的 XML 文件，而 Office 2003 格式通常是一个二进制复合文件。

## 一、什么是 OLE Compound File

OLE Compound File 的全称是 **Object Linking and Embedding Compound File**，中文通常称为 OLE 复合文件、复合文档或 Compound File Binary Format（CFBF）。

它可以把多个逻辑对象组织在一个文件中，结构上类似一个小型文件系统：

```text
Compound File
├── Storage（类似目录）
│   ├── Storage
│   └── Stream（类似文件）
├── Stream
├── Stream
└── 目录信息、分配表、元数据
```

因此，`.doc` 文件并不是一段从头到尾连续排列的文本，而是由多个 Stream 和 Storage 组成。不同 Office 应用会在这些 Stream 中保存正文、样式、表格、图片、宏、嵌入对象和文档属性等内容。

## 二、文件头特征

标准 OLE 复合文件通常以以下 8 个字节开头：

```text
D0 CF 11 E0 A1 B1 1A E1
```

用十六进制工具查看文件头：

```bash
xxd -l 16 document.doc
```

也可以使用 PowerShell：

```powershell
Format-Hex -Path .\document.doc -Count 16
```

如果文件头以 `D0 CF 11 E0 A1 B1 1A E1` 开始，通常可以判断它属于 OLE Compound File。但需要注意：文件头只能说明容器类型，不能单独证明文件一定是 Word、Excel 或 PowerPoint 文档。

## 三、OLE 复合文件的主要结构

### 1. Header

Header 位于文件起始位置，记录整个复合文件的基本参数，例如：

- 文件签名；
- 版本号；
- 字节序；
- 扇区大小；
- Mini Stream 扇区大小；
- FAT、DIFAT、Directory 等结构的位置和数量；
- 根 Storage 的信息。

常见 OLE 文件使用 512 字节扇区。较大的版本可能使用 4096 字节扇区，具体数值应以 Header 中的字段为准。

### 2. FAT（File Allocation Table）

FAT 用于描述普通扇区之间的链接关系。一个 Stream 可能并不连续存储在文件中，FAT 会把它的多个扇区串联起来，类似传统文件系统中的簇链。

```text
Stream 起始扇区
      │
      ▼
  Sector 12 ──> Sector 35 ──> Sector 36 ──> End Of Chain
```

常见特殊值包括：

- `FREESECT`：空闲扇区；
- `FATSECT`：当前扇区用于保存 FAT；
- `DIFSECT`：当前扇区用于保存 DIFAT；
- `ENDOFCHAIN`：链结束；
- `NOSTREAM`：没有对应 Stream。

### 3. DIFAT（Double-Indirect FAT）

当文件较大、FAT 扇区较多时，Header 不能容纳所有 FAT 扇区的位置，此时使用 DIFAT 保存更多 FAT 扇区索引。它可以理解为 FAT 的索引表，用于帮助解析器找到完整的 FAT。

### 4. Directory

Directory 保存 Storage 和 Stream 的目录项。每个目录项通常包含：

- 名称；
- 对象类型；
- 左、右、子节点关系；
- CLSID；
- 创建时间和修改时间；
- 起始扇区；
- Stream 大小。

Directory 中的节点关系通常组织成红黑树，用于快速定位对象。

### 5. MiniFAT 与 Mini Stream

对于体积较小的 Stream，直接使用完整扇区会造成空间浪费。OLE 会把小于特定阈值的 Stream 放入 Mini Stream，再使用 MiniFAT 管理这些小块。

常见实现中，Stream 小于 4096 字节时可能使用 Mini Stream，但实际判断应以格式字段和解析器规则为准，不应仅根据文件大小进行猜测。

### 6. Root Entry

Root Entry 是整个 OLE 复合文件的根 Storage，通常名称为 `Root Entry`。它负责管理 Mini Stream，并作为所有 Storage 和 Stream 的根节点。

## 四、Word、Excel、PowerPoint 的差异

三类文档可以共用 OLE 容器，但内部 Stream 的组织方式和业务数据格式不同。

| 文件类型 | 常见扩展名 | 主要内容 |
| --- | --- | --- |
| Word 文档 | `.doc` | 文本、段落、样式、表格、图片、批注、修订记录、宏 |
| Excel 工作簿 | `.xls` | 工作表、单元格、公式、格式、图表、名称、宏 |
| PowerPoint 演示文稿 | `.ppt` | 幻灯片、文本框、图片、形状、动画、备注、宏 |

容器层可以通过 OLE 解析，但要完整读取正文或业务结构，还需要对应的文档格式解析器。例如，读取 Word 正文不能只把 OLE Stream 当作普通文本，因为内容通常还包含二进制记录、压缩数据或复杂的偏移关系。

### Word `.doc`

Word 二进制文档中常见 `WordDocument` Stream，以及用于保存表格、对象和其他数据的相关 Stream。正文可能涉及 FIB（File Information Block）、Piece Table 等结构，需要结合 Word Binary File Format 规范解析。

### Excel `.xls`

Excel 97-2003 工作簿使用 BIFF（Binary Interchange File Format）记录保存数据。工作表通常由一系列记录组成，每条记录包含记录类型、长度和数据内容。

典型记录可能包括：

- `BOF`：流或子文档开始；
- `EOF`：流或子文档结束；
- `SST`：共享字符串表；
- `NUMBER`：数值单元格；
- `LABELSST`：引用共享字符串的单元格；
- `FORMULA`：公式单元格。

### PowerPoint `.ppt`

PowerPoint 二进制格式以记录树保存演示文稿内容，记录中可能包含幻灯片、文本、图形、媒体、备注和动画信息。由于其对象层级较复杂，通常使用专门的 PowerPoint 解析库，而不是手动按字节处理。

## 五、与 Office Open XML 的区别

Office 2007 以后引入了 Office Open XML（OOXML）格式，常见扩展名为 `.docx`、`.xlsx` 和 `.pptx`。

| 对比项 | Office 2003 二进制格式 | OOXML 格式 |
| --- | --- | --- |
| 容器 | OLE Compound File | ZIP |
| 内容 | 二进制记录和 Stream | XML、媒体和关系文件 |
| 常见扩展名 | `.doc`、`.xls`、`.ppt` | `.docx`、`.xlsx`、`.pptx` |
| 可读性 | 不适合直接阅读 | XML 部分可直接查看 |
| 解析方式 | 需要 OLE + 专用二进制格式解析器 | 解压后按 XML 和关系文件解析 |
| 宏文件 | 通常嵌入 OLE 容器 | 通常使用 `.docm`、`.xlsm`、`.pptm` |
| 文件损坏定位 | 需要分析扇区链和内部记录 | 通常可以定位到具体 XML 部件 |
| 兼容性 | 老版本 Office 兼容性好 | 现代 Office 默认格式 |

可以使用 `file` 和 `unzip` 对两类文件做初步区分：

```bash
file document.doc
type document.docx
unzip -l document.docx
```

`.docx` 文件可以用 ZIP 工具列出内容，常见目录包括：

```text
[Content_Types].xml
_rels/
docProps/
word/
xl/
ppt/
```

而 `.doc` 通常不能直接按 ZIP 文件处理。

## 六、如何识别和验证文件格式

### 1. 不要只相信扩展名

扩展名可以被任意修改。例如，一个 OLE 文件可以被重命名为 `.jpg`，一个 ZIP/OOXML 文件也可以被重命名为 `.doc`。安全分析时应优先查看文件头和容器结构。

```bash
file suspicious-file
xxd -l 16 suspicious-file
```

### 2. 校验 OLE 结构

Linux 下可以使用 `olefile`：

```bash
python -m pip install olefile
python - <<'PY'
import olefile

path = "document.doc"
if olefile.isOleFile(path):
    with olefile.OleFileIO(path) as ole:
        for entry in ole.listdir():
            print("/".join(entry))
else:
    print("不是有效的 OLE Compound File")
PY
```

也可以使用 `7z` 查看容器中的目录：

```bash
7z l document.doc
```

`7z` 能否完整列出内容取决于文件结构和工具版本，因此不能替代专业解析器。

### 3. 使用专用工具提取文档信息

常见工具包括：

- `olefile`：Python OLE 容器解析库；
- `oletools`：分析 OLE、VBA 宏和嵌入对象；
- `oledump.py`：按 Stream 查看 OLE 文件内容；
- `mraptor`：检测 VBA 宏的潜在恶意行为特征；
- `exiftool`：提取文档元数据；
- LibreOffice headless：执行格式转换和批量处理；
- Apache POI：Java 生态中的 Office 文档处理库。

例如使用 `olevba` 提取 VBA 宏：

```bash
olevba suspicious.doc
```

分析不可信文件时，建议在隔离环境中执行工具，并先计算哈希值保存证据：

```bash
sha256sum suspicious.doc
file suspicious.doc
olevba suspicious.doc
```

## 七、格式转换建议

### 使用 LibreOffice 转换

可以在无图形界面的环境中进行转换：

```bash
libreoffice --headless --convert-to docx --outdir ./converted document.doc
libreoffice --headless --convert-to xlsx --outdir ./converted workbook.xls
libreoffice --headless --convert-to pptx --outdir ./converted presentation.ppt
```

批量转换前应注意：

- 复杂排版可能发生变化；
- Excel 公式、宏和外部链接可能受到影响；
- PowerPoint 动画、字体和媒体兼容性需要人工复核；
- 转换不等于安全清洗，恶意对象或宏不应在不可信环境中直接打开。

### 使用 Office 软件另存为

在现代 Office 中打开旧格式文件后，可以通过“另存为”转换为 `.docx`、`.xlsx` 或 `.pptx`。如果文件来源不可信，应先在受控环境中分析，不建议直接使用主机上的 Office 打开。

## 八、安全分析重点

Office 2003 二进制格式在安全分析中需要重点关注以下内容。

### 1. OLE 容器中的宏

旧版 Office 文档常见 VBA 宏。宏可以调用系统命令、访问文件、修改注册表、启动脚本解释器或下载其他载荷。

宏分析时至少应关注：

- `AutoOpen`、`Document_Open`、`Workbook_Open` 等自动执行入口；
- `Shell`、`CreateObject`、`WScript.Shell` 等命令执行能力；
- `URLDownloadToFile`、HTTP 请求和网络通信；
- Base64、十六进制、字符串拼接等混淆；
- `CreateFile`、注册表操作和计划任务；
- 是否存在嵌入式 OLE 对象或外部链接。

### 2. 嵌入对象与外部链接

文档可能嵌入其他文件，或包含指向外部资源的链接。分析时应检查：

- OLE Object Stream；
- Package 对象；
- DDE 相关字段；
- 外部模板和远程链接；
- 嵌入的脚本、可执行文件或压缩包。

### 3. 文件头伪装

扩展名与文件头不一致是恶意样本中常见的伪装方式。检测流程应至少包含：

```text
扩展名检查
    ↓
文件头检查
    ↓
容器结构检查
    ↓
宏与嵌入对象提取
    ↓
沙箱或隔离环境动态分析
```

### 4. 不要直接打开样本

即使关闭宏，文档解析器本身也可能存在漏洞。处理未知来源的 `.doc`、`.xls`、`.ppt` 时建议：

- 使用无网络隔离环境；
- 先计算 SHA-256；
- 不使用宿主机上的敏感凭据；
- 禁止自动加载外部资源；
- 不在分析机上启用宏；
- 保存原始样本，分析副本单独处理；
- 对提取出的嵌入文件继续进行类型和哈希检查。

## 九、常见判断误区

### 误区一：`.doc` 一定是 Office 2003 格式

`.doc` 主要表示 Word 文档扩展名，但并不保证内部一定是标准 Office 2003 二进制格式。文件可能被伪造、损坏、重命名，甚至是其他容器。

### 误区二：看到 OLE 文件头就一定有宏

OLE 只是容器格式，许多正常文档和非 Office 文件同样使用 OLE。检测宏需要继续枚举 Stream，并分析 VBA 项目和嵌入对象。

### 误区三：转换成 `.docx` 就完成安全清洗

格式转换可能移除部分宏或对象，但不应将其当作可靠的安全边界。转换工具本身也可能解析恶意数据，转换前后的文件都应重新检查。

### 误区四：把二进制文件当文本搜索

直接用文本编辑器搜索 `.doc`、`.xls`、`.ppt`，通常只能看到零散字符串，无法正确理解记录、偏移和 Stream 关系。应先识别容器，再使用对应解析器。

## 十、总结

Office 2003 格式的核心可以概括为：

1. `.doc`、`.xls`、`.ppt` 通常使用 OLE Compound File 作为容器；
2. OLE 容器内部由 Header、FAT、DIFAT、Directory、MiniFAT、Mini Stream 和多个 Stream 组成；
3. Word、Excel、PowerPoint 在同一容器模型下使用不同的二进制业务格式；
4. 文件头 `D0 CF 11 E0 A1 B1 1A E1` 可作为 OLE 文件的初步识别特征；
5. 与 OLE 二进制格式相比，Office Open XML 使用 ZIP + XML 结构，更适合解压和部件化分析；
6. 安全分析不能只看扩展名，应结合文件头、容器结构、宏、嵌入对象和外部链接综合判断。

在实际工作中，可以把分析流程固定为：**识别文件头 → 判断容器 → 枚举内部对象 → 提取宏和嵌入文件 → 计算哈希 → 隔离环境分析 → 必要时转换并复核**。
