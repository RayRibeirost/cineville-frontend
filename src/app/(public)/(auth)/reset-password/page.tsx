import AuthLayout from "../AuthLayout";
import ResetPassword from "@/src/components/resetPassword";

export default function ResetPasswordPage() {
  return (
    <AuthLayout title="Redefinir Senha">
      <ResetPassword />
    </AuthLayout>
  );
}
