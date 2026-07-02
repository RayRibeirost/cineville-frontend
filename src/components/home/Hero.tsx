"use client";

import LocalActivity from "@mui/icons-material/LocalActivity";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Star from "@mui/icons-material/Star";
import Button from "@/src/components/ui/Button";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section>
      <div className="flex min-h-screen w-full items-center">
        <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1 rounded-md bg-red-cinema px-3 py-1 text-xs font-semibold sm:text-sm">
                <span>Avaliações</span>
              </div>

              <div className="inline-flex items-center gap-1 rounded-md px-3 py-1 text-xs font-semibold sm:text-sm">
                <Star className="text-yellow-300" fontSize="small" />
                <span>8.5/10</span>
              </div>
            </div>

            <h1 className="mb-5 font-montserrat text-4xl font-bold uppercase tracking-wide sm:text-5xl md:text-6xl lg:text-7xl">
              Eco do Amanhã
            </h1>

            <p className="mb-8 max-w-2xl text-sm leading-relaxed text-gray-200 sm:text-base md:text-lg">
              Em um futuro distante, um explorador solitário recebe um
              misterioso sinal vindo de um planeta esquecido. Ao investigar sua
              origem, ele descobre um segredo capaz de mudar o destino da
              humanidade para sempre. Agora, ele precisa decidir entre revelar a
              verdade ou proteger o futuro de sua espécie.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                variant="primary"
                onClick={() => router.push("/movies/1")}
                className="w-full justify-center gap-2 sm:w-auto"
              >
                <LocalActivity fontSize="small" />
                Comprar Ingresso
              </Button>

              <Button
                variant="secondary"
                onClick={() => router.push("#")}
                className="w-full justify-center gap-2 sm:w-auto"
              >
                <PlayArrow fontSize="small" />
                Assistir Trailer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
