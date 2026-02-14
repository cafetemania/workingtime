import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import type { MealEntry, PhaseInfo } from "../../types";
import { calculatePfcTarget, getDailyPfcSummary } from "../../services/pfcCalculator";
import { getToday } from "../../utils/dateUtils";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface PfcRadarChartProps {
  readonly mealEntries: readonly MealEntry[];
  readonly phaseInfo: PhaseInfo | null;
  readonly weight: number;
}

export function PfcRadarChart({ mealEntries, phaseInfo, weight }: PfcRadarChartProps) {
  if (!phaseInfo) {
    return <p className="text-sm text-slate-400 text-center py-8">レース情報を設定してください</p>;
  }

  const today = getToday();
  const target = calculatePfcTarget(weight, phaseInfo.pfcConfig);
  const summary = getDailyPfcSummary(mealEntries, today, target);

  const chartData = {
    labels: ["たんぱく質 (P)", "脂質 (F)", "炭水化物 (C)"],
    datasets: [
      {
        label: "達成率 (%)",
        data: [
          summary.achievementRate.protein,
          summary.achievementRate.fat,
          summary.achievementRate.carbohydrate,
        ],
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgb(59, 130, 246)",
        pointBackgroundColor: "rgb(59, 130, 246)",
        borderWidth: 2,
      },
      {
        label: "目標 (100%)",
        data: [100, 100, 100],
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        borderColor: "rgb(34, 197, 94)",
        borderDash: [5, 5],
        pointRadius: 0,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 150,
        ticks: { stepSize: 50, font: { size: 10 } },
        pointLabels: { font: { size: 12 } },
      },
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { boxWidth: 12, font: { size: 11 } },
      },
    },
  };

  return (
    <div>
      <Radar data={chartData} options={options} />
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
        <div>
          <p className="text-slate-400">P (実/目標)</p>
          <p className="font-medium">{summary.actual.protein}g / {target.protein}g</p>
        </div>
        <div>
          <p className="text-slate-400">F (実/目標)</p>
          <p className="font-medium">{summary.actual.fat}g / {target.fat}g</p>
        </div>
        <div>
          <p className="text-slate-400">C (実/目標)</p>
          <p className="font-medium">{summary.actual.carbohydrate}g / {target.carbohydrate}g</p>
        </div>
      </div>
    </div>
  );
}
