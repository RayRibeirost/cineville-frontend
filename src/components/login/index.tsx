"use client";

import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useLoginForm } from "@/src/hooks/useLoginForm";

const EyeIcon = ({ visible }: { visible: boolean }) => {
  const Icon = visible ? FiEye : FiEyeOff;

  return (
    <Icon
      size={20}
      className={`transition-opacity ${
        visible ? "opacity-100" : "opacity-60"
      } text-[#759FFE]`}
    />
  );
};

export default function Login() {
  const {
    formAction,
    isPending,
    state,
    showPassword,
    togglePassword,
    formValues,
    handleChange,
  } = useLoginForm();

  return (
    <form action={formAction} className="space-y-5">
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-300"
        >
          E-mail
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="nome@exemplo.com"
          value={formValues.email || ""}
          onChange={handleChange}
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder:text-gray-500 focus:border-[#759FFE] focus:outline-none"
        />
      </div>

      {/* Senha */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-xs font-semibold uppercase tracking-wider text-gray-300"
          >
            Senha
          </label>

          <Link
            href="/esqueci-senha"
            className="text-xs text-red-500 hover:underline"
          >
            Esqueceu a senha?
          </Link>
        </div>

        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            placeholder="********"
            value={formValues.password || ""}
            onChange={handleChange}
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-4 py-3 pr-12 text-white placeholder:text-gray-500 focus:border-[#759FFE] focus:outline-none"
          />

          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <EyeIcon visible={showPassword} />
          </button>
        </div>
      </div>

      {/* Erro */}
      {state.error && (
        <p className="text-center text-sm font-semibold text-red-500">
          {state.error}
        </p>
      )}

      {/* Botão */}
      <button
        type="submit"
        disabled={isPending}
        className="flex w-full items-center justify-center rounded-md bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Entrando..." : "Entrar →"}
      </button>

      {/* Cadastro */}
      <p className="text-center text-sm text-gray-400">
        Não tem uma conta?{" "}
        <Link
          href="/register"
          className="font-semibold text-red-500 hover:underline"
        >
          Crie agora
        </Link>
      </p>
    </form>
  );
}
