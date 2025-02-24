"use client"

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation"; // Para redirigir después del logout

interface VerticalLayoutProps {
  children: ReactNode
}

export function VerticalLayout({ children }: VerticalLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter(); // Hook para manejar la navegación

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem("authToken");
    // Redirigir a la página de login
    router.push("/");
    setIsMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-yellow-50 via-yellow-200 to-yellow-50">
      {/* Botón de menú para móviles (solo visible cuando el menú está cerrado) */}
      {!isMenuOpen && (
        <button
          className="lg:hidden fixed top-4 left-4 z-20 p-2 bg-yellow-300 rounded-md shadow-md hover:bg-yellow-400 transition-colors duration-200"
          onClick={toggleMenu}
        >
          <Menu size={24} className="text-yellow-800" />
        </button>
      )}

      {/* Barra de navegación vertical */}
      <nav
        className={`
          w-64 bg-gradient-to-b from-yellow-100 via-yellow-300 to-yellow-100 shadow-lg absolute inset-y-0 left-0 z-10
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0
        `}
      >
        {/* Botón de cerrar menú dentro del nav */}
        <button
          className="lg:hidden absolute top-4 right-4 p-2 bg-yellow-400 rounded-md hover:bg-yellow-500 transition-colors duration-200"
          onClick={toggleMenu}
        >
          <X size={24} className="text-yellow-800" />
        </button>

        <div className="p-5">
          <h2 className="text-2xl font-bold text-yellow-800 px-4 pl-12 whitespace-nowrap">Dashboard</h2>
        </div>

        <ul className="space-y-2 py-4">
          <li>
            <Link
              href="/admin/dashboard"
              className="block px-6 py-3 text-blue-700 hover:bg-yellow-200 hover:text-blue-900 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Administration
            </Link>
          </li>
          <li>
            <Link
              href="/clients/notifications"
              className="block px-6 py-3 text-blue-700 hover:bg-yellow-200 hover:text-blue-900 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Transactions
            </Link>
          </li>
          <li>
            {/* Botón de logout en lugar de Link */}
            <button
              onClick={handleLogout}
              className="block w-full text-left px-6 py-3 text-blue-700 hover:bg-yellow-200 hover:text-blue-900 transition-colors duration-200"
            >
              Close
            </button>
          </li>
        </ul>
      </nav>

      {/* Contenido principal */}
      <main className="flex-1 p-6 lg:p-8">{children}</main>
    </div>
  );
}