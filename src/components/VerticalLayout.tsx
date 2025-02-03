"use client"

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { ReactNode } from "react";


interface VerticalLayoutProps {
  children: ReactNode
}


export function VerticalLayout({ children }: VerticalLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Botón de menú para móviles (solo visible cuando el menú está cerrado) */}
      {!isMenuOpen && (
        <button
          className="lg:hidden fixed top-4 left-4 z-20 p-2 bg-yellow-100 rounded-md"
          onClick={toggleMenu}
        >
          <Menu size={24} />
        </button>
      )}

      {/* Barra de navegación vertical */}
      <nav
        className={`
          w-64 bg-yellow-100 shadow-md absolute inset-y-0 left-0 z-10
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0 w-64" : "-translate-x-full"}
          lg:relative lg:translate-x-0
        `}
      >
        {/* Botón de cerrar menú dentro del nav */}
        <button
          className="lg:hidden absolute top-4 right-4 p-2 bg-gray-200 rounded-md"
          onClick={toggleMenu}
        >
          <X size={24} />
        </button>

        <div className="p-5">
          <h2 className="text-xl font-semibold text-blue-800 px-4 pl-12 whitespace-nowrap">
            Dashboard
          </h2>
        </div>

        <ul className="space-y-2 py-4">
          <li>
            <Link
              href="/admin/dashboard"
              className="block px-4 py-2 text-gray-600 hover:bg-green-100 hover:text-green-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Administration
            </Link>
          </li>
          <li>
            <Link
              href="/clients/notifications"
              className="block px-4 py-2 text-gray-600 hover:bg-green-100 hover:text-green-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Transactions
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="block px-4 py-2 text-gray-600 hover:bg-green-100 hover:text-green-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Close
            </Link>
          </li>
        </ul>
      </nav>

      {/* Contenido principal */}
      <main className="flex-1 w-full">{children}</main>
    </div>
  )
}

