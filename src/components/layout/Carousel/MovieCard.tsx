"use client";

import Image from "next/image";
import { ConfirmationNumber, Add } from "@mui/icons-material";
import Button from "../../ui/Button";

export default function MovieCard() {
  return (
    <article className="overflow-hidden rounded-lg bg-zinc-900 shadow-lg">
      <div className="relative aspect-2/3">
        <Image
          src={"/assets/movie-Reinos-esquecidos.png"}
          alt="Reinos Esquecidos"
          fill
          className="object-cover transition duration-300 hover:scale-105"
        />
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-lg font-bold text-white">Reinos Esquecidos</h3>

          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm text-zinc-400">Aventura</span>

            <span className="rounded bg-lime-500 px-1 text-xs font-bold text-black">
              L
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex flex-1 items-center justify-center gap-2 ">
            <ConfirmationNumber fontSize="small" />
            Ingressos
          </Button>

          <Button variant="secondary" className="flex items-center gap-1 ">
            <Add />
            Ver Mais
          </Button>
        </div>
      </div>
    </article>
  );
}
