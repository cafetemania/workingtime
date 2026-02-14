import { useAppData } from "../../hooks/useAppData";
import { useTrainingPhase } from "../../hooks/useTrainingPhase";
import { PfcRadarChart } from "./PfcRadarChart";
import { WeeklyPfcBarChart } from "./WeeklyPfcBarChart";
import { getWeightWithEMA } from "../../services/weightAnalyzer";
import { WeightChart } from "../weight/WeightChart";

export function ChartsPage() {
  const { data } = useAppData();
  const phaseInfo = useTrainingPhase(data.profile?.raceDate);
  const weightWithEma = getWeightWithEMA(data.weightEntries);

  return (
    <div className="animate-fade-in">
      <div className="px-5 pt-14 pb-2">
        <h1 className="large-title">分析</h1>
      </div>

      <div className="px-4 pb-6 space-y-4">
        <div className="card">
          <p className="text-[13px] font-semibold mb-3" style={{ color: 'var(--color-secondary-label)' }}>PFCバランス（今日）</p>
          <PfcRadarChart
            mealEntries={data.mealEntries}
            phaseInfo={phaseInfo}
            weight={data.profile?.currentWeight ?? 60}
          />
        </div>

        {weightWithEma.length > 1 && (
          <div className="card">
            <p className="text-[13px] font-semibold mb-3" style={{ color: 'var(--color-secondary-label)' }}>体重推移</p>
            <WeightChart data={weightWithEma} targetWeight={data.profile?.targetWeight} />
          </div>
        )}

        <div className="card">
          <p className="text-[13px] font-semibold mb-3" style={{ color: 'var(--color-secondary-label)' }}>週間PFC推移</p>
          <WeeklyPfcBarChart mealEntries={data.mealEntries} />
        </div>
      </div>
    </div>
  );
}
