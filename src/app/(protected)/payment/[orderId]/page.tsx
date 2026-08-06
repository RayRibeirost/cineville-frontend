"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import {
  createPayment,
  getPaymentStatus,
  cancelPayment,
} from "@/src/actions/paymentActions";

import { getOrder } from "@/src/actions/orderAction";

import PurchaseSummary from "@/src/components/payments/PurchaseSummary";
import PaymentMethods from "@/src/components/payments/PaymentsMethods";
import CreditCardForm from "@/src/components/payments/CreditCardForm";
import PixPayment from "@/src/components/payments/PixPayment";
import PaymentButtons from "@/src/components/payments/PaymentButton";
import CancelPurchaseModal from "@/src/components/payments/CancelPurchaseModal";

import { useOrder } from "@/src/context/OrderContext";
import { PaymentMethod } from "@/src/types/payments";
import OrderConfirmedModal from "@/src/components/confirmation/OrderConfirmed";

interface Order {
  _id: string;

  movie: string;
  session: string;
  room: string;

  seats: string[];

  tickets: {
    id: string;
    description: string;
    seatNumber: string;
    type: "INTEIRA" | "MEIA";
    price: number;
  }[];

  products: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];

  total: number;
  discount: number;
}

type PaymentStatus = "PENDING" | "APPROVED" | "REFUSED" | "EXPIRED";

interface Payment {
  _id: string;
  status: PaymentStatus;

  pix?: {
    qrCode: string;
    copyPasteCode: string;
    expiresAt: string;
  };
}

export default function PaymentPage({
  params,
}: {
  params: Promise<{
    orderId: string;
  }>;
}) {
  const router = useRouter();
  const { orderId } = use(params);
  const { clearOrder } = useOrder();

  const [order, setOrder] = useState<Order | undefined>();

  const [payment, setPayment] = useState<Payment | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null,
  );

  const [loadingOrder, setLoadingOrder] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const checkingPayment = useRef(false);

  /*
   * Busca pedido
   */
  useEffect(() => {
    let mounted = true;

    async function loadOrder() {
      try {
        setLoadingOrder(true);

        const data = await getOrder(orderId);

        if (mounted) {
          setOrder(data);
        }
      } catch (error) {
        if (mounted) {
          setError(
            error instanceof Error ? error.message : "Erro ao carregar pedido",
          );
        }
      } finally {
        if (mounted) {
          setLoadingOrder(false);
        }
      }
    }

    loadOrder();

    return () => {
      mounted = false;
    };
  }, [orderId]);

  useEffect(() => {
    if (paymentMethod !== "pix") return;
    if (!order?._id) return;
    if (payment) return;

    const orderId = order._id;
    async function createPix() {
      try {
        setLoadingPayment(true);

        const response = await createPayment(orderId, "pix");

        setPayment(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao gerar PIX.");
      } finally {
        setLoadingPayment(false);
      }
    }
    createPix();
  }, [paymentMethod, order?._id, payment]);

  useEffect(() => {
    if (!payment?._id || !order) return;

    const interval = setInterval(async () => {
      if (checkingPayment.current) return;

      checkingPayment.current = true;

      try {
        const result = await getPaymentStatus(payment._id);

        if (!result) {
          return;
        }
        if (result.status === "APPROVED") {
          clearInterval(interval);

          clearOrder();

          setIsConfirmModalOpen(true);
        }

        if (result.status === "REFUSED" || result.status === "EXPIRED") {
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Erro verificando pagamento:", error);

        clearInterval(interval);
      } finally {
        checkingPayment.current = false;
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [payment, order, router, clearOrder]);

  async function handleConfirmPayment() {
    console.log("confirmando pagamento");

    if (!paymentMethod) {
      setError("Selecione uma forma de pagamento.");
      return;
    }

    if (!order?._id) {
      setError("Pedido inválido.");
      return;
    }

    // PIX já é criado automaticamente pelo useEffect
    if (paymentMethod === "pix") {
      try {
        setLoadingPayment(true);

        const response = await createPayment(order._id, "pix");

        setPayment(response);
        setIsConfirmModalOpen(true);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Erro ao gerar PIX");
      } finally {
        setLoadingPayment(false);
      }

      return;
    }

    try {
      setLoadingPayment(true);
      setError(null);

      const method =
        paymentMethod === "credit" ? "cartao_credito" : "cartao_debito";

      const response = await createPayment(order._id, method);

      setPayment(response);
      setIsConfirmModalOpen(true);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error ? error.message : "Erro ao criar pagamento.",
      );
    } finally {
      setLoadingPayment(false);
    }
  }

  async function handleCancelPurchase() {
    if (!order) return;

    try {
      setLoadingPayment(true);

      await cancelPayment(order._id);

      clearOrder();

      router.push("/");
    } catch (error) {
      console.error(error);

      setError("Erro ao cancelar pedido.");
    } finally {
      setLoadingPayment(false);

      setCancelModalOpen(false);
    }
  }

  if (loadingOrder && !order) {
    return (
      <div
        className="
        flex
        h-screen
        items-center
        justify-center
        text-white
      "
      >
        Carregando pedido...
      </div>
    );
  }

  if (!order) {
    return (
      <div
        className="
        flex
        h-screen
        items-center
        justify-center
        text-red-500
      "
      >
        {error ?? "Pedido não encontrado"}
      </div>
    );
  }

  return (
    <main
      className="
      mx-auto
      max-w-7xl
      p-6
    "
    >
      {error && (
        <p
          className="
          mb-4
          rounded-lg
          bg-red-500/10
          p-3
          text-center
          text-red-400
        "
        >
          {error}
        </p>
      )}

      <section
        className="
        grid
        gap-8
        lg:grid-cols-[340px_1fr]
      "
      >
        <PurchaseSummary purchase={order} />

        <div className="space-y-6">
          <PaymentMethods value={paymentMethod} onChange={setPaymentMethod} />

          {(paymentMethod === "credit" || paymentMethod === "debit") && (
            <CreditCardForm method={paymentMethod} total={order.total} />
          )}

          {paymentMethod === "pix" && payment?.pix && (
            <PixPayment
              qrCode={payment.pix.qrCode}
              copyPasteCode={payment.pix.copyPasteCode}
              expiresIn={new Date(payment.pix.expiresAt).getTime()}
            />
          )}

          <PaymentButtons
            showConfirm={paymentMethod !== "pix"}
            disabled={!paymentMethod || loadingPayment}
            loading={loadingPayment}
            onConfirm={handleConfirmPayment}
            onBack={() => router.back()}
            onCancel={() => setCancelModalOpen(true)}
          />
        </div>
      </section>

      <CancelPurchaseModal
        open={cancelModalOpen}
        loading={loadingPayment}
        onClose={() => setCancelModalOpen(false)}
        onConfirm={handleCancelPurchase}
      />
      <OrderConfirmedModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false);
        }}
      />
    </main>
  );
}
