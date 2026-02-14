import { describe, it, expect } from "vitest";
import {
  isValidWeight,
  isValidHeight,
  isValidAge,
  isValidFoodAmount,
  isValidHydrationAmount,
  isValidDateString,
} from "./validators";

describe("isValidWeight", () => {
  it("有効な体重を受け入れる", () => {
    expect(isValidWeight(60)).toBe(true);
    expect(isValidWeight(20)).toBe(true);
    expect(isValidWeight(300)).toBe(true);
  });

  it("無効な体重を拒否する", () => {
    expect(isValidWeight(19)).toBe(false);
    expect(isValidWeight(301)).toBe(false);
    expect(isValidWeight(NaN)).toBe(false);
    expect(isValidWeight(Infinity)).toBe(false);
  });
});

describe("isValidHeight", () => {
  it("有効な身長を受け入れる", () => {
    expect(isValidHeight(170)).toBe(true);
    expect(isValidHeight(100)).toBe(true);
  });

  it("無効な身長を拒否する", () => {
    expect(isValidHeight(99)).toBe(false);
    expect(isValidHeight(251)).toBe(false);
  });
});

describe("isValidAge", () => {
  it("有効な年齢を受け入れる", () => {
    expect(isValidAge(30)).toBe(true);
    expect(isValidAge(10)).toBe(true);
    expect(isValidAge(120)).toBe(true);
  });

  it("無効な年齢を拒否する", () => {
    expect(isValidAge(9)).toBe(false);
    expect(isValidAge(121)).toBe(false);
    expect(isValidAge(30.5)).toBe(false);
  });
});

describe("isValidFoodAmount", () => {
  it("有効な量を受け入れる", () => {
    expect(isValidFoodAmount(100)).toBe(true);
    expect(isValidFoodAmount(1)).toBe(true);
  });

  it("無効な量を拒否する", () => {
    expect(isValidFoodAmount(0)).toBe(false);
    expect(isValidFoodAmount(5001)).toBe(false);
  });
});

describe("isValidHydrationAmount", () => {
  it("有効な水分量を受け入れる", () => {
    expect(isValidHydrationAmount(200)).toBe(true);
  });

  it("無効な水分量を拒否する", () => {
    expect(isValidHydrationAmount(0)).toBe(false);
  });
});

describe("isValidDateString", () => {
  it("有効な日付文字列を受け入れる", () => {
    expect(isValidDateString("2026-03-15")).toBe(true);
    expect(isValidDateString("2026-01-01")).toBe(true);
  });

  it("無効な日付文字列を拒否する", () => {
    expect(isValidDateString("2026-13-01")).toBe(false);
    expect(isValidDateString("2026/03/15")).toBe(false);
    expect(isValidDateString("not-a-date")).toBe(false);
  });
});
