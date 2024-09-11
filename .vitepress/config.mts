import { defineConfig } from "vitepress";
import nav from "./guide/nav"
import sidebar from "./guide/sidebar";

export default defineConfig({
  title: "Li6Daily",
  titleTemplate: "Live and learn",
  description: "Everything about Xiao Liu",
  head: [
    ["link", { rel: "icon", href: "/Li6Daily/favicon.ico" }],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
        rel: "stylesheet",
      },
    ],
  ],
  base: "/Li6Daily/",
  srcDir: "./src",
  themeConfig: {
    siteTitle: "Li6Daily",
    search: {
      provider: "local",
    },
    nav: nav,
    sidebar: sidebar,
    socialLinks: [{ icon: "github", link: "https://github.com/Aliuyanfeng" }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-PowerBy Aliu'
    }
  },
  markdown: {
    lineNumbers: true,
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true
    }
  }
});
