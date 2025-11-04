import { useState, useCallback } from "react";
import { getIdToken, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "@tanstack/react-router";
import { auth } from "@/lib/firebase";
import { authApi } from "@/api";
import { getCleanErrorMessage } from "@/utils/firebaseError.util";

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      try {
        setIsLoading(true);
        setError("");

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        const idToken = await getIdToken(user, true);

        await authApi.login(idToken);
        if (!user?.emailVerified) {
          await authApi.sendVerificationCode()
          navigate({ to: "/verification", replace: true });
        } else {
          navigate({ to: "/optimizer", replace: true });
        }
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

  return {
    signInWithEmail,
    isLoading,
    error,
    clearError,
  };
};
