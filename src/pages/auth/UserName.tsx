import { useState, useCallback } from "react";
import UsernameDialog from "@/components/auth/UsernameDialog";
import UsernameForm from "@/components/auth/UsernameForm";
import { useUsername } from "@/hooks/useUsername";
import { validateUsername, sanitizeUsername } from "@/utils/usernameValidation.util";
import type { UsernameFormData, UsernameTouchedFields } from "@/types/auth";

export default function UserName() {
  const [formData, setFormData] = useState<UsernameFormData>({
    username: "",
  });
  const [touched, setTouched] = useState<UsernameTouchedFields>({
    username: false,
  });

  const {
    updateUsername,
    isLoading,
    error,
    validationErrors,
    setValidationError,
  } = useUsername();

  const handleInputChange = useCallback((field: keyof UsernameFormData, value: string) => {
    // Limit input length and sanitize in real-time
    const sanitized = sanitizeUsername(value).substring(0, 32);
    
    setFormData(prev => ({ ...prev, [field]: sanitized }));
    validateUsername(sanitized, setValidationError);
  }, [setValidationError]);

  const handleBlur = useCallback((field: keyof UsernameTouchedFields) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (validationErrors.username || !formData.username) {
      setTouched({ username: true });
      return;
    }
    updateUsername(formData);
  }, [formData, validationErrors.username, updateUsername]);

  return (
    <div>
      <UsernameDialog isOpen={true}>
        <UsernameForm
          formData={formData}
          touched={touched}
          validationErrors={validationErrors}
          isLoading={isLoading}
          error={error}
          onInputChange={handleInputChange}
          onBlur={handleBlur}
          onSubmit={handleSubmit}
        />
      </UsernameDialog>
    </div>
  );
}
