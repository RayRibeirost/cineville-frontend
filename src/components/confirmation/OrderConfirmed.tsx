"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import Button from "../ui/Button";
import SpinLoader from "../ui/SpinLoader";
import TicketStub from "../tickets/TicketStub";
import TicketDownloadButton from "../tickets/TicketDownloadButton";
import { getTicketsForOrder } from "@/src/actions/ticketsActions";
import { Ticket } from "@/src/types/ticket";
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

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  /** Incrementado pelo botão "tentar novamente" para refazer a busca. */
  const [reloadToken, setReloadToken] = useState(0);

  const orderId = order?._id;

  // Os ingressos só existem depois que o backend confirma o pagamento, então
  // a busca acontece quando o modal abre. O setState mora dentro do `then`
  // para não disparar renderização em cascata a partir do corpo do efeito.
  useEffect(() => {
    if (!isOpen || !orderId) return;

    let active = true;

    getTicketsForOrder(orderId).then((result) => {
      if (!active) return;

      if (!result.success) {
        setError(result.error);
      } else {
        setTickets(result.data);
      }

      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [isOpen, orderId, reloadToken]);

  const retry = useCallback(() => {
    setLoading(true);
    setError(null);
    setReloadToken((token) => token + 1);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !order) return null;

  return createPortal(
    <div className="fixed inset-0 z-9999 flex min-h-screen items-start justify-center overflow-y-auto bg-deep-black/75 px-4 py-8 backdrop-blur-lg">
      <div
        className="relative flex w-full max-w-220 flex-col items-center rounded-3xl bg-gray-surface px-5 pt-5 pb-6 text-white sm:px-7"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-cinema bg-deep-black shadow-[0_0_20px_rgba(229,9,20,0.15)]">
          <CheckCircleRoundedIcon sx={{ fontSize: 25, color: "#e50914" }} />
        </div>

        <h1 className="mt-4 text-center text-3xl font-extrabold leading-tight tracking-tight text-grayScale-200">
          Pedido Confirmado!
        </h1>

        <p className="mt-2 max-w-96 text-center text-base leading-normal text-grayScale-400">
          Prepare a pipoca. Seus ingressos digitais estão prontos — você também
          pode baixá-los em PDF aqui.
        </p>

        <div className="mt-6 w-full">
          {loading ? (
            <div className="flex flex-col items-center gap-3 rounded-xl border border-grayScale-600 bg-deep-black px-6 py-10">
              <SpinLoader />

              <p className="text-sm text-grayScale-400">
                Emitindo seus ingressos...
              </p>
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-6 py-8 text-center">
              <p className="text-sm text-red-400">{error}</p>

              <button
                type="button"
                onClick={retry}
                className="mt-4 cursor-pointer rounded-md border border-grayScale-600 px-4 py-2 text-xs font-bold text-grayScale-200 transition-colors hover:border-red-cinema"
              >
                Tentar novamente
              </button>
            </div>
          ) : !tickets.length ? (
            /*
              O backend emite os ingressos ao aprovar o pagamento. Se ainda não
              apareceram, o pedido está confirmado mas a emissão não terminou —
              melhor dizer isso do que mostrar um ingresso inventado.
            */
            <div className="rounded-xl border border-grayScale-600 bg-deep-black px-6 py-8 text-center">
              <p className="text-sm text-grayScale-400">
                Seu pagamento foi aprovado e os ingressos estão sendo emitidos.
                Eles aparecem em <strong>Meus Ingressos</strong> em instantes.
              </p>

              <button
                type="button"
                onClick={retry}
                className="mt-4 cursor-pointer rounded-md border border-grayScale-600 px-4 py-2 text-xs font-bold text-grayScale-200 transition-colors hover:border-red-cinema"
              >
                Atualizar
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {tickets.map((ticket) => (
                <div key={ticket._id} className="flex flex-col gap-2">
                  <TicketStub ticket={ticket} />

                  <div className="flex justify-end">
                    <TicketDownloadButton ticket={ticket} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button
            onClick={() => {
              onClose();
              router.push("/meus-ingressos");
            }}
            className="flex h-9 items-center gap-2 rounded-lg border border-grayScale-200/10 bg-red-cinema px-6 py-1.5 text-base font-medium text-grayScale-200 transition hover:bg-red-cinema/90"
          >
            <ConfirmationNumberIcon sx={{ fontSize: 16 }} />
            Meus ingressos
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              onClose();
              router.push("/");
            }}
            className="flex h-9 items-center gap-2 rounded-lg border border-grayScale-600 px-6 py-1.5 text-base font-medium text-grayScale-200 transition"
          >
            <HomeOutlinedIcon sx={{ fontSize: 16 }} />
            Voltar ao início
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
