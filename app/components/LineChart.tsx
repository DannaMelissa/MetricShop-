"use client";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const COLOR_LINE = "#6856ED";
const COLOR_TOP = "rgba(104, 86, 237, 0.28)";
const COLOR_BOTTOM = "rgba(104, 86, 237, 0.02)";

export default function LineChart({ porDia }: { porDia: Record<string, number> }) {
  const fechas = Object.keys(porDia).sort();
  const valores = fechas.map((f) => porDia[f]);

  const data = {
    labels: fechas,
    datasets: [
      {
        label: "Ingresos",
        data: valores,
        borderColor: COLOR_LINE,
        borderWidth: 2,
        pointRadius: 2,
        pointHoverRadius: 4,
        pointBackgroundColor: COLOR_LINE,
        pointBorderColor: "#ffffff",
        pointBorderWidth: 1,
        fill: true,
        tension: 0.4,
        backgroundColor: (context: { chart?: { ctx: CanvasRenderingContext2D | null; chartArea?: { top: number; bottom: number } } }) => {
          const { ctx, chartArea } = context.chart ?? {};
          if (!ctx || !chartArea) return COLOR_BOTTOM;
          const grad = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          grad.addColorStop(0, COLOR_TOP);
          grad.addColorStop(1, COLOR_BOTTOM);
          return grad;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#161a31",
        bodyColor: "#7f8394",
        borderColor: "#e2e8f0",
        borderWidth: 1,
        cornerRadius: 6,
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#7f8394", maxTicksLimit: 6 },
      },
      y: {
        grid: { color: "#f1f5f9" },
        border: { display: false },
        ticks: { color: "#7f8394" },
      },
    },
  };

  return (
    <div className="bg-surface rounded-lg shadow-sm border border-slate-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-ink">Ventas</h2>
        <span className="text-xs text-ink-soft bg-slate-100 rounded-md px-2 py-1">Diario</span>
      </div>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}