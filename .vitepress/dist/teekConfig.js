"use strict";
exports.__esModule = true;
exports.teekConfig = void 0;
var config_1 = require("vitepress-theme-teek/config");
// Teek 主题配置
exports.teekConfig = config_1.defineTeekConfig({
    teekTheme: true,
    teekHome: true,
    pageStyle: 'segment-nav',
    blogger: {
        avatar: "",
        shape: "circle",
        name: "Aliu",
        slogan: ""
    },
    banner: {
        name: "📝 啥都写的知识仓库",
        descStyle: 'types',
        bgStyle: 'fullImg',
        imgSrc: './images/bg.jpg',
        mask: true
    },
    wallpaper: {
        enabled: true
    },
    friendLink: {
        enabled: false
    },
    // 文章配置
    post: {
        postStyle: "card",
        excerptPosition: "top",
        showMore: true,
        moreLabel: "阅读全文 >",
        emptyLabel: "暂无文章",
        coverImgMode: "default",
        showCapture: false,
        splitSeparator: false,
        transition: true,
        transitionName: "tk-slide-fade",
        listStyleTitleTagPosition: "right",
        cardStyleTitleTagPosition: "left",
        defaultCoverImg: []
    },
    page: {
        disabled: false,
        pageSize: 18,
        pagerCount: 8,
        layout: "prev, pager, next, jumper, ->, total",
        size: "default",
        background: false,
        hideOnSinglePage: false
    }
});
