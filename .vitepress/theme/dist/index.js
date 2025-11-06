"use strict";
exports.__esModule = true;
var vitepress_theme_teek_1 = require("vitepress-theme-teek");
var ContributeChart_vue_1 = require("./components/ContributeChart.vue");
var vue_1 = require("vue");
require("vitepress-theme-teek/index.css");
// 只需添加以下一行代码，引入时间线样式
require("vitepress-markdown-timeline/dist/theme/index.css");
// import MyLayout from './Layout.vue'
// import MyVPHomeHero from './VPHomeHero.vue'
exports["default"] = {
    "extends": vitepress_theme_teek_1["default"],
    Layout: function () {
        return vue_1.h(vitepress_theme_teek_1["default"].Layout, null, {
            "teek-archives-top-before": function () { return vue_1.h(ContributeChart_vue_1["default"]); }
        });
    }
};
