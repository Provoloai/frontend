import { useState, useCallback } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "@tanstack/react-router";
import { auth } from "@/lib/firebase";
import { getCleanErrorMessage } from "@/utils/firebaseError.util";
import { FORGOT_PASSWORD_CONFIG } from "@/constants/auth";
import type {
  ForgotPasswordFormData,
  ForgotPasswordValidationErrors,
} from "@/types/auth";

export const useForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [success, setSuccess] = useState("");
  const [validationErrors, setValidationErrors] =
    useState<ForgotPasswordValidationErrors>({
      email: "",
    });

  const sendResetEmail = useCallback(
    async (formData: ForgotPasswordFormData) => {
      try {
        setIsLoading(true);
        setError("");

        await sendPasswordResetEmail(auth, formData.email);

        // Use existing success state instead of toast
        setSuccess(FORGOT_PASSWORD_CONFIG.successMessage);
        setEmailSent(true);

        // Navigate to login after a short delay
        setTimeout(() => {
          navigate({ to: "/login" });
        }, FORGOT_PASSWORD_CONFIG.redirectDelay);
      } catch (err: unknown) {
        const error = err as Error;
        setError(getCleanErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  const clearError = useCallback(() => {
    setError("");
  }, []);

  const clearValidationErrors = useCallback(() => {
    setValidationErrors({ email: "" });
  }, []);

  const setValidationError = useCallback(
    (field: keyof ForgotPasswordValidationErrors, message: string) => {
      setValidationErrors(prev => ({ ...prev, [field]: message }));
    },
    []
  );

  const resetState = useCallback(() => {
    setError("");
    setEmailSent(false);
    setSuccess("");
    setValidationErrors({ email: "" });
  }, []);

  return {
    sendResetEmail,
    isLoading,
    error,
    emailSent,
    success,
    validationErrors,
    clearError,
    clearValidationErrors,
    setValidationError,
    resetState,
  };
};
