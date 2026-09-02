import pluginVue from "eslint-plugin-vue";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import prettierConfig from "eslint-config-prettier";

export default defineConfigWithVueTs(
  {
    // 全局忽略：Teek 主题源码副本（packages/）未接入构建；cache/dist 为生成产物；
    // teekConfig.template.ts 为未引用的参考模板（编码异常），仅作查阅
    ignores: [
      "node_modules/**",
      "packages/**",
      ".vitepress/cache/**",
      ".vitepress/dist/**",
      ".vitepress/theme/dist/**",
      ".vitepress/theme/composables/dist/**",
      ".vitepress/teekConfig.template.ts",
    ],
  },
  // Vue SFC：essential 级别聚焦正确性错误，风格类规则交由 Prettier
  pluginVue.configs["flat/essential"],
  // TypeScript（含 .vue 内 script setup）
  vueTsConfigs.recommended,
  {
    rules: {
      // 本项目存在 echarts 配置透传等场景，允许显式 any
      "@typescript-eslint/no-explicit-any": "off",
      // 允许以 _ 前缀声明占位参数
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  {
    // VitePress 自定义 404 页面的文件名惯例即 404.vue
    files: [".vitepress/theme/components/404.vue"],
    rules: { "vue/multi-word-component-names": "off" },
  },
  // 必须放在最后：关闭所有与 Prettier 冲突的格式化规则
  prettierConfig,
);
