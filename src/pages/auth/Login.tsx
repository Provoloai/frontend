import AuthPanelLeft from "@/components/auth/AuthPanelLeft";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema } from "@/utils/loginValidation.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { LoginFormData } from "@/types/auth";

export default function Login() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const { signInWithEmail, signInWithGoogle, isLoading, error, clearError } =
    useAuth();

  const onSubmit = form.handleSubmit(async (data: LoginFormData) => {
    clearError();
    await signInWithEmail(data.email, data.password);
  });

  return (
    <main className="grid grid-cols-2 tablet:grid-cols-1">
      <AuthPanelLeft />

      <LoginForm
        form={form}
        onSubmit={onSubmit}
        isLoading={isLoading}
        error={error}
        onGoogleLogin={signInWithGoogle}
      />
    </main>
  );
}
