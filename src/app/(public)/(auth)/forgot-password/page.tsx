import ForgotPassword from "@/src/components/forgotPassword";

import AuthLayout from "../AuthLayout";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Recuperar senha"
      subtitle="Insira seu email cadastrado na plataforma
para recuperar sua senha."
    >
      <ForgotPassword />
    </AuthLayout>
  );
}
