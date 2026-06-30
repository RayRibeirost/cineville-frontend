import Login from "@/src/components/login";

import AuthLayout from "../AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Bem vindo ao Cineville"
      subtitle="Entre para acessar sua conta e continuar sua experiência."
    >
      <Login />
    </AuthLayout>
  );
}
