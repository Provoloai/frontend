import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import AuthPanelLeft from "@/components/auth/AuthPanelLeft";
import SignupForm from "@/components/auth/SignupForm";
import VerifyEmailForm from "@/components/auth/VerifyEmailForm";
import ToastProvider from "@/components/knowledgeBase/ToastProvider";
import { useToast } from "@/components/knowledgeBase/useToast";
import { useSignup } from "@/hooks/useSignup";
import { signupSchema } from "@/utils/signupValidation.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SignupFormData } from "@/types/auth";

import { auth } from "@/lib/firebase";

export default function Signup() {
  return (
    <ToastProvider>
      <SignupContent />
    </ToastProvider>
  );
}

function SignupContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const shouldAutoResendOtp = location.hash === "login-auto-resend";

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", password: "" },
    mode: "onTouched",
  });

  const { signUpWithEmail, signUpWithGoogle, isLoading, error, clearError } =
    useSignup();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser && !currentUser.emailVerified) {
      setVerificationEmail(currentUser.email || "");
      setShowVerifyEmail(true);
    }
  }, []);

  const onSubmit = form.handleSubmit(async (data: SignupFormData) => {
    clearError();

    try {
      await signUpWithEmail(data, { navigateOnSuccess: false });
      setVerificationEmail(data.email);
      setShowVerifyEmail(true);
      toast("Verification code sent to your email.", "success");
    } catch {
      // Hook already exposes a clean error message via `error`.
    }
  });

  const handleVerified = async () => {
    await navigate({ to: "/onboarding", replace: true });
  };

  if (showVerifyEmail) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-light px-4 py-10 mobile:px-3">
        <VerifyEmailForm
          email={verificationEmail}
          onVerified={handleVerified}
          onToast={toast}
          autoResendOnMount={shouldAutoResendOtp}
        />
      </main>
    );
  }

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
