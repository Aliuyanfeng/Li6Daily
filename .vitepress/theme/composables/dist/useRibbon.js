"use strict";
exports.__esModule = true;
exports.useRibbon = void 0;
var vitepress_theme_teek_1 = require("vitepress-theme-teek");
var fn = function () { };
exports.useRibbon = function (options) {
    if (options === void 0) { options = {}; }
    var canvas = null;
    var ctx = null;
    var cleanupFn = fn;
    var _a = options.alpha, alpha = _a === void 0 ? 0.6 : _a, _b = options.size, size = _b === void 0 ? 90 : _b, _c = options.zIndex, zIndex = _c === void 0 ? -1 : _c, _d = options.clickReRender, clickReRender = _d === void 0 ? false : _d, _e = options.ribbonDomBindClick, ribbonDomBindClick = _e === void 0 ? false : _e, _f = options.immediate, immediate = _f === void 0 ? true : _f;
    var initRibbon = function () {
        if (!vitepress_theme_teek_1.isClient)
            return fn;
        if (document.getElementById("ribbon"))
            return fn;
        // 创建 canvas
        canvas = document.createElement("canvas");
        canvas.id = "ribbon";
        canvas.style.cssText = "position:fixed;top:0;left:0;z-index:" + zIndex;
        document.body.append(canvas);
        var dpr = window.devicePixelRatio || 1;
        var width = window.innerWidth;
        var height = window.innerHeight;
        var math = Math;
        var r = 0;
        var PI_2 = math.PI * 2;
        var cos = math.cos;
        var random = math.random;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx = canvas.getContext("2d");
        if (!ctx)
            return fn;
        ctx.scale(dpr, dpr);
        ctx.globalAlpha = alpha;
        var path = [];
        function init() {
            if (!ctx)
                return fn;
            ctx.clearRect(0, 0, width, height);
            path = [
                { x: 0, y: height * 0.7 + size },
                { x: 0, y: height * 0.7 - size },
            ];
            while (path[1].x < width + size) {
                draw(path[0], path[1]);
            }
        }
        function draw(start, end) {
            if (!ctx)
                return fn;
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            var nextX = end.x + (random() * 2 - 0.25) * size;
            var nextY = geneY(end.y);
            ctx.lineTo(nextX, nextY);
            ctx.closePath();
            r -= PI_2 / -50;
            ctx.fillStyle =
                "#" +
                    (((cos(r) * 127 + 128) << 16) |
                        ((cos(r + PI_2 / 3) * 127 + 128) << 8) |
                        (cos(r + (PI_2 / 3) * 2) * 127 + 128)).toString(16);
            ctx.fill();
            path[0] = path[1];
            path[1] = { x: nextX, y: nextY };
        }
        function geneY(y) {
            var temp = y + (random() * 2 - 1.1) * size;
            return temp > height || temp < 0 ? geneY(y) : temp;
        }
        init();
        // 点击重新绘制
        var handleClick = function () { return init(); };
        var dom = ribbonDomBindClick ? canvas : document;
        if (clickReRender) {
            dom.addEventListener("click", handleClick);
            dom.addEventListener("touchstart", handleClick);
        }
        // 返回清理函数
        return function () {
            if (clickReRender) {
                dom.removeEventListener("click", handleClick);
                dom.removeEventListener("touchstart", handleClick);
            }
            if (canvas && canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
            canvas = null;
            ctx = null;
        };
    };
    var start = function () {
        cleanupFn = initRibbon();
    };
    var stop = function () {
        cleanupFn();
    };
    vitepress_theme_teek_1.useMounted(function () {
        if (immediate)
            start();
    });
    vitepress_theme_teek_1.useScopeDispose(stop);
    return { start: start, stop: stop };
};
