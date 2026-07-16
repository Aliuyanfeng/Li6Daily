---
date: 2024-09-05 14:00:00
title: HTTP 基本概念
outline: deep
lastUpdated: true
footer: true
permalink: /pages/c2d4f6
categories:
  - Linux
  - 计算机网络
  - HTTP
---

## 一、HTTP 是什么？

**HTTP（HyperText Transfer Protocol，超文本传输协议）** 是工作在 **TCP/IP 协议族**之上的**应用层协议**，用于客户端（通常是浏览器）和服务器之间传输超文本（HTML、图片、视频、JSON 等）。

核心特征：

- **基于 TCP**：HTTP/1.1 和 HTTP/2 都基于 TCP（HTTP/3 改为基于 UDP 的 QUIC）。
- **请求-响应模型**：客户端主动发起请求（Request），服务器返回响应（Response）。
- **无状态（Stateless）**：服务器不保存客户端的请求历史，每次请求相互独立。状态由 Cookie / Session / Token 等手段在应用层维持。
- **无连接（早期）**：HTTP/1.0 每次请求都要新建 TCP 连接；HTTP/1.1 默认开启 `Connection: keep-alive` 复用连接。

版本演进：

| 版本 | 关键特性 |
|------|----------|
| HTTP/0.9 | 仅支持 GET，无头部，纯文本 |
| HTTP/1.0 | 引入请求头/响应头、状态码 |
| HTTP/1.1 | 持久连接、管道化、分块传输、Host 头（主流） |
| HTTP/2 | 二进制分帧、多路复用、头部压缩、服务器推送 |
| HTTP/3 | 基于 QUIC（UDP），解决队头阻塞，连接迁移 |

---

## 二、HTTP 常见的状态码有哪些？

状态码由 3 位数字组成，第一位表示类别：

### 1xx（信息性）— 请求已接收，继续处理
- **100 Continue**：客户端可继续发送请求体。
- **101 Switching Protocols**：协议切换（如升级到 WebSocket）。

### 2xx（成功）— 请求已成功处理
- **200 OK**：请求成功，返回数据。
- **201 Created**：资源已创建（常见于 POST 新建）。
- **202 Accepted**：请求已接受但尚未处理完。
- **204 No Content**：成功但无返回体（如 DELETE）。
- **206 Partial Content**：范围请求成功（断点续传）。

### 3xx（重定向）— 需要进一步操作
- **301 Moved Permanently**：永久重定向（SEO 权重转移）。
- **302 Found**：临时重定向。
- **303 See Other**：重定向到另一个资源（应使用 GET）。
- **304 Not Modified**：资源未修改，使用缓存（**缓存核心状态码**）。
- **307 Temporary Redirect**：临时重定向，方法和 body 不变。
- **308 Permanent Redirect**：永久重定向，方法和 body 不变。

### 4xx（客户端错误）— 请求有问题
- **400 Bad Request**：请求语法错误。
- **401 Unauthorized**：未认证（需登录）。
- **403 Forbidden**：无权限访问（已认证但被拒绝）。
- **404 Not Found**：资源不存在。
- **405 Method Not Allowed**：请求方法不被允许。
- **408 Request Timeout**：请求超时。
- **409 Conflict**：请求与资源当前状态冲突。
- **413 Payload Too Large**：请求体过大。
- **429 Too Many Requests**：限流，请求过于频繁。

### 5xx（服务器错误）— 服务器处理失败
- **500 Internal Server Error**：服务器内部错误。
- **501 Not Implemented**：功能未实现。
- **502 Bad Gateway**：网关/代理收到无效响应。
- **503 Service Unavailable**：服务不可用（过载或维护）。
- **504 Gateway Timeout**：网关超时。
- **505 HTTP Version Not Supported**：HTTP 版本不支持。

> 记忆口诀：**1 信息、2 成功、3 重定向、4 客户端错、5 服务端错。**

---

## 三、HTTP 常见字段有哪些？

### 通用字段（请求和响应都可用）
| 字段 | 说明 |
|------|------|
| `Cache-Control` | 缓存控制（如 `max-age=3600`、`no-cache`） |
| `Connection` | 控制连接（如 `keep-alive`、`close`） |
| `Date` | 报文创建时间 |
| `Transfer-Encoding` | 传输编码（如 `chunked` 分块） |
| `Content-Type` | 实体媒体类型（如 `application/json`） |
| `Content-Length` | 实体长度（字节） |

### 请求字段（Request Headers）
| 字段 | 说明 |
|------|------|
| `Host` | 目标主机名（HTTP/1.1 必需，用于虚拟主机） |
| `User-Agent` | 客户端标识（浏览器/系统信息） |
| `Accept` | 客户端可接受的响应类型 |
| `Accept-Encoding` | 可接受的压缩方式（gzip、br 等） |
| `Accept-Language` | 可接受的语言 |
| `Authorization` | 认证凭据（如 Bearer Token） |
| `Cookie` | 客户端携带的 Cookie |
| `Referer` | 来源页面 URL |
| `Range` | 请求部分内容（断点续传，`bytes=0-1023`） |
| `Origin` | 跨域请求的源 |

