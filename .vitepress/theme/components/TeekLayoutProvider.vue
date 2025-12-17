<script setup lang="ts" name="TeekLayoutProvider">
import Teek, { clockIcon } from "vitepress-theme-teek";
import { watch, nextTick } from "vue";
import { useData } from "vitepress";
import { useRuntime } from "../composables/useRuntime";

const { frontmatter } = useData(); // 获取 frontmatter

// 页脚运行时间
const { start, stop } = useRuntime("2025-03-14 00:00:00", {
  prefix: `<span style="width: 16px; display: inline-block; vertical-align: -3px; margin-right: 3px;">${clockIcon}</span>本站已在地球上苟活了`,
});

watch(
  frontmatter,
  async (newVal) => {
    await nextTick();
    if (newVal.layout === "home") start();
    else stop();
  },
  { immediate: true }
);
</script>