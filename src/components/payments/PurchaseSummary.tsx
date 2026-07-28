import { PurchaseSummary as Summary } from "../../types/payments";

interface Props {
  purchase: Summary;
}

export default function PurchaseSummary({ purchase }: Props) {
  return (
    <aside className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h2 className="text-lg font-semibold mb-6">Resumo da Compra</h2>

      <div className="space-y-2 text-sm">
        <p>
          <span className="text-zinc-400">Filme:</span> {purchase.movie}
        </p>

        <p>
          <span className="text-zinc-400">Sessão:</span> {purchase.session}
        </p>

        <p>
          <span className="text-zinc-400">Sala:</span> {purchase.room}
        </p>

        <p>
          <span className="text-zinc-400">Assentos:</span>{" "}
          {purchase.seats.join(", ")}
        </p>
      </div>

      <hr className="my-6 border-zinc-800" />

      <div>
        <h3 className="text-sm font-semibold mb-3">Ingressos</h3>

        {purchase.tickets.map((ticket) => (
          <div key={ticket.id} className="flex justify-between mb-2">
            <span>{ticket.description}</span>

            <span>R$ {ticket.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {!!purchase.products.length && (
        <>
          <hr className="my-6 border-zinc-800" />

          <div>
            <h3 className="text-sm font-semibold mb-3">Bomboniere</h3>

            {purchase.products.map((product) => (
              <div key={product.id} className="flex justify-between mb-2">
                <span>{product.name}</span>

                <span>R$ {product.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <hr className="my-6 border-zinc-800" />

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Descontos</span>

          <span className="text-green-500">
            - R$ {purchase.discount.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-lg font-bold text-red-500">
          <span>Total</span>

          <span>R$ {purchase.total.toFixed(2)}</span>
        </div>
      </div>
    </aside>
  );
}
