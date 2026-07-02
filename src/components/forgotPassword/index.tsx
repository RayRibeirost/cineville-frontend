"use client";

import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { useActionState } from "react";
import { forgotPassword } from "@/src/actions/forgotPasswordActions";

const initialState = {
  success: false,
  message: "",
  inputs: {
    email: "",
  },
};

export default function ForgotPassword() {
  const [state, action, pending] = useActionState(forgotPassword, initialState);

  return (
    <>
      <form action={action} className="mt-8 space-y-6">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400"
          >
            E-mail
          </label>

          <div className="flex items-center rounded-md border border-zinc-700 bg-zinc-800 px-3">
            <Mail size={18} className="text-zinc-500" />

            <input
              id="email"
              name="email"
              type="email"
              defaultValue={state.inputs?.email}
              placeholder="nome@exemplo.com"
              className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
            />
          </div>

          {state.errors?.email && (
            <span className="mt-1 block text-xs text-red-500">
              {state.errors.email[0]}
            </span>
          )}
        </div>

        {state.message && (
          <p
            className={`text-center text-sm ${
              state.success ? "text-green-500" : "text-red-500"
            }`}
          >
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-md bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Enviando..." : "Enviar link"}
        </button>
      </form>

      <Link
        href="/login"
        className="mt-6 flex items-center justify-center gap-2 text-sm text-zinc-400 transition hover:text-white"
      >
        <ArrowLeft size={16} />
        Voltar para login
      </Link>
    </>
  );
}
