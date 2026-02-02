---
date: 2026-01-19 11:29:18
title: conda更改虚拟环境位置
permalink: /pages/2702c8
categories:
  - Other
---


查看conda虚拟环境位置
```
conda config --show

# 输出 第一条是默认路径。
envs_dirs:
  - D:\DevTools\anaconda3\envs
  - C:\Users\17731\.conda\envs
  - C:\Users\17731\AppData\Local\conda\conda\envs
```
修改conda虚拟环境位置  
打开或创建"C:\Users\17731\.condarc"文件
添加以下内容：
```
channels:
  - defaults
envs_dirs:
  - D:\DevTools\anaconda3\envs
pkgs_dirs:
  - D:\DevTools\anaconda3\pkgs

```

保存后关闭文件，再次运行命令查看位置是否变更，如果仍未变更，请检查配置得文件夹是否有权限问题，可将 Anaconda3 安装路径的 Users 权限改为完全控制。