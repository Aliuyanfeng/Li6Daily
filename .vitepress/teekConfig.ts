import { defineTeekConfig } from "vitepress-theme-teek/config";

// Teek 主题配置
export const teekConfig = defineTeekConfig({
  teekTheme: true,
  teekHome: true,
  pageStyle: 'segment-nav',
  blogger: {
    avatar: "",
    shape: "circle",
    name: "Aliu",
    slogan: "",
  },
  banner: {
    name: "📝 啥都写的知识仓库",
    descStyle: 'types',
    bgStyle: 'fullImg',
    imgSrc: '/images/bg.jpg',
    mask: true,
  },
  wallpaper: {
    enabled: true, // 是否启用壁纸模式
  },
  friendLink: {
    enabled: false
  },
  // 文章配置
  post: {
    postStyle: "card", // 文章列表风格
    excerptPosition: "top", // 文章摘要位置
    showMore: true, // 是否显示更多按钮
    moreLabel: "阅读全文 >", // 更多按钮文字
    emptyLabel: "暂无文章", // 文章列表为空时的标签
    coverImgMode: "default", // 文章封面图模式
    showCapture: false, // 是否在摘要位置显示文章部分文字，当为 true 且不使用 frontmatter.describe 和 <!-- more --> 时，会自动截取前 300 个字符作为摘要
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
});