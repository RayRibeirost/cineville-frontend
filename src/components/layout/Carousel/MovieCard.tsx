"use client";

import Image from "next/image";
import Link from "next/link";
import { ConfirmationNumber, Add } from "@mui/icons-material";

import Button from "../../ui/Button";
import { MovieCardProps } from "@/src/types/movie-types";

export default function MovieCard({ movie }: MovieCardProps) {
  const movieBanner = movie.banner || "/assets/movie-placeholder.png";

  return (
    <article className="overflow-hidden rounded-lg bg-zinc-900 shadow-lg transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-[2/3]">
        <Image
          src={movieBanner}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          unoptimized={movie.banner?.startsWith("http")}
        />
      </div>

      <div className="space-y-3 p-3 sm:p-4">
        <div>
          <h3 className="line-clamp-1 text-base font-bold text-white sm:text-lg">
            {movie.title}
          </h3>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-zinc-400 sm:text-sm">
              {movie.genre || "Cinema"}
            </span>

            <span className="rounded bg-lime-500 px-1.5 py-0.5 text-[10px] font-bold text-black sm:text-xs">
              {movie.ageRating || "L"}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href={`/movies/${movie._id}`} className="flex-1">
            <Button className="flex w-full items-center justify-center gap-2">
              <ConfirmationNumber fontSize="small" />
              <span>Ingressos</span>
            </Button>
          </Link>

          <Link href={`/movies/${movie._id}`} className="sm:w-auto">
            <Button
              variant="secondary"
              className="flex w-full items-center justify-center gap-2"
            >
              <Add fontSize="small" />
              <span>Ver Mais</span>
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
