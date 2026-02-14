import { describe, it, expect } from "vitest";
import { calculatePfcTarget, sumDailyNutrients, getDailyPfcSummary } from "./pfcCalculator";
import type { MealEntry, PhasePfcConfig } from "../types";

describe("calculatePfcTarget", () => {
  it("体重とフェーズ設定からPFC目標を計算する", () => {
    const config: PhasePfcConfig = { protein: 1.5, fat: 1.0, carbohydrate: 6 };
    const result = calculatePfcTarget(60, config);

    expect(result.protein).toBe(90);
    expect(result.fat).toBe(60);
    expect(result.carbohydrate).toBe(360);
    expect(result.totalCalories).toBe(90 * 4 + 60 * 9 + 360 * 4);
  });

  it("小数点以下は四捨五入される", () => {
    const config: PhasePfcConfig = { protein: 1.4, fat: 0.8, carbohydrate: 5.5 };
    const result = calculatePfcTarget(65, config);

    expect(result.protein).toBe(91);
    expect(result.fat).toBe(52);
    expect(result.carbohydrate).toBe(358);
  });
});

describe("sumDailyNutrients", () => {
  const meals: MealEntry[] = [
    {
      id: "1",
      date: "2026-03-15",
      mealType: "breakfast",
      items: [
        { foodId: "g001", foodName: "白飯", amount: 200, nutrients: { energy: 312, protein: 5.0, fat: 0.6, carbohydrate: 74.2 } },
        { foodId: "e001", foodName: "卵", amount: 50, nutrients: { energy: 67, protein: 6.3, fat: 5.0, carbohydrate: 0.2 } },
      ],
    },
    {
      id: "2",
      date: "2026-03-15",
      mealType: "lunch",
      items: [
        { foodId: "m001", foodName: "鶏むね肉", amount: 100, nutrients: { energy: 105, protein: 23.3, fat: 1.9, carbohydrate: 0.0 } },
      ],
    },
    {
      id: "3",
      date: "2026-03-16",
      mealType: "breakfast",
      items: [
        { foodId: "g001", foodName: "白飯", amount: 200, nutrients: { energy: 312, protein: 5.0, fat: 0.6, carbohydrate: 74.2 } },
      ],
    },
  ];

  it("指定日の栄養素を合計する", () => {
    const result = sumDailyNutrients(meals, "2026-03-15");

    expect(result.energy).toBe(484);
    expect(result.protein).toBeCloseTo(34.6, 1);
    expect(result.fat).toBeCloseTo(7.5, 1);
    expect(result.carbohydrate).toBeCloseTo(74.4, 1);
  });

  it("記録のない日はゼロを返す", () => {
    const result = sumDailyNutrients(meals, "2026-03-20");

    expect(result.energy).toBe(0);
    expect(result.protein).toBe(0);
    expect(result.fat).toBe(0);
    expect(result.carbohydrate).toBe(0);
  });
});

describe("getDailyPfcSummary", () => {
  it("達成率を正しく計算する", () => {
    const meals: MealEntry[] = [
      {
        id: "1",
        date: "2026-03-15",
        mealType: "breakfast",
        items: [
          { foodId: "g001", foodName: "白飯", amount: 200, nutrients: { energy: 312, protein: 45, fat: 30, carbohydrate: 180 } },
        ],
      },
    ];

    const target = { protein: 90, fat: 60, carbohydrate: 360, totalCalories: 2340 };
    const result = getDailyPfcSummary(meals, "2026-03-15", target);

    expect(result.achievementRate.protein).toBe(50);
    expect(result.achievementRate.fat).toBe(50);
    expect(result.achievementRate.carbohydrate).toBe(50);
  });
});
