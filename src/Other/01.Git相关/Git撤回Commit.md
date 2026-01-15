---
date: 2026-01-15 14:45:12
title: Git撤回Commit
permalink: /pages/3de2af
categories:
  - Other
  - Git相关
---

# Git Commit 撤回指南

Git 中撤回 commit 的本质是回退 HEAD 指针或生成反向提交。
第一判断条件：是否已经 push 到远端。

## 一、未 push 的 commit（本地提交）

### 1. 撤回 commit，保留代码

```bash
git reset --soft HEAD~1
```

说明：
- 最近一次 commit 被撤回
- 修改内容仍保留
- 可重新提交

### 2. 撤回 commit，并丢弃代码（高风险）

```bash
git reset --hard HEAD~1
```

说明：
- commit 与代码同时删除
- 不可恢复（除非使用 reflog）

### 3. 修改最近一次 commit

```bash
git commit --amend
```

适用场景：
- 修改 commit message
- 补充遗漏文件

注意：
- 仅适用于未 push 的提交

## 二、已 push 的 commit（远端存在）

### 1. 使用 revert（推荐）

```bash
git revert <commit-id>
```

特点：
- 生成新的 commit
- 用于撤销指定提交
- 不破坏历史
- 不影响他人协作

适用分支：
- main
- develop

### 2. 强制回退历史（慎用）

```bash
git reset --hard HEAD~1
git push -f
```

或：

```bash
git push --force-with-lease
```

风险说明：
- 重写远端历史
- 可能导致他人分支异常
- 仅限个人分支

## 三、常见场景速查

| 场景 | 推荐命令 |
| ---- | -------- |
| 未 push，想修改提交 | git commit --amend |
| 未 push，想撤回提交 | git reset --soft |
| 已 push，公共分支 | git revert |
| 已 push，私人分支 | reset + force |

## 四、使用原则

- 能 revert 就不要 force
- 公共分支优先保证历史稳定
- 是否影响他人是第一判断条件
