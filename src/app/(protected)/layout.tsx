import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    redirect("/login");
  }

  return children;
}
