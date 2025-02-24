# Webhook - Next.js Project

Este es un proyecto basado en [Next.js](https://nextjs.org), inicializado con [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Configuración y Ejecución

Para comenzar con el desarrollo, sigue estos pasos:

1. Clona el repositorio:
   ```sh
   git clone <URL_DEL_REPOSITORIO>
   cd webhook
   ```

2. Instala las dependencias utilizando tu gestor de paquetes preferido:
   ```sh
   npm install  # o yarn install, pnpm install, bun install
   ```

3. Inicia el servidor de desarrollo:
   ```sh
   npm run dev  # o yarn dev, pnpm dev, bun dev
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en ejecución.

## 📂 Estructura del Proyecto

```
webhook/
├── app/               # Componentes y páginas principales
│   ├── page.tsx      # Página de inicio
├── public/            # Archivos estáticos
├── styles/            # Estilos globales y Tailwind
├── package.json       # Configuración del proyecto
└── next.config.js     # Configuración de Next.js
```

## 📦 Dependencias Principales

Este proyecto utiliza las siguientes tecnologías y librerías:

- **Framework:** [Next.js 15.1.6](https://nextjs.org/)
- **UI & Animaciones:** [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/)
- **Gráficos:** [Chart.js](https://www.chartjs.org/), [Recharts](https://recharts.org/)
- **Otros:** [clsx](https://github.com/lukeed/clsx) para clases condicionales, [autoprefixer](https://github.com/postcss/autoprefixer) para CSS

## 🛠 Scripts Disponibles

En el archivo `package.json`, se encuentran los siguientes scripts:

- `npm run dev` - Inicia el servidor de desarrollo.
- `npm run build` - Compila la aplicación para producción.
- `npm run start` - Inicia la aplicación en modo producción.
- `npm run lint` - Ejecuta el linter de código.

## 📖 Recursos Adicionales

Para más información sobre Next.js, visita:

- [Documentación de Next.js](https://nextjs.org/docs) - Aprende sobre sus características y API.
- [Tutorial interactivo](https://nextjs.org/learn) - Guía práctica de Next.js.
- [Repositorio en GitHub](https://github.com/vercel/next.js) - Contribuye o reporta problemas.

## 🌎 Despliegue

Este proyecto no está desplegado en Vercel, pero puedes desplegarlo en cualquier servidor compatible con Node.js.
Para más información, consulta la [documentación de despliegue](https://nextjs.org/docs/app/building-your-application/deploying).

---
📌 **Autor:** [Suyin Orihuen]  
📆 **Última actualización:** [24/02/25]

