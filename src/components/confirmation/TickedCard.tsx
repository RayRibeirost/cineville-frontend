import Image from "next/image";
import QRCode from "./QRcode";
import { PurchaseSummary } from "@/src/types/payments";

interface TicketCardProps {
  order: PurchaseSummary;
}

export default function TicketCard({ order }: TicketCardProps) {
  const seats = order.tickets.map((ticket) => ticket.seatNumber).join(", ");

  const hasMeia = order.tickets.some((ticket) => ticket.type === "MEIA");

  return (
    <div
      className="
        relative
        flex
        w-full
        overflow-hidden
        rounded-[15px]
        border
        border-grayScale-200/8
        bg-deep-black
        shadow-[0_12px_35px_rgba(0,0,0,0.35)]
      "
    >
      {/* Imagem */}
      <div className="relative w-[34%] shrink-0 p-1.25">
        <div
          className="
            relative
            h-full
            min-h-92.5
            overflow-hidden
            rounded-xl
            bg-deep-black
          "
        >
          <Image
            src="/assets/img-hero.png"
            fill
            alt={order.movie}
            className="object-cover"
            sizes="120px"
          />

          {/* Overlay da imagem */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-deep-black/5 to-deep-black/25" />
        </div>
      </div>

      {/* Divisor */}
      <div className="my-4 w-px bg-grayScale-200/7" />

      {/* Informações */}
      <div className="flex min-w-0 flex-1 justify-between gap-2 px-3 py-4">
        <div className="min-w-0 flex-1">
          {/* Label */}
          <span
            className="
              text-[12px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-red-cinema
            "
          >
            Agora no Cinema
          </span>

          {/* Filme */}
          <h2
            className="
              mt-1
              max-w-31.25
              text-2xl
              font-bold
              leading-[1.05]
              text-grayScale-200
            "
          >
            {order.movie}
          </h2>

          {/* Informações */}
          <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3">
            <Info title="Cinema" value={order.room} />

            <Info title="Data e Hora" value={order.session} align="left" />

            <Info title="Sala" value={order.room} />

            <Info title="Assentos" value={seats || "—"} align="left" />

            <Info title="Scan Me" value={order._id} />
          </div>
        </div>

        {/* QR / tipo */}
        <div className="flex shrink-0 flex-col items-end justify-between">
          <span
            className="
              rounded-sm
              bg-red-cinema
              px-2
              py-0.75
              text-[12px]
              font-bold
              uppercase
              text-white
            "
          >
            {hasMeia ? "MEIA" : "3D"}
          </span>

          <div
            className="
              rounded-[5px]
              bg-grayScale-200/5
              p-1
            "
          >
            <QRCode />
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({
  title,
  value,
  align = "left",
}: {
  title: string;
  value: string;
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <span
        className="
          block
          text-[12px]
          font-medium
          uppercase
          tracking-[0.08em]
          text-grayScale-400
        "
      >
        {title}
      </span>

      <p
        className="
          mt-0.5
          max-w-[380px]
          truncate
          text-[12px]
          font-medium
          leading-tight
          text-grayScale-200
        "
        title={value}
      >
        {value}
      </p>
    </div>
  );
}
