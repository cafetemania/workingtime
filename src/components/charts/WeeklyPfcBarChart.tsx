import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { MealEntry } from "../../types";
import { sumDailyNutrients } from "../../services/pfcCalculator";
import { formatDate, formatDateShort } from "../../utils/dateUtils";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface WeeklyPfcBarChartProps {
  readonly mealEntries: readonly MealEntry[];
}

export function WeeklyPfcBarChart({ mealEntries }: WeeklyPfcBarChartProps) {
  // 直近7日間のデータ
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(formatDate(d));
  }

  const dailyData = days.map((date) => sumDailyNutrients(mealEntries, date));

  const chartData = {
    labels: days.map((d) => formatDateShort(d)),
    datasets: [
      {
        label: "P (g)",
        data: dailyData.map((d) => d.protein),
        backgroundColor: "rgba(239, 68, 68, 0.7)",
      },
      {
        label: "F (g)",
        data: dailyData.map((d) => d.fat),
        backgroundColor: "rgba(234, 179, 8, 0.7)",
      },
      {
        label: "C (g)",
        data: dailyData.map((d) => d.carbohydrate),
        backgroundColor: "rgba(59, 130, 246, 0.7)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { boxWidth: 12, font: { size: 11 } },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: { font: { size: 9 }, maxRotation: 45 },
      },
      y: {
        stacked: true,
        ticks: { font: { size: 10 } },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
