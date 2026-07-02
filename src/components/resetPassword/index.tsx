"use client";

import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/src/actions/resetPasswordActions";
import { ResetPasswordState } from "@/src/types/forgotPassword";
import { InferInput } from "valibot";
import { resetPasswordSchema } from "@/src/lib/schemas/resetPasswordSchema";

type ResetPasswordInput = InferInput<typeof resetPasswordSchema>;

const initialState: ResetPasswordState<Partial<ResetPasswordInput>> = {
  success: false,
  message: "",
  inputs: {
    token: "",
    password: "",
    confirmPassword: "",
  },
};

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token") ?? "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [state, action, pending] = useActionState(resetPassword, initialState);

  return (
    <>
      <form action={action} className="space-y-5">
        <input type="hidden" name="token" value={token} />

        <div>
          <label className="mb-2 block text-xs uppercase tracking-wide text-zinc-400">
            Nova senha
          </label>

          <div className="flex items-center rounded-md border border-zinc-700 bg-zinc-800 px-3">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              defaultValue={state.inputs.password}
              className="w-full bg-transparent py-3 text-white outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Eye size={20} className="text-zinc-400" />
            </button>
          </div>

          {state.errors?.password && (
            <p className="mt-1 text-xs text-red-500">
              {state.errors.password[0]}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-xs uppercase tracking-wide text-zinc-400">
            Confirmar nova senha
          </label>

          <div className="flex items-center rounded-md border border-zinc-700 bg-zinc-800 px-3">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              defaultValue={state.inputs.confirmPassword}
              className="w-full bg-transparent py-3 text-white outline-none"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Eye size={20} className="text-zinc-400" />
            </button>
          </div>

          {state.errors?.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">
              {state.errors.confirmPassword[0]}
            </p>
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
          className="w-full rounded-md bg-red-600 py-3 text-lg font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Redefinindo..." : "Redefinir Senha"}
        </button>
      </form>

      <Link
        href="/login"
        className="mt-8 flex items-center justify-center gap-2 text-sm text-zinc-400 transition hover:text-white"
      >
        <ArrowLeft size={18} />
        Voltar para login
      </Link>
    </>
  );
}
