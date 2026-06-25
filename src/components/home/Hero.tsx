import LocalActivity from "@mui/icons-material/LocalActivity";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Star from "@mui/icons-material/Star";
import Button from "@/src/components/ui/Button";
import { useRouter } from "next/dist/client/components/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section>
      <div className=" flex w-full min-h-screen items-center  flex-col md:flex-row gap-8">
        <div className=" px-6 md:px-12">
          {/* Nota */}
          <div className="flex items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-1 rounded-md bg-red-cinema px-2 py-1 text-sm font-semibold ">
              <span>Avaliações</span>
            </div>
            <div className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-semibold ">
              <Star className="text-yellow-300" />
              8.5/10
            </div>
          </div>

          {/* Título */}
          <h1 className="mb-4 text-5xl font-montserrat font-bold uppercase tracking-wide  md:text-7xl">
            Eco do Amanhã
          </h1>

          {/* Descrição */}
          <p className="mb-8 max-w-xl text-base leading-relaxed  md:text-lg">
            Em um futuro distante, um explorador solitário recebe um misterioso
            sinal vindo de um planeta esquecido. Ao investigar sua origem, ele
            descobre um segredo capaz de mudar o destino da humanidade para
            sempre. Agora, ele precisa decidir entre revelar a verdade ou
            proteger o futuro de sua espécie.
          </p>

          {/* Botões */}
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" onClick={() => router.push("#")}>
              <LocalActivity /> Comprar Ingresso
            </Button>
            <Button variant="secondary" onClick={() => router.push("#")}>
              <PlayArrow /> Assistir Trailer
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
