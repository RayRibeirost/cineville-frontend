"use client";

import { useRouter } from "next/navigation";
import Button from "@/src/components/ui/Button";
import Person from "@mui/icons-material/Person";

export default function HeaderGuest() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="hidden sm:block">
        <Button variant="primary" onClick={handleLogin}>
          Entrar
        </Button>
      </div>

      <button
        onClick={handleLogin}
        className="flex items-center justify-center text-white hover:opacity-80 transition-all duration-300 cursor-pointer p-1 sm:p-0"
        aria-label="Entrar"
      >
        <Person className="text-[24px] sm:text-[32px]" />
      </button>
    </div>
  );
}
