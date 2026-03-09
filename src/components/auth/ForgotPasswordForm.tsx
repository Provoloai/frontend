import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ForgotPasswordFormData } from "@/types/auth";
import { cn } from "@/lib/utils";
import logo from "/src/assets/v2/svg/logo.svg";

type ForgotPasswordFormProps = {
  form: UseFormReturn<ForgotPasswordFormData>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  error: string;
  emailSent: boolean;
  sentToEmail: string;
  onResend: () => void;
};

const ProvoloIcon = ({
  variant = "default",
}: {
  variant?: "default" | "sent";
}) => (
  <div className="mb-5">
    {variant === "sent" ? (
      <div className=" flex size-12 items-center justify-center rounded-full bg-blueBackground">
        <Mail className="text-primary size-6" />
      </div>
    ) : (
      <img src={logo} alt="Provolo" />
    )}
  </div>
);

const ApiErrorBanner = ({ message }: { message: string }) => (
  <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600">
    {message}
  </div>
);

const FormView = ({
  form,
  onSubmit,
  isLoading,
  error,
}: Pick<
  ForgotPasswordFormProps,
  "form" | "onSubmit" | "isLoading" | "error"
>) => {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const emailValue = form.watch("email");
  const canSubmit = !!emailValue && !form.formState.errors.email && !isLoading;

  return (
    <>
      <ProvoloIcon variant="default" />

      <h1 className="text-[1.875rem] font-semibold text-dark">
        Forgot Password
      </h1>
      <p className=" text-sm text-secondary">
        No worries! Enter the email address associated with this account and
        we&apos;ll send you a link to reset your password.
      </p>

      <Form {...form}>
        <form onSubmit={onSubmit} className="mt-6 space-y-6" noValidate>
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

          <Button disabled={!canSubmit} className="w-full">
            {isLoading ? "Sending..." : "Get reset link"}
          </Button>
        </form>
      </Form>

      {error && <ApiErrorBanner message={error} />}

      <p className="mt-4 text-sm text-secondary">
        Remember password?{" "}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Login
        </Link>
      </p>
    </>
  );
};

const EmailSentView = ({
  sentToEmail,
  onResend,
}: Pick<ForgotPasswordFormProps, "sentToEmail" | "onResend">) => (
  <>
    <ProvoloIcon variant="sent" />

    <h1 className="text-[1.875rem] font-semibold text-dark">
      Check your email
    </h1>
    <p className=" text-secondary">
      We&apos;ve sent you a password reset link at{" "}
      <span className="font-semibold text-dark">{sentToEmail}</span>. Check your
      inbox and follow the instructions to reset your password.
    </p>

    <div className="mt-6 rounded-[0.75rem] border border-[#bed8ff] bg-blueBackground px-4 py-5  text-[#1C398E]">
      <span className="font-semibold">Note:</span> The link will expire in 1
      hour. If you didn&apos;t receive any email, check your spam folder.
    </div>

    <a
      href="mailto:"
      className="mt-6 flex w-full items-center justify-center rounded-lg bg-primary px-5 py-3 text-base font-medium text-white transition hover:bg-primary/90"
    >
      Open email app
    </a>

    <div className="mt-4 space-y-4 text-sm text-secondary">
      <p>
        Didn&apos;t receive code?{" "}
        <button
          type="button"
          onClick={onResend}
          className="font-medium text-primary hover:underline"
        >
          Resend
        </button>
      </p>
      <p>
        Remember password?{" "}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  </>
);

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  form,
  onSubmit,
  isLoading,
  error,
  emailSent,
  sentToEmail,
  onResend,
}) => {
  return (
    <div className="w-full max-w-[36rem] rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
      {emailSent ? (
        <EmailSentView sentToEmail={sentToEmail} onResend={onResend} />
      ) : (
        <FormView
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  );
};

export default ForgotPasswordForm;
