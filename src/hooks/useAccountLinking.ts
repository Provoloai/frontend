import { useState, useCallback } from "react";
import {
  GoogleAuthProvider,
  linkWithPopup,
  updatePassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getCleanErrorMessage } from "@/utils/firebaseError.util";
import useSession from "./useSession";

export const useAccountLinking = () => {
  const { refetch } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const clearMessages = useCallback(() => {
    setError("");
    setSuccessMessage("");
  }, []);

  const linkGoogle = useCallback(async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    clearMessages();
    try {
      const provider = new GoogleAuthProvider();
      await linkWithPopup(auth.currentUser, provider);
      await refetch(); // Refresh session to get updated providers
      setSuccessMessage("Google account linked successfully!");
    } catch (err: unknown) {
      const error = err as Error;
      setError(getCleanErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [refetch, clearMessages]);

  const setPassword = useCallback(async (password: string) => {
    if (!auth.currentUser) return;
    setLoading(true);
    clearMessages();
    try {
      await updatePassword(auth.currentUser, password);
      await refetch();
      setSuccessMessage("Password set successfully! You can now login with email and password.");
    } catch (err: unknown) {
      const error = err as Error;
      // If requires re-auth (unlikely for fresh session but possible)
      if (error.message.includes("requires-recent-login")) {
         setError("For security, please logout and login again to set a password.");
      } else {
         setError(getCleanErrorMessage(error));
      }
    } finally {
      setLoading(false);
    }
  }, [refetch, clearMessages]);

  return {
    linkGoogle,
    setPassword,
    loading,
    error,
    successMessage,
    clearMessages,
  };
};
