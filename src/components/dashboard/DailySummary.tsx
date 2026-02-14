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
      <h3 className="text-sm font-medium text-slate-500">今日の記録</h3>

      <button className="w-full text-left" onClick={() => navigate("/weight")}>
        <p className="text-xs text-slate-400">体重</p>
        <p className="text-lg font-bold text-slate-800">
          {todayWeight ? `${todayWeight.weight} kg` : "-- kg"}
        </p>
        {!todayWeight && (
          <p className="text-xs text-primary-500">タップして記録</p>
        )}
      </button>

      <div>
        <p className="text-xs text-slate-400">摂取カロリー</p>
        <p className="text-lg font-bold text-slate-800">{todayNutrients.energy} kcal</p>
      </div>

      <div>
        <p className="text-xs text-slate-400">水分</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-slate-100 rounded-full h-2">
            <div
              className="bg-blue-500 rounded-full h-2 transition-all"
              style={{ width: `${hydrationPercent}%` }}
            />
          </div>
          <span className="text-xs text-slate-500">{todayHydration}ml</span>
        </div>
      </div>
    </div>
  );
}
