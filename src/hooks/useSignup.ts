import { useState, useCallback } from "react";
import { createUserWithEmailAndPassword, getIdToken } from "firebase/auth";
import { useNavigate } from "@tanstack/react-router";
import { auth } from "@/lib/firebase";
import { authApi } from "@/api";
import { getCleanErrorMessage } from "@/utils/firebaseError.util";
import type { SignupFormData, SignupValidationErrors } from "@/types/auth";

export const useSignup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<SignupValidationErrors>({
    email: "",
    password: "",
  });

  const signUpWithEmail = useCallback(async (formData: SignupFormData) => {
    try {
      setIsLoading(true);
      setError("");
      
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      const idToken = await getIdToken(user, true);
      
      await authApi.signup(idToken);
      navigate({ to: "/optimizer", replace: true });
    } catch (err: unknown) {
      const error = err as Error;
      setError(getCleanErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const clearError = useCallback(() => {
    setError("");
  }, []);

  const clearValidationErrors = useCallback(() => {
    setValidationErrors({ email: "", password: "" });
  }, []);

  const setValidationError = useCallback((field: keyof SignupValidationErrors, message: string) => {
    setValidationErrors(prev => ({ ...prev, [field]: message }));
  }, []);

  return {
    signUpWithEmail,
    isLoading,
    error,
    validationErrors,
    clearError,
    clearValidationErrors,
    setValidationError,
  };
};
