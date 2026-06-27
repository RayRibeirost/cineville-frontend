"use client";
import Register from "@/src/components/register";

import { useState } from "react";
import AuthLayout from "../AuthLayout";

export default function RegisterPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthLayout title="Bem vindo">
      <Register isLogin={isLogin} setIsLogin={setIsLogin} />
    </AuthLayout>
  );
}
