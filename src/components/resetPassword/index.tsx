"use client";

import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/src/actions/resetPasswordActions";
import { ResetPasswordState } from "@/src/types/forgotPassword";
import { InferInput } from "valibot";
import { resetPasswordSchema } from "@/src/lib/schemas/resetPasswordSchema";
import InputForm from "../ui/InputForm";
import Button from "../ui/Button";

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

export default function ResetPassword() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token") ?? "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [state, action, pending] = useActionState(resetPassword, initialState);

  return (
    <>
      <form autoComplete="off" action={action} className="space-y-5">
        {/* Código enviado por e-mail */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-grayScale-300">
            Código de verificação
          </label>

          <InputForm
            type="text"
            name="token"
            defaultValue={state.inputs.token || token}
            placeholder="Digite o código recebido por e-mail"
          />

          {state.errors?.token && (
            <p className="mt-1 text-xs text-error">{state.errors.token[0]}</p>
          )}
        </div>

        {/* Nova senha */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-grayScale-300">
            Nova senha
          </label>

          <div className="flex items-center rounded-md border border-grayScale-600 bg-grayScale-700 pr-3">
            <InputForm
              type={showPassword ? "text" : "password"}
              name="password"
              defaultValue={state.inputs.password}
              placeholder="Digite sua nova senha"
              hasIcon={true}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Eye size={20} className="text-grayScale-400" />
            </button>
          </div>

          {state.errors?.password && (
            <p className="mt-1 text-xs text-red-cinema">
              {state.errors.password[0]}
            </p>
          )}
        </div>

        {/* Confirmar senha */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-grayScale-300">
            Confirmar nova senha
          </label>

          <div className="flex items-center rounded-md border border-grayScale-600 bg-grayScale-700 pr-3">
            <InputForm
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              defaultValue={state.inputs.confirmPassword}
              placeholder="Digite novamente sua nova senha"
              hasIcon={true}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Eye size={20} className="text-grayScale-400" />
            </button>
          </div>

          {state.errors?.confirmPassword && (
            <p className="mt-1 text-xs text-red-cinema">
              {state.errors.confirmPassword[0]}
            </p>
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
          className="w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Redefinindo..." : "Redefinir Senha"}
        </Button>
      </form>

      <Link
        href="/login"
        className="mt-8 flex items-center justify-center gap-2 text-sm text-grayScale-400 transition hover:text-grayScale-200"
      >
        <ArrowLeft size={18} />
        Voltar para login
      </Link>
    </>
  );
}
