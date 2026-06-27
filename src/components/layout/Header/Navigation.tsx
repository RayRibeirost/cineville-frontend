import Link from "next/link";

type NavigationProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

export default function Navigation({
  mobile = false,
  onNavigate,
}: NavigationProps) {
  return (
    <nav
      className={`${
        mobile ? "flex flex-col gap-6" : "hidden md:flex items-center gap-8"
      }`}
    >
      <Link href="/" onClick={onNavigate}>
        Home
      </Link>

      <Link href="/produtos" onClick={onNavigate}>
        Produtos
      </Link>

      <Link href="/sobre" onClick={onNavigate}>
        Sobre
      </Link>

      <Link href="/contato" onClick={onNavigate}>
        Contato
      </Link>
    </nav>
  );
}
