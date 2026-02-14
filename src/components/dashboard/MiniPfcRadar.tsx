import type { MealEntry, PhaseInfo } from "../../types";
import { calculatePfcTarget, getDailyPfcSummary } from "../../services/pfcCalculator";
import { getToday } from "../../utils/dateUtils";

interface MiniPfcRadarProps {
  readonly mealEntries: readonly MealEntry[];
  readonly phaseInfo: PhaseInfo | null;
  readonly weight: number;
}

const PFC_COLORS = {
  P: { bar: "#ff3b30", bg: "rgba(255,59,48,0.12)", text: "text-apple-red" },
  F: { bar: "#ff9500", bg: "rgba(255,149,0,0.12)", text: "text-apple-orange" },
  C: { bar: "#007aff", bg: "rgba(0,122,255,0.12)", text: "text-apple-blue" },
} as const;

export function MiniPfcRadar({ mealEntries, phaseInfo, weight }: MiniPfcRadarProps) {
  if (!phaseInfo) return null;

  const today = getToday();
  const target = calculatePfcTarget(weight, phaseInfo.pfcConfig);
  const summary = getDailyPfcSummary(mealEntries, today, target);

  const items = [
    { label: "P" as const, value: summary.achievementRate.protein },
    { label: "F" as const, value: summary.achievementRate.fat },
    { label: "C" as const, value: summary.achievementRate.carbohydrate },
  ];

  return (
    <div className="card space-y-3">
      <p className="text-[13px] font-semibold" style={{ color: 'var(--color-secondary-label)' }}>PFCバランス</p>
      {items.map((item) => {
        const colors = PFC_COLORS[item.label];
        return (
          <div key={item.label}>
            <div className="flex justify-between items-center mb-1.5">
              <span
                className={`text-[13px] font-bold ${colors.text}`}
              >
                {item.label}
              </span>
              <span className="text-[13px] font-medium tabular-nums" style={{ color: 'var(--color-secondary-label)' }}>
                {item.value}%
              </span>
            </div>
            <div className="rounded-full h-[6px]" style={{ backgroundColor: colors.bg }}>
              <div
                className="rounded-full h-[6px] transition-all duration-500"
                style={{
                  width: `${Math.min(100, item.value)}%`,
                  backgroundColor: colors.bar,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
