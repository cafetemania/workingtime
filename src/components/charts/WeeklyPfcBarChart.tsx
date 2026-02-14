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
  const chartTextColor = getComputedStyle(document.documentElement).getPropertyValue('--chart-text').trim() || '#8e8e93';
  const chartGridColor = getComputedStyle(document.documentElement).getPropertyValue('--chart-grid').trim() || 'rgba(60,60,67,0.08)';
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
        backgroundColor: "rgba(255, 59, 48, 0.7)",
        borderRadius: 4,
      },
      {
        label: "F (g)",
        data: dailyData.map((d) => d.fat),
        backgroundColor: "rgba(255, 149, 0, 0.7)",
        borderRadius: 4,
      },
      {
        label: "C (g)",
        data: dailyData.map((d) => d.carbohydrate),
        backgroundColor: "rgba(0, 122, 255, 0.7)",
        borderRadius: 4,
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
        labels: {
          boxWidth: 10,
          font: { size: 11, family: "-apple-system, BlinkMacSystemFont, sans-serif" },
          color: chartTextColor,
          padding: 16,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { font: { size: 9 }, color: chartTextColor, maxRotation: 45 },
      },
      y: {
        stacked: true,
        grid: { color: chartGridColor },
        ticks: { font: { size: 10 }, color: chartTextColor },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
