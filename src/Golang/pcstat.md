<!--
 * @Author: LiuYanFeng
 * @Date: 2025-05-22 15:12:20
 * @LastEditors: LiuYanFeng
 * @LastEditTime: 2025-05-22 15:35:50
 * @FilePath: \Li6Daily\src\Golang\pcstat.md
 * @Description: 像珍惜礼物一样珍惜今天
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
# PCSTAT

pcstat 全称 Page Cache STATistics, 用来统计某个文件的页缓存命中情况，也可以批量对目录或文件集合进行分析。

## 安装

仅记录离线安装方式
```bash
# 下载源码
git clone https://github.com/tobert/pcstat
# 进入目录
cd pcstat
# 加载离线mod
go mod vendor
# 将源码目录路上传至可编译环境下
go build
# 将编译后的二进制文件拷贝至/usr/local/bin目录下
sudo cp -a pcstat /usr/local/bin
# 测试
pcstat /usr/local/bin/pcstat

```
## 测试
测试截图
![alt text](assets/pcstat/image.png)


字段说明
| 字段名              | 含义说明                                                 |
| ---------------- | ---------------------------------------------------- |
| **Name**         | 文件路径，支持相对或绝对路径                                       |
| **Size (bytes)** | 文件总字节大小（Byte），可以用来换算成页数做校验                           |
| **Pages**        | 文件总共占用了多少页（通常一页 4KB，依据系统 `getconf PAGE_SIZE`）            |
| **Cached**       | 有多少页当前在\*\*页缓存（page cache）\*\*中                      |
| **Percent**      | 命中率，即：`Cached / Pages * 100`，表示这个文件被 page cache 命中比例 |

参数说明
| 参数           | 含义                                      |
| ------------ | --------------------------------------- |
| `-bname`     | 将文件路径转换为 basename（文件名，不含路径），便于缩短输出行宽    |
| `-histo`     | 输出命中率的直方图风格图表（非表格），便于快速评估               |
| `-json`      | 输出 JSON 格式，便于脚本或其他程序读取                  |
| `-nohdr`     | 省略表头（适合脚本处理）                            |
| `-pid <int>` | 针对某个进程（pid），统计其所有映射文件的缓存命中              |
| `-plain`     | 不使用 box-drawing 字符，输出为纯 ASCII（适合终端简洁输出） |
| `-pps`       | JSON 模式下，输出每个页面的缓存命中详情（per-page status） |
| `-sort`      | 以 Cached 页数排序（默认降序）                     |
| `-terse`     | 简洁输出，不含表格边框                             |
| `-unicode`   | 使用 Unicode 表格边框字符（默认）                   |



