"use client";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import LineChart from "./components/LineChart";
import CategoryChart from "./components/CategoryChart";
import TopProducts from "./components/TopProducts";
import { DollarSign, ShoppingBag, Box } from "lucide-react";

type Metricas = {
  totalIngresos: number;
  totalVentas: number;
  totalUnidades: number;
  porDia: Record<string, number>;
  porCategoria: Record<string, number>;
  topProductos: { nombre: string; cantidad: number; ingresos: number }[];
};

function Skeleton() {
  return (
    <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="bg-white rounded-lg p-5 border border-slate-100 aspect-[4/3]">
          <div className="h-3 w-20 bg-slate-200 rounded mb-4" />
          <div className="h-6 w-32 bg-slate-100 rounded" />
        </div>
      ))}
    </div>
  );
}

export default function Home() {  const [metricas, setMetricas] = useState<Metricas | null>(null);

  useEffect(() => {
    fetch("/api/metricas")
      .then((r) => r.json())
      .then((data) => setMetricas(data));
  }, []);

  const kpis = metricas
    ? [
        { titulo: "Ventas totales", valor: `$${metricas.totalIngresos.toLocaleString("es-ES")}`, Icon: DollarSign },
        { titulo: "Pedidos", valor: metricas.totalVentas.toLocaleString("es-ES"), Icon: ShoppingBag },
        { titulo: "Unidades vendidas", valor: metricas.totalUnidades.toLocaleString("es-ES"), Icon: Box },
      ]
    : [];

  return (
    <Sidebar>
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <header>
          <h1 className="text-2xl font-bold text-ink">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Bienvenido, aquí tienes el resumen de tus ventas ✨</p>
        </header>

        {!metricas ? (
          <Skeleton />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {kpis.map((k) => (
                <div key={k.titulo} className="bg-white rounded-lg shadow-sm border border-slate-100 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-slate-500">{k.titulo}</span>
                    <span className="w-9 h-9 rounded-lg bg-brand-pastel text-brand flex items-center justify-center">
                      <k.Icon className="w-5 h-5" strokeWidth={1.8} />
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-slate-900">{k.valor}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LineChart porDia={metricas.porDia} />
              <CategoryChart porCategoria={metricas.porCategoria} />
            </div>
            <TopProducts productos={metricas.topProductos} />
          </>
        )}
      </div>
    </Sidebar>
  );
}