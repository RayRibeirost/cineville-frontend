import { getAllTickets } from "@/src/actions/ticketsActions";
import TicketsManager from "@/src/components/admin/tickets/TicketsManager";

export const metadata = {
  title: "Ingressos | Admin SmallVille",
};

export default async function AdminTicketsPage() {
  const result = await getAllTickets();

  return (
    <section className="flex flex-col gap-6">
      <header>
        <h2 className="text-xl font-black">Ingressos</h2>

        <p className="mt-1 text-sm text-grayScale-400">
          Todos os ingressos emitidos, com usuário, filme, sessão e assento.
        </p>
      </header>

      {!result.success ? (
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {result.error}
        </p>
      ) : (
        <TicketsManager tickets={result.data} />
      )}
    </section>
  );
}
