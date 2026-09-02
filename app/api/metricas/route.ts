import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const desde = searchParams.get("desde");
  const hasta = searchParams.get("hasta");

  const where: any = {
    ...(desde || hasta
      ? {
          created_at: {
            ...(desde ? { gte: new Date(desde) } : {}),
            ...(hasta ? { lte: new Date(hasta) } : {}),
          },
        }
      : {}),
  };

  const ventas = await prisma.venta.findMany({
    where,
    include: { producto: true },
  });

  let totalIngresos = 0;
  let totalUnidades = 0;
  const porCategoria: Record<string, number> = {};
  const porDia: Record<string, number> = {};
  const productoCounter: Record<number, { nombre: string; cantidad: number; ingresos: number }> = {};

  for (const v of ventas) {
    const ingreso = v.cantidad * v.precioUnitario.toNumber();
    totalIngresos += ingreso;
    totalUnidades += v.cantidad;

    const cat = v.producto.categoria;
    porCategoria[cat] = (porCategoria[cat] || 0) + ingreso;

    const dia = v.created_at.toISOString().slice(0, 10);
    porDia[dia] = (porDia[dia] || 0) + ingreso;

    if (!productoCounter[v.producto.id]) {
      productoCounter[v.producto.id] = { nombre: v.producto.nombre, cantidad: 0, ingresos: 0 };
    }
    productoCounter[v.producto.id].cantidad += v.cantidad;
    productoCounter[v.producto.id].ingresos += ingreso;
  }

  const topProductos = Object.values(productoCounter)
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 5);

  const totalVentas = ventas.length;
  const ticketPromedio = totalVentas ? totalIngresos / totalVentas : 0;

  return NextResponse.json({
    totalIngresos,
    totalVentas,
    totalUnidades,
    ticketPromedio,
    porDia,
    porCategoria,
    topProductos,
  });
}