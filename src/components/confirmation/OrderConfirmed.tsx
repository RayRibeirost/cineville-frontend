"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import Button from "../ui/Button";
import TicketCard from "./TickedCard";
import { PurchaseSummary } from "@/src/types/payments";

interface OrderConfirmedModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: PurchaseSummary | undefined;
}

export default function OrderConfirmedModal({
  isOpen,
  onClose,
  order,
}: OrderConfirmedModalProps) {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !order) return null;

  return createPortal(
    <div className=" fixed inset-0 z-9999 flex min-h-screen items-center justify-center bg-deep-black/75 px-4 py-8 backdrop-blur-lg">
      <div
        className="
          relative
          flex
          w-full
          max-w-220
          flex-col
          items-center
          overflow-hidden
          rounded-3xl
          bg-gray-surface
          px-7
          pt-5
          text-white
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ícone de confirmação */}
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-red-cinema
            bg-deep-black
            shadow-[0_0_20px_rgba(229,9,20,0.15)]
          "
        >
          <CheckCircleRoundedIcon
            sx={{
              fontSize: 25,
              color: "#e50914",
            }}
          />
        </div>

        {/* Título */}
        <h1
          className="
            mt-4
            text-center
            text-4xl
            font-extrabold
            leading-tight
            tracking-tight
            text-grayScale-200
            sm:text-[30px]
          "
        >
          Pedido Confirmado!
        </h1>

        {/* Descrição */}
        <p
          className="
            mt-2
            max-w-82.5
            text-center
            text-base
            leading-normal
            text-grayScale-400
          "
        >
          Prepare a pipoca. Seus ingressos digitais já estão prontos e foram
          enviados para o seu e-mail.
        </p>

        {/* Ticket */}
        <div className="mt-6 w-full">
          <TicketCard order={order} />
        </div>

        {/* Botão */}
        <Button
          onClick={() => {
            onClose();
            router.push("/");
          }}
          className="
            mt-5
            mb-3
            flex
            h-9
            items-center
            gap-2
            rounded-lg
            border
            border-grayScale-200/10
            bg-red-cinema
            px-8
            py-1.5
            text-base
            font-medium
            text-grayScale-200
            transition
            hover:bg-red-cinema/90
          "
        >
          <HomeOutlinedIcon sx={{ fontSize: 16 }} />
          Voltar ao início
        </Button>
      </div>
    </div>,
    document.body,
  );
}
