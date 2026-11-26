import { defineConfig } from "vitepress";
import nav from "./guide/nav";
import sidebar from "./guide/sidebar";
import timeline from "vitepress-markdown-timeline";
import process from "node:process";
import { teekConfig } from "./teekConfig";

// 部署平台决定站点 base：GitHub Pages 与 GitLab Pages 都托管在「用户/组织」根域下的
// 项目子路径里，必须各自声明；未设置 DEPLOY_PLATFORM 时（本地 dev、Cloudflare Pages）
// 直接使用根路径。
const DEPLOY_PLATFORM = process.env.DEPLOY_PLATFORM;
const BASE_BY_PLATFORM: Record<string, string> = {
  github: "/Li6Daily/",
  gitlab: "/li6daliy/",
};
const base = (DEPLOY_PLATFORM && BASE_BY_PLATFORM[DEPLOY_PLATFORM]) || "/";

export default defineConfig({
  extends: teekConfig,
  appearance: true,
  title: "Li6Daily",
  description: "个人技术博客，记录学习和工作中的点滴。",
  head: [
    // 站内资源必须带上 base，否则子路径部署（GitHub/GitLab Pages）下会 404。
    // 注意：本数组中其余条目均为外部 URL（字体、CDN），不能加 base。
    ["link", { rel: "icon", href: `${base}favicon.png` }],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
        rel: "stylesheet",
      },
    ],
    [
      "script",
      {
        type: "text/javascript",
        src: "https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/animejs/3.2.1/anime.min.js", //字节cdn
        id: "anime.min.js-js",
        defer: "defer",
      },
    ],
    [
      "script",
      {
        // src: "https://cpython666.github.io/js/clickjs/fireworks.js",
        src: "https://live2d-hyde.netlify.app/Clickfireworks.js",
        defer: "defer",
      },
    ],
  ],
  base,
  srcDir: "./src",
  outDir: ".vitepress/dist",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    siteTitle: "Li6Daily",
    search: {
      provider: "local",
      options: {
        translations: {
          button: { buttonText: "查找", buttonAriaLabel: "查找" },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查找条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          },
        },
      },
    },
    nav: nav,
    sidebar: sidebar,
    lastUpdatedText: "最后更新",
    outline: {
      level: [2, 3],
      label: "本页目录",
    },
  },

  markdown: {
    lineNumbers: true,
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true,
    },
    // 更改容器默认值标题
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
    config: (md) => {
      md.use(timeline);
    },
  },
});
