"use client";

import HomePage from "@/src/components/home";
import LogoutButton from "@/src/components/ui/LogoutButton";
import { useAuth } from "@/src/context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return <HomePage />;
}
