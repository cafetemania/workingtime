import { useNavigate } from "react-router-dom";
import type { WeightEntry, MealEntry, HydrationEntry } from "../../types";
import { getToday } from "../../utils/dateUtils";
import { sumDailyNutrients } from "../../services/pfcCalculator";

interface DailySummaryProps {
  readonly weightEntries: readonly WeightEntry[];
  readonly mealEntries: readonly MealEntry[];
  readonly hydrationEntries: readonly HydrationEntry[];
  readonly hydrationGoal: number;
}

export function DailySummary({
  weightEntries,
  mealEntries,
  hydrationEntries,
  hydrationGoal,
}: DailySummaryProps) {
  const navigate = useNavigate();
  const today = getToday();
  const todayWeight = weightEntries.find((e) => e.date === today);
  const todayNutrients = sumDailyNutrients(mealEntries, today);
  const todayHydration = hydrationEntries
    .filter((e) => e.date === today)
    .reduce((sum, e) => sum + e.amount, 0);
  const hydrationPercent = Math.min(100, Math.round((todayHydration / hydrationGoal) * 100));

  return (
    <div className="card space-y-3">
      <p className="text-[13px] font-semibold text-apple-secondaryLabel">今日の記録</p>

      <button
        className="w-full text-left active:opacity-60 transition-opacity"
        onClick={() => navigate("/weight")}
      >
        <p className="text-[11px] text-apple-tertiaryLabel uppercase tracking-wide">体重</p>
        <p className="text-[22px] font-bold text-apple-label tracking-tight">
          {todayWeight ? `${todayWeight.weight}` : "--"}
          <span className="text-[13px] font-normal text-apple-tertiaryLabel ml-0.5">kg</span>
        </p>
        {!todayWeight && (
          <p className="text-[11px] text-apple-blue font-medium">タップして記録</p>
        )}
      </button>

      <div>
        <p className="text-[11px] text-apple-tertiaryLabel uppercase tracking-wide">カロリー</p>
        <p className="text-[22px] font-bold text-apple-label tracking-tight">
          {todayNutrients.energy}
          <span className="text-[13px] font-normal text-apple-tertiaryLabel ml-0.5">kcal</span>
        </p>
      </div>

      <div>
        <p className="text-[11px] text-apple-tertiaryLabel uppercase tracking-wide mb-1.5">水分</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-apple-gray5 rounded-full h-[6px]">
            <div
              className="bg-apple-teal rounded-full h-[6px] transition-all duration-500"
              style={{ width: `${hydrationPercent}%` }}
            />
          </div>
          <span className="text-[11px] text-apple-tertiaryLabel font-medium">{todayHydration}ml</span>
        </div>
      </div>
    </div>
  );
}
