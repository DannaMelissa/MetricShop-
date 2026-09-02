"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLOR_PALETTE = [
  "#3656ED",
  "#68C4C4",
  "#FCB85C",
  "#FC6494",
  "#8566ED",
];

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
  cutout: "55%",
};

export default function CategoryChart({
  porCategoria,
}: {
  porCategoria: Record<string, number>;
}) {
  const categorias = Object.keys(porCategoria);

  const data = {
    labels: categorias,
    datasets: [
      {
        data: categorias.map((c) => porCategoria[c]),
        backgroundColor: categorias.map((_, i) => COLOR_PALETTE[i % COLOR_PALETTE.length]),
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="bg-surface rounded-lg shadow-sm border border-slate-100 p-5">
      <h2 className="text-lg font-semibold text-ink mb-4">Ventas por categoría</h2>

      <div className="flex items-center justify-between gap-4">
        <div className="w-40 h-40 shrink-0">
          <Doughnut data={data} options={options} />
        </div>

        <ul className="flex-1 space-y-3">
          {categorias.map((c, i) => {
            const total = Object.values(porCategoria).reduce((a, b) => a + b, 0);
            const pct = total ? Math.round((porCategoria[c] / total) * 100) : 0;
            return (
              <li key={c} className="flex items-center gap-2 text-sm">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: COLOR_PALETTE[i % COLOR_PALETTE.length] }}
                />
                <span className="text-ink">{c}</span>
                <span className="ml-auto text-ink-soft font-semibold">{pct}%</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}