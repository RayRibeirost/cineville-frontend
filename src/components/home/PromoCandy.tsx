"use client";

import Image from "next/image";
import { Link, ShoppingCart } from "@mui/icons-material";
import HeadingContent from "@/src/components/ui/HeadingContent";
import Button from "../ui/Button";

export default function PromoCandy() {
  return (
    <section className="mx-auto w-full max-w-7xl py-20 ">
      <HeadingContent title="Bomboniere" />
      <div className="flex items-start justify-between gap-8  mt-16">
        <div className="min-h-80">
          <Image
            src="/assets/promo-candy.png"
            alt="Combo Blockbuster"
            width={650}
            height={420}
            className="object-cover"
          />
        </div>

        <div className="flex flex-col items-start justify-center p-8">
          <span className="mb-4 w-fit rounded bg-red-cinema px-2 py-1 text-xs font-bold uppercase text-white">
            Oferta Limitada
          </span>

          <h2 className="text-5xl font-bold leading-tight text-white">
            Combo BlockBuster:
            <br />
            Pipoca + 2 Refris
          </h2>

          <p className="mt-6 text-lg max-w-[75%] leading-relaxed text-zinc-400">
            Aproveite a experiência completa com nosso melhor combo. Garanta
            agora com 15% de desconto.
          </p>

          <div className="mt-8 flex items-end gap-3">
            <span className="text-6xl font-bold text-white">R$ 40,00</span>

            <span className="mb-2 text-2xl text-zinc-500 line-through">
              R$ 54,00
            </span>
          </div>

          <Button className="mt-8 gap-2 px-6 py-3 text-lg font-bold">
            <ShoppingCart fontSize="small" />
            Comprar Agora
          </Button>
        </div>
      </div>
    </section>
  );
}
