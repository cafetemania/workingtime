import type { FoodItem, Nutrients, MealItem } from "../types";
import { generateId } from "../utils/dateUtils";

/** 食品データと量（g）から栄養素を計算する */
export function calculateNutrients(food: FoodItem, amountG: number): Nutrients {
  const ratio = amountG / 100;
  return {
    energy: Math.round(food.per100g.energy * ratio),
    protein: Math.round(food.per100g.protein * ratio * 10) / 10,
    fat: Math.round(food.per100g.fat * ratio * 10) / 10,
    carbohydrate: Math.round(food.per100g.carbohydrate * ratio * 10) / 10,
  };
}

/** 食品データと量からMealItemを生成する */
export function createMealItem(food: FoodItem, amountG: number): MealItem {
  return {
    foodId: food.id,
    foodName: food.name,
    amount: amountG,
    nutrients: calculateNutrients(food, amountG),
  };
}

/** MealItem配列の栄養素合計を計算する */
export function sumNutrients(items: readonly MealItem[]): Nutrients {
  return items.reduce(
    (acc, item) => ({
      energy: acc.energy + item.nutrients.energy,
      protein: Math.round((acc.protein + item.nutrients.protein) * 10) / 10,
      fat: Math.round((acc.fat + item.nutrients.fat) * 10) / 10,
      carbohydrate: Math.round((acc.carbohydrate + item.nutrients.carbohydrate) * 10) / 10,
    }),
    { energy: 0, protein: 0, fat: 0, carbohydrate: 0 },
  );
}

/** お気に入りからMealItemリストを復元する（新しいIDで） */
export function restoreFavoriteItems(items: readonly MealItem[]): MealItem[] {
  return items.map((item) => ({
    ...item,
    foodId: item.foodId || generateId(),
  }));
}
