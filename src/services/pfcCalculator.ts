import type { PhasePfcConfig, PfcTarget, Nutrients, MealEntry, DailyPfcSummary } from "../types";

/** 体重とフェーズ設定からPFC目標（絶対値g）を計算する */
export function calculatePfcTarget(weightKg: number, config: PhasePfcConfig): PfcTarget {
  const protein = Math.round(weightKg * config.protein);
  const fat = Math.round(weightKg * config.fat);
  const carbohydrate = Math.round(weightKg * config.carbohydrate);
  const totalCalories = protein * 4 + fat * 9 + carbohydrate * 4;

  return { protein, fat, carbohydrate, totalCalories };
}

const round1 = (n: number) => Math.round(n * 10) / 10;

/** 食事エントリから日次の栄養素合計を計算する */
export function sumDailyNutrients(meals: readonly MealEntry[], date: string): Nutrients {
  const dayMeals = meals.filter((m) => m.date === date);

  const raw = dayMeals.reduce(
    (acc, meal) => {
      const mealTotal = meal.items.reduce(
        (itemAcc, item) => ({
          energy: itemAcc.energy + item.nutrients.energy,
          protein: itemAcc.protein + item.nutrients.protein,
          fat: itemAcc.fat + item.nutrients.fat,
          carbohydrate: itemAcc.carbohydrate + item.nutrients.carbohydrate,
        }),
        { energy: 0, protein: 0, fat: 0, carbohydrate: 0 },
      );

      return {
        energy: acc.energy + mealTotal.energy,
        protein: acc.protein + mealTotal.protein,
        fat: acc.fat + mealTotal.fat,
        carbohydrate: acc.carbohydrate + mealTotal.carbohydrate,
      };
    },
    { energy: 0, protein: 0, fat: 0, carbohydrate: 0 },
  );

  return {
    energy: Math.round(raw.energy),
    protein: round1(raw.protein),
    fat: round1(raw.fat),
    carbohydrate: round1(raw.carbohydrate),
  };
}

/** 日次PFCサマリーを計算する */
export function getDailyPfcSummary(
  meals: readonly MealEntry[],
  date: string,
  target: PfcTarget,
): DailyPfcSummary {
  const actual = sumDailyNutrients(meals, date);

  const safeDiv = (a: number, b: number) => (b === 0 ? 0 : Math.round((a / b) * 100));

  return {
    date,
    actual,
    target,
    achievementRate: {
      protein: safeDiv(actual.protein, target.protein),
      fat: safeDiv(actual.fat, target.fat),
      carbohydrate: safeDiv(actual.carbohydrate, target.carbohydrate),
    },
  };
}
