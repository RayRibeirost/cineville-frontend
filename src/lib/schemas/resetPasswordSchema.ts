import * as v from "valibot";

export const resetPasswordSchema = v.pipe(
  v.object({
    token: v.string(),
    code: v.pipe(v.string(), v.nonEmpty("Informe o código de verificação.")),
    password: v.pipe(
      v.string(),
      v.minLength(8, "A senha deve ter no mínimo 8 caracteres."),
    ),
    confirmPassword: v.string(),
  }),
  v.forward(
    v.check(
      (input) => input.password === input.confirmPassword,
      "As senhas não coincidem.",
    ),
    ["confirmPassword"],
  ),
);
