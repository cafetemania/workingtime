import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { formatDateShort } from "../../utils/dateUtils";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface WeightChartProps {
  readonly data: Array<{ date: string; weight: number; ema: number }>;
  readonly targetWeight?: number;
}

export function WeightChart({ data, targetWeight }: WeightChartProps) {
  const labels = data.map((d) => formatDateShort(d.date));

  const chartData = {
    labels,
    datasets: [
      {
        label: "体重",
        data: data.map((d) => d.weight),
        borderColor: "#007aff",
        backgroundColor: "rgba(0, 122, 255, 0.08)",
        fill: true,
        pointRadius: 3,
        pointBackgroundColor: "#007aff",
        borderWidth: 2,
        tension: 0.1,
      },
      {
        label: "移動平均(7日)",
        data: data.map((d) => d.ema),
        borderColor: "#ff9500",
        borderDash: [4, 4],
        pointRadius: 0,
        borderWidth: 1.5,
        tension: 0.4,
      },
      ...(targetWeight
        ? [
            {
              label: "目標",
              data: data.map(() => targetWeight),
              borderColor: "#34c759",
              borderDash: [8, 4],
              pointRadius: 0,
              borderWidth: 1.5,
              tension: 0,
            },
          ]
        : []),
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.8,
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
    scales: {
      y: {
        grid: { color: "rgba(60,60,67,0.08)" },
        ticks: { font: { size: 10 }, color: "#8e8e93" },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 9 }, color: "#8e8e93", maxRotation: 45 },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
