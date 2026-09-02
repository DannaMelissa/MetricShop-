import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const productos = [
  { nombre: "Taza de Ceramica", categoria: "Hogar", precio: 12.99 },
  { nombre: "Auriculares Bluetooth", categoria: "Tecnologia", precio: 49.99 },
  { nombre: "Camiseta de Algodon", categoria: "Ropa", precio: 15.5 },
  { nombre: "Teclado Mecanico", categoria: "Tecnologia", precio: 89.9 },
  { nombre: "Lampara LED", categoria: "Hogar", precio: 24.99 },
  { nombre: "Zapatillas Running", categoria: "Deportes", precio: 79.0 },
  { nombre: "Silla Ergonomica", categoria: "Hogar", precio: 129.99 },
  { nombre: "Monitor 24pulgadas", categoria: "Tecnologia", precio: 159.5 },
  { nombre: "Mochila Impermeable", categoria: "Accesorios", precio: 39.99 },
  { nombre: "Vaso Termico", categoria: "Hogar", precio: 19.9 },
  { nombre: "Mouse Inalambrico", categoria: "Tecnologia", precio: 22.5 },
  { nombre: "Pantalon Jogger", categoria: "Ropa", precio: 29.99 },
  { nombre: "Reloj Deportivo", categoria: "Deportes", precio: 109.0 },
  { nombre: "Parlante Portatil", categoria: "Tecnologia", precio: 34.99 },
  { nombre: "Bufanda de Lana", categoria: "Ropa", precio: 18.0 },
];

async function main() {
  console.log("Limpiando datos anteriores...");
  await prisma.venta.deleteMany();
  await prisma.producto.deleteMany();

  console.log("Creando productos...");
  const creados = [];
  for (const p of productos) {
    const creado = await prisma.producto.create({ data: p });
    creados.push(creado);
  }
  console.log(`${creados.length} productos creados.`);

  console.log("Generando ventas...");
  let ventasCreadas = 0;
  for (let i = 0; i < 800; i++) {
    const producto = creados[Math.floor(Math.random() * creados.length)];
    const cantidad = Math.floor(Math.random() * 5) + 1;
    const diasAtras = Math.floor(Math.random() * 60);
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - diasAtras);

    await prisma.venta.create({
      data: {
        productoId: producto.id,
        cantidad,
        precioUnitario: producto.precio,
        created_at: fecha,
      },
    });
    ventasCreadas++;
  }

  console.log(`${ventasCreadas} ventas creadas.`);
  console.log("Seed completado!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });