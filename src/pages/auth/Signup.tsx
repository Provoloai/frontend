import AuthPanelLeft from "@/components/auth/AuthPanelLeft";
import SignupForm from "@/components/auth/SignupForm";
import { useSignup } from "@/hooks/useSignup";
import { signupSchema } from "@/utils/signupValidation.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SignupFormData } from "@/types/auth";

export default function Signup() {
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const { signUpWithEmail, signUpWithGoogle, isLoading, error, clearError } =
    useSignup();

  const onSubmit = form.handleSubmit(async (data: SignupFormData) => {
    clearError();
    await signUpWithEmail(data);
  });

  return (
    <main className="grid grid-cols-2 tablet:grid-cols-1">
      <AuthPanelLeft />

      <SignupForm
        form={form}
        onSubmit={onSubmit}
        isLoading={isLoading}
        error={error}
        onGoogleSignup={signUpWithGoogle}
      />
    </main>
  );
}
