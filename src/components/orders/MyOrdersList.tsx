"use client";

import { useMemo, useState } from "react";
import { Order, OrderStatus } from "@/src/actions/myOrdersActions";
import OrderCard from "./OrderCard";

const FILTERS: { value: OrderStatus | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "pagamento_aprovado", label: "Aprovados" },
  { value: "pagamento_pendente", label: "Pendentes" },
  { value: "pagamento_recusado", label: "Recusados" },
  { value: "pedido_cancelado", label: "Cancelados" },
];

interface MyOrdersListProps {
  orders: Order[];
  /** Visão de administrador: mostra o titular e habilita a busca. */
  admin?: boolean;
  emptyMessage?: string;
}

export default function MyOrdersList({
  orders,
  admin = false,
  emptyMessage = "Você ainda não fez nenhum pedido.",
}: MyOrdersListProps) {
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [search, setSearch] = useState("");

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();

    return orders.filter((order) => {
      if (filter !== "all" && order.status !== filter) return false;

      if (!term) return true;

      return [
        order.id,
        order.movieTitle,
        order.user?.name,
        order.user?.email,
        order.cinemaName,
        order.roomName,
        ...order.seats.map((seat) => seat.seatNumber),
      ]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(term));
    });
  }, [orders, filter, search]);

  if (!orders.length) {
    return (
      <p className="rounded-xl border border-grayScale-600 bg-gray-surface px-6 py-10 text-center text-sm text-grayScale-400">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {FILTERS.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={filter === option.value}
              onClick={() => setFilter(option.value)}
              className={`shrink-0 cursor-pointer rounded-lg border px-4 py-2 text-xs font-bold transition-all ${
                filter === option.value
                  ? "border-red-cinema bg-red-cinema text-white"
                  : "border-grayScale-600 bg-gray-surface text-grayScale-400 hover:border-red-cinema hover:text-white"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {admin && (
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por usuário, filme, assento ou ID"
            aria-label="Buscar pedidos"
            className="w-full rounded-lg border border-grayScale-600 bg-gray-surface px-4 py-2 text-sm text-grayScale-200 outline-none placeholder:text-grayScale-500 focus:border-red-cinema sm:w-80"
          />
        )}
      </div>

      {!visible.length ? (
        <p className="rounded-xl border border-grayScale-600 bg-gray-surface px-6 py-10 text-center text-sm text-grayScale-400">
          Nenhum pedido encontrado com esses filtros.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {visible.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              showUser={admin}
              showActions={!admin}
              showApprove={admin}
            />
          ))}
        </div>
      )}
    </div>
  );
}
