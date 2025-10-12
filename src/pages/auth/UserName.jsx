import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { AtSign, Sparkles } from "lucide-react";
import CustomButton from "../../Reusables/CustomButton";
import TextInputField from "../../Reusables/TextInputField";
import {
  updateUserDisplayName,
  refreshUserSession,
} from "../../utils/api.util";

export default function UserName() {
  const [open] = useState(true);
  const [username, setUsername] = useState("");
  const [touched, setTouched] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Ref to prevent race conditions
  const isSubmittingRef = useRef(false);

  // Secure username validation function with debouncing
  const validateField = useCallback(
    (fieldName, value) => {
      const errors = { ...validationErrors };

      if (fieldName === "username") {
        // Sanitize input first
        const sanitizedValue = value.trim().replace(/[<>"'&]/g, "");

        if (!sanitizedValue) {
          errors.username = "Username is required";
        } else if (sanitizedValue.length < 3) {
          errors.username = "Username must be at least 3 characters";
        } else if (sanitizedValue.length > 32) {
          errors.username = "Username must be no more than 32 characters";
        } else if (!/^[a-zA-Z0-9_\- ]+$/.test(sanitizedValue)) {
          errors.username =
            "Username can only contain letters, numbers, underscores, hyphens, and spaces";
        } else if (/^[_-]|[_-]$/.test(sanitizedValue)) {
          errors.username =
            "Username cannot start or end with underscore or hyphen";
        } else if (/_{2,}|-{2,}/.test(sanitizedValue)) {
          errors.username =
            "Username cannot contain consecutive underscores or hyphens";
        } else {
          // Check for reserved usernames
          const reservedUsernames = [
            "admin",
            "root",
            "api",
            "www",
            "mail",
            "ftp",
            "support",
            "help",
            "test",
            "demo",
          ];
          if (reservedUsernames.includes(sanitizedValue.toLowerCase())) {
            errors.username = "This username is reserved and cannot be used";
          } else {
            delete errors.username;
          }
        }
      }

      setValidationErrors(errors);
    },
    [validationErrors]
  );

  // Simple username update handler
  const handleContinue = useCallback(async () => {
    // Prevent multiple simultaneous submissions
    if (isSubmittingRef.current) {
      return;
    }

    // Sanitize and validate username before submitting
    const sanitizedUsername = username.trim().replace(/[<>"'&]/g, "");
    validateField("username", sanitizedUsername);

    if (validationErrors.username || !sanitizedUsername) {
      setTouched({ username: true });
      return;
    }

    try {
      isSubmittingRef.current = true;
      setLoading(true);
      setError("");

      // Update username
      await updateUserDisplayName(sanitizedUsername);

      // Refresh user session to get updated data
      await refreshUserSession();

      // Clear validation errors and redirect
      setValidationErrors({});
      window.location.replace("/optimizer");
    } catch (error) {
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
      setLoading(false);
      isSubmittingRef.current = false;
    }
  }, [username, validationErrors, validateField]);

  // Simple cleanup function
  const cleanup = useCallback(() => {
    isSubmittingRef.current = false;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return (
    <div>
      <Dialog open={open} onClose={() => {}} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="text-center">
                  <div className="w-full flex items-center flex-col">
                    <div className=" flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-50 sm:mx-0 sm:size-10 text-primary">
                      <Sparkles />
                    </div>
                  </div>

                  <div className="text-center sm:mt-0 sm:text-left w-full">
                    <DialogTitle
                      as="h3"
                      className="text-2xl/9 font-medium tracking-tight text-gray-900 text-center mt-4"
                    >
                      What should we call you?
                    </DialogTitle>

                    {error && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}

                    <div className="my-5">
                      <TextInputField
                        id="username"
                        name="username"
                        required
                        autoComplete="username"
                        value={username}
                        iconStart={<AtSign size={20} />}
                        onChange={(e) => {
                          // Limit input length and sanitize in real-time
                          const sanitized = e.target.value
                            .replace(/[<>"'&]/g, "")
                            .substring(0, 32);
                          setUsername(sanitized);
                          validateField("username", sanitized);
                        }}
                        onBlur={() =>
                          setTouched((prev) => ({ ...prev, username: true }))
                        }
                        type="text"
                        label="Username"
                        placeholder="john doe"
                        touched={touched.username}
                        error={validationErrors.username}
                        maxLength={32}
                        pattern="[a-zA-Z0-9_\- ]+"
                        title="Username can only contain letters, numbers, underscores, hyphens, and spaces"
                      />
                    </div>

                    <CustomButton
                      onClick={handleContinue}
                      type="submit"
                      className="btn-primary text-sm"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Continue"}
                    </CustomButton>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
