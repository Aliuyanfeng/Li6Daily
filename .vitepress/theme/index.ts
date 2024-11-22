// .vitepress/theme/index.ts or .vitepress/theme/index.js
import Theme, { VPHomeFeatures } from "vitepress/theme";
import "./styles/vars.scss";

// 只需添加以下一行代码，引入时间线样式
import "vitepress-markdown-timeline/dist/theme/index.css";

// import MyLayout from './Layout.vue'
// import MyVPHomeHero from './VPHomeHero.vue'

export default {
  extends: Theme,
  // Layout: MyLayout,
  // VPHomeHero: MyVPHomeHero,
  // VPHomeFeatures: MyVPHomeHero,
  NotFound: () => "404",
  enhanceApp(ctx) {
    Theme.enhanceApp(ctx);
  },
};
