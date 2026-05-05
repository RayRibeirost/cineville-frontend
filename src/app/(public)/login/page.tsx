"use client";
import Login from "@/src/components/login";
import Register from "@/src/components/register";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url('/assets/fundo.png')] bg-cover" />

      <div className="flex flex-1 flex-col items-center justify-center mt-5">
        <div className="flex flex-col items-center relative">
          <div className="relative inline-block">
            <h2 className="text-[24px] text-center font-nunito font-bold text-[#FFFFFF] mb-10">
              {isLogin ? 'Faça login para entrar.' : 'Crie sua conta.'}
            </h2>
          </div>
        </div>

        <div className="w-140 h-fit bg-[#FAFEFC] rounded-xl p-8 shadow-md border-4 border-[#759FFE] mb-22 z-10">
          <div className="w-123 h-14.5 border-4 border-[#759FFE] rounded-4xl px-2.5 flex items-center mb-6 mx-auto">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 h-9.5 font-semibold rounded-4xl p-2 cursor-pointer transition-all ${
                isLogin
                  ? "bg-secondary-400 text-white"
                  : "bg-transparent text-secondary-700"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 h-9.5 font-semibold rounded-4xl p-2 cursor-pointer transition-all ${
                !isLogin
                  ? "bg-secondary-400 text-white"
                  : "bg-transparent text-secondary-700"
              }`}
            >
              Cadastro
            </button>
          </div>

          <Login isLogin={isLogin} setIsLogin={setIsLogin} />
          <Register isLogin={isLogin} setIsLogin={setIsLogin} />
        </div>
      </div>
    </div>
  );
}
