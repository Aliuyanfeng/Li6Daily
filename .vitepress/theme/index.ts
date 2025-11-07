import Teek, { useCopyBanner } from "vitepress-theme-teek";
import ContributeChart from "./components/ContributeChart.vue";
import { h } from "vue";
import "vitepress-theme-teek/index.css";

import "vitepress-theme-teek/theme-chalk/tk-code-block-mobile.css";
import "vitepress-theme-teek/theme-chalk/tk-sidebar.css";
import "vitepress-theme-teek/theme-chalk/tk-aside.css";
import "vitepress-theme-teek/theme-chalk/tk-nav.css";
import "vitepress-theme-teek/theme-chalk/tk-doc-h1-gradient.css";
import "vitepress-theme-teek/theme-chalk/tk-doc-fade-in.css";

// 只需添加以下一行代码，引入时间线样式
import "vitepress-markdown-timeline/dist/theme/index.css";

export default {
  extends: Teek,
  Layout: () =>
    h(Teek.Layout, null, {
      "teek-archives-top-before": () => h(ContributeChart),
  }),
  setup: () => {
    // 使用复制提示功能（默认配置）
    // useCopyBanner();

    /**
     * 配置方式，可自定义提示语
     *
     * 1. 提示语。默认:复制成功，复制和转载请标注本文地址
     * 2. 显示的持续时间(毫秒)，默认 3000
     */
    useCopyBanner("复制成功", 4000);
  },
};
