"use client";

import { useState, useEffect, useCallback } from "react";

export default function Dashboard() {
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [data, setData] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  const cargar = useCallback(async () => {
    setCargando(true);
    const params = new URLSearchParams();
    if (desde) params.set("desde", desde);
    if (hasta) params.set("hasta", hasta);
    const res = await fetch(`/api/metricas?${params.toString()}`);
    const json = await res.json();
    setData(json);
    setCargando(false);
  }, [desde, hasta]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">MetricShop</h1>

      <div className="mb-6 flex gap-4 items-end">
        <label className="flex flex-col text-sm">
          Desde
          <input
            type="date"
            value={desde}
            onChange={(e) => setDesde(e.target.value)}
            className="border rounded p-2"
          />
        </label>
        <label className="flex flex-col text-sm">
          Hasta
          <input
            type="date"
            value={hasta}
            onChange={(e) => setHasta(e.target.value)}
            className="border rounded p-2"
          />
        </label>
        <button
          onClick={cargar}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Filtrar
        </button>
      </div>

      {cargando ? (
        <p>Cargando...</p>
      ) : data ? (
        <pre className="bg-white rounded p-4 overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : null}
    </div>
  );
}