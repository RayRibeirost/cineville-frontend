"use client";

import { useState } from "react";
import Person from "@mui/icons-material/Person";
import Diamond from "@mui/icons-material/Diamond";
import { useAuth } from "@/src/context/AuthContext";
import Link from "next/link";
export default function HeaderUser() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      <div className="flex items-center gap-4">
        <Link
          href="/programaPonto"
          className="flex items-center gap-2 text-white"
        >
          <Diamond className="hover:text-blue-400 hover:scale-110 transition-all ease-in-out duration-500 cursor-pointer" />
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 text-white"
        >
          <Person className="hover:opacity-80  transition-all ease-in-out duration-500 cursor-pointer" />
        </button>
      </div>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-40 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <aside
        className={`fixed top-0 right-0 h-screen w-80 bg-white shadow-xl z-50
        transform transition-all duration-300 ease-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-bold text-xl">Minha Conta</h2>

            <button onClick={() => setOpen(false)} className="text-2xl">
              ✕
            </button>
          </div>

          <div className="flex flex-col items-center border-b-grayScale-200 border-b pb-6 mb-6">
            <Person className="w-16 h-16 text-gray-400" />
            <p className="font-bold text-lg mt-2">{user?.name}</p>

            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>

          <nav className="flex flex-col gap-4">
            <Link
              href="/perfil"
              onClick={() => setOpen(false)}
              className="hover:text-button-primary-hover transition-colors"
            >
              Meu Perfil
            </Link>

            <Link
              href="/meus-pedidos"
              onClick={() => setOpen(false)}
              className="hover:text-button-primary-hover transition-colors"
            >
              Meus Pedidos
            </Link>

            <Link
              href="/programaPonto"
              onClick={() => setOpen(false)}
              className="hover:text-button-primary-hover transition-colors"
            >
              Programa de Pontos
            </Link>

            <button onClick={logout} className="text-left text-red-500 mt-4">
              Sair
            </button>
          </nav>
        </div>
      </aside>
    </>
  );
}
