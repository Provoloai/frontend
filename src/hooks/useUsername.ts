import { useState, useCallback, useRef } from "react";
import { updateUserDisplayName, refreshUserSession } from "@/utils/api.util";
import type { UsernameFormData, UsernameValidationErrors } from "@/types/auth";

export const useUsername = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<UsernameValidationErrors>({
    username: "",
  });

  // Ref to prevent race conditions
  const isSubmittingRef = useRef(false);

  const updateUsername = useCallback(async (formData: UsernameFormData) => {
    // Prevent multiple simultaneous submissions
    if (isSubmittingRef.current) {
      return;
    }

    try {
      isSubmittingRef.current = true;
      setIsLoading(true);
      setError("");

      // Update username using the existing utility function
      await updateUserDisplayName(formData.username);

      // Refresh user session to get updated data
      await refreshUserSession();

      // Clear validation errors and redirect
      setValidationErrors({ username: "" });
      window.location.replace("/optimizer");
    } catch (err: unknown) {
      const error = err as Error;
      
      // Simple error handling
      const userFriendlyMessage = error.message.includes("Invalid")
        ? "Please check your username format and try again."
        : error.message.includes("reserved")
        ? "This username is not available. Please choose a different one."
        : error.message.includes("timeout")
        ? "Request timed out. Please check your connection and try again."
        : error.message.includes("Too many")
        ? "Too many attempts. Please wait a moment and try again."
        : "Unable to update username. Please try again.";

      setError(userFriendlyMessage);
    } finally {
      setIsLoading(false);
      isSubmittingRef.current = false;
    }
  }, []);

  const clearError = useCallback(() => {
    setError("");
  }, []);

  const clearValidationErrors = useCallback(() => {
    setValidationErrors({ username: "" });
  }, []);

  const setValidationError = useCallback((field: keyof UsernameValidationErrors, message: string) => {
    setValidationErrors(prev => ({ ...prev, [field]: message }));
  }, []);

  return {
    updateUsername,
    isLoading,
    error,
    validationErrors,
    clearError,
    clearValidationErrors,
    setValidationError,
  };
};
