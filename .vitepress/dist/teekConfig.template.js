"use strict";
/**
 * 这是一个 Teek 配置文件模板，涵盖 Teek 95% 的配置项，更多配置项示例请看 https://vp.teek.top/reference/config.html 专题
 *
 * 该文件并没有被外部任何文件引用，您可以参考这个里面的配置项，按需提取放到 teekConfig.ts 文件里并进行更改
 */
exports.__esModule = true;
exports.teekConfig = void 0;
// 本地 Teek 主题包引用（与 Teek 在线主题包引用 二选一）
var config_1 = require("vitepress-theme-teek/config");
// Teek 在线主题包引用（需安装 Teek 在线版本）
// import { defineTeekConfig } from "vitepress-theme-teek/config";
exports.teekConfig = config_1.defineTeekConfig({
    teekTheme: true,
    teekHome: true,
    vpHome: true,
    loading: false,
    homeCardListPosition: "right",
    anchorScroll: true,
    // 深色、浅色模式切换时是否开启过渡动画
    viewTransition: {
        enabled: true,
        mode: "out-in",
        duration: 300,
        easing: "ease-in"
    },
    themeSize: "default",
    // 右下角回到顶部配置
    backTop: {
        enabled: true,
        content: "progress",
        done: function (TkMessage) { return TkMessage.success("返回顶部成功"); }
    },
    // 滚动到评论区配置
    toComment: {
        enabled: true,
        done: function (TkMessage) { return TkMessage.success("滚动到评论区成功"); }
    },
    // 代码块配置
    codeBlock: {
        enabled: true,
        collapseHeight: 700,
        overlay: false,
        overlayHeight: 400,
        langTextTransform: "uppercase",
        copiedDone: function (TkMessage) { return TkMessage.success("复制成功！"); }
    },
    sidebarTrigger: false,
    windowTransition: true,
    // body 背景图片配置，将整个网站的背景色改为图片。
    bodyBgImg: {
        imgSrc: ["/img/bg1.jpg", "/img/bg2.png"],
        imgOpacity: 1,
        imgInterval: 15000,
        imgShuffle: false,
        mask: false,
        maskBg: "rgba(0, 0, 0, 0.2)"
    },
    // 主题增强配置，当开启后，右上角将有主题增强面板出现。
    themeEnhance: {
        enabled: true,
        position: "top",
        // 布局切换配置
        layoutSwitch: {
            disabled: false,
            defaultMode: "original",
            disableHelp: false,
            disableAnimation: false,
            defaultDocMaxWidth: 90,
            disableDocMaxWidthHelp: false,
            defaultPageMaxWidth: 95,
            disablePageMaxWidthHelp: false
        },
        // 布局主题色配置
        themeColor: {
            disabled: false,
            defaultColorName: "vp-default",
            defaultSpread: false,
            disableHelp: false,
            disabledInMobile: false
        },
        // 聚光灯配置
        spotlight: {
            disabled: false,
            defaultStyle: "aside",
            disableHelp: false,
            defaultValue: true
        }
    },
    // 文章默认的作者信息
    author: {
        name: "Teeker",
        link: ""
    },
    // 公告配置
    notice: {
        enabled: true,
        title: "公告",
        initOpen: true,
        duration: 0,
        mobileMinify: false,
        reopen: true,
        useStorage: true,
        twinkle: false,
        position: "top"
    },
    // 站点分析配置
    siteAnalytics: [
        { provider: "google", options: { id: "******" } },
        { provider: "baidu", options: { id: "******" } },
        { provider: "umami", options: { id: "******", src: "**" } },
    ],
    // 首页 Banner 配置，位于首页顶部
    banner: {
        enabled: true,
        name: "Teek",
        bgStyle: "fullImg",
        pureBgColor: "#28282d",
        imgSrc: ["/img/bg1.jpg", "/img/bg2.png"],
        imgInterval: 15000,
        imgShuffle: false,
        imgWaves: true,
        mask: true,
        maskBg: "rgba(0, 0, 0, 0.4)",
        textColor: "#ffffff",
        titleFontSize: "3.2rem",
        descFontSize: "1.4rem",
        descStyle: "types",
        description: [
            "故事由我书写，旅程由你见证，传奇由她聆听 —— 来自 Young Kbt",
            "积跬步以至千里，致敬每个爱学习的你 —— 来自 Evan Xu",
        ],
        switchTime: 4000,
        switchShuffle: false,
        typesInTime: 200,
        typesOutTime: 100,
        typesNextTime: 800,
        typesShuffle: false,
        features: [{ title: "", details: "", link: "", image: "" }],
        featureCarousel: 4000
    },
    // 壁纸模式，在首页 最顶部 进入全屏后开启，仅当 banner.bgStyle = 'fullImg' 或 bodyBgImg.imgSrc 存在才生效。
    wallpaper: {
        enabled: false,
        hideBanner: false,
        hideMask: false
    },
    // 文章配置
    post: {
        postStyle: "list",
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
        pageSize: 20,
        pagerCount: 7,
        layout: "prev, pager, next, jumper, ->, total",
        size: "default",
        background: false,
        hideOnSinglePage: false
    },
    homeCardSort: ["topArticle", "category", "tag", "friendLink", "docAnalysis"],
    // 标签背景色
    tagColor: [
        { border: "#bfdbfe", bg: "#eff6ff", text: "#2563eb" },
        { border: "#e9d5ff", bg: "#faf5ff", text: "#9333ea" },
        { border: "#fbcfe8", bg: "#fdf2f8", text: "#db2777" },
        { border: "#a7f3d0", bg: "#ecfdf5", text: "#059669" },
        { border: "#fde68a", bg: "#fffbeb", text: "#d97706" },
        { border: "#a5f3fc", bg: "#ecfeff", text: "#0891b2" },
        { border: "#c7d2fe", bg: "#eef2ff", text: "#4f46e5" },
    ],
    // 博主信息，显示在首页左边第一个卡片。
    blogger: {
        name: "",
        slogan: "",
        avatar: "",
        shape: "circle-rotate",
        circleBgImg: "",
        circleBgMask: true,
        circleSize: 100,
        color: "#ffffff",
        // 状态，仅当 shape 为 circle 相关值时有效
        status: {
            icon: "😪",
            size: 24,
            title: "困"
        }
    },
    // 精选文章卡片配置
    topArticle: {
        enabled: true,
        title: "${icon}精选文章",
        emptyLabel: "暂无精选文章",
        limit: 5,
        autoPage: false,
        pageSpeed: 4000,
        dateFormat: "yyyy-MM-dd hh:mm:ss"
    },
    // 分类卡片配置
    category: {
        enabled: true,
        path: "/categories",
        pageTitle: "${icon}全部分类",
        homeTitle: "${icon}文章分类",
        moreLabel: "更多 ...",
        emptyLabel: "暂无文章分类",
        limit: 5,
        autoPage: false,
        pageSpeed: 4000
    },
    // 标签卡片配置
    tag: {
        enabled: true,
        path: "/tags",
        pageTitle: "${icon}全部标签",
        homeTitle: "${icon}热门标签",
        moreLabel: "更多 ...",
        emptyLabel: "暂无标签",
        limit: 21,
        autoPage: false,
        pageSpeed: 4000
    },
    // 友情链接卡片配置
    friendLink: {
        enabled: true,
        list: [
            {
                name: "",
                desc: "",
                avatar: "",
                link: ""
            },
        ],
        title: "${icon}友情链接",
        emptyLabel: "暂无友情链接",
        limit: 5,
        autoScroll: false,
        scrollSpeed: 2500,
        autoPage: false,
        pageSpeed: 4000
    },
    // 站点信息卡片配置
    docAnalysis: {
        enabled: true,
        createTime: "2021-10-19",
        wordCount: true,
        readingTime: true,
        // 访问量、访客数统计配置
        statistics: {
            provider: "busuanzi",
            siteView: true,
            pageView: true,
            tryRequest: false,
            tryCount: 5,
            tryIterationTime: 2000,
            permalink: true
        },
        // 自定义现有信息
        overrideInfo: [
            {
                key: "lastActiveTime",
                label: "活跃时间",
                value: function (_, currentValue) { return (currentValue + "").replace("前", ""); },
                show: true
            },
        ],
        // 自定义额外信息
        appendInfo: [{ key: "index", label: "站点作者", value: "Teeker" }]
    },
    // 社交信息配置，通常为一个社交图标，点击后将会跳转到社交软件的个人主页
    social: [
        {
            icon: "mdi:github",
            name: "GitHub",
            link: "https://github.com/kele-bingtang"
        },
        {
            icon: "simple-icons:gitee",
            name: "Gitee",
            link: "https://gitee.com/kele-bingtang"
        },
    ],
    // 页脚信息组配置
    footerGroup: [
        {
            title: "外部链接",
            links: [
                { name: "示例 1", link: "https://vp.teek.top", icon: "icon-github" },
                { name: "示例 2", link: "https://vp.teek.top" },
                { name: "示例 3", link: "https://vp.teek.top" },
            ]
        },
        {
            title: "内部链接",
            links: [
                { name: "快速开始", link: "/guide/quickstart" },
                { name: "配置简介", link: "/reference/config" },
            ]
        },
    ],
    // 页脚配置
    footerInfo: {
        // 页脚信息，支持 HTML 格式（位于主题版权上方）
        topMessage: ["下面的内容和图标都可以修改（本条内容也可以隐藏的）"],
        // 页脚信息，支持 HTML 格式（位于主题版权下方）
        bottomMessage: ["上面的内容和图标都可以修改（本条内容也可以隐藏的）"],
        // 主题版权配置
        theme: {
            show: true,
            name: "",
            link: ""
        },
        // 博客版权配置
        copyright: {
            show: true,
            createYear: 2021,
            suffix: ""
        },
        // ICP 备案信息配置
        icpRecord: {
            name: "",
            link: ""
        },
        // 网络安全备案信息配置
        securityRecord: {
            name: "",
            link: ""
        }
    },
    articleBanner: {
        enabled: true,
        showCategory: true,
        showTag: true,
        defaultCoverImg: "",
        defaultCoverBgColor: ""
    },
    // 文章信息分析配置，分别作用在首页和文章页
    articleAnalyze: {
        showIcon: true,
        dateFormat: "yyyy-MM-dd hh:mm:ss",
        showInfo: true,
        showAuthor: true,
        showCreateDate: true,
        showUpdateDate: false,
        showCategory: false,
        showTag: false
    },
    // 面包屑配置
    breadcrumb: {
        enabled: true,
        showCurrentName: false,
        separator: "/",
        homeLabel: "首页"
    },
    // 文章页的样式风格，default 为 VitePress 原生风格，card 为单卡片风格，segment 为片段卡片风格，card-nav 和 segment-nav 会额外修改导航栏样式。
    pageStyle: "default",
    // 赞赏功能配置
    appreciation: {
        position: "doc-after",
        // 赞赏配置
        options: {
            icon: "weChatPay",
            expandTitle: "打赏支持",
            collapseTitle: "下次一定",
            content: "<img src='/teek-logo-large.png'>",
            expand: false
        }
    },
    // 文章分享配置
    articleShare: {
        enabled: true,
        text: "分享此页面",
        copiedText: "链接已复制",
        query: false,
        hash: false
    },
    // 在每个文章页顶部显示 VitePress 容器添加提示，使用场景如超过半年的文章自动提示文章内容可能已过时
    articleTopTip: function (frontmatter, localeIndex, page) {
        var tip = {
            type: "warning",
            text: "文章发布较早，内容可能过时，阅读注意甄别。"
        };
        // 大于半年，添加提示
        var longTime = 6 * 30 * 24 * 60 * 60 * 1000;
        if (frontmatter.date && Date.now() - new Date(frontmatter.date).getTime() > longTime)
            return tip;
    },
    // 在每个文章页顶部显示 VitePress 容器添加提示，使用场景如添加文章版权声明。
    articleBottomTip: function (frontmatter) {
        var _a;
        if (typeof window === "undefined")
            return;
        var hash = false;
        var query = false;
        var _b = window.location, origin = _b.origin, pathname = _b.pathname, search = _b.search;
        var url = "" + origin + ((_a = frontmatter.permalink) !== null && _a !== void 0 ? _a : pathname) + (query ? search : "") + (hash ? location.hash : "");
        var author = "Teek";
        return {
            type: "tip",
            // title: "声明", // 可选
            text: "<p>\u4F5C\u8005\uFF1A" + author + "</p>\n             <p style=\"margin-bottom: 0\">\u94FE\u63A5\uFF1A<a href=\"" + decodeURIComponent(url) + "\" target=\"_blank\">" + decodeURIComponent(url) + "</a></p>\n             <p>\u7248\u6743\uFF1A\u6B64\u6587\u7AE0\u7248\u6743\u5F52 " + author + " \u6240\u6709\uFF0C\u5982\u6709\u8F6C\u8F7D\uFF0C\u8BF7\u6CE8\u660E\u51FA\u5904!</p>\n            "
        };
    },
    // 文章页底部的最近更新栏配置
    articleUpdate: {
        enabled: true,
        limit: 3
    },
    // 评论配置，目前内置 Giscus、Twikoo、Waline、Artalk 四种评论插件
    comment: {
        provider: "giscus",
        // 评论区配置项，根据 provider 不同而不同，具体看对应官网的使用介绍
        options: {
            // twikoo 配置，官网：https://twikoo.js.org/
            // envId: "your envId",
            // waline 配置，官网：https://waline.js.org/
            // serverURL: "your serverURL",
            // jsLink: "https://unpkg.com/@waline/client@v3/dist/waline.js",
            // cssLink: "https://unpkg.com/@waline/client@v3/dist/waline.css",
            // giscus 配置，官网：https://giscus.app/zh-CN
            repo: "your name/your repo",
            repoId: "your repoId",
            category: "your category",
            categoryId: "your categoryId"
        }
    },
    vitePlugins: {
        sidebar: true,
        sidebarOption: {},
        permalink: true,
        permalinkOption: {},
        mdH1: true,
        catalogueOption: {},
        docAnalysis: true,
        docAnalysisOption: {},
        fileContentLoaderIgnore: [],
        autoFrontmatter: true,
        // autoFrontmatter 插件配置项
        autoFrontmatterOption: {
            permalink: true,
            recoverTransform: false,
            categories: true,
            coverImg: false,
            forceCoverImg: false,
            coverImgList: [],
            // 处理永久链接的规则
            permalinkRules: [
            //{ folderName: "01.指南/01.简介/", prefix: "/$path/$uuid", removeLevel: 99 }, // 添加前缀
            ]
        }
    }
});
