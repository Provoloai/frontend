import { useState, useCallback } from "react";
import { useSignup } from "@/hooks/useSignup";
import { checkPasswordRequirements, validateField, validateForm } from "@/utils/signupValidation.util";
import type { SignupFormData, SignupTouchedFields, PasswordRequirements } from "@/types/auth";
import SignupForm from "@/components/auth/SignupForm";
import SignupLayout from "@/components/auth/SignupLayout";

export default function Signup() {
  // Form state
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState<SignupTouchedFields>({
    email: false,
    password: false,
  });

  // Signup hook
  const {
    signUpWithEmail,
    isLoading,
    error,
    validationErrors,
    clearError,
    clearValidationErrors,
    setValidationError,
  } = useSignup();

  // Password requirements
  const requirements: PasswordRequirements = checkPasswordRequirements(formData.password);

  // Event handlers
  const handleInputChange = useCallback((field: keyof SignupFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validate field on change
    validateField(field, value, setValidationError);
  }, [setValidationError]);

  const handleBlur = useCallback((field: keyof SignupTouchedFields) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // Run form validation
    const validationResult = validateForm(formData);

    if (!validationResult.success) {
      setValidationError("email", validationResult.errors?.email || "");
      setValidationError("password", validationResult.errors?.password || "");
      return;
    }

    // Clear any previous errors
    clearValidationErrors();
    clearError();

    await signUpWithEmail(formData);
  }, [formData, signUpWithEmail, setValidationError, clearValidationErrors, clearError]);

  return (
    <SignupLayout>
      <SignupForm
        formData={formData}
        touched={touched}
        validationErrors={validationErrors}
        isLoading={isLoading}
        error={error}
        requirements={requirements}
        onInputChange={handleInputChange}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
        onErrorClose={clearError}
      />
    </SignupLayout>
  );
}