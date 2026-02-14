import { describe, it, expect } from "vitest";
import { calculateNutrients, createMealItem, sumNutrients } from "./nutrientCalculator";
import type { FoodItem } from "../types";

const sampleFood: FoodItem = {
  id: "g001",
  name: "白飯",
  category: "穀類",
  per100g: { energy: 156, protein: 2.5, fat: 0.3, carbohydrate: 37.1 },
};

describe("calculateNutrients", () => {
  it("100gの場合はそのままの値", () => {
    const result = calculateNutrients(sampleFood, 100);

    expect(result.energy).toBe(156);
    expect(result.protein).toBe(2.5);
    expect(result.fat).toBe(0.3);
    expect(result.carbohydrate).toBe(37.1);
  });

  it("200gの場合は2倍", () => {
    const result = calculateNutrients(sampleFood, 200);

    expect(result.energy).toBe(312);
    expect(result.protein).toBe(5.0);
    expect(result.fat).toBe(0.6);
    expect(result.carbohydrate).toBe(74.2);
  });

  it("50gの場合は半分", () => {
    const result = calculateNutrients(sampleFood, 50);

    expect(result.energy).toBe(78);
    expect(result.protein).toBe(1.3);
  });
});

describe("createMealItem", () => {
  it("FoodItemからMealItemを生成する", () => {
    const item = createMealItem(sampleFood, 150);

    expect(item.foodId).toBe("g001");
    expect(item.foodName).toBe("白飯");
    expect(item.amount).toBe(150);
    expect(item.nutrients.energy).toBe(234);
  });
});

describe("sumNutrients", () => {
  it("複数アイテムの栄養素を合計する", () => {
    const items = [
      createMealItem(sampleFood, 200),
      createMealItem(
        { id: "m001", name: "鶏むね肉", category: "肉類", per100g: { energy: 105, protein: 23.3, fat: 1.9, carbohydrate: 0.0 } },
        100,
      ),
    ];

    const result = sumNutrients(items);

    expect(result.energy).toBe(417);
    expect(result.protein).toBeCloseTo(28.3, 1);
  });

  it("空配列はゼロを返す", () => {
    const result = sumNutrients([]);

    expect(result.energy).toBe(0);
    expect(result.protein).toBe(0);
    expect(result.fat).toBe(0);
    expect(result.carbohydrate).toBe(0);
  });
});
