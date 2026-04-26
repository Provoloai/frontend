import { useState, useCallback } from "react";
import {
  GoogleAuthProvider,
  linkWithPopup,
  EmailAuthProvider,
  linkWithCredential,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { authApi } from "@/api";
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

      // Reload user to get fresh provider data
      await auth.currentUser.reload();
      const newToken = await auth.currentUser.getIdToken(true);

      // Re-login to establish fresh backend session
      console.log("Re-authenticating with backend...");
      await authApi.login(newToken);

      // Sync providers to backend
      const updatedProviders = auth.currentUser.providerData.map(
        p => p.providerId
      );
      console.log("Syncing providers to backend:", updatedProviders);
      await authApi.updateProviders(updatedProviders);

      const { data: freshUser } = await refetch();
      if (!freshUser) {
        setError("Security update: Please log in again to continue.");
        return;
      }
      setSuccessMessage("Google account linked successfully!");
    } catch (err: unknown) {
      const error = err as Error;
      if (error.message.includes("credential-already-in-use")) {
        setError("This Google account is already linked to another user.");
      } else {
        setError("Security update: Please log in again to continue.");
      }
    } finally {
      setLoading(false);
    }
  }, [refetch, clearMessages]);

  const setPassword = useCallback(
    async (password: string) => {
      if (!auth.currentUser || !auth.currentUser.email) return;
      setLoading(true);
      clearMessages();
      try {
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email,
          password
        );
        console.log("Created credential for:", auth.currentUser.email);

        const userCred = await linkWithCredential(auth.currentUser, credential);
        console.log("Successfully linked credential. User:", userCred.user);
        console.log("Provider Data after link:", userCred.user.providerData);

        // Reload user to get fresh provider data
        await auth.currentUser.reload();
        const newToken = await auth.currentUser.getIdToken(true);

        // Re-login to establish fresh backend session
        console.log("Re-authenticating with backend...");
        await authApi.login(newToken);

        // Sync providers to backend
        const updatedProviders = auth.currentUser.providerData.map(
          p => p.providerId
        );
        console.log("Syncing providers to backend:", updatedProviders);
        await authApi.updateProviders(updatedProviders);

        const { data: freshUser } = await refetch();
        if (!freshUser) {
          setError("Security update: Please log in again to continue.");
          return;
        }
        setSuccessMessage(
          "Password set successfully! You can now login with email and password."
        );
      } catch (err: unknown) {
        const error = err as Error;
        console.error("Error linking credential:", error);

        if (error.message.includes("credential-already-in-use")) {
          setError("This email is already linked to another account.");
        } else {
          setError("Security update: Please log in again to continue.");
        }
      } finally {
        setLoading(false);
      }
    },
    [refetch, clearMessages]
  );

  return {
    linkGoogle,
    setPassword,
    loading,
    error,
    successMessage,
    clearMessages,
  };
};
