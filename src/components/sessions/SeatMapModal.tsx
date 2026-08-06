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
import { addProductsToOrder } from "@/src/actions/orderAction";
import type { CartItem } from "@/src/types/cart";
import { getBomboniere } from "../../actions/productAction";
import { useRouter } from "next/navigation";
import { useOrder } from "@/src/context/OrderContext";
export default function SeatMapModal({
  isOpen,
  onClose,
  sessionId,
}: {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
}) {
  const router = useRouter();
  const { setOrder } = useOrder();
  const { selectedSeats, selectedCount, toggleSeat } = useSeatSelection();
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const [seatRows, setSeatRows] = useState<SeatRow[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [isOpenBomboniere, setIsOpenBomboniere] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const [bebidas, setBebidas] = useState<Product[]>([]);
  const [comidas, setComidas] = useState<Product[]>([]);
  const [combos, setCombos] = useState<Product[]>([]);
  const handleCheckout = async (cart: CartItem[]) => {
    try {
      if (!orderId) return;

      const products = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const result = await addProductsToOrder(orderId, products);

      if (!result.success) {
        alert(result.error);
        return;
      }

      setOrder((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          products: cart.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          total: result.order.total,
        };
      });

      setIsOpenBomboniere(false);
      onClose();
      console.log("INDO PARA PAYMENT:", orderId);
      console.log("OrderId:", orderId);
      router.push(`/payment/${orderId}`);
    } catch (error) {
      console.error(error);
    }
  };
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

  useEffect(() => {
    async function loadProducts() {
      const result = await getBomboniere();

      if (!result.success || !result.products) {
        console.error(result.error);
        return;
      }

      const products = result.products;
      console.log("Produtos:", products);

      console.log(
        products.map((p) => ({
          nome: p.name,
          categoria: p.category,
        })),
      );
      setBebidas(
        products
          .filter((p) => p.category === "BEBIDAS")
          .map((p) => ({
            id: p._id,
            name: p.name,
            size: p.size ?? "",
            price: p.price / 100,
            limit: p.maxLimit,
            image: p.imageUrl,
          })),
      );

      setComidas(
        products
          .filter((p) => p.category === "COMIDAS")
          .map((p) => ({
            id: p._id,
            name: p.name,
            size: p.size ?? "",
            price: p.price / 100,
            limit: p.maxLimit,
            image: p.imageUrl,
          })),
      );

      setCombos(
        products
          .filter((p) => p.category === "COMBOS")
          .map((p) => ({
            id: p._id,
            name: p.name,
            size: p.size ?? "",
            price: p.price / 100,
            limit: p.maxLimit,
            image: p.imageUrl,
          })),
      );
    }

    if (isOpenBomboniere) {
      loadProducts();
    }
  }, [isOpenBomboniere]);
  const totalSeatsCount = seatRows.reduce(
    (total, { seats }) => total + seats.filter((s) => s !== null).length,
    0,
  );

  async function handleConfirm() {
    console.log("SESSION ID:", sessionId);
    console.log("SESSION INFO:", sessionInfo);
    console.log("SELECTED SEATS:", selectedSeats);
    if (!sessionInfo) {
      setPurchaseError("Sessão não encontrada.");
      return;
    }

    if (selectedSeats.length === 0) {
      setPurchaseError("Selecione pelo menos um assento.");
      return;
    }

    setPurchaseError(null);

    startTransition(async () => {
      try {
        const seats: SeatDto[] = selectedSeats.map((seat) => ({
          seatNumber: seat.seatNumber,
          type: seat.type,
        }));

        const result = await createOrder(sessionId, seats);

        if (!result.success || !result.order) {
          setPurchaseError(result.error ?? "Erro ao criar pedido.");
          return;
        }

        const order = result.order;

        const orderData = {
          _id: order._id,
          movie: sessionInfo.movieTitle,
          session: `${sessionInfo.date} às ${sessionInfo.time}`,
          room: sessionInfo.room,

          seats: selectedSeats.map((seat) => seat.seatNumber),

          tickets: selectedSeats.map((seat) => ({
            seatNumber: seat.seatNumber,
            type: seat.type,
            price:
              seat.type === "MEIA" ? sessionInfo.price / 2 : sessionInfo.price,
          })),

          products: [],

          total: order.total,
          discount: 0,
        };

        setOrder(orderData);

        setOrderId(order._id);

        setIsOpenBomboniere(true);
      } catch (error) {
        console.error("Erro ao criar pedido:", error);

        setPurchaseError("Não foi possível criar o pedido.");
      }
    });
  }

  if (!isOpen) return null;

  const handleAdd = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, product.limit),
              }
            : item,
        );
      }

      return [
        ...current,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const handleRemove = (productId: string) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
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
        onCheckout={handleCheckout}
      />
    </>
  );
}
