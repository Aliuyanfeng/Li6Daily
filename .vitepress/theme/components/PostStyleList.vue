<script setup lang="ts" name="PostStyleList">
import type { TkContentData } from "vitepress-theme-teek/config";
import { computed, nextTick, onMounted, watch } from "vue";
import { useRoute } from "vitepress";
import { isClient, useTeekConfig, TkHomePostItemCard, TkHomePostItemList } from "vitepress-theme-teek";
import { usePostStyle, type PostStyle } from "../composables/usePostStyle";

// 组件返回多个根节点（切换按钮 + 列表），无需透传 attrs
defineOptions({ inheritAttrs: false });

defineProps<{ currentPosts: TkContentData[]; transitionName: string }>();

const { getTeekConfigRef } = useTeekConfig();
const postConfig = getTeekConfigRef("post", { postStyle: "card", coverImgMode: "default" });
const route = useRoute();

const { postStyle, setPostStyle, restorePostStyle } = usePostStyle(postConfig.value.postStyle || "card");

const coverImgMode = computed(() => postConfig.value.coverImgMode || "default");

const options: { value: PostStyle; label: string }[] = [
  { value: "card", label: "卡片" },
  { value: "list", label: "列表" },
];

/**
 * Teek 的卡片网格布局依赖外层容器 .tk-post 的 is-card / is-list 类，而该类名由静态配置决定，
 * 切换视图时必须同步修正，否则卡片视图会退化成单列、列表视图会变成网格
 */
const syncLayoutClass = () => {
  if (!isClient) return;

  document.querySelectorAll(".tk-post").forEach(el => {
    el.classList.toggle("is-card", postStyle.value === "card");
    el.classList.toggle("is-list", postStyle.value === "list");
  });
};

onMounted(() => {
  restorePostStyle();
  nextTick(syncLayoutClass);
});

watch(postStyle, () => nextTick(syncLayoutClass));
// 首页、分类页、标签页共用同一个列表组件，路由切换后需要重新同步
watch(() => route.path, () => nextTick(syncLayoutClass));
</script>

<template>
  <div class="li6-post-style" role="group" aria-label="文章列表显示方式">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="li6-post-style__btn"
      :class="{ 'is-active': postStyle === option.value }"
      :aria-pressed="postStyle === option.value"
      @click="setPostStyle(option.value)"
    >
      <svg v-if="option.value === 'card'" viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
        <rect x="1.4" y="1.4" width="5.6" height="5.6" rx="1.3" fill="currentColor" />
        <rect x="9" y="1.4" width="5.6" height="5.6" rx="1.3" fill="currentColor" />
        <rect x="1.4" y="9" width="5.6" height="5.6" rx="1.3" fill="currentColor" />
        <rect x="9" y="9" width="5.6" height="5.6" rx="1.3" fill="currentColor" />
      </svg>
      <svg v-else viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
        <rect x="1.4" y="2.6" width="13.2" height="1.9" rx="0.95" fill="currentColor" />
        <rect x="1.4" y="7.05" width="13.2" height="1.9" rx="0.95" fill="currentColor" />
        <rect x="1.4" y="11.5" width="13.2" height="1.9" rx="0.95" fill="currentColor" />
      </svg>
      <span>{{ option.label }}</span>
    </button>
  </div>

  <TransitionGroup tag="ul" :name="transitionName" aria-label="文章列表">
    <li v-for="post in currentPosts" :key="post.url">
      <TkHomePostItemCard v-if="postStyle === 'card'" :post="post" />
      <TkHomePostItemList v-else :post="post" :cover-img-mode="coverImgMode" />
    </li>
  </TransitionGroup>
</template>

<style scoped>
.li6-post-style {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  margin-bottom: 12px;
}

.li6-post-style__btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  font-size: 13px;
  line-height: 20px;
  color: var(--vp-c-text-2);
  background-color: var(--tk-bg-color-elm, transparent);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition:
    color 0.2s,
    background-color 0.2s,
    border-color 0.2s;
}

.li6-post-style__btn:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.li6-post-style__btn.is-active {
  color: var(--vp-c-bg);
  background-color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}
</style>
