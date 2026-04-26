import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import isURL from "validator/es/lib/isURL";
import { motion } from "motion/react";
import { ChevronDown, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import OnboardingPortfolioForm from "@/components/auth/OnboardingPortfolioForm";
import type { OnboardingPortfolioFormData } from "@/types/auth";
import { v2ItemVariants, v2PageVariants } from "@/constants/v2Motion";
import desktopLogo from "/src/assets/v2/svg/desktop-logo.svg";
import { auth } from "@/lib/firebase";
import { authApi } from "@/api";
import { useNavigate } from "@tanstack/react-router";
import { getCleanErrorMessage } from "@/utils/firebaseError.util";

const portfolioSchema = z.object({
  portfolioUrl: z
    .string()
    .min(1, "Please enter a URL")
    .refine(
      val =>
        isURL(val, {
          require_protocol: false,
          require_tld: true,
          allow_underscores: true,
        }),
      { message: "Enter a valid URL" }
    ),
});

export default function Onboarding() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState<{
    displayName: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserProfile({
          displayName: user.displayName || "New User",
          email: user.email || "",
        });
      } else {
        // If not logged in, they shouldn't be on the onboarding screen
        navigate({ to: "/login", replace: true });
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const form = useForm<OnboardingPortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: { portfolioUrl: "" },
    mode: "onSubmit",
  });

  const onSubmit = form.handleSubmit(
    async (data: OnboardingPortfolioFormData) => {
      setError("");
      setIsLoading(true);
      try {
        const rawPortfolioUrl = data.portfolioUrl.trim();
        const portfolioLinkWithProtocol = /^https?:\/\//i.test(rawPortfolioUrl)
          ? rawPortfolioUrl
          : `https://${rawPortfolioUrl}`;

        await authApi.updateProfile({
          portfolio_link: portfolioLinkWithProtocol,
        });
        navigate({ to: "/optimizer", replace: true });
      } catch (err: unknown) {
        const _err = err as Error;
        setError(getCleanErrorMessage(_err));
      } finally {
        setIsLoading(false);
      }
    }
  );

  if (!userProfile) {
    return (
      <div className="flex h-dvh w-full items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  const { displayName, email } = userProfile;
  const initials = displayName
    .split(" ")
    .map(n => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={v2PageVariants}
      className="flex min-h-dvh flex-col bg-gray-50"
    >
      {/* Top header bar */}
      <motion.header
        variants={v2ItemVariants}
        className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4 mobile:px-4"
      >
        {/* Logo */}
        <img src={desktopLogo} alt="Provolo" className="h-7" />

        {/* User info */}
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary text-xs font-semibold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col leading-tight mobile:hidden">
            <span className="font-medium text-dark">{displayName}</span>
            <span className="text-sm text-secondary">{email}</span>
          </div>
          <ChevronDown size={16} className="text-secondary mobile:hidden" />
        </div>
      </motion.header>

      {/* Centered card */}
      <motion.main
        variants={v2ItemVariants}
        className="flex flex-1 items-center justify-center px-4 py-12 mobile:p-0 mobile:items-start"
      >
        <OnboardingPortfolioForm
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading}
          error={error}
        />
      </motion.main>
    </motion.div>
  );
}
