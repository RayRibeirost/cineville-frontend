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
    <div className="flex items-center gap-3">
      <Button variant="primary" onClick={handleLogin}>
        Entrar
      </Button>

      <button
        onClick={handleLogin}
        className="text-white hover:text-button-primary-hover transition-colors cursor-pointer"
        aria-label="Entrar"
      >
        <Person fontSize="large" />
      </button>
    </div>
  );
}
