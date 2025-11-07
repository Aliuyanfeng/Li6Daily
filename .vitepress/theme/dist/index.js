"use strict";
exports.__esModule = true;
var vitepress_theme_teek_1 = require("vitepress-theme-teek");
var ContributeChart_vue_1 = require("./components/ContributeChart.vue");
var vue_1 = require("vue");
require("vitepress-theme-teek/index.css");
require("vitepress-theme-teek/theme-chalk/tk-code-block-mobile.css");
require("vitepress-theme-teek/theme-chalk/tk-sidebar.css");
require("vitepress-theme-teek/theme-chalk/tk-aside.css");
require("vitepress-theme-teek/theme-chalk/tk-nav.css");
require("vitepress-theme-teek/theme-chalk/tk-doc-h1-gradient.css");
require("vitepress-theme-teek/theme-chalk/tk-doc-fade-in.css");
// 只需添加以下一行代码，引入时间线样式
require("vitepress-markdown-timeline/dist/theme/index.css");
exports["default"] = {
    "extends": vitepress_theme_teek_1["default"],
    Layout: function () {
        return vue_1.h(vitepress_theme_teek_1["default"].Layout, null, {
            "teek-archives-top-before": function () { return vue_1.h(ContributeChart_vue_1["default"]); }
        });
    },
    setup: function () {
        // 使用复制提示功能（默认配置）
        // useCopyBanner();
        /**
         * 配置方式，可自定义提示语
         *
         * 1. 提示语。默认:复制成功，复制和转载请标注本文地址
         * 2. 显示的持续时间(毫秒)，默认 3000
         */
        vitepress_theme_teek_1.useCopyBanner("复制成功", 4000);
    }
};
