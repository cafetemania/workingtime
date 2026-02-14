import type { WeightEntry, WeightAnalysis } from "../types";
import { daysBetween } from "../utils/dateUtils";

/** 指数移動平均（EMA）を計算する */
export function calculateEMA(values: readonly number[], period: number): number[] {
  if (values.length === 0) return [];
  const k = 2 / (period + 1);
  const result: number[] = [values[0]!];

  for (let i = 1; i < values.length; i++) {
    const prev = result[i - 1]!;
    const current = values[i]!;
    result.push(current * k + prev * (1 - k));
  }

  return result;
}

/** 体重記録に7日間EMAを付与する */
export function getWeightWithEMA(
  entries: readonly WeightEntry[],
): Array<{ date: string; weight: number; ema: number }> {
  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));
  const weights = sorted.map((e) => e.weight);
  const emaValues = calculateEMA(weights, 7);

  return sorted.map((entry, i) => ({
    date: entry.date,
    weight: entry.weight,
    ema: Math.round(emaValues[i]! * 10) / 10,
  }));
}

/** 体重分析結果を生成する */
export function analyzeWeight(
  entries: readonly WeightEntry[],
  targetWeight: number,
  targetDate: string,
  today: string,
): WeightAnalysis | null {
  if (entries.length === 0) return null;

  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));
  const latest = sorted[sorted.length - 1]!;
  const emaValues = calculateEMA(sorted.map((e) => e.weight), 7);
  const currentEma = emaValues[emaValues.length - 1]!;

  // トレンド判定（直近3日のEMA比較）
  let trend: WeightAnalysis["trend"] = "stable";
  if (emaValues.length >= 3) {
    const recent = emaValues[emaValues.length - 1]!;
    const prior = emaValues[emaValues.length - 3]!;
    const diff = recent - prior;
    if (diff < -0.1) trend = "decreasing";
    else if (diff > 0.1) trend = "increasing";
  }

  const remainingKg = Math.round((currentEma - targetWeight) * 10) / 10;
  const daysLeft = Math.max(1, daysBetween(today, targetDate));
  const dailyChangeNeeded = Math.round((remainingKg / daysLeft) * 100) / 100;

  // 進捗率（初回体重からの進捗）
  const initialWeight = sorted[0]!.weight;
  const totalToLose = initialWeight - targetWeight;
  const lostSoFar = initialWeight - currentEma;
  const progressToGoal =
    totalToLose === 0 ? 100 : Math.round((lostSoFar / totalToLose) * 100);

  return {
    currentWeight: latest.weight,
    movingAverage: Math.round(currentEma * 10) / 10,
    trend,
    progressToGoal: Math.min(100, Math.max(0, progressToGoal)),
    remainingKg,
    dailyChangeNeeded,
  };
}
