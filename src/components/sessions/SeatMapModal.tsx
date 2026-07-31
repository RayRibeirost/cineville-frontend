"use client";

import { useEffect, useState, useTransition } from "react";
import { SessionInfo } from "@/src/types/session-types";
import { useSeatSelection } from "@/src/hooks/useSeatSelection";
import { SeatMapHeader } from "./SeatMapHeader";
import { SeatMapSidebar } from "./SeatMapSidebar";
import { SeatMapFooter } from "./SeatMapFooter";
import { SeatGrid } from "./SeatMapGrid";
import { SeatRow } from "@/src/utils/seat-rows";
import { getSessionDetails } from "@/src/actions/sessionActions";
import { createOrder, type SeatDto } from "@/src/actions/orderAction";
import BomboniereModal from "../bomboniere/BomboniereModal";
import { Product } from "@/src/components/layout/Carousel/ProductCard";

export default function SeatMapModal({
  isOpen,
  onClose,
  sessionId,
}: {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
}) {
  const { selectedSeats, selectedCount, toggleSeat } = useSeatSelection();
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const [seatRows, setSeatRows] = useState<SeatRow[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [isOpenBomboniere, setIsOpenBomboniere] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    getSessionDetails(sessionId).then((result) => {
      console.log("RESULTADO:", result);
      if (!result.success) {
        setLoadError(result.error);
        return;
      }
      setSessionInfo(result.sessionInfo);
      setSeatRows(result.seatRows);
    });

    return () => {
      setSessionInfo(null);
      setSeatRows([]);
      setLoadError(null);
      setPurchaseError(null);
    };
  }, [isOpen, sessionId]);

  const totalSeatsCount = seatRows.reduce(
    (total, { seats }) => total + seats.filter((s) => s !== null).length,
    0,
  );

  async function handleConfirm() {
    setPurchaseError(null);

    startTransition(async () => {
      const seats: SeatDto[] = Array.from(selectedSeats).map((seatNumber) => ({
        seatNumber,
        type: "INTEIRA",
      }));

      const result = await createOrder(sessionId, seats);

      if (!result.success) {
        setPurchaseError(result.error);
        return;
      }

      localStorage.setItem("orderId", result.order.id);

      setIsOpenBomboniere(true);
    });
  }

  if (!isOpen) return null;
  const bebidas: Product[] = [
    {
      id: "beb-1",
      name: "Refrigerante",
      size: "500 ml",
      price: 8,
      limit: 6,
      image: "/assets/promo-candy.png",
    },
    {
      id: "beb-2",
      name: "Refrigerante",
      size: "700 ml",
      price: 10,
      limit: 6,
      image: "/assets/promo-candy.png",
    },
    {
      id: "beb-3",
      name: "Suco Natural de Laranja",
      size: "500 ml",
      price: 10,
      limit: 6,
      image: "/assets/promo-candy.png",
    },
    {
      id: "beb-4",
      name: "Água Mineral",
      size: "500 ml",
      price: 5,
      limit: 6,
      image: "/assets/promo-candy.png",
    },
    {
      id: "beb-5",
      name: "Água com Gás",
      size: "500 ml",
      price: 5,
      limit: 6,
      image: "/assets/promo-candy.png",
    },
    {
      id: "beb-6",
      name: "Chá Gelado",
      size: "500 ml",
      price: 8,
      limit: 6,
      image: "/assets/promo-candy.png",
    },
    {
      id: "beb-7",
      name: "Milk-shake",
      size: "400 ml",
      price: 12,
      limit: 6,
      image: "/assets/promo-candy.png",
    },
    {
      id: "beb-8",
      name: "Energético",
      size: "250 ml",
      price: 10,
      limit: 6,
      image: "/assets/promo-candy.png",
    },
  ];

  const comidas: Product[] = [
    {
      id: "com-1",
      name: "Pipoca Salgada",
      size: "Pequena",
      price: 8,
      limit: 6,
      image: "/assets/promo-candy.png",
    },
    {
      id: "com-4",
      name: "Pipoca Doce",
      size: "Pequena",
      price: 8,
      limit: 6,
      image: "/assets/promo-candy.png",
    },

    {
      id: "com-7",
      name: "Pipoca Caramelizada",
      size: "Pequena",
      price: 10,
      limit: 6,
      image: "/assets/promo-candy.png",
    },

    {
      id: "com-10",
      name: "Nachos com Queijo",
      size: "60g",
      price: 14,
      limit: 6,
      image: "/assets/promo-candy.png",
    },
    {
      id: "com-11",
      name: "Hot Dog",
      size: "Individual",
      price: 12,
      limit: 4,
      image: "/assets/promo-candy.png",
    },
  ];

  const combos: Product[] = [
    {
      id: "cmb-1",
      name: "Combo Individual",
      size: "1 Pipoca P + 1 Refrigerante 500ml",
      price: 15,
      limit: 4,
      image: "/assets/promo-candy.png",
    },
    {
      id: "cmb-2",
      name: "Combo Casal",
      size: "1 Pipoca G + 2 Refrigerantes 500ml",
      price: 32,
      limit: 3,
      image: "/assets/promo-candy.png",
    },
    {
      id: "cmb-3",
      name: "Combo Família",
      size: "2 Pipocas G + 4 Refrigerantes 500ml",
      price: 64,
      limit: 2,
      image: "/assets/promo-candy.png",
    },
    {
      id: "cmb-4",
      name: "Combo Caramelizado",
      size: "1 Pipoca Caramelizada M + 1 Refrigerante 500ml",
      price: 22,
      limit: 3,
      image: "/assets/promo-candy.png",
    },
  ];

  const cart = [
    {
      id: "cmb-1",
      name: "Combo Individual",
      size: "1 Pipoca P + 1 Refrigerante 500ml",
      price: 15,
      quantity: 2,
      limit: 4,
      image: "/assets/promo-candy.png",
    },
    {
      id: "beb-1",
      name: "Refrigerante",
      size: "500 ml",
      price: 8,
      quantity: 1,
      limit: 6,
      image: "/assets/promo-candy.png",
    },
  ];

  const handleAdd = (product: Product) => {
    console.log("Adicionar:", product);
  };

  const handleRemove = (productId: string) => {
    console.log("Remover:", productId);
  };
  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4 lg:p-10"
        role="dialog"
        aria-modal="true"
        onClick={onClose}
      >
        <div
          className="
        relative
        w-full
        max-w-7xl
        h-[95vh]
        lg:h-auto
        lg:max-h-[90vh]
        overflow-y-auto
        rounded-2xl
        bg-[#181818]
        border
        border-neutral-800
        p-4
        sm:p-6
        text-white
        shadow-2xl
      "
          onClick={(e) => e.stopPropagation()}
        >
          <SeatMapHeader onClose={onClose} />

          {loadError && (
            <p className="py-8 text-center text-sm text-red-500">{loadError}</p>
          )}

          {!loadError && !sessionInfo && (
            <p className="py-8 text-center text-sm text-neutral-400">
              Carregando sessão...
            </p>
          )}

          {sessionInfo && (
            <>
              <div
                className="
              mt-6
              flex
              flex-col
              gap-8
              xl:flex-row
              xl:items-start
              xl:justify-between
            "
              >
                <div className="w-full xl:flex-1">
                  <SeatGrid
                    seatRows={seatRows}
                    selectedSeats={selectedSeats}
                    toggleSeat={toggleSeat}
                    screenType={sessionInfo.screenType}
                    room={sessionInfo.room}
                  />
                </div>

                <div className="w-full xl:w-[320px]">
                  <SeatMapSidebar
                    totalSeatsCount={totalSeatsCount}
                    selectedCount={selectedCount}
                  />
                </div>
              </div>

              {purchaseError && (
                <p className="mt-4 text-center text-sm text-red-500">
                  {purchaseError}
                </p>
              )}

              <div className="mt-6">
                <SeatMapFooter
                  session={sessionInfo}
                  selectedCount={selectedCount}
                  onConfirm={handleConfirm}
                  isLoading={isPending}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <BomboniereModal
        isOpen={isOpenBomboniere}
        onClose={() => setIsOpenBomboniere(false)}
        bebidas={bebidas}
        comidas={comidas}
        combos={combos}
        cart={cart}
        onAdd={handleAdd}
        onRemove={handleRemove}
      />
    </>
  );
}
