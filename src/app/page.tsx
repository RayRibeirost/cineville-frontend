"use client";

import { useAuth } from "@/src/context/AuthContext";
import LogoutButton from "@/src/components/ui/LogoutButton";
import { useRouter } from "next/navigation";
import Button from "@/src/components/ui/Button";

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  // Versão NÃO logado
  if (!isAuthenticated) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Você não está logado
          </h1>
          <p className="text-gray-600 mb-8">
            Faça login para acessar a área restrita.
          </p>

          <div className="flex flex-col gap-4">
            <Button variant="primary">entrar</Button>
            <Button variant="secondary">entrar</Button>
            <button
              onClick={() => router.push("/login")} //adicionart
              className="w-full h-11 rounded-xl bg-secondary-400 text-white font-nunito font-bold hover:bg-[#1f6fe3] transition-colors"
            >
              Ir para o login
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Versão logado
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Olá, {user?.name}!
        </h1>
        <p className="text-gray-600 mb-8">
          Você está logado com sucesso na área restrita.
        </p>

        <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-8 text-left">
          <h2 className="text-sm font-semibold text-blue-800 uppercase tracking-wider mb-2">
            Dados da Sessão:
          </h2>
          <p className="text-sm text-blue-900">
            <strong>Nome:</strong> {user?.name}
          </p>
          <p className="text-sm text-blue-900">
            <strong>Email:</strong> {user?.email}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs text-gray-400 italic">
            Alunos: comecem a desenvolver a vossa aplicação a partir desta
            página.
          </p>

          <div className="w-full">
            <LogoutButton />
          </div>
        </div>
      </div>
    </main>
  );
}
