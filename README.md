# Li6Daily

基于 **[VitePress](https://vitepress.dev/)** + **[vitepress-theme-teek](https://vp.teek.top/)**（Teek 主题）构建的个人技术博客，记录学习与工作中的点滴。

- 在线访问（GitHub Pages）：<https://aliuyanfeng.github.io/Li6Daily/>
- 站点内容全部由 `src/` 下的 Markdown 文件驱动，构建产物为纯静态页面

## 环境要求

- Node.js ≥ 18（CI 环境使用 Node 18）
- npm

## 快速开始

```bash
npm install            # 安装依赖
npm run docs:dev       # 启动本地开发服务器（--host，热更新）
```

开发服务器默认地址为 `http://localhost:5173`。

### 常用命令

| 命令                   | 说明                                         |
| ---------------------- | -------------------------------------------- |
| `npm run docs:dev`     | 本地开发服务器，带热更新                     |
| `npm run docs:build`   | 生产构建，输出到 `.vitepress/dist`           |
| `npm run docs:preview` | 本地预览构建产物（`--host`）                 |
| `npm run lint`         | ESLint 全量检查                              |
| `npm run lint:fix`     | ESLint 检查并自动修复                        |
| `npm run format`       | Prettier 格式化（受 `.prettierignore` 约束） |
| `npm run format:check` | Prettier 格式检查（不写文件）                |
| `npm run test`         | Vitest 单元测试                              |

> **构建即校验**：`docs:build` 失败通常意味着 Markdown frontmatter、Vue 组件或配置文件出错。修改主题或配置后，建议用 `docs:dev` 即时验证。

## 目录结构

```
.
├── .github/workflows/deploy.yml   # GitHub Pages 部署工作流（push main 触发，最小 permissions 加固）
├── .gitlab-ci.yml                 # GitLab Pages CI 配置（push main 触发，产物路径待修正）
├── .prettierrc.json               # Prettier 配置
├── .prettierignore                # Prettier 忽略清单（产物 / 乱码文件 / 博客正文 / 成品 HTML）
├── eslint.config.mjs              # ESLint 9+ flat config（Vue + TypeScript）
├── vitest.config.mts              # Vitest 配置（jsdom 环境）
├── .vitepress/
│   ├── config.mts                 # VitePress 主配置（extends teekConfig）
│   ├── teekConfig.ts              # Teek 主题调参主入口（外观与内容行为）
│   ├── teekConfig.template.ts     # 配置参考模板，覆盖约 95% 选项（未被引用，仅供查阅）
│   ├── guide/
│   │   ├── nav.ts                 # 顶部导航（手动维护）
│   │   └── sidebar.ts             # ⚠ 已整体注释、不参与构建
│   └── theme/                     # 自定义主题层
│       ├── components/
│       │   ├── ContributeChart.vue       # 归档页发文热力图（echarts）
│       │   ├── TeekLayoutProvider.vue    # 页脚"本站已运行"计时器
│       │   └── 404.vue
│       └── composables/
│           ├── useRuntime.ts             # 运行时间统计
│           ├── useRuntime.spec.ts        # useRuntime 单元测试（Vitest）
│           └── useRibbon.ts              # canvas 彩带背景（当前未被调用）
├── src/
│   ├── index.md                   # 首页（layout: home）
│   ├── @pages/                    # 分类 / 标签 / 归档 / 清单四个虚拟页面
│   ├── AI/ Linux/ Golang/ Python/ Protocol/ OCR/ PenTest/ Other/ Format/ TimeLine/
│   │                              # 内容分类（顶层文件夹即导航分类）
│   └── public/                    # 静态资源（favicon、banner 图、独立 HTML 页面）
└── packages/                      # ⚠ Teek 主题源码副本，未接入构建，仅供阅读参考
```

## 内容写作指南

### 新增文章

1. 在对应分类下新建 Markdown 文件，例如 `src/Golang/09.新文章.md`；
2. frontmatter 中的日期、标题等由 Teek 的 `autoFrontmatter` 插件自动补全，也可手动指定 `permalink: /pages/xxxx` 作为永久链接；
3. **侧边栏自动生成**：由 Teek 的 `sidebar` 插件根据 `src/` 目录结构自动产出（配置见 `teekConfig.ts` 的 `vitePlugins.sidebarOption`），无需手动维护；
4. **顶部导航需手动维护**：新增顶级分类时，在 `.vitepress/guide/nav.ts` 中添加一项。

### 托管独立的成品 HTML 页面

对于已完成的单文件 HTML 页面（如北疆自驾路书 `src/public/20261001.html`），可直接静态托管：

1. 将文件放入 `src/public/`，构建时会被原样拷贝到站点根目录，不进入文章 / 侧边栏 / 统计体系；
2. 在 `nav.ts` 中添加导航项：

   ```ts
   { text: "北疆路书", link: "/20261001.html", target: "_blank" }
   ```

3. **`target` 属性不可省略**：VitePress 客户端路由会拦截同源链接，`public` 下的静态页面没有对应路由数据，缺少 `target` 时点击导航会被误判为 404；携带 `target`（`_blank` 新标签页或 `_self` 当前页）后由浏览器原生导航；
4. HTML 内部引用 CSS / JS / 图片请使用**相对路径**，避免 GitHub Pages 子路径部署下 404。

## 配置要点

| 配置                                   | 位置                        | 说明                                                                                      |
| -------------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------- |
| 站点标题 / 描述 / 搜索 / Markdown 扩展 | `.vitepress/config.mts`     | `extends: teekConfig` 继承 Teek 配置；时间线插件、容器中文标签、代码行号                  |
| 主题外观与行为                         | `.vitepress/teekConfig.ts`  | 博主信息、banner、文章列表、分页、百度统计、页脚、自动 frontmatter 与侧边栏插件           |
| 部署 base                              | `.vitepress/config.mts`     | 条件值：`DEPLOY_PLATFORM === 'github'` 时为 `/Li6Daily/`，否则为 `/`（本地 / Cloudflare） |
| 归档页热力图                           | `.vitepress/theme/index.ts` | 通过插槽 `teek-archives-top-before` 注入 `ContributeChart`                                |

## 部署与发布

**当前发布模式：推送到 `main` 分支自动构建部署（非标签驱动）。** 仓库未使用 git tag 或 Release 流程。

| 平台             | 触发方式             | 说明                                                                                                                                          |
| ---------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| GitHub Pages     | push `main` 自动触发 | `.github/workflows/deploy.yml`：设置 `DEPLOY_PLATFORM=github` → `npm run docs:build` → 经 `peaceiris/actions-gh-pages` 发布 `.vitepress/dist` |
| GitLab Pages     | push `main` 自动触发 | `.gitlab-ci.yml`：⚠ **产物路径不匹配**（artifacts 取 `public`，实际构建输出为 `.vitepress/dist`），启用前需修正                               |
| Cloudflare Pages | 按其接入配置         | 根路径 `base` 即可                                                                                                                            |

**Actions 权限加固**：`deploy.yml` 顶层显式声明 `permissions: { contents: write }`——`GITHUB_TOKEN` 仅保留推送 `gh-pages` 分支所需的写权限，其余全部只读；无写权限的外部用户无法通过 push 触发本仓库工作流。

## 代码质量工具

| 工具     | 配置文件                               | 范围说明                                                                                                       |
| -------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| ESLint   | `eslint.config.mjs`（flat config）     | `eslint-plugin-vue`（essential）+ `typescript-eslint`（recommended）；忽略 `packages/`、`cache/`、`dist/` 产物 |
| Prettier | `.prettierrc.json` + `.prettierignore` | 已忽略博客正文 `src/**/*.md`、`src/public/` 成品页面、乱码历史文件（`sidebar.ts`、`teekConfig.template.ts`）   |
| Vitest   | `vitest.config.mts`（jsdom 环境）      | `**/*.spec.ts`；现有用例覆盖 `useRuntime` 时间计算逻辑，主题包依赖经 `vi.mock` 隔离                            |

> 注意：`teekConfig.template.ts` 与 `guide/sidebar.ts` 为编码异常的历史文件，已同时被 ESLint 与 Prettier 排除，请勿对其运行格式化。

## 主要依赖

| 依赖                                                 | 版本范围 | 用途                                            |
| ---------------------------------------------------- | -------- | ----------------------------------------------- |
| `vitepress`                                          | ^1.2.3   | 站点框架（锁定版本以 `package-lock.json` 为准） |
| `vitepress-theme-teek`                               | ^1.5.2   | 博客主题                                        |
| `echarts`                                            | ^6.0.0   | 归档页发文热力图                                |
| `vitepress-markdown-timeline`                        | ^1.2.1   | Markdown 时间线语法插件                         |
| `sass`                                               | ^1.79.5  | 主题样式编译                                    |
| `eslint` + `eslint-plugin-vue` + `typescript-eslint` | latest   | 代码检查（Vue SFC + TypeScript）                |
| `prettier` + `eslint-config-prettier`                | latest   | 代码格式化（与 ESLint 规则协调）                |
| `vitest` + `jsdom`                                   | latest   | 单元测试运行器与 DOM 环境                       |
| `typescript`                                         | latest   | TypeScript 语言服务（ESLint 解析依赖）          |

主题配置的完整参考请查阅 [Teek 官方文档](https://vp.teek.top/)及仓库内未引用的 `teekConfig.template.ts` 模板。
