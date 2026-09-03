// 首页文章列表的显示风格：card 为卡片视图，list 为列表视图
import { ref } from "vue";
import { isClient } from "vitepress-theme-teek";

export type PostStyle = "card" | "list";

const storageKey = "li6-post-style";

// 模块级状态，确保切换按钮与列表渲染共用同一份数据
const postStyle = ref<PostStyle>("card");
let initialized = false;

export const usePostStyle = (defaultStyle: PostStyle = "card") => {
  // 首次调用时以主题配置的默认值为准，保证 SSR 与客户端首帧一致
  if (!initialized) {
    postStyle.value = defaultStyle;
    initialized = true;
  }

  /**
   * 恢复用户上次选择的显示风格。需在组件挂载后调用，避免与服务端渲染结果不一致
   */
  const restorePostStyle = () => {
    if (!isClient) return;

    const saved = localStorage.getItem(storageKey);
    if (saved === "card" || saved === "list") postStyle.value = saved;
  };

  const setPostStyle = (style: PostStyle) => {
    if (postStyle.value === style) return;

    postStyle.value = style;
    if (isClient) localStorage.setItem(storageKey, style);
  };

  return { postStyle, setPostStyle, restorePostStyle };
};
