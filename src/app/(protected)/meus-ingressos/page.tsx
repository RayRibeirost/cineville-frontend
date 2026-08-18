import Link from "next/link";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer/Footer";
import TicketsList from "@/src/components/tickets/TicketsList";
import { getAllTickets, getMyTickets } from "@/src/actions/ticketsActions";
import { getServerUser } from "@/src/lib/auth";

export const metadata = {
  title: "Meus Ingressos | SmallVille",
};

export default async function MeusIngressosPage() {
  const user = await getServerUser();
  const isAdmin = user?.role === "ADMIN";

  // Regra do backend: `GET /tickets/my-tickets` filtra pelo usuário do token e
  // `GET /tickets` é exclusiva de admin. Aqui só escolhemos qual chamar — quem
  // decide o que cada papel enxerga é a API.
  const result = isAdmin ? await getAllTickets() : await getMyTickets();

  return (
    <>
      <Header />

      <div className="bg-deep-black text-grayScale-200 min-h-screen pt-16">
        <div className="mx-auto max-w-5xl px-5 py-10 sm:px-6">
          <header className="mb-8">
            <h1 className="text-3xl font-black">
              {isAdmin ? "Ingressos" : "Meus Ingressos"}
            </h1>

            <p className="mt-2 text-sm text-grayScale-400">
              {isAdmin
                ? "Como administrador, você vê todos os ingressos emitidos no sistema."
                : "Seus ingressos ficam disponíveis aqui assim que o pagamento é aprovado."}
            </p>
          </header>

          {!result.success ? (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3">
              <p className="text-sm text-red-400">{result.error}</p>

              <Link
                href="/meus-pedidos"
                className="mt-3 inline-block text-xs font-bold text-grayScale-200 underline"
              >
                Ver meus pedidos
              </Link>
            </div>
          ) : (
            <TicketsList
              tickets={result.data}
              searchable={isAdmin}
              emptyMessage={
                isAdmin
                  ? "Nenhum ingresso emitido até o momento."
                  : "Você ainda não tem ingressos. Escolha um filme e garanta o seu."
              }
            />
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}