### 响应字段（Response Headers）
| 字段 | 说明 |
|------|------|
| `Server` | 服务器软件信息 |
| `Set-Cookie` | 服务器下发 Cookie |
| `Location` | 重定向目标地址（配合 3xx） |
| `ETag` | 资源版本标识（缓存校验） |
| `Last-Modified` | 资源最后修改时间（缓存校验） |
| `Expires` | 资源过期时间（绝对时间，HTTP/1.0） |
| `Access-Control-Allow-Origin` | 跨域允许的来源 |
| `Content-Encoding` | 实际使用的压缩方式 |
| `WWW-Authenticate` | 认证挑战信息 |

---

## 四、GET 和 POST 有什么区别？

| 对比维度 | GET | POST |
|----------|-----|------|
| **语义** | 获取资源（幂等、安全） | 提交/创建资源（非幂等） |
| **参数位置** | 拼在 URL 查询字符串中 | 放在请求体（body）中 |
| **数据长度** | 受 URL 长度限制（约 2KB~8KB，因浏览器而异） | 理论上无限制 |
| **安全性** | 参数暴露在 URL、浏览器历史、日志中，不适合传敏感信息 | 数据在 body 中，相对不直接暴露（但**仍需 HTTPS** 才安全） |
| **缓存** | 可被浏览器缓存、收藏为书签 | 一般不被缓存、不能收藏 |
| **幂等性** | 幂等（多次请求效果一致） | 非幂等（多次提交可能产生副作用） |
| **回退/刷新** | 无害，可重复 | 浏览器通常会弹窗确认重新提交 |
| **编码类型** | `application/x-www-form-urlencoded` | 支持 `multipart/form-data`（文件上传）等 |

> 注意：**GET 和 POST 本质没有「安全」之分**，HTTP 规范里 GET 仅是「语义上安全/幂等」，二者明文传输都需要 HTTPS 保护。所谓的「POST 比 GET 安全」是错误的，只是 POST 参数不在 URL 里。

---

## 五、HTTP 缓存有哪些实现方式？

HTTP 缓存分为**强缓存**和**协商缓存**两大类。

### 1. 强缓存（不发请求，直接用本地）
命中时浏览器**不发送请求**到服务器，直接读本地缓存，状态码显示 `200 (from cache)`。

- **`Expires`**（HTTP/1.0）：绝对过期时间，如 `Expires: Wed, 21 Oct 2026 07:00:00 GMT`。缺点：依赖客户端本地时间，可能有偏差。
- **`Cache-Control`**（HTTP/1.1，优先级更高）：相对时间，常用指令：
  - `max-age=3600`：缓存 3600 秒。
  - `public`：可被任何缓存（含 CDN）缓存。
  - `private`：仅客户端可缓存。
  - `no-cache`：不直接用缓存，需经协商缓存验证。
  - `no-store`：完全不缓存（敏感数据）。
  - `must-revalidate`：过期后必须向服务器验证。

### 2. 协商缓存（发请求，服务器判定是否用缓存）
强缓存失效后，浏览器携带校验信息发请求，服务器返回 `304 Not Modified` 表示资源未变，浏览器用本地缓存。

- **`Last-Modified` / `If-Modified-Since`**：
  - 响应头 `Last-Modified: <时间>` 记录资源最后修改时间。
  - 再次请求时请求头带 `If-Modified-Since: <时间>`，服务器比对。
  - 缺点：精度只到秒；内容没变但时间变了会误判；周期性生成内容会失效。
- **`ETag` / `If-None-Match`**（更精准，优先级高于 Last-Modified）：
  - 响应头 `ETag: "唯一标识"`（通常是文件哈希或版本号）。
  - 再次请求时请求头带 `If-None-Match: "唯一标识"`，服务器比对，相同则 `304`。

### 3. 缓存决策流程

```
请求资源
   │
   ▼
是否命中强缓存 (Cache-Control / Expires)?
   │ 是 ───► 200 (from cache)，直接用，不发请求
   │ 否
   ▼
发请求，带 If-Modified-Since / If-None-Match
   │
   ▼
服务器比对 ── 资源未变 ──► 304 Not Modified，用本地缓存
            ── 资源已变 ──► 200 OK，返回新内容并更新缓存
```

### 4. 其他缓存手段
- **Service Worker**：在浏览器端拦截请求，可编程控制缓存（PWA 离线能力）。
- **CDN 缓存**：边缘节点缓存静态资源，就近返回。
- **浏览器本地存储**：`localStorage` / `sessionStorage`（非 HTTP 缓存，但常用于缓存接口数据）。
- **HTML 的 `<meta>` 缓存**（已不推荐，作用有限）。

> 实践建议：静态资源（JS/CSS/图片）用 `Cache-Control: max-age + 文件名哈希（内容变则文件名变）`；HTML 入口用 `no-cache` 保证及时更新；接口数据用 `ETag` 协商缓存。
