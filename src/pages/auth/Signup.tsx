import desktopLogo from "@/assets/v2/svg/desktop-logo.svg";
import authIllustration from "@/assets/v2/img/auth.png";
import SignupForm from "@/components/auth/SignupForm";
import { useSignup } from "@/hooks/useSignup";
import { signupSchema } from "@/utils/signupValidation.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import type { SignupFormData } from "@/types/auth";

const list = [
  "One centralized career knowledge base",
  "AI-generated resumes and cover letters",
  "Apply to Upwork and global jobs in minutes",
];

export default function Signup() {
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const { signUpWithEmail, signUpWithGoogle, isLoading, error, clearError } =
    useSignup();

  const onSubmit = form.handleSubmit(async (data: SignupFormData) => {
    clearError();
    await signUpWithEmail(data);
  });

  return (
    <main className="grid grid-cols-2 tablet:grid-cols-1">
      <section className="flex flex-col justify-between bg-blueBackground p-12 laptop:p-10 tablet:hidden min-h-dvh">
        <div>
          <img src={desktopLogo} alt="Provolo" className="h-8 w-auto" />

          <h2 className="mt-6 font-heading text-4xl text-dark">
            Your AI Career Engine
          </h2>
          <p className="mt-5 text-lg text-secondary">
            Provolo turns your experience into a living knowledge base that
            automatically generates tailored resumes, cover letters, and
            optimized applications.
          </p>

          <ul className="mt-5 space-y-1">
            {list.map(item => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-dark"
              >
                <CircleCheck className="size-5 text-primary" />

                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Illustration */}
        <img
          src={authIllustration}
          alt="Auth illustration"
          className="mt-10 w-full rounded-xl object-contain"
        />
      </section>

      {/* ── Right panel — form ── */}
      <SignupForm
        form={form}
        onSubmit={onSubmit}
        isLoading={isLoading}
        error={error}
        onGoogleSignup={signUpWithGoogle}
        // onErrorClose={clearError}
      />
      {/* </div> */}
    </main>
  );
}
