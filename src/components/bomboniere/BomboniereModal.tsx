"use client";

import CloseIcon from "@mui/icons-material/Close";
import { ShoppingCart } from "@mui/icons-material";
import ProductCarousel, {
  CartItem,
} from "@/src/components/layout/Carousel/ProductCarousel";
import { Product } from "@/src/components/layout/Carousel/ProductCard";
import Button from "@/src/components/ui/Button";
import { useState } from "react";
interface BomboniereModalProps {
  isOpen: boolean;
  onClose: () => void;

  bebidas: Product[];
  comidas: Product[];
  combos: Product[];

  cart: CartItem[];
  onAdd: (product: Product) => void;
  onRemove: (id: string) => void;
}

export default function BomboniereModal({
  isOpen,
  onClose,
  bebidas,
  comidas,
  combos,
  cart,
  onAdd,
  onRemove,
}: BomboniereModalProps) {
  const [cartOpen, setCartOpen] = useState(false);

  if (!isOpen) return null;
  const totalItems = cart.reduce((a, b) => a + b.quantity, 0);

  const totalPrice = cart.reduce((a, b) => a + b.quantity * b.price, 0);

  return (
    <div className="fixed inset-0 z-9999 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="flex h-screen items-center justify-center p-6">
        <div className="relative flex h-[100dvh] w-full max-w-7xl flex-col overflow-hidden rounded-none bg-deep-black sm:h-[95vh] sm:rounded-2xl lg:h-[92vh] lg:rounded-3xl">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gray-surface transition hover:bg-red-cinema sm:right-6 sm:top-6 sm:h-11 sm:w-11"
          >
            <CloseIcon />
          </button>

          <div className="grid h-full grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">
            <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-12">
              <div>
                <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                  Bomboniere
                </h1>

                <p className="text-grayScale-400 mt-3 max-w-full text-sm sm:max-w-xl sm:text-base">
                  Complete sua experiência com pipoca fresquinha, bebidas
                  geladas e os melhores snacks.
                </p>
              </div>

              <div className="flex flex-col gap-6 lg:gap-10 rounded-2xl bg-deep-black border border-grayScale-600 p-3 sm:p-5 lg:p-6">
                <ProductCarousel
                  title="Combos Exclusivos"
                  products={combos}
                  cart={cart}
                  onAdd={onAdd}
                  onRemove={onRemove}
                />
                <ProductCarousel
                  title="Pipoca e Snacks"
                  products={comidas}
                  cart={cart}
                  onAdd={onAdd}
                  onRemove={onRemove}
                />
                <ProductCarousel
                  title="Drinks & Refrigerantes"
                  products={bebidas}
                  cart={cart}
                  onAdd={onAdd}
                  onRemove={onRemove}
                />
              </div>
            </div>

            <aside className="hidden lg:block border-l border-grayScale-600 bg-deep-black">
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="border-b border-grayScale-600 p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-3 text-2xl font-bold ">
                      <ShoppingCart />
                      Carrinho
                    </h2>

                    <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-red-cinema px-2 text-sm font-bold">
                      {totalItems}
                    </span>
                  </div>
                </div>

                {/* Produtos */}
                <div className="flex-1 custom-scroll overflow-y-auto p-6 hidden lg:flex">
                  {cart.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-center text-grayScale-400">
                      Nenhum produto selecionado.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-xl border border-grayScale-600 bg-deep-black p-4"
                        >
                          <div className="flex justify-between gap-3">
                            <div>
                              <p className="font-semibold">{item.name}</p>

                              <p className="mt-1 text-sm text-grayScale-400">
                                {item.size}
                              </p>

                              <p className="mt-2 text-sm">
                                Quantidade:{" "}
                                <span className="font-bold">
                                  {item.quantity}
                                </span>
                              </p>
                            </div>

                            <span className="font-bold text-red-cinema whitespace-nowrap">
                              R${" "}
                              {(item.price * item.quantity)
                                .toFixed(2)
                                .replace(".", ",")}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-grayScale-600 bg-deep-black p-6">
                  <div className="mb-5 items-center  mt-2 flex justify-between text-2xl font-black">
                    <span className="text-grayScale-300">Total</span>

                    <span className="text-2xl font-black text-red-cinema">
                      R$ {totalPrice.toFixed(2).replace(".", ",")}
                    </span>
                  </div>

                  <Button className="w-full" onClick={onClose}>
                    Finalizar Pedido
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Carrinho</h2>

        <button onClick={() => setCartOpen(false)}>
          <CloseIcon />
        </button>
      </div>

      {cartOpen && (
        <div className="fixed inset-0 z-[10000] bg-black/70 lg:hidden">
          <div
            className="absolute inset-0"
            onClick={() => setCartOpen(false)}
          />

          <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] rounded-t-3xl bg-deep-black">
            <div className="flex items-center justify-between border-b border-grayScale-600 p-5">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <ShoppingCart />
                Carrinho
              </h2>

              <button onClick={() => setCartOpen(false)}>
                <CloseIcon />
              </button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto custom-scroll p-5">
              {cart.length === 0 ? (
                <p className="py-10 text-center text-grayScale-400">
                  Nenhum produto.
                </p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-grayScale-600 p-4"
                    >
                      <div className="flex justify-between">
                        <div>
                          <p className="font-semibold">{item.name}</p>

                          <p className="text-sm text-grayScale-400">
                            {item.quantity}x {item.size}
                          </p>
                        </div>

                        <span className="font-bold text-red-cinema">
                          R${" "}
                          {(item.price * item.quantity)
                            .toFixed(2)
                            .replace(".", ",")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-grayScale-600 p-5">
              <div className="mb-5 flex justify-between text-xl font-bold">
                <span>Total</span>

                <span className="text-red-cinema">
                  R$ {totalPrice.toFixed(2).replace(".", ",")}
                </span>
              </div>

              <Button className="w-full" onClick={onClose}>
                Finalizar Pedido
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
