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
    return (
      <p className="text-[15px] text-apple-tertiaryLabel text-center py-8">
        レース情報を設定してください
      </p>
    );
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
        backgroundColor: "rgba(0, 122, 255, 0.15)",
        borderColor: "#007aff",
        pointBackgroundColor: "#007aff",
        borderWidth: 2,
      },
      {
        label: "目標 (100%)",
        data: [100, 100, 100],
        backgroundColor: "rgba(52, 199, 89, 0.08)",
        borderColor: "#34c759",
        borderDash: [4, 4],
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
        ticks: { stepSize: 50, font: { size: 10 }, color: "#8e8e93" },
        pointLabels: {
          font: { size: 12, family: "-apple-system, BlinkMacSystemFont, sans-serif" },
          color: "#3c3c43",
        },
        grid: { color: "rgba(60,60,67,0.08)" },
      },
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 10,
          font: { size: 11, family: "-apple-system, BlinkMacSystemFont, sans-serif" },
          color: "#8e8e93",
          padding: 16,
        },
      },
    },
  };

  return (
    <div>
      <Radar data={chartData} options={options} />
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="bg-apple-red/10 rounded-apple py-2">
          <p className="text-[11px] text-apple-tertiaryLabel">P (実/目標)</p>
          <p className="text-[13px] font-semibold text-apple-red tabular-nums">
            {summary.actual.protein}g / {target.protein}g
          </p>
        </div>
        <div className="bg-apple-orange/10 rounded-apple py-2">
          <p className="text-[11px] text-apple-tertiaryLabel">F (実/目標)</p>
          <p className="text-[13px] font-semibold text-apple-orange tabular-nums">
            {summary.actual.fat}g / {target.fat}g
          </p>
        </div>
        <div className="bg-apple-blue/10 rounded-apple py-2">
          <p className="text-[11px] text-apple-tertiaryLabel">C (実/目標)</p>
          <p className="text-[13px] font-semibold text-apple-blue tabular-nums">
            {summary.actual.carbohydrate}g / {target.carbohydrate}g
          </p>
        </div>
      </div>
    </div>
  );
}
