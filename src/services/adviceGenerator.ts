import type { TrainingPhase, DailyPfcSummary } from "../types";
import { PHASE_ADVICE } from "../data/phaseConfig";

/** フェーズ・PFC達成率・水分摂取量に基づくアドバイスを生成する */
export function generateDailyAdvice(
  phase: TrainingPhase,
  pfcSummary: DailyPfcSummary | null,
  hydrationMl: number,
  hydrationGoalMl: number,
): string {
  // PFC不足の警告
  if (pfcSummary) {
    const { achievementRate } = pfcSummary;
    if (achievementRate.protein < 50) {
      return "たんぱく質が不足しています。肉・魚・大豆製品を意識して摂りましょう";
    }
    if (achievementRate.carbohydrate < 50 && (phase === "CARBO_LOAD" || phase === "RACE_WEEK")) {
      return "炭水化物が不足しています。ご飯やパスタを増やしましょう";
    }
    if (achievementRate.fat > 150) {
      return "脂質が目標を大幅に超えています。揚げ物や油分を控えましょう";
    }
  }

  // 水分不足の警告
  if (hydrationGoalMl > 0 && hydrationMl < hydrationGoalMl * 0.3) {
    return "水分摂取が不足しています。こまめに水を飲みましょう";
  }

  // フェーズ別のランダムアドバイス
  const adviceList = PHASE_ADVICE[phase];
  const index = new Date().getDate() % adviceList.length;
  return adviceList[index]!;
}
