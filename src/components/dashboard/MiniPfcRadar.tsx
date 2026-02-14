import type { MealEntry, PhaseInfo } from "../../types";
import { calculatePfcTarget, getDailyPfcSummary } from "../../services/pfcCalculator";
import { getToday } from "../../utils/dateUtils";

interface MiniPfcRadarProps {
  readonly mealEntries: readonly MealEntry[];
  readonly phaseInfo: PhaseInfo | null;
  readonly weight: number;
}

export function MiniPfcRadar({ mealEntries, phaseInfo, weight }: MiniPfcRadarProps) {
  if (!phaseInfo) return null;

  const today = getToday();
  const target = calculatePfcTarget(weight, phaseInfo.pfcConfig);
  const summary = getDailyPfcSummary(mealEntries, today, target);

  const items = [
    { label: "P", value: summary.achievementRate.protein, color: "text-red-500" },
    { label: "F", value: summary.achievementRate.fat, color: "text-yellow-500" },
    { label: "C", value: summary.achievementRate.carbohydrate, color: "text-blue-500" },
  ];

  return (
    <div className="card space-y-3">
      <h3 className="text-sm font-medium text-slate-500">PFCバランス</h3>
      {items.map((item) => (
        <div key={item.label}>
          <div className="flex justify-between text-xs mb-1">
            <span className={`font-bold ${item.color}`}>{item.label}</span>
            <span className="text-slate-500">{item.value}%</span>
          </div>
          <div className="bg-slate-100 rounded-full h-2">
            <div
              className={`rounded-full h-2 transition-all ${
                item.label === "P"
                  ? "bg-red-400"
                  : item.label === "F"
                    ? "bg-yellow-400"
                    : "bg-blue-400"
              }`}
              style={{ width: `${Math.min(100, item.value)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
