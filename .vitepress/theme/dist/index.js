"use strict";
exports.__esModule = true;
// .vitepress/theme/index.ts or .vitepress/theme/index.js
var theme_1 = require("vitepress/theme");
require("./styles/vars.scss");
// 只需添加以下一行代码，引入时间线样式
require("vitepress-markdown-timeline/dist/theme/index.css");
// import MyLayout from './Layout.vue'
// import MyVPHomeHero from './VPHomeHero.vue'
exports["default"] = {
    "extends": theme_1["default"],
    // Layout: MyLayout,
    // VPHomeHero: MyVPHomeHero,
    // VPHomeFeatures: MyVPHomeHero,
    NotFound: function () { return "404"; },
    enhanceApp: function (ctx) {
        theme_1["default"].enhanceApp(ctx);
    }
};
