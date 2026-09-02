import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const desde = searchParams.get("desde");
  const hasta = searchParams.get("hasta");

  const where: any = {};

  if (desde || hasta) {
    where.created_at = {};
    if (desde) where.created_at.gte = new Date(desde);
    if (hasta) where.created_at.lte = new Date(hasta);
  }

  const ventas = await prisma.venta.findMany({
    where,
    include: { producto: true },
    orderBy: { created_at: "desc" },
  });

  return NextResponse.json(ventas);
}