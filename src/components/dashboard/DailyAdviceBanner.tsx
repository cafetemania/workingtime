import type { PhaseInfo, MealEntry, HydrationEntry } from "../../types";
import { generateDailyAdvice } from "../../services/adviceGenerator";
import { calculatePfcTarget, getDailyPfcSummary } from "../../services/pfcCalculator";
import { getToday } from "../../utils/dateUtils";

interface DailyAdviceBannerProps {
  readonly phaseInfo: PhaseInfo | null;
  readonly mealEntries: readonly MealEntry[];
  readonly hydrationEntries: readonly HydrationEntry[];
  readonly hydrationGoal: number;
  readonly weight: number;
}

export function DailyAdviceBanner({
  phaseInfo,
  mealEntries,
  hydrationEntries,
  hydrationGoal,
  weight,
}: DailyAdviceBannerProps) {
  if (!phaseInfo) return null;

  const today = getToday();
  const target = calculatePfcTarget(weight, phaseInfo.pfcConfig);
  const pfcSummary = getDailyPfcSummary(mealEntries, today, target);
  const todayHydration = hydrationEntries
    .filter((e) => e.date === today)
    .reduce((sum, e) => sum + e.amount, 0);

  const advice = generateDailyAdvice(
    phaseInfo.phase,
    pfcSummary,
    todayHydration,
    hydrationGoal,
  );

  return (
    <div className="card bg-amber-50 border-amber-200">
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">💡</span>
        <div>
          <p className="text-sm font-medium text-amber-800">今日のアドバイス</p>
          <p className="text-sm text-amber-700 mt-1">{advice}</p>
        </div>
      </div>
    </div>
  );
}
