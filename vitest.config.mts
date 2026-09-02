import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["**/*.spec.ts"],
    exclude: ["node_modules/**", "packages/**", ".vitepress/dist/**", ".vitepress/cache/**"],
  },
});
