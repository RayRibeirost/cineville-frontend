"use server";

import { parse, InferInput } from "valibot";
import { resetPasswordSchema } from "../lib/schemas/resetPasswordSchema";
import { ResetPasswordState } from "../types/forgotPassword";

type ResetPasswordInput = InferInput<typeof resetPasswordSchema>;

export async function resetPassword(
  prevState: ResetPasswordState<Partial<ResetPasswordInput>>,
  formData: FormData,
): Promise<ResetPasswordState<Partial<ResetPasswordInput>>> {
  const rawData = {
    token: formData.get("token"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  } as Partial<ResetPasswordInput>;

  try {
    const validData = parse(resetPasswordSchema, rawData);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validData),
        cache: "no-store",
      },
    );

    let apiData;

    try {
      apiData = await response.json();
    } catch {
      return {
        success: false,
        message: "Erro de comunicação com o servidor.",
        inputs: rawData,
      };
    }

    if (!response.ok) {
      return {
        success: false,
        message: apiData.message,
        inputs: rawData,
        errors: apiData.errors,
      };
    }

    return {
      success: true,
      message: apiData.message,
      inputs: {},
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
      inputs: rawData,
    };
  }
}
