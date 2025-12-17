"use strict";
exports.__esModule = true;
var vitepress_theme_teek_1 = require("vitepress-theme-teek");
var ContributeChart_vue_1 = require("./components/ContributeChart.vue");
var vue_1 = require("vue");
require("vitepress-theme-teek/index.css"); // 引入主题样式
require("vitepress-theme-teek/theme-chalk/tk-code-block-mobile.css"); // 引入移动端代码块样式
require("vitepress-theme-teek/theme-chalk/tk-sidebar.css"); // 引入侧边栏样式
require("vitepress-theme-teek/theme-chalk/tk-nav.css"); // 引入导航栏样式
require("vitepress-theme-teek/theme-chalk/tk-aside.css"); // 文章目录样式
require("vitepress-theme-teek/theme-chalk/tk-doc-h1-gradient.css"); // 文档以及标题样式
require("vitepress-theme-teek/theme-chalk/tk-table.css"); // 表格样式
require("vitepress-theme-teek/theme-chalk/tk-mark.css"); // 文章 mark 标签样式
require("vitepress-theme-teek/theme-chalk/tk-blockquote.css"); //引用样式
require("vitepress-theme-teek/theme-chalk/tk-index-rainbow.css"); // Vitepress 首页彩虹渐变样式
//import "vitepress-theme-teek/theme-chalk/tk-doc-fade-in.css"; // 文档淡入效果样式
// import "vitepress-theme-teek/theme-chalk/tk-banner-desc-gradient.css"; // Banner 描述渐变样式
require("vitepress-theme-teek/theme-chalk/tk-nav-blur.css"); // 导航栏毛玻璃样式
require("vitepress-theme-teek/tk-plus/banner-full-img-scale.scss"); // Banner 全屏图片放大样式
require("vitepress-theme-teek/tk-plus/fade-up-animation.scss"); // Banner 描述渐变样式
// 只需添加以下一行代码，引入时间线样式
require("vitepress-markdown-timeline/dist/theme/index.css");
exports["default"] = {
    "extends": vitepress_theme_teek_1["default"],
    Layout: function () {
        return vue_1.h(vitepress_theme_teek_1["default"].Layout, null, {
            /**
       * 渲染贡献图表组件
       * @returns {VNode} 返回 ContributeChart 组件的虚拟节点
       */
            "teek-archives-top-before": function () { return vue_1.h(ContributeChart_vue_1["default"]); }
        });
    },
    setup: function () {
        /**
         * 配置方式，可自定义提示语
         *
         * 1. 提示语。默认:复制成功，复制和转载请标注本文地址
         * 2. 显示的持续时间(毫秒)，默认 3000
         */
        vitepress_theme_teek_1.useCopyBanner("复制成功", 4000);
    }
};
