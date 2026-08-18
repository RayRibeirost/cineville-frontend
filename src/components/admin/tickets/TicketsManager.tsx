"use client";

import { useMemo, useState } from "react";
import AdminTable, { AdminColumn } from "../AdminTable";
import { Ticket, TicketStatus } from "@/src/types/ticket";
import { formatCents } from "@/src/utils/currency";

const STATUS_LABELS: Record<TicketStatus, string> = {
  valido: "Válido",
  utilizado: "Utilizado",
  cancelado: "Cancelado",
};

const STATUS_CLASSES: Record<TicketStatus, string> = {
  valido: "border-green-500/40 bg-green-500/10 text-green-300",
  utilizado: "border-grayScale-600 bg-grayScale-700 text-grayScale-400",
  cancelado: "border-red-500/40 bg-red-500/10 text-red-300",
};

/**
 * Listagem administrativa de ingressos.
 *
 * O backend não pagina `GET /tickets`, então a busca e o filtro acontecem
 * sobre a lista já carregada. Quando a rota ganhar paginação, é aqui que ela
 * entra.
 */
export default function TicketsManager({ tickets }: { tickets: Ticket[] }) {
  const [search, setSearch] = useState("");
  const [onlyValid, setOnlyValid] = useState(false);

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();

    return tickets.filter((ticket) => {
      if (onlyValid && ticket.status !== "valido") return false;

      if (!term) return true;

      return [
        ticket.code,
        ticket.movieTitle,
        ticket.seatNumber,
        ticket.holderName,
        ticket.holderEmail,
        ticket.cinemaName,
        ticket.roomName,
      ]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(term));
    });
  }, [tickets, search, onlyValid]);

  const columns: AdminColumn<Ticket>[] = [
    {
      header: "Código",
      render: (ticket) => (
        <span className="font-mono text-xs">{ticket.code}</span>
      ),
    },
    {
      header: "Usuário",
      render: (ticket) => (
        <div className="min-w-0">
          <p className="truncate font-bold">{ticket.holderName ?? "—"}</p>

          {ticket.holderEmail && (
            <p className="truncate text-xs text-grayScale-400">
              {ticket.holderEmail}
            </p>
          )}
        </div>
      ),
    },
    {
      header: "Filme",
      render: (ticket) => ticket.movieTitle,
    },
    {
      header: "Sessão",
      render: (ticket) => (
        <div>
          <p>{ticket.sessionDateTime}</p>

          <p className="text-xs text-grayScale-400">
            {[ticket.cinemaName, ticket.roomName].filter(Boolean).join(" · ")}
          </p>
        </div>
      ),
    },
    {
      header: "Assento",
      render: (ticket) => (
        <span>
          {ticket.seatNumber}
          <span className="ml-1 text-xs text-grayScale-400">
            ({ticket.type === "MEIA" ? "Meia" : "Inteira"})
          </span>
        </span>
      ),
    },
    {
      header: "Valor",
      render: (ticket) => formatCents(ticket.price),
    },
    {
      header: "Status",
      render: (ticket) => (
        <span
          className={`rounded-full border px-2 py-0.5 text-[11px] font-bold ${STATUS_CLASSES[ticket.status]}`}
        >
          {STATUS_LABELS[ticket.status]}
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          aria-pressed={onlyValid}
          onClick={() => setOnlyValid((value) => !value)}
          className={`w-fit shrink-0 cursor-pointer rounded-lg border px-4 py-2 text-xs font-bold transition-all ${
            onlyValid
              ? "border-red-cinema bg-red-cinema text-white"
              : "border-grayScale-600 bg-gray-surface text-grayScale-400 hover:border-red-cinema hover:text-white"
          }`}
        >
          Somente válidos
        </button>

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por código, usuário, filme ou assento"
          aria-label="Buscar ingressos"
          className="w-full rounded-lg border border-grayScale-600 bg-gray-surface px-4 py-2 text-sm text-grayScale-200 outline-none placeholder:text-grayScale-500 focus:border-red-cinema sm:w-80"
        />
      </div>

      <p className="text-xs text-grayScale-400">
        {rows.length} de {tickets.length} ingressos
      </p>

      <AdminTable
        rows={rows}
        columns={columns}
        rowKey={(ticket) => ticket._id}
        emptyMessage="Nenhum ingresso encontrado."
      />
    </div>
  );
}
