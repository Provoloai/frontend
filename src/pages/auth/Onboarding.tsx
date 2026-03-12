import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import isURL from "validator/es/lib/isURL";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import OnboardingPortfolioForm from "@/components/auth/OnboardingPortfolioForm";
import type { OnboardingPortfolioFormData } from "@/types/auth";
import { v2ItemVariants, v2PageVariants } from "@/constants/v2Motion";
import desktopLogo from "/src/assets/v2/svg/desktop-logo.svg";

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

// TODO: replace with real user data from session
const PLACEHOLDER_USER = {
  displayName: "Jeese Leos",
  email: "name@flowbite.com",
};

export default function Onboarding() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<OnboardingPortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: { portfolioUrl: "" },
    mode: "onSubmit",
  });

  const onSubmit = form.handleSubmit(
    async (data: OnboardingPortfolioFormData) => {
      setError("");
      setIsLoading(true);
      // TODO: wire up authApi.updateProfile
      console.log("Onboarding submitted:", data);
      setIsLoading(false);
    }
  );

  const { displayName, email } = PLACEHOLDER_USER;
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
