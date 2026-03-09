import { Link } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { LoginFormData } from "@/types/auth";
import { cn } from "@/lib/utils";

type LoginFormProps = {
  form: UseFormReturn<LoginFormData>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  /** API-level error returned after a failed login attempt */
  error: string;
  onGoogleLogin: () => void;
};

const GoogleLoginButton = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) => (
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

const OrDivider = () => (
  <div className="relative py-1">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-[#E5E7EB]" />
    </div>
    <div className="relative flex justify-center text-sm text-secondary">
      <span className="bg-white px-3">or</span>
    </div>
  </div>
);

const ApiErrorBanner = ({ message }: { message: string }) => (
  <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600">
    {message}
  </div>
);

const LoginForm: React.FC<LoginFormProps> = ({
  form,
  onSubmit,
  isLoading,
  error,
  onGoogleLogin,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const emailValue = form.watch("email");
  const passwordValue = form.watch("password");

  const canSubmit =
    !!emailValue &&
    !form.formState.errors.email &&
    !!passwordValue &&
    !isLoading;

  return (
    <section className="flex w-full flex-col justify-center bg-white px-20 tablet:pt-8 tablet:px-10 mobile:px-6">
      <img
        src="/src/assets/v2/svg/logo.svg"
        alt="Provolo"
        className="mb-6 hidden h-8 w-auto self-start tablet:block"
      />

      <h1 className="text-[1.875rem] text-dark">Welcome Back</h1>
      <p className="mt-1 text-sm text-secondary">Lorem ipsum dolor fitsum</p>

      <Form {...form}>
        <form onSubmit={onSubmit} className="mt-7 space-y-6" noValidate>
          <GoogleLoginButton onClick={onGoogleLogin} disabled={isLoading} />

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
                      autoComplete="current-password"
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
              </FormItem>
            )}
          />

          <Button disabled={!canSubmit} className="w-full">
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <div className="space-y-1 text-sm text-secondary">
            <p>
              Forgot password?{" "}
              <Link
                to="/forgot-password"
                className="font-medium text-primary hover:underline"
              >
                Reset it
              </Link>
            </p>
            <p>
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-primary hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </Form>

      {error && <ApiErrorBanner message={error} />}
    </section>
  );
};

export default LoginForm;
