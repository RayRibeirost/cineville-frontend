"use client";

import Image from "next/image";
import { ShoppingCart } from "@mui/icons-material";
import HeadingContent from "@/src/components/ui/HeadingContent";
import Button from "../ui/Button";

export default function PromoCandy() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <HeadingContent title="Bomboniere" />

      <div className="mt-10 flex flex-col items-center gap-10 lg:mt-16 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="w-full lg:max-w-[50%]">
          <Image
            src="/assets/promo-candy.png"
            alt="Combo Blockbuster"
            width={650}
            height={420}
            className="h-auto w-full rounded-lg object-cover"
          />
        </div>

        <div className="flex w-full flex-col items-start justify-center lg:max-w-[50%] lg:p-8">
          <span className="mb-4 rounded bg-red-cinema px-2 py-1 text-xs font-bold uppercase text-white">
            Oferta Limitada
          </span>

          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Combo BlockBuster:
            <br />
            Pipoca + 2 Refris
          </h2>

          <p className="mt-6 max-w-full text-base leading-relaxed text-zinc-400 sm:text-lg lg:max-w-[75%]">
            Aproveite a experiência completa com nosso melhor combo. Garanta
            agora com 15% de desconto.
          </p>

          <div className="mt-8 flex flex-wrap items-end gap-2 sm:gap-3">
            <span className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              R$ 40,00
            </span>

            <span className="mb-1 text-lg text-zinc-500 line-through sm:mb-2 sm:text-xl lg:text-2xl">
              R$ 54,00
            </span>
          </div>

          <Button className="mt-8 w-full justify-center gap-2 sm:w-auto sm:px-6 sm:py-3 sm:text-lg">
            <ShoppingCart fontSize="small" />
            Comprar Agora
          </Button>
        </div>
      </div>
    </section>
  );
}
