"use client";

import Image from "next/image";
import Link from "next/link";
import { ConfirmationNumber, Add } from "@mui/icons-material";

import Button from "../../ui/Button";
import { MovieCardProps } from "@/src/types/movie-types";
import { classificationColor, movieMetaLine } from "@/src/utils/movie";

/**
 * Card usado nos carrosséis da Home.
 *
 * `h-full` + `mt-auto` no rodapé mantêm todos os cards do mesmo tamanho
 * independente do comprimento do título; o pôster fica preso em 2:3 para que
 * imagens com proporções diferentes não estiquem a linha.
 */
export default function MovieCard({ movie, highlight }: MovieCardProps) {
  const banner = movie.banner || "/assets/movie-placeholder.png";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-grayScale-600 bg-gray-surface transition-all duration-300 hover:-translate-y-1 hover:border-red-cinema">
      <Link href={`/movies/${movie._id}`} className="relative block aspect-2/3">
        <Image
          src={banner}
          alt={movie.title}
          fill
          unoptimized={banner.startsWith("http")}
          sizes="(max-width: 640px) 60vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span
          className={`absolute top-2 left-2 rounded px-1.5 py-0.5 text-[11px] font-black text-white ${classificationColor(
            movie.classification,
          )}`}
        >
          {movie.classification}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 min-h-12 font-black text-white">
          {movie.title}
        </h3>

        <p className="line-clamp-1 text-xs text-grayScale-400">
          {movieMetaLine(movie.genres, movie.duration)}
        </p>

        {highlight && (
          <p className="line-clamp-1 text-xs font-bold text-red-cinema">
            {highlight}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-2 pt-2 sm:flex-row">
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
              <span>Detalhes</span>
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
