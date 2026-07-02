import AuthLayout from "../AuthLayout";
import ResetPasswordPage from "@/src/components/resetPassword";

export default function LoginPage() {
  return (
    <AuthLayout title="Redefinir Senha">
      <ResetPasswordPage />
    </AuthLayout>
  );
}
