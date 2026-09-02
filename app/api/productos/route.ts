import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const productos = await prisma.producto.findMany({
    orderBy: { id: "asc" },
  });

  return NextResponse.json(productos);
}