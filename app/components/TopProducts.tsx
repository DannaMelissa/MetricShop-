export default function TopProducts({
  productos,
}: {
  productos: { nombre: string; cantidad: number; ingresos: number }[];
}) {
  return (
    <div className="bg-surface rounded-lg shadow-sm border border-slate-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-ink">Productos más vendidos</h2>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-ink-soft border-b border-slate-100">
            <th className="pb-3 font-medium">Producto</th>
            <th className="pb-3 font-medium">Vendidos</th>
            <th className="pb-3 font-medium text-right">Ingresos</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p, i) => (
            <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
              <td className="py-3 text-ink">{p.nombre}</td>
              <td className="py-3 text-slate-500">{p.cantidad}</td>
              <td className="py-3 text-right font-semibold text-ink">
                ${p.ingresos.toLocaleString("es-ES")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}