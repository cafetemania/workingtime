import { Header } from "../layout/Header";
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
    <div>
      <Header title="チャート分析" />
      <div className="px-4 py-4 space-y-4">
        {/* PFCレーダーチャート */}
        <div className="card">
          <h3 className="text-sm font-medium text-slate-500 mb-3">PFCバランス（今日）</h3>
          <PfcRadarChart
            mealEntries={data.mealEntries}
            phaseInfo={phaseInfo}
            weight={data.profile?.currentWeight ?? 60}
          />
        </div>

        {/* 体重推移 */}
        {weightWithEma.length > 1 && (
          <div className="card">
            <h3 className="text-sm font-medium text-slate-500 mb-3">体重推移</h3>
            <WeightChart data={weightWithEma} targetWeight={data.profile?.targetWeight} />
          </div>
        )}

        {/* 週間PFC棒グラフ */}
        <div className="card">
          <h3 className="text-sm font-medium text-slate-500 mb-3">週間PFC推移</h3>
          <WeeklyPfcBarChart mealEntries={data.mealEntries} />
        </div>
      </div>
    </div>
  );
}
