"use strict";
exports.__esModule = true;
exports.teekConfig = exports.teekDocConfig = void 0;
var config_1 = require("vitepress-theme-teek/config");
// 文档配置
exports.teekDocConfig = {
    themeEnhance: {
        layoutSwitch: {
            defaultMode: "bothWidthAdjustable"
        }
    }
};
// Teek 主题配置
exports.teekConfig = config_1.defineTeekConfig({
    vitePlugins: {
        autoFrontmatter: true,
        sidebar: true,
        sidebarOption: {
            ignoreList: ['/', 'assets'],
            ignoreWarn: true
        }
    },
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
        imgSrc: '/images/bg.jpg',
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
        showCapture: true,
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
    },
    siteAnalytics: [
        {
            provider: "baidu",
            options: {
                id: "baefad2ec086c7f7ddb868440ed0a558"
            }
        },
    ],
    // 页脚配置
    footerInfo: {
        // customHtml: `<span id="runtime"></span>`,
        // 页脚信息，支持 HTML 格式（位于主题版权上方）
        topMessage: ["<span id=\"runtime\">22</span>"],
        // 页脚信息，支持 HTML 格式（位于主题版权下方）
        bottomMessage: ["Released under the MIT License."],
        // 主题版权配置
        theme: {
            show: false,
            name: "",
            link: ""
        },
        // 博客版权配置
        copyright: {
            show: true,
            createYear: 2024,
            suffix: "Li6 Blog | Built with VitePress & Teek"
        }
    },
    docAnalysis: {
        overrideInfo: [
            { key: "totalPosts", label: "文章总数目" },
            { key: "runtime", show: false },
        ]
    }
});
