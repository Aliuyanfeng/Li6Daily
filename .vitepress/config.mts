import { defineConfig } from "vitepress";
import nav from "./guide/nav"
import sidebar from "./guide/sidebar";
import timeline from "vitepress-markdown-timeline";
import process from 'node:process';
import { teekConfig } from "./teekConfig";

const isProd = process.env.DEPLOY_PLATFORM === 'github'



export default defineConfig({
  extends: teekConfig,
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
        }
      },
    },
    nav: nav,
    sidebar: sidebar,
    // socialLinks: [{ icon: "github", link: "https://github.com/Aliuyanfeng" }],
    // footer: {
    //   message: 'Released under the MIT License.',
    //   copyright: 'Copyright © 2024-PowerBy Aliu'
    // },
    lastUpdatedText: "最后更新",
  },
  
  markdown: {
    lineNumbers: true,
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true
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
