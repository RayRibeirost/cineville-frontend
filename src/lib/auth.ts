import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { UserPayload } from "@/src/types";

/**
 * Lê o usuário do cookie httpOnly em Server Components / layouts.
 * Retorna null se não houver token, se ele estiver expirado ou corrompido.
 */
export async function getServerUser(): Promise<UserPayload | null> {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) return null;

  try {
    const user = jwtDecode<UserPayload>(token);

    if (user.exp < Date.now() / 1000) return null;

    return user;
  } catch {
    return null;
  }
}

export async function isServerAdmin(): Promise<boolean> {
  const user = await getServerUser();

  return user?.role === "ADMIN";
}
