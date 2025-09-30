import { useState } from "react";
import { confirmPasswordReset } from "firebase/auth";
import { z } from "zod";
import { Check, Key, X } from "lucide-react";
import { auth } from "../../lib/firebase";
import { getCleanErrorMessage } from "../../utils/firebaseError.util";
import Logo from "../../Reusables/Logo";
import TextInputField from "../../Reusables/TextInputField";
import CustomButton from "../../Reusables/CustomButton";
import { useNavigate, useSearch } from "@tanstack/react-router";
import CustomSnackbar from "../../Reusables/CustomSnackbar";

// Zod schema for password validation (same as signup)
const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/(?=.*[a-zA-Z])/, "Must contain at least one letter")
    .regex(/(?=.*\d)/, "Must contain at least one number")
    .regex(/(?=.*[!@#$%^&*(),.?\":{}|<>])/, "Must contain at least one special character"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function ResetPassword() {
  const navigate = useNavigate();
  const search = useSearch({ from: '/_auth/reset-password' });
  const oobCode = search.oobCode; // Changed from token to oobCode
  const mode = search.mode;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [touched, setTouched] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  const checkPasswordRequirements = (password) => {
    return {
      minLength: password.length >= 8,
      hasLetter: /(?=.*[a-zA-Z])/.test(password),
      hasNumber: /(?=.*\d)/.test(password),
      hasSpecial: /(?=.*[!@#$%^&*(),.?\":{}|<>])/.test(password),
    };
  };

  const getRequirementsList = (requirements) => [
    { key: "minLength", label: "Minimum 8 characters", met: requirements.minLength },
    { key: "hasLetter", label: "At least 1 letter", met: requirements.hasLetter },
    { key: "hasNumber", label: "At least 1 number", met: requirements.hasNumber },
    { key: "hasSpecial", label: "At least 1 special character", met: requirements.hasSpecial },
  ];

  const validateField = (name, value) => {
    try {
      if (name === "password") {
        resetPasswordSchema.pick({ password: true }).parse({ password: value });
        setValidationErrors((prev) => ({ ...prev, password: "" }));
      } else if (name === "confirmPassword") {
        // Validate both password and confirmPassword together
        resetPasswordSchema.parse({ password, confirmPassword: value });
        setValidationErrors((prev) => ({ ...prev, confirmPassword: "" }));
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        let errorMessage = "Invalid input";
        
        if (error.errors && error.errors.length > 0 && error.errors[0].message) {
          errorMessage = error.errors[0].message;
        } else if (error.issues && error.issues.length > 0 && error.issues[0].message) {
          errorMessage = error.issues[0].message;
        }
        
        setValidationErrors((prev) => ({
          ...prev,
          [name]: errorMessage,
        }));
      }
    }
  };

  const resetPassword = async (oobCode, newPassword) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // Use oobCode instead of token
      await confirmPasswordReset(auth, oobCode, newPassword);
      setSuccess("Password reset successful! Redirecting to login...");
      
      // Navigate to login after success
      setTimeout(() => {
        navigate({ to: "/login" });
      }, 2000);
    } catch (error) {
      setError(getCleanErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if oobCode exists and mode is correct
    if (!oobCode || mode !== 'resetPassword') {
      setError("Invalid or missing reset code. Please request a new password reset.");
      return;
    }

    // Run form validation
    const validationResult = resetPasswordSchema.safeParse({ password, confirmPassword });

    if (!validationResult.success) {
      const newErrors = {};
      
      validationResult.error?.errors?.forEach((error) => {
        const field = error.path[0];
        newErrors[field] = error.message;
      });
      
      setValidationErrors(newErrors);
      setError("Please fix the errors below");
      return;
    }

    // Clear any previous errors
    setValidationErrors({});
    setError("");

    await resetPassword(oobCode, password);
  };

  const requirements = checkPasswordRequirements(password);
  const requirementsList = getRequirementsList(requirements);

  // Show error if no oobCode or wrong mode
  if (!oobCode || mode !== 'resetPassword') {
    return (
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
        <Logo />
        <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-white p-10 mt-10 rounded-md border">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">Invalid Reset Link</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
          </div>
          <div className="mt-6">
            <CustomButton 
              onClick={() => navigate({ to: "/forgot-password" })}
              className="bg-red-600 hover:bg-red-500 transition-all duration-300"
            >
              Request New Reset Link
            </CustomButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
      <Logo />
      <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-white p-10 mt-10 rounded-md border">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            {success ? "Password Reset!" : "Reset Your Password"}
          </h2>
          {success && (
            <p className="mt-2 text-center text-sm text-gray-600">
              Redirecting you to login...
            </p>
          )}
        </div>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            {/* New Password Field */}
            <div>
              <div className="mt-2">
                <TextInputField
                  id="password"
                  name="password"
                  required
                  type="password"
                  value={password}
                  autoComplete="new-password"
                  label="New Password"
                  placeholder="**********"
                  iconStart={<Key size={20} />}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validateField("password", e.target.value);
                  }}
                  onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                  touched={touched.password || validationErrors.password}
                  error={validationErrors.password}
                  disabled={loading}
                />

                {/* Password Requirements */}
                <div className="mt-3 flex flex-wrap gap-2 items-center">
                  {requirementsList.map((requirement) => (
                    <div key={requirement.key} className={`flex items-center gap-1 h-full px-1.5 py-1 rounded ${requirement.met ? "bg-green-100" : "bg-gray-100"}`}>
                      {requirement.met ? <Check size={14} className="text-green-600" /> : <X size={14} className="text-gray-500" />}
                      <span className={`text-xs font-medium ${requirement.met ? "text-green-600" : "text-gray-500"}`}>{requirement.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <div className="mt-2">
                <TextInputField
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  type="password"
                  value={confirmPassword}
                  autoComplete="new-password"
                  label="Confirm New Password"
                  placeholder="**********"
                  iconStart={<Key size={20} />}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    validateField("confirmPassword", e.target.value);
                  }}
                  onBlur={() => setTouched((prev) => ({ ...prev, confirmPassword: true }))}
                  touched={touched.confirmPassword || validationErrors.confirmPassword}
                  error={validationErrors.confirmPassword}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <CustomButton 
                type="submit" 
                disabled={loading} 
                className="bg-red-600 hover:bg-red-500 transition-all duration-300"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </CustomButton>
            </div>
          </form>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">
              Your password has been successfully reset.
            </p>
          </div>
        )}
      </div>
      
      {error && (
        <CustomSnackbar open={error} snackbarColor={"danger"} snackbarMessage={error} />
      )}
    </div>
  );
}