"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer/Footer";
import { ShoppingCart, ArrowBack } from "@mui/icons-material";
import ProductCarousel from "@/src/components/layout/Carousel/ProductCarousel";
import type { CartItem } from "@/src/types/cart";
import { Product } from "@/src/components/layout/Carousel/ProductCard";
import Button from "@/src/components/ui/Button";

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

export default function BombonierePage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAdd = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.limit) return prev;
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemove = (productId: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="bg-deep-black text-grayScale-200 min-h-screen">
      <Header />

      <div className="mx-auto max-w-screen-2xl px-5 sm:px-8 pt-24 pb-12 flex flex-col xl:flex-row gap-10 items-start">
        <div className="flex-1 min-w-0 w-full flex flex-col gap-14">
          <div>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-grayScale-400 hover:text-grayScale-200 font-semibold mb-6 transition-colors cursor-pointer"
              aria-label="Voltar para a página anterior"
            >
              <ArrowBack sx={{ fontSize: 20 }} />
              Voltar
            </button>

            <h1 className="text-4xl font-black text-grayScale-200">
              Bomboniere
            </h1>
            <p className="text-grayScale-400 text-base mt-3 max-w-3xl">
              Complete sua experiência com pipoca fresquinha, bebidas geladas e
              os melhores snacks para aproveitar cada cena do começo ao fim.
            </p>
          </div>

          <ProductCarousel
            title="Combos Exclusivos"
            products={combos}
            cart={cart}
            onAdd={handleAdd}
            onRemove={handleRemove}
          />

          <ProductCarousel
            title="Pipoca e Snacks"
            products={comidas}
            cart={cart}
            onAdd={handleAdd}
            onRemove={handleRemove}
          />

          <ProductCarousel
            title="Drinks & Refrigerantes"
            products={bebidas}
            cart={cart}
            onAdd={handleAdd}
            onRemove={handleRemove}
          />
        </div>

        <div className="w-full xl:w-95 shrink-0">
          <div className="bg-gray-surface rounded-2xl p-6 border border-grayScale-600 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-black text-grayScale-200 text-xl flex items-center gap-3">
                <ShoppingCart />
                Seu Carrinho
              </h2>
              <span className="bg-red-cinema text-white text-sm font-black px-3 py-1 rounded-full">
                {totalItems}
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-grayScale-500">
                <ShoppingCart sx={{ fontSize: 48 }} />
                <p className="text-base text-center">
                  Você não possui nenhum produto no carrinho.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b border-grayScale-600 pb-3"
                  >
                    <div className="pr-4">
                      <p className="text-base font-bold text-grayScale-200">
                        {item.name}
                      </p>
                      <p className="text-sm text-grayScale-400 mt-1">
                        {item.size}
                      </p>
                      <p className="text-sm text-grayScale-400 font-semibold mt-1">
                        Qtd: {item.quantity}
                      </p>
                    </div>
                    <p className="text-red-cinema font-black text-base whitespace-nowrap">
                      R${" "}
                      {(item.price * item.quantity)
                        .toFixed(2)
                        .replace(".", ",")}
                    </p>
                  </div>
                ))}

                <div className="flex justify-between items-center pt-3 mt-2 border-t border-grayScale-600">
                  <span className="font-black text-grayScale-200 text-lg">
                    Total
                  </span>
                  <span className="font-black text-red-cinema text-2xl">
                    R$ {totalPrice.toFixed(2).replace(".", ",")}
                  </span>
                </div>

                <Button
                  className="w-full  hover:bg-button-primary-hover text-grayScale-200 
                tracking-widest rounded-xl transition-all  cursor-pointer"
                >
                  Finalizar Pedido
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
