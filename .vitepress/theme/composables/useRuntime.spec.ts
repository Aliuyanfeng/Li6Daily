import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useRuntime } from "./useRuntime";

// 隔离主题包依赖：isClient / useScopeDispose 来自 vitepress-theme-teek，
// Node 测试环境下仅提供最小实现，聚焦被测逻辑本身
vi.mock("vitepress-theme-teek", () => ({
  isClient: true,
  useScopeDispose: () => {},
}));

describe("useRuntime", () => {
  beforeEach(() => {
    document.body.innerHTML = `<span id="runtime">22</span>`;
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = "";
  });

  it("按固定起始时间计算天/时/分/秒并渲染到目标元素", () => {
    vi.setSystemTime(new Date("2025-03-15 12:30:45"));
    const { start } = useRuntime("2025-03-14 00:00:00");
    start();

    const el = document.querySelector("#runtime")!;
    expect(el.innerHTML).toContain("1</span> 天");
    expect(el.innerHTML).toContain("12</span> 时");
    expect(el.innerHTML).toContain("30</span> 分");
    expect(el.innerHTML).toContain("45</span> 秒");
  });

  it("定时器每秒刷新一次显示", () => {
    vi.setSystemTime(new Date("2025-03-15 00:00:00"));
    const { start } = useRuntime("2025-03-14 00:00:00");
    start();

    vi.advanceTimersByTime(3000);
    const el = document.querySelector("#runtime")!;
    expect(el.innerHTML).toContain("3</span> 秒");
  });

  it("stop 后定时器停止刷新", () => {
    vi.setSystemTime(new Date("2025-03-15 00:00:00"));
    const { start, stop } = useRuntime("2025-03-14 00:00:00");
    start();
    stop();

    const before = document.querySelector("#runtime")!.innerHTML;
    vi.advanceTimersByTime(5000);
    const after = document.querySelector("#runtime")!.innerHTML;
    expect(after).toBe(before);
  });

  it("目标元素不存在时 start 不抛出异常", () => {
    document.body.innerHTML = "";
    const { start } = useRuntime("2025-03-14 00:00:00");
    expect(() => start()).not.toThrow();
  });
});
