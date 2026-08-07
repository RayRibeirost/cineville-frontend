"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import Button from "../ui/Button";
import TicketCard from "./TickedCard";

interface OrderConfirmedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderConfirmedModal({
  isOpen,
  onClose,
}: OrderConfirmedModalProps) {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "hidden";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center overflow-y-auto justify-center bg-deep-black/90 backdrop-blur-sm p-4">
      <div
        className="relative w-full max-w-5xl max-h-[90vh] rounded-3xl bg-background "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center">
          <CheckCircleRoundedIcon
            sx={{
              fontSize: 56,
              color: "#E50914",
            }}
          />

          <h1 className="mt-6 text-center text-4xl font-bold text-grayScale-2a00">
            Pedido Confirmado!
          </h1>

          <p className="mt-4 max-w-lg text-center text-grayScale-400">
            Prepare a pipoca. Seus ingressos digitais já estão prontos e foram
            enviados para o seu e-mail.
          </p>

          <div className="mt-10 flex w-full justify-center">
            <TicketCard />
          </div>

          <Button
            onClick={() => {
              onClose();
              router.push("/");
            }}
            className="mt-10 mb-10 flex items-center gap-2 px-8"
          >
            <HomeOutlinedIcon fontSize="small" />
            Voltar ao início
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
