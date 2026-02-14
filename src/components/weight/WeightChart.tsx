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
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        pointRadius: 3,
        tension: 0,
      },
      {
        label: "移動平均(7日)",
        data: data.map((d) => d.ema),
        borderColor: "rgb(239, 68, 68)",
        borderDash: [5, 5],
        pointRadius: 0,
        tension: 0.4,
      },
      ...(targetWeight
        ? [
            {
              label: "目標",
              data: data.map(() => targetWeight),
              borderColor: "rgb(34, 197, 94)",
              borderDash: [10, 5],
              pointRadius: 0,
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
        labels: { boxWidth: 12, font: { size: 11 } },
      },
    },
    scales: {
      y: {
        ticks: { font: { size: 10 } },
      },
      x: {
        ticks: { font: { size: 9 }, maxRotation: 45 },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
