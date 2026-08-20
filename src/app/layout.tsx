import { montserrat, inter } from "@/src/lib/fonts";
import { AuthProvider } from "../context/AuthContext";
import { getSessionUser } from "../lib/auth";
import "./globals.css";
import SuportButton from "../components/ui/SuportButton";
import { OrderProvider } from "../context/OrderContext";

/** Semeado com `getSessionUser`: o JWT guarda o nome do login, não o atual. */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  return (
    <html lang="pt-BR" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="bg-secondary-700 min-h-screen">
        <AuthProvider initialUser={user}>
          <OrderProvider>
            {children}
            <SuportButton phone="99999999999" />
          </OrderProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
