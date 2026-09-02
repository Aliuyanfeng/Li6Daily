import { defineTeekConfig } from "vitepress-theme-teek/config";
import type { TeekConfig } from "vitepress-theme-teek/config";
// 文档配置
export const teekDocConfig: TeekConfig = {
  themeEnhance: {
    layoutSwitch: {
      defaultMode: "bothWidthAdjustable",
    },
  },
};

// Teek 主题配置
export const teekConfig = defineTeekConfig({
  vitePlugins: {
    autoFrontmatter: true,
    sidebar: true, // 是否启用 sidebar 插件
    sidebarOption: {
      ignoreList: ["/", "assets", "images"], // sidebar 插件忽略的路径列表，支持 glob 表达式
      ignoreWarn: true, // 是否在控制台显示忽略路径的警告信息
      ignoreIndexMd: true, // 是否忽略每个目录下的 index.md 文件
      collapsed: false, // 是否默认折叠侧边栏
    }, // sidebar 插件配置项
  },
  sidebarTrigger: true, // 启用侧边栏触发器
  teekTheme: true,
  teekHome: true,
  pageStyle: "segment-nav",
  blogger: {
    avatar: "",
    shape: "circle",
    name: "Aliu",
    slogan: "",
  },
  banner: {
    name: "📝 啥都写的知识仓库",
    descStyle: "types",
    bgStyle: "fullImg",
    imgSrc: "/images/bg.jpg",
    mask: true,
  },
  wallpaper: {
    enabled: true, // 是否启用壁纸模式
  },
  friendLink: {
    enabled: false,
  },
  // 文章配置
  post: {
    postStyle: "card", // 文章列表风格
    excerptPosition: "top", // 文章摘要位置
    showMore: true, // 是否显示更多按钮
    moreLabel: "阅读全文 >", // 更多按钮文字
    emptyLabel: "暂无文章", // 文章列表为空时的标签
    coverImgMode: "default", // 文章封面图模式
    showCapture: true, // 是否在摘要位置显示文章部分文字，当为 true 且不使用 frontmatter.describe 和 <!-- more --> 时，会自动截取前 300 个字符作为摘要
    splitSeparator: false, // 文章信息（作者、创建时间、分类、标签等信息）是否添加 | 分隔符
    transition: true, // 是否开启过渡动画
    transitionName: "tk-slide-fade", // 自定义过渡动画名称
    listStyleTitleTagPosition: "right", // 列表模式下的标题标签位置（postStyle 为 list）
    cardStyleTitleTagPosition: "left", // 卡片模式下的标题标签位置（postStyle 为 card）
    defaultCoverImg: [], // 默认封面图地址，如果不设置封面图则使用默认封面图地址
  },
  page: {
    disabled: false, // 是否禁用
    pageSize: 18, // 每页显示条目数
    pagerCount: 8, // 设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠
    layout: "prev, pager, next, jumper, ->, total", // 组件布局，子组件名用逗号分隔
    size: "default", // 分页大小
    background: false, // 是否为分页按钮添加背景色
    hideOnSinglePage: false, // 只有一页时是否隐藏
  },
  siteAnalytics: [
    {
      provider: "baidu",
      options: {
        id: "baefad2ec086c7f7ddb868440ed0a558",
      },
    },
  ],
  // 页脚配置
  footerInfo: {
    // customHtml: `<span id="runtime"></span>`,
    // 页脚信息，支持 HTML 格式（位于主题版权上方）
    topMessage: [`<span id="runtime">22</span>`],
    // 页脚信息，支持 HTML 格式（位于主题版权下方）
    bottomMessage: ["Released under the MIT License."],
    // 主题版权配置
    theme: {
      show: false, // 是否显示主题版权
      name: "", // 自定义名称
      link: "", // 自定义链接
    },
    // 博客版权配置
    copyright: {
      show: true, // 是否显示博客版权
      createYear: 2024, // 创建年份
      suffix: "Li6 Blog | Built with VitePress & Teek", // 后缀
    },
    // // ICP 备案信息配置
    // icpRecord: {
    //   name: "暂未备案",
    //   link: "http://beian.miit.gov.cn/",
    // },
    // // 网络安全备案信息配置
    // securityRecord: {
    //   name: "暂未备案",
    //   link: "",
    // },
  },
  docAnalysis: {
    overrideInfo: [
      { key: "totalPosts", label: "文章总数目" },
      { key: "runtime", show: false },
    ],
  },
});
