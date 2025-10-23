import { z } from "zod";
import type { ForgotPasswordValidationErrors } from "@/types/auth";

// Zod schema for forgot password validation
export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export const validateForgotPasswordField = (
  field: keyof ForgotPasswordValidationErrors,
  value: string,
  setValidationError: (field: keyof ForgotPasswordValidationErrors, message: string) => void
) => {
  try {
    if (field === "email") {
      forgotPasswordSchema.pick({ email: true }).parse({ email: value });
      setValidationError("email", "");
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      let errorMessage = "Invalid input";

      if (error.issues && error.issues.length > 0 && error.issues[0].message) {
        errorMessage = error.issues[0].message;
      }

      setValidationError("email", errorMessage);
    }
  }
};

export const validateForgotPasswordForm = (formData: { email: string }) => {
  const validationResult = forgotPasswordSchema.safeParse(formData);
  
  if (!validationResult.success) {
    const errors: ForgotPasswordValidationErrors = { email: "" };
    
    validationResult.error?.issues?.forEach((error) => {
      const field = error.path[0] as keyof ForgotPasswordValidationErrors;
      if (field) {
        errors[field] = error.message;
      }
    });
    
    return { success: false, errors };
  }
  
  return { success: true, errors: null };
};
