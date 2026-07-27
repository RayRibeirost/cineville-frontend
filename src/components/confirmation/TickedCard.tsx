import Image from "next/image";
import QRCode from "./QRcode";

export default function TicketCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-deep-black border border-white/10 shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#66121250,transparent_60%)]" />

      <div className="relative flex">
        <div className="p-3 relative w-[30%]">
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <Image
              src="/assets/img-hero.png"
              fill
              alt=""
              className="object-cover"
            />
          </div>
        </div>

        <div className="w-px bg-white/10" />

        <div className="flex-1 p-8 flex justify-between">
          <div>
            <span className="text-red-cinema text-xs uppercase tracking-widest">
              Agora no Cinema
            </span>

            <h2 className="text-4xl font-bold text-grayScale-200 mt-2">
              O Labirinto
              <br />
              do Tempo
            </h2>

            <div className="grid grid-cols-2 gap-x-16 gap-y-8 mt-8">
              <Info title="Cinema" value="MovieVerse Premium Paulista" />

              <Info title="Data e Hora" value="24 Out 2024 · 20:30" />

              <Info title="Sala" value="3D Room 04" />

              <Info title="Assentos" value="H12, H13" />

              <Info title="Scan me" value="ORD-93281490-HV" />
            </div>
          </div>

          <div className="flex flex-col items-end justify-between">
            <span className="bg-red-cinema px-4 py-1 rounded-full text-xs font-bold">
              3D
            </span>

            <QRCode />
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase text-grayScale-400">{title}</p>

      <p className="text-grayScale-200 font-medium mt-1">{value}</p>
    </div>
  );
}
