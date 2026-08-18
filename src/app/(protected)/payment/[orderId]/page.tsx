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

import PaymentMethods from "@/src/components/payments/PaymentsMethods";
import CreditCardForm from "@/src/components/payments/CreditCardForm";
import PixPayment from "@/src/components/payments/PixPayment";
import PaymentButtons from "@/src/components/payments/PaymentButton";
import CancelPurchaseModal from "@/src/components/payments/CancelPurchaseModal";
import ContPurchaseSummary from "@/src/components/payments/PurchaseSummary";
import { useOrder } from "@/src/context/OrderContext";
import { PaymentMethod, PurchaseSummary } from "@/src/types/payments";

import OrderConfirmedModal from "@/src/components/confirmation/OrderConfirmed";

type PaymentStatus = "PENDING" | "APPROVED" | "REFUSED" | "EXPIRED";

interface Payment {
  _id: string;
  status: PaymentStatus;
  /** Motivo da recusa devolvido pelo gateway. */
  failureReason?: string;

  pix?: {
    qrCode: string;
    copyPasteCode: string;
    expiresAt: string;
  };
}

/**
 * Mensagem para os desfechos que não são aprovação.
 *
 * O gateway mockado recusa ~15% dos cartões e expira o PIX depois de 15
 * minutos; sem isso a tela apenas parava de consultar, sem dizer nada, e o
 * usuário ficava olhando para um pagamento que nunca ia concluir.
 */
function failureMessage(payment: Payment): string {
  if (payment.status === "EXPIRED") {
    return "O prazo para pagamento expirou. Escolha uma forma de pagamento e tente novamente.";
  }

  return (
    payment.failureReason ??
    "Pagamento não autorizado. Escolha outra forma de pagamento ou tente novamente."
  );
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

  const [order, setOrder] = useState<PurchaseSummary | undefined>();

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

          // Zerar o pagamento devolve a tela ao estado de escolha: sem isso o
          // PIX recusado continuaria na tela e o botão de confirmar seguiria
          // apontando para uma cobrança já encerrada.
          setPayment(null);
          setPaymentMethod(null);
          setError(failureMessage(result));
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

      // A confirmação quem abre é o polling, ao ver APPROVED. O pagamento
      // nasce PENDING: abrir o modal aqui anunciaria como concluída uma
      // compra que o gateway ainda pode recusar.
      setPayment(response);
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
        mt-20
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
        <ContPurchaseSummary purchase={order} />

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

          {/*
            O cartão é resolvido de forma assíncrona pelo gateway, então há
            uma janela entre criar a cobrança e saber o desfecho. Sem este
            aviso a tela fica idêntica à de antes do clique.
          */}
          {paymentMethod !== "pix" && payment?.status === "PENDING" && (
            <p className="rounded-lg border border-yellow-600/30 bg-yellow-500/10 p-4 text-sm text-yellow-300">
              Processando o pagamento... Aguarde a confirmação da operadora.
            </p>
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
        order={order}
      />
    </main>
  );
}
