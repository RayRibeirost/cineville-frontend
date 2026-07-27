"use client";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import Button from "../ui/Button";
import TicketCard from "./TickedCard";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface OrderConfirmedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoHome?: () => void;
}

export default function OrderConfirmedModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div
      className=" flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl rounded-3xl bg-background p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center">
          <CheckCircleRoundedIcon
            sx={{
              fontSize: 56,
              color: "#E50914",
            }}
          />

          <h1 className="mt-6 text-5xl font-bold text-grayScale-100">
            Pedido Confirmado!
          </h1>

          <p className="mt-4 text-center text-grayScale-400 max-w-lg">
            Prepare a pipoca. Seus ingressos digitais já estão prontos e foram
            enviados para o seu e-mail.
          </p>

          <div className="mt-10 w-full flex justify-center">
            <TicketCard />
          </div>

          <Button
            onClick={() => router.push("/")}
            className="mt-10 flex items-center gap-2 px-8"
          >
            <HomeOutlinedIcon fontSize="small" />
            Voltar ao início
          </Button>
        </div>
      </div>
    </div>
  );
}
