"use client";
import Register from "@/src/components/register";

import { useState } from "react";
import AuthLayout from "../AuthLayout";

export default function RegisterPage() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <AuthLayout title="Criar Conta" subtitle="Crie sua conta e garanta seu lugar na primeira fila." wide>
      <Register isLogin={false} setIsLogin={() => { }} />
    </AuthLayout>
  );
}
