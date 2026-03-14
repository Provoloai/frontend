import { z } from "zod";
import { isDisposableEmail } from "./disposableEmails.util";
import type {
  PasswordRequirements,
  SignupValidationErrors,
} from "@/types/auth";

// Zod schema for signup form with disposable email check
export const signupSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  email: z
    .string()
    .email("Enter a valid email address")
    .refine(email => !isDisposableEmail(email), {
      message:
        "Temporary or disposable email addresses are not allowed. Please use a permanent email address.",
    }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/(?=.*[a-zA-Z])/, "Must contain at least one letter")
    .regex(/(?=.*\d)/, "Must contain at least one number")
    .regex(
      /(?=.*[!@#$%^&*(),.?\":{}|<>])/,
      "Must contain at least one special character"
    ),
});

export const checkPasswordRequirements = (
  password: string
): PasswordRequirements => {
  return {
    minLength: password.length >= 8,
    hasLetter: /(?=.*[a-zA-Z])/.test(password),
    hasNumber: /(?=.*\d)/.test(password),
    hasSpecial: /(?=.*[!@#$%^&*(),.?\":{}|<>])/.test(password),
  };
};

export const validateField = (
  name: keyof SignupValidationErrors,
  value: string,
  setValidationError: (
    field: keyof SignupValidationErrors,
    message: string
  ) => void
) => {
  try {
    if (name === "fullName") {
      signupSchema.pick({ fullName: true }).parse({ fullName: value });
      setValidationError(name, "");
    } else if (name === "email") {
      signupSchema.pick({ email: true }).parse({ email: value });
      setValidationError(name, "");
    } else if (name === "password") {
      signupSchema.pick({ password: true }).parse({ password: value });
      setValidationError(name, "");
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      let errorMessage = "Invalid input";

      if (error.issues && error.issues.length > 0 && error.issues[0].message) {
        errorMessage = error.issues[0].message;
      }

      setValidationError(name, errorMessage);
    }
  }
};

export const validateForm = (formData: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const validationResult = signupSchema.safeParse(formData);

  if (!validationResult.success) {
    const errors: SignupValidationErrors = {
      fullName: "",
      email: "",
      password: "",
    };

    validationResult.error?.issues?.forEach(error => {
      const field = error.path[0] as keyof SignupValidationErrors;
      if (field) {
        errors[field] = error.message;
      }
    });

    return { success: false, errors };
  }

  return { success: true, errors: null };
};
