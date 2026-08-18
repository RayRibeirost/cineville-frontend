import { getAllOrders } from "@/src/actions/myOrdersActions";
import MyOrdersList from "@/src/components/orders/MyOrdersList";

export const metadata = {
  title: "Pedidos | Admin SmallVille",
};

export default async function AdminOrdersPage() {
  const result = await getAllOrders(1, 50);

  return (
    <section className="flex flex-col gap-6">
      <header>
        <h2 className="text-xl font-black">Pedidos</h2>

        <p className="mt-1 text-sm text-grayScale-400">
          Todos os pedidos do sistema, com usuário, sessão, assentos, produtos e
          valores.
        </p>
      </header>

      {!result.success ? (
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {result.error}
        </p>
      ) : (
        <MyOrdersList
          orders={result.data.items}
          admin
          emptyMessage="Nenhum pedido registrado até o momento."
        />
      )}
    </section>
  );
}
