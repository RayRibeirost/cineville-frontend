import { redirect } from "next/navigation";
import Header from "@/src/components/layout/Header";
import AdminSidebar from "@/src/components/admin/AdminSidebar";
import AdminBadge from "@/src/components/admin/AdminBadge";
import { getServerUser } from "@/src/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerUser();

  // O (protected) já barra quem não está logado; aqui barramos quem não é admin.
  if (!user) redirect("/login");
  if (user.role !== "ADMIN") redirect("/home");

  return (
    <>
      <Header />

      <div className="bg-deep-black text-grayScale-200 min-h-screen pt-16">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-black">Dashboard</h1>
            <AdminBadge force />
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            <AdminSidebar />

            <main className="flex-1">{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}
