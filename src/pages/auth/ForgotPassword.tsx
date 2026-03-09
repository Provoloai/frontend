import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import { forgotPasswordSchema } from "@/utils/forgotPasswordValidation.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import type { ForgotPasswordFormData } from "@/types/auth";

export default function ForgotPassword() {
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
    mode: "onTouched",
  });

  const { sendResetEmail, isLoading, error, emailSent, resetState } =
    useForgotPassword();

  // Keep a ref to the submitted email so we can show it in the success view
  const sentToEmailRef = useRef("");

  const onSubmit = form.handleSubmit(async (data: ForgotPasswordFormData) => {
    sentToEmailRef.current = data.email;
    await sendResetEmail(data);
  });

  const handleResend = () => {
    resetState();
    // Keep the email value so the user can just hit submit again
    form.reset({ email: sentToEmailRef.current });
  };

  return (
    <main className="flex min-h-dvh items-center justify-center bg-light px-4 py-12">
      <ForgotPasswordForm
        form={form}
        onSubmit={onSubmit}
        isLoading={isLoading}
        error={error}
        emailSent={emailSent}
        sentToEmail={sentToEmailRef.current}
        onResend={handleResend}
      />
    </main>
  );
}
