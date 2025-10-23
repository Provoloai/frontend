// Constants for authentication components
export const LOGIN_CONFIG = {
  title: "Welcome to Provolo",
  emailPlaceholder: "example@mail.com",
  passwordPlaceholder: "**********",
  submitText: "Login",
  loadingText: "Logging in...",
  forgotPasswordText: "Forgot Password?",
  signUpText: "Don't have an account?",
  signUpLinkText: "Sign Up",
} as const;

export const SIGNUP_CONFIG = {
  title: "Create your account",
  emailPlaceholder: "example@mail.com",
  passwordPlaceholder: "**********",
  submitText: "Sign up",
  loadingText: "Signing up...",
  signInText: "Already have an account?",
  signInLinkText: "Sign In",
  consentText: "By signing up, you consent to receive occasional emails from us.",
} as const;

export const PASSWORD_REQUIREMENTS = [
  { key: "minLength", label: "Minimum 8 characters" },
  { key: "hasLetter", label: "At least 1 letter" },
  { key: "hasNumber", label: "At least 1 number" },
  { key: "hasSpecial", label: "At least 1 special character" },
] as const;

export const USERNAME_CONFIG = {
  title: "What should we call you?",
  placeholder: "danielafriheart",
  submitText: "Continue",
  loadingText: "Updating...",
  maxLength: 32,
} as const;

export const RESERVED_USERNAMES = [
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
] as const;

export const FORGOT_PASSWORD_CONFIG = {
  title: "Forgot Password?",
  emailSentTitle: "Email Sent!",
  emailSentSubtitle: "Redirecting you to login...",
  emailPlaceholder: "example@mail.com",
  submitText: "Send Reset Email",
  loadingText: "Sending...",
  emailSentText: "Email Sent",
  successMessage: "Password reset email sent! Check your inbox and spam folder.",
  checkEmailMessage: "Check your email for the password reset link.",
  rememberPasswordText: "Remember your password?",
  signInText: "Sign In",
  redirectDelay: 15000,
} as const;

