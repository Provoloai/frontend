import { z } from "zod";
import { RESERVED_USERNAMES } from "@/constants/auth";
import type { UsernameValidationErrors } from "@/types/auth";

// Zod schema for username validation
export const usernameSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(32, "Username must be no more than 32 characters")
    .regex(/^[a-zA-Z0-9_\- ]+$/, "Username can only contain letters, numbers, underscores, hyphens, and spaces")
    .refine((username) => !/^[_-]|[_-]$/.test(username), {
      message: "Username cannot start or end with underscore or hyphen",
    })
    .refine((username) => !/_{2,}|-{2,}/.test(username), {
      message: "Username cannot contain consecutive underscores or hyphens",
    })
    .refine((username) => !RESERVED_USERNAMES.includes(username.toLowerCase() as any), {
      message: "This username is reserved and cannot be used",
    }),
});

export const sanitizeUsername = (username: string): string => {
  return username.trim().replace(/[<>"'&]/g, "");
};

export const validateUsername = (
  username: string,
  setValidationError: (field: keyof UsernameValidationErrors, message: string) => void
) => {
  const sanitized = sanitizeUsername(username);
  
  try {
    usernameSchema.pick({ username: true }).parse({ username: sanitized });
    setValidationError("username", "");
  } catch (error) {
    if (error instanceof z.ZodError) {
      let errorMessage = "Invalid username";

      if (error.issues && error.issues.length > 0 && error.issues[0].message) {
        errorMessage = error.issues[0].message;
      }

      setValidationError("username", errorMessage);
    }
  }
};

export const validateUsernameForm = (formData: { username: string }) => {
  const validationResult = usernameSchema.safeParse(formData);
  
  if (!validationResult.success) {
    const errors: UsernameValidationErrors = { username: "" };
    
    validationResult.error?.issues?.forEach((error) => {
      const field = error.path[0] as keyof UsernameValidationErrors;
      if (field) {
        errors[field] = error.message;
      }
    });
    
    return { success: false, errors };
  }
  
  return { success: true, errors: null };
};
