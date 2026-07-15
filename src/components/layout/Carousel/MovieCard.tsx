"use client";

import Image from "next/image";
import { ConfirmationNumber, Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";

import Button from "../../ui/Button";
import { Movie } from "@/src/types/movieTypes";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const router = useRouter();

  return (
    <article className="overflow-hidden rounded-lg bg-zinc-900 shadow-lg transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-[2/3]">
        <Image
          src={"/assets/img-movie.png"}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="space-y-3 p-3 sm:p-4">
        <div>
          <h3 className="line-clamp-1 text-base font-bold text-white sm:text-lg">
            {movie.title}
          </h3>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-zinc-400 sm:text-sm">
              {movie.genero}
            </span>

            <span className="rounded bg-lime-500 px-1.5 py-0.5 text-[10px] font-bold text-black sm:text-xs">
              {movie.classificacao}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            className="flex w-full flex-1 items-center justify-center gap-2"
            onClick={() => router.push(`/movies/${movie.id}/tickets`)}
          >
            <ConfirmationNumber fontSize="small" />
            <span>Ingressos</span>
          </Button>

          <Button
            variant="secondary"
            className="flex w-full items-center justify-center gap-2 sm:w-auto"
            onClick={() => router.push(`/movies/${movie.id}/details`)}
          >
            <Add fontSize="small" />
            <span>Ver Mais</span>
          </Button>
        </div>
      </div>
    </article>
  );
}
