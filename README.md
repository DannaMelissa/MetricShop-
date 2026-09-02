# 🛍️ MetricShop

Dashboard analítico de ventas para una tienda, construido con **Next.js**, **Prisma** y **PostgreSQL**. Muestra métricas clave (ingresos, pedidos, unidades vendidas) con gráficas interactivas y una tabla de productos más vendidos.

Este proyecto es parte de mi portafolio personal y representa mi práctica de **desarrollo web full-stack**: base de datos real, API REST y una interfaz moderna.

---

## ✨ Características

- **Panel de métricas** en tiempo real desde PostgreSQL: ventas totales, pedidos y unidades vendidas.
- **Gráfica de ventas diarias** con línea suavizada y relleno degradado (Chart.js).
- **Distribución por categoría** con gráfica de dona y leyenda ordenada.
- **Productos más vendidos** en tabla con ingresos y cantidades.
- **Interfaz limpia** con paleta violeta personalizada, sidebar con iconos Lucide (thin-stroke) y diseño responsive.
- **API REST** propia (`/api/metricas`, `/api/productos`, `/api/ventas`).

---

## 🧰 Stack

| Capa         | Tecnología                                            |
| ------------ | ----------------------------------------------------- |
| Frontend     | Next.js 16, React 19, Tailwind CSS 4, lucide-react    |
| Gráficas     | Chart.js + react-chartjs-2                            |
| Backend      | API routes de Next.js (App Router)                    |
| Base de datos | PostgreSQL 16, Prisma 6, driver `pg`                  |
| Deploy       | GitHub (repo público de portafolio)                   |

---

## 🚀 Cómo correrlo localmente

### 1. Requisitos

- [Node.js](https://nodejs.org/) (18 o superior)
- [Docker](https://www.docker.com/) para la base de datos PostgreSQL

### 2. Levantar PostgreSQL con Docker

```bash
docker run --name metricshop-pg -e POSTGRES_PASSWORD=1234 -e POSTGRES_DB=metricshop -p 5432:5432 -d postgres:16
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar variables de entorno

Crea un archivo `.env` en la raíz:

```
DATABASE_URL="postgresql://postgres:1234@127.0.0.1:5432/metricshop?schema=public"
```

### 5. Aplicar esquema y poblar la base

```bash
npx prisma migrate dev --name init
node prisma/seed.mjs
```

> El seed inserta 15 productos y 800 ventas de ejemplo para que el dashboard muestre datos.

### 6. Iniciar el servidor

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📁 Estructura del proyecto

```
metricshop/
├── app/
│   ├── api/
│   │   ├── metricas/   # métricas agregadas (KPIs, por día, por categoría)
│   │   ├── productos/  # listado de productos
│   │   └── ventas/     # ventas con filtro por fechas
│   ├── components/     # Sidebar, LineChart, CategoryChart, TopProducts
│   ├── globals.css     # paleta de colores (Tailwind @theme)
│   ├── layout.tsx      # layout raíz
│   └── page.tsx        # dashboard principal
├── lib/
│   └── db.ts           # cliente compartido de Prisma
├── prisma/
│   ├── schema.prisma   # modelos Producto y Venta
│   └── seed.mjs        # datos de ejemplo
└── package.json
```

---

## 🔌 Endpoints de la API

| Método | Ruta             | Descripción                                  |
| ------ | ---------------- | --------------------------------------------- |
| GET    | `/api/metricas`  | KPIs, ventas por día, por categoría y top productos |
| GET    | `/api/productos` | Lista todos los productos                     |
| GET    | `/api/ventas`    | Lista de ventas, con filtros `?desde=&hasta=` |

---

## 🎨 Paleta de marca

| Uso        | Color        |
| ---------- | ------------ |
| Primario   | `#6d4ce4`    |
| Primario claro | `#8566ed`  |
| Fondo pastel | `#efebfe`   |
| Texto      | `#161a31`    |
| Texto suave | `#7f8394`    |

---

## 📚 Lo que aprendí

- Crear un **dashboard full-stack** conectado a una base de datos real.
- Diseñar **API REST** con App Router de Next.js.
- Modelar datos con **Prisma** y aplicar *migrations*.
- Construir una interfaz **responsive y consistente** con Tailwind.
- Componentes de **gráficas** con Chart.js y gradientes.

---

Desarrollado con 💜 como proyecto de aprendizaje personal.