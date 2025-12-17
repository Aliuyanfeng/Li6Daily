"use strict";
exports.__esModule = true;
exports.useRuntime = void 0;
// 运行时间统计
var vue_1 = require("vue");
var vitepress_theme_teek_1 = require("vitepress-theme-teek");
var vitepress_theme_teek_2 = require("vitepress-theme-teek");
exports.useRuntime = function (initDate, options) {
    if (options === void 0) { options = {}; }
    var _a = options.selector, selector = _a === void 0 ? "#runtime" : _a, _b = options.immediate, immediate = _b === void 0 ? false : _b, _c = options.prefix, prefix = _c === void 0 ? "" : _c, _d = options.suffix, suffix = _d === void 0 ? "" : _d, _e = options.dayColor, dayColor = _e === void 0 ? "#FFA500" : _e, _f = options.hourColor, hourColor = _f === void 0 ? "#1DBF97" : _f, _g = options.minuteColor, minuteColor = _g === void 0 ? "#8A2BE2" : _g, _h = options.secondColor, secondColor = _h === void 0 ? "#007EC6" : _h;
    var startTime = vue_1.computed(function () { return new Date(vue_1.toValue(initDate)); });
    var runtimeElement;
    var timer;
    var update = function () {
        if (!vitepress_theme_teek_1.isClient || !runtimeElement)
            return;
        var now = new Date();
        var diff = now.getTime() - startTime.value.getTime();
        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((diff % (1000 * 60)) / 1000);
        runtimeElement.innerHTML = prefix + "\n        <span style=\"color: " + dayColor + "\">" + days + "</span> \u5929\n        <span style=\"color: " + hourColor + "\">" + hours + "</span> \u65F6\n        <span style=\"color: " + minuteColor + "\">" + minutes + "</span> \u5206\n        <span style=\"color: " + secondColor + "\">" + seconds + "</span> \u79D2\n        " + suffix + "\n      ";
    };
    var start = function () {
        if (!vitepress_theme_teek_1.isClient)
            return;
        runtimeElement = document.querySelector(selector);
        if (!runtimeElement)
            return;
        // 初始化
        update();
        timer = setInterval(update, 1000);
    };
    var stop = function () {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    };
    if (immediate)
        start();
    vitepress_theme_teek_2.useScopeDispose(stop);
    return { start: start, stop: stop };
};
