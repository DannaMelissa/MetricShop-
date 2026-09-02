"use client";
import { useState } from "react";
import { Home, TrendingUp, Tag } from "lucide-react";

const menuItems = [
  { nombre: "Dashboard", Icon: Home, activo: true },
  { nombre: "Ventas", Icon: TrendingUp, activo: false },
  { nombre: "Productos", Icon: Tag, activo: false },
];

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [colapsada, setColapsada] = useState(false);

  return (
    <div className="flex min-h-screen text-ink">
      <aside
        className={`${
          colapsada ? "w-16" : "w-56"
        } transition-all duration-200 bg-white border-r border-slate-200 flex flex-col shrink-0 relative shadow-sm`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100">
          <span className={colapsada ? "hidden" : "text-lg font-bold tracking-tight"}>
            MetricShop
          </span>
          <button
            onClick={() => setColapsada(!colapsada)}
            className={colapsada ? "mx-auto p-2 rounded-lg hover:bg-slate-100 text-slate-400" : "p-2 rounded-lg hover:bg-slate-100 text-slate-400"}
            aria-label={colapsada ? "Expandir menú" : "Contraer menú"}
          >
            {colapsada ? "→" : "←"}
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((m) => (
            <a
              key={m.nombre}
              href="#"
              aria-current={m.activo ? "page" : undefined}
              title={colapsada ? m.nombre : undefined}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-150 ${
                m.activo
                  ? "bg-brand-pastel text-brand font-semibold"
                  : "text-ink-soft hover:bg-brand-pastel hover:text-violet-600"
              } ${colapsada ? "justify-center px-0" : ""}`}
            >
              <m.Icon
                className={`w-5 h-5 shrink-0 ${
                  m.activo ? "text-brand" : "text-ink-soft group-hover:text-violet-600"
                }`}
                strokeWidth={1.8}
              />
              {!colapsada && m.nombre}
            </a>
          ))}
        </nav>

        <div className={`px-3 py-4 ${colapsada ? "hidden" : ""}`}>
          <div className="bg-brand-pastel rounded-xl p-4 text-xs">
            <p className="font-semibold text-brand mb-1">¿Necesitas ayuda?</p>
            <p className="text-slate-500">Consulta la guía del documento.</p>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none opacity-40">
          <span className="absolute top-2 left-2 w-1 h-1 rounded-full bg-brand/30" />
          <span className="absolute top-8 left-6 w-1 h-1 rounded-full bg-brand/20" />
          <span className="absolute top-14 left-3 w-1 h-1 rounded-full bg-brand/25" />
          <span className="absolute top-6 left-14 w-1 h-1 rounded-full bg-brand/15" />
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6">
          <span className="text-sm text-slate-400">MetricShop · Dashboard</span>
        </header>

        <main className="flex-1 px-6 py-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}