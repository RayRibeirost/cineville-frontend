"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { logoutAction } from "../actions/authAction";
import { useRouter } from "next/navigation";
import { UserPayload, AuthContextType } from "../types";

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: UserPayload | null;
}) {
  const DEV_USER: UserPayload = {
    sub: "123456",
    name: "Kaynan Teixeira",
    email: "kaynan@email.com",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 86400,
  };

  const [user, setUser] = useState<UserPayload | null>(initialUser || DEV_USER);
  const router = useRouter();

  async function logout() {
    await logoutAction();
    setUser(null);
    router.refresh();
    router.push("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
