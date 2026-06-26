import Link from "next/link";
import Logo from "../layout/Header/Logo";

export default function Footer() {
  return (
    <footer className="w-full mt-24 border-t border-grayScale-600 bg-deep-black text-grayScale-200">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-12 px-6 py-12 md:flex-row">
        <Logo />

        <div>
          <h3 className="mb-4 text-xl ">Links</h3>

          <ul className="space-y-3 text-grayScale-200">
            <li>
              <Link
                href="/"
                className="hover:text-red-cinema transition-colors"
              >
                Em cartazes
              </Link>
            </li>

            <li>
              <Link
                href="/"
                className="hover:text-red-cinema transition-colors"
              >
                Lançamentos
              </Link>
            </li>

            <li>
              <Link
                href="/"
                className="hover:text-red-cinema transition-colors"
              >
                Bomboniere
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xl ">Contatos</h3>

          <ul className="space-y-3 text-grayScale-200">
            <li>(99) 9999-9999</li>
            <li>cineville@contato.com</li>
          </ul>
        </div>

        <div>
          <ul className="space-y-4 text-grayScale-200">
            <li>
              <Link
                href="/"
                className="hover:text-red-cinema transition-colors"
              >
                Políticas de privacidade
              </Link>
            </li>

            <li>
              <Link
                href="/"
                className="hover:text-red-cinema transition-colors"
              >
                Termos de uso
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-red-cinema py-3">
        <p className="text-center text-sm  text-grayScale-200">
          ©CineVille 2026 - Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}
