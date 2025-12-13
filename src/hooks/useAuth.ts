import { useState, useCallback } from "react";
import {
  getIdToken,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
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

        // Always navigate to optimizer - email verification check happens in layout
        navigate({ to: "/optimizer", replace: true });
      } catch (err: unknown) {
        const error = err as Error;
        setError(getCleanErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  const signInWithGoogle = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Reload to ensure we have the latest provider data from Firebase
      await user.reload();
      const idToken = await getIdToken(user, true);

      // Ensure user is signed up in backend
      await authApi.signup(idToken);

      // Sync providers to backend to ensure they are merged, not replaced
      const updatedProviders = user.providerData.map(p => p.providerId);
      await authApi.updateProviders(updatedProviders, idToken);

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

  return {
    signInWithEmail,
    signInWithGoogle,
    isLoading,
    error,
    clearError,
  };
};
