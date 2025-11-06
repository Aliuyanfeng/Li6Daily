import { defineConfig } from "vitepress";
import nav from "./guide/nav"
import sidebar from "./guide/sidebar";
import timeline from "vitepress-markdown-timeline";
import process from 'node:process';
import { defineTeekConfig } from "vitepress-theme-teek/config";

const isProd = process.env.DEPLOY_PLATFORM === 'github'

// Teek 主题配置
const teekConfig = defineTeekConfig({
  teekTheme: true,
  teekHome: true,
  banner: {
    descStyle: 'types',
    bgStyle: 'fullImg',
    imgSrc: 'bg.jpg',
    mask: true,
  },
  wallpaper: {
    enabled: true, // 是否启用壁纸模式
    hideBanner: false, // 开启壁纸模式后，是否隐藏 Banner
    hideMask: false, // 开启壁纸模式后，是否隐藏 Banner 或 bodyBgImage 的遮罩层，则确保 banner.mask 和 bodyBgImage.mask 为 true 才生效
  },
});

export default defineConfig({
  extends: teekConfig,
  title: "啥都写的知识仓库",
  appearance: true,
  // head: [
  //   ["link", { rel: "icon", href: "/Li6Daily/favicon.ico" }],
  //   ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
  //   [
  //     "link",
  //     { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
  //   ],
  //   [
  //     "link",
  //     {
  //       href: "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
  //       rel: "stylesheet",
  //     },
  //   ],
  // ],
  base: isProd ? '/Li6Daily/' : '/',  // GitHub 用子目录，Cloudflare 用根路径
  srcDir: "./src",
  outDir: ".vitepress/dist",
  lastUpdated: true,
  themeConfig: {
    siteTitle: "Li6Daily",
    search: {
      provider: "local",
    },
    nav: nav,
    sidebar: sidebar,
    // socialLinks: [{ icon: "github", link: "https://github.com/Aliuyanfeng" }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-PowerBy Aliu'
    },
    lastUpdatedText: "最后更新",
  },
  markdown: {
    lineNumbers: true,
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true
    },
    config: (md) => {
      md.use(timeline);
    },
  },
});
