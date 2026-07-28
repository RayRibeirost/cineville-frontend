"use client";

import { useState } from "react";

import PurchaseSummary from "@/src/components/payments/PurchaseSummary";
import PaymentMethods from "@/src/components/payments/PaymentsMethods";
import CreditCardForm from "@/src/components/payments/CreditCardForm";
import PixPayment from "@/src/components/payments/PixPayment";
import PaymentButtons from "@/src/components/payments/PaymentButton";
import CancelPurchaseModal from "@/src/components/payments/CancelPurchaseModal";

import { PaymentMethod } from "@/src/types/payments";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null,
  );
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const purchase = {
    movie: "O Labirinto do Tempo",

    session: "26/12/2025 20:30",

    room: "Sala IMAX",

    seats: ["H12", "H13"],

    tickets: [
      {
        id: "1",
        description: "2x Inteira",
        quantity: 2,
        price: 96,
      },
    ],

    products: [
      {
        id: "1",
        name: "Combo Mega Pipoca + 2 Refrigerantes",
        quantity: 1,
        price: 68,
      },
    ],

    discount: 8.4,

    total: 172.4,
  };

  async function handleConfirm() {
    setLoading(true);

    try {
      // chamar API de pagamento
      await new Promise((resolve) => setTimeout(resolve, 2500));

      alert("Pagamento realizado");
    } finally {
      setLoading(false);
    }
  }

  function handleBack() {
    router.back();
  }

  function handleCancel() {
    setCancelModalOpen(true);
  }

  async function confirmCancel() {
    setLoading(true);

    try {
      // liberar assentos
      // liberar produtos
      // cancelar pedido

      router.push("/");
    } finally {
      setLoading(false);
      setCancelModalOpen(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="mx-auto max-w-7xl p-8">
        <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
          <PurchaseSummary purchase={purchase} />

          <div className="space-y-6">
            <PaymentMethods value={paymentMethod} onChange={setPaymentMethod} />

            {(paymentMethod === "credit" || paymentMethod === "debit") && (
              <CreditCardForm method={paymentMethod} total={purchase.total} />
            )}

            {paymentMethod === "pix" && <PixPayment />}

            <PaymentButtons
              disabled={!paymentMethod}
              loading={loading}
              onConfirm={handleConfirm}
              onBack={handleBack}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </div>

      <CancelPurchaseModal
        open={cancelModalOpen}
        loading={loading}
        onClose={() => setCancelModalOpen(false)}
        onConfirm={confirmCancel}
      />
    </div>
  );
}
