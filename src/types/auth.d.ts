// Types for authentication components
export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginTouchedFields {
  email: boolean;
  password: boolean;
}

export interface SignupFormData {
  email: string;
  password: string;
}

export interface SignupTouchedFields {
  email: boolean;
  password: boolean;
}

export interface SignupValidationErrors {
  email: string;
  password: string;
}

export interface PasswordRequirements {
  minLength: boolean;
  hasLetter: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

export interface RequirementItem {
  key: keyof PasswordRequirements;
  label: string;
  met: boolean;
}

export interface LoginState {
  formData: LoginFormData;
  isLoading: boolean;
  error: string;
  touched: LoginTouchedFields;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
}

export interface AuthApiResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    email: string;
    displayName?: string;
  };
}

export interface LoginFormProps {
  formData: LoginFormData;
  touched: LoginTouchedFields;
  isLoading: boolean;
  error: string;
  onInputChange: (field: keyof LoginFormData, value: string) => void;
  onBlur: (field: keyof LoginTouchedFields) => void;
  onSubmit: (e: React.FormEvent) => void;
  onErrorClose: () => void;
  onGoogleSignIn: () => void;
}

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export interface SignupFormProps {
  formData: SignupFormData;
  touched: SignupTouchedFields;
  validationErrors: SignupValidationErrors;
  isLoading: boolean;
  error: string;
  requirements: PasswordRequirements;
  onInputChange: (field: keyof SignupFormData, value: string) => void;
  onBlur: (field: keyof SignupTouchedFields) => void;
  onSubmit: (e: React.FormEvent) => void;
  onErrorClose: () => void;
}

export interface SignupLayoutProps {
  children: React.ReactNode;
}

export interface UsernameFormData {
  username: string;
}

export interface UsernameTouchedFields {
  username: boolean;
}

export interface UsernameValidationErrors {
  username: string;
}

export interface UsernameFormProps {
  formData: UsernameFormData;
  touched: UsernameTouchedFields;
  validationErrors: UsernameValidationErrors;
  isLoading: boolean;
  error: string;
  onInputChange: (field: keyof UsernameFormData, value: string) => void;
  onBlur: (field: keyof UsernameTouchedFields) => void;
  onSubmit: () => void;
}

export interface UsernameDialogProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ForgotPasswordTouchedFields {
  email: boolean;
}

export interface ForgotPasswordValidationErrors {
  email: string;
}

export interface ForgotPasswordFormProps {
  formData: ForgotPasswordFormData;
  touched: ForgotPasswordTouchedFields;
  validationErrors: ForgotPasswordValidationErrors;
  isLoading: boolean;
  error: string;
  emailSent: boolean;
  success: string;
  onInputChange: (field: keyof ForgotPasswordFormData, value: string) => void;
  onBlur: (field: keyof ForgotPasswordTouchedFields) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export interface ForgotPasswordLayoutProps {
  children: React.ReactNode;
}

export interface OnboardingPortfolioFormData {
  portfolioUrl: string;
}
