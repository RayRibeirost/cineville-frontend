"use client";

import Link from "next/link";
import ContactSupport from "@mui/icons-material/ContactSupport";
import { SuportButtonProps } from "@/src/types";

export default function SuportButton({
  phone,
  message = "Olá! Gostaria de mais informações.",
}: SuportButtonProps) {
  const url = `https://eva-app.app.n8n.cloud/webhook/51530510-fe55-40b4-b2f8-6c2d990db3bf/chat`;

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className="
        fixed
        bottom-6
        right-6
        z-50
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-full
        bg-sucess
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:scale-110
        hover:shadow-2xl
        active:scale-95
      "
    >
      <ContactSupport fontSize={"large"} />
    </Link>
  );
}
