import { useState, useCallback } from "react";
import UsernameDialog from "@/old-components/auth/UsernameDialog";
import UsernameForm from "@/old-components/auth/UsernameForm";
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
    const limited = value.substring(0, 32);
    
    setFormData(prev => ({ ...prev, [field]: limited }));
    validateUsername(limited, setValidationError);
  }, [setValidationError]);

  const handleBlur = useCallback((field: keyof UsernameTouchedFields) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (validationErrors.username || !formData.username) {
      setTouched({ username: true });
      return;
    }
    const sanitized = sanitizeUsername(formData.username);
    updateUsername({ username: sanitized });
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
