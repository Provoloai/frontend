import { useState, useCallback } from "react";
import ForgotPasswordLayout from "@/old-components/auth/ForgotPasswordLayout";
import ForgotPasswordForm from "@/old-components/auth/ForgotPasswordForm";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import { validateForgotPasswordField, validateForgotPasswordForm } from "@/utils/forgotPasswordValidation.util";
import type { ForgotPasswordFormData, ForgotPasswordTouchedFields } from "@/types/auth";
import AuthLayout from "@/old-components/auth/AuthLayout";

const ForgotPassword = () => {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: "",
  });
  const [touched, setTouched] = useState<ForgotPasswordTouchedFields>({
    email: false,
  });

  const {
    sendResetEmail,
    isLoading,
    error,
    emailSent,
    success,
    validationErrors,
    setValidationError,
  } = useForgotPassword();

  const handleInputChange = useCallback((field: keyof ForgotPasswordFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateForgotPasswordField(field, value, setValidationError);
  }, [setValidationError]);

  const handleBlur = useCallback((field: keyof ForgotPasswordTouchedFields) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // Run form validation
    const validationResult = validateForgotPasswordForm(formData);

    if (!validationResult.success) {
      setTouched({ email: true });
      return;
    }

    // Clear any previous errors
    setTouched({ email: true });
    await sendResetEmail(formData);
  }, [formData, sendResetEmail]);

  return (
    <AuthLayout>
      <ForgotPasswordForm
        formData={formData}
        touched={touched}
        validationErrors={validationErrors}
        isLoading={isLoading}
        error={error}
        emailSent={emailSent}
        success={success}
        onInputChange={handleInputChange}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
      />
    </AuthLayout>
  );
};

export default ForgotPassword;
