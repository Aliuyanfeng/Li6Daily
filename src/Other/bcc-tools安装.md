---
date: 2024-11-03 16:10:42
title: bcc-tools安装
permalink: /pages/08e4a9
categories:
  - Other
---
# 安装bcc-tools
## ⚠️Tips
bcc-tools 需要内核版本为 4.1 或者更新的版本, 内核版本查看`uname -r`
## 联网安装
根据包管理器不同，执行install命令即可  
example: `yum install bcc-tools`、`apt install bcc-tools`

## 离线安装
离线rpm包  
```shell
# 安装目录内所有软件包
rpm -ivh --force --nodeps /opt/bcc-offline/*.rpm
# 设置环境变量
export PATH=$PATH:/usr/share/bcc/tools
# 使其生效
source /etc/profile
```