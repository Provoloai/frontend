import { Link } from "@tanstack/react-router";
import { CircleCheck, Eye, EyeOff, Info, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PASSWORD_REQUIREMENTS } from "@/constants/auth";
import { checkPasswordRequirements } from "@/utils/signupValidation.util";
import type { SignupFormData } from "@/types/auth";
import { cn } from "@/lib/utils";

type SignupFormProps = {
  form: UseFormReturn<SignupFormData>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  /** API-level error returned after a failed signup attempt */
  error: string;
  onGoogleSignup: () => void;
};

const GoogleSignupButton = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#f9fafb] px-5 py-3 text-base font-medium text-secondary transition hover:bg-light disabled:cursor-not-allowed disabled:opacity-60"
    >
      <FcGoogle size={18} />
      Continue with Google
    </button>
  );
};

const OrDivider = () => {
  return (
    <div className="relative py-1">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[#E5E7EB]" />
      </div>
      <div className="relative flex justify-center text-sm text-secondary">
        <span className="bg-white px-3">or</span>
      </div>
    </div>
  );
};

const PasswordRequirements = ({
  requirements,
}: {
  requirements: ReturnType<typeof checkPasswordRequirements>;
}) => {
  return (
    <ul className="space-y-3 rounded-[0.75rem] border border-[#e5e7eb] bg-[#f9fafb] p-4">
      {PASSWORD_REQUIREMENTS.map(req => {
        const isMet = requirements[req.key];
        return (
          <li key={req.key} className="flex items-center gap-2">
            {isMet ? (
              <CircleCheck size={14} className="shrink-0 text-[#007A55]" />
            ) : (
              <Info size={14} className="shrink-0 text-dark" />
            )}
            <span
              className={cn("text-sm text-secondary", isMet && "line-through")}
            >
              {req.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

const ApiErrorBanner = ({ message }: { message: string }) => {
  return (
    <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600">
      {message}
    </div>
  );
};

const SignupForm: React.FC<SignupFormProps> = ({
  form,
  onSubmit,
  isLoading,
  error,
  onGoogleSignup,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const passwordValue = form.watch("password");
  const emailValue = form.watch("email");

  const passwordRequirements = checkPasswordRequirements(passwordValue);
  const allPasswordRequirementsMet =
    Object.values(passwordRequirements).every(Boolean);
  const isEmailValid = !!emailValue && !form.formState.errors.email;

  const canSubmit = isEmailValid && allPasswordRequirementsMet && !isLoading;

  return (
    <section className="flex w-full flex-col justify-center bg-white px-20 tablet:pt-8 tablet:px-10 mobile:px-6">
      <img
        src="/src/assets/v2/svg/logo.svg"
        alt="Provolo"
        className="mb-6 hidden h-8 w-auto tablet:block self-start"
      />

      <h1 className="text-[1.875rem] text-dark">Welcome to Provolo</h1>
      <p className="mt-1 text-sm text-secondary">Lorem ipsum dolor fitsum</p>

      <Form {...form}>
        <form onSubmit={onSubmit} className="mt-7 space-y-6" noValidate>
          <GoogleSignupButton onClick={onGoogleSignup} disabled={isLoading} />

          <OrDivider />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Mail
                      size={16}
                      className={cn(
                        "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transition-colors",
                        isEmailFocused ? "text-primary" : "text-secondary"
                      )}
                    />
                    <Input
                      {...field}
                      type="email"
                      autoComplete="email"
                      placeholder="Email address"
                      className="pl-9"
                      onFocus={() => setIsEmailFocused(true)}
                      onBlur={() => {
                        setIsEmailFocused(false);
                        field.onBlur();
                      }}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Lock
                      size={16}
                      className={cn(
                        "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transition-colors",
                        isPasswordFocused ? "text-primary" : "text-secondary"
                      )}
                    />
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Password"
                      className="pl-9 pr-9"
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => {
                        setIsPasswordFocused(false);
                        field.onBlur();
                      }}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary transition hover:text-dark"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </FormControl>

                {isPasswordFocused && (
                  <PasswordRequirements requirements={passwordRequirements} />
                )}
              </FormItem>
            )}
          />

          <Button disabled={!canSubmit} className="w-full">
            {isLoading ? "Signing up..." : "Sign Up"}
          </Button>

          <p className="text-sm text-secondary">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </Form>

      {error && <ApiErrorBanner message={error} />}
    </section>
  );
};

export default SignupForm;
