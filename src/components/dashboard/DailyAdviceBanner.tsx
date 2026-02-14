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
    <div className="card">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-apple-orange/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-apple-orange" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM4 11a1 1 0 100-2H3a1 1 0 000 2h1zM10 18a1 1 0 001-1v-1a1 1 0 10-2 0v1a1 1 0 001 1z" />
            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-apple-orange">今日のアドバイス</p>
          <p className="text-[15px] mt-0.5 leading-relaxed" style={{ color: 'var(--color-secondary-label)' }}>{advice}</p>
        </div>
      </div>
    </div>
  );
}
