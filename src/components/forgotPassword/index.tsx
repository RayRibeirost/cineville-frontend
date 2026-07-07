"use client";

import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { useActionState } from "react";
import { forgotPassword } from "@/src/actions/forgotPasswordActions";
import Button from "@/src/components/ui/Button";
import InputForm from "../ui/InputForm";

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
            className="mb-2 block text-xs font-medium uppercase tracking-wide text-grayScale-400"
          >
            E-mail
          </label>

          <div className="flex items-center rounded-md border border-grayScale-600 bg-grayScale-700 px-3 focus:border-red-cinema transition-all">
            <Mail size={18} className="text-red-cinema" />

            <InputForm
              id="email"
              name="email"
              type="email"
              defaultValue={state.inputs?.email}
              placeholder="nome@exemplo.com"
              hasIcon={true}
            />
          </div>

          {state.errors?.email && (
            <span className="mt-1 block text-xs text-red-cinema">
              {state.errors.email[0]}
            </span>
          )}
        </div>

        {state.message && (
          <p
            className={`text-center text-sm ${
              state.success ? "text-sucess" : "text-error"
            }`}
          >
            {state.message}
          </p>
        )}

        <Button
          type="submit"
          disabled={pending}
          className="w-full rounded-md bg-red-cinema py-3 font-semibold text-grayScale-200 transition hover:bg-red-cinema disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Enviando..." : "Enviar link"}
        </Button>
      </form>

      <Link
        href="/login"
        className="mt-6 flex items-center justify-center gap-2 text-sm text-grayScale-400 transition hover:text-grayScale-200"
      >
        <ArrowLeft size={16} />
        Voltar para login
      </Link>
    </>
  );
}
