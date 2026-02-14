import { describe, it, expect } from "vitest";
import { generateDailyAdvice } from "./adviceGenerator";
import type { DailyPfcSummary } from "../types";

describe("generateDailyAdvice", () => {
  it("たんぱく質不足時に警告する", () => {
    const summary: DailyPfcSummary = {
      date: "2026-03-15",
      actual: { energy: 500, protein: 20, fat: 30, carbohydrate: 200 },
      target: { protein: 90, fat: 60, carbohydrate: 360, totalCalories: 2340 },
      achievementRate: { protein: 22, fat: 50, carbohydrate: 56 },
    };

    const advice = generateDailyAdvice("NORMAL", summary, 1000, 2000);
    expect(advice).toContain("たんぱく質");
  });

  it("カーボ期に炭水化物不足で警告する", () => {
    const summary: DailyPfcSummary = {
      date: "2026-03-15",
      actual: { energy: 500, protein: 50, fat: 30, carbohydrate: 100 },
      target: { protein: 90, fat: 60, carbohydrate: 540, totalCalories: 3060 },
      achievementRate: { protein: 56, fat: 50, carbohydrate: 19 },
    };

    const advice = generateDailyAdvice("CARBO_LOAD", summary, 1000, 2000);
    expect(advice).toContain("炭水化物");
  });

  it("水分不足時に警告する", () => {
    const advice = generateDailyAdvice("NORMAL", null, 200, 2000);
    expect(advice).toContain("水分");
  });

  it("問題なければフェーズ別アドバイスを返す", () => {
    const summary: DailyPfcSummary = {
      date: "2026-03-15",
      actual: { energy: 1500, protein: 60, fat: 40, carbohydrate: 250 },
      target: { protein: 90, fat: 60, carbohydrate: 360, totalCalories: 2340 },
      achievementRate: { protein: 67, fat: 67, carbohydrate: 69 },
    };

    const advice = generateDailyAdvice("NORMAL", summary, 1500, 2000);
    expect(typeof advice).toBe("string");
    expect(advice.length).toBeGreaterThan(0);
  });
});
