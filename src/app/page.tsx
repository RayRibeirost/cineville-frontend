"use client";

import LogoutButton from "@/src/components/ui/LogoutButton";
import { useRouter } from "next/navigation";
import Button from "@/src/components/ui/Button";
import Header from "../components/layout/Header";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Header />
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
              onClick={() => router.push("/login")}
              className="w-full h-11 rounded-xl bg-secondary-400 text-white font-nunito font-bold hover:bg-[#1f6fe3] transition-colors"
            >
              Ir para o login
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
