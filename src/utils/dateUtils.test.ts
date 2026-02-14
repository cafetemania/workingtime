import { describe, it, expect } from "vitest";
import { formatDate, parseDate, daysBetween, formatDateShort, formatDateLong, generateId } from "./dateUtils";

describe("formatDate", () => {
  it("DateをYYYY-MM-DD形式に変換する", () => {
    expect(formatDate(new Date(2026, 2, 15))).toBe("2026-03-15");
    expect(formatDate(new Date(2026, 0, 1))).toBe("2026-01-01");
  });
});

describe("parseDate", () => {
  it("YYYY-MM-DD文字列をDateに変換する", () => {
    const date = parseDate("2026-03-15");
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(2);
    expect(date.getDate()).toBe(15);
  });
});

describe("daysBetween", () => {
  it("2つの日付の差を計算する", () => {
    expect(daysBetween("2026-03-01", "2026-03-15")).toBe(14);
    expect(daysBetween("2026-03-15", "2026-03-01")).toBe(-14);
    expect(daysBetween("2026-03-15", "2026-03-15")).toBe(0);
  });
});

describe("formatDateShort", () => {
  it("M/D（曜日）形式でフォーマットする", () => {
    const result = formatDateShort("2026-03-15");
    expect(result).toMatch(/3\/15\(.+\)/);
  });
});

describe("formatDateLong", () => {
  it("YYYY年M月D日形式でフォーマットする", () => {
    expect(formatDateLong("2026-03-15")).toBe("2026年3月15日");
  });
});

describe("generateId", () => {
  it("ユニークなIDを生成する", () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
    expect(id1.length).toBeGreaterThan(10);
  });
});
