// src/app/admin/dashboard/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard de Administrador",
  description: "Resumen de estadísticas clave",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
