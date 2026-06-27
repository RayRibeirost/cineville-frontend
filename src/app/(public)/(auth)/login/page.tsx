"use client";
import Login from "@/src/components/login";

import { useState } from "react";
import AuthLayout from "../AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout title="Bem vindo">
      <Login />
    </AuthLayout>
  );
}
