import { type UseFormReturn } from "react-hook-form";
import { motion } from "motion/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import isURL from "validator/es/lib/isURL";
import {
  v2ContainerVariants,
  v2ItemVariants,
  v2Spring,
} from "@/constants/v2Motion";
import type { OnboardingPortfolioFormData } from "@/types/auth";

type OnboardingPortfolioFormProps = {
  form: UseFormReturn<OnboardingPortfolioFormData>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  error: string;
};

const UrlInput = ({
  value,
  onChange,
  onBlur,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  disabled: boolean;
}) => (
  <div className="flex overflow-hidden rounded-lg border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
    <span className="flex items-center border-r border-[#E5E7EB] bg-[#F3F4F6] px-3 text-sm text-secondary select-none">
      https://
    </span>
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={onBlur}
      disabled={disabled}
      placeholder="name@company.com"
      className="flex-1 bg-[#F9FAFB] px-3 py-2.5 text-sm text-dark placeholder:text-gray-400 outline-none disabled:cursor-not-allowed disabled:opacity-50"
      autoComplete="url"
      autoFocus
    />
  </div>
);

const ApiErrorBanner = ({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0, y: -6 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600"
  >
    {message}
  </motion.div>
);

export default function OnboardingPortfolioForm({
  form,
  onSubmit,
  isLoading,
  error,
}: OnboardingPortfolioFormProps) {
  const portfolioUrl = form.watch("portfolioUrl");
  const isValidUrl =
    !!portfolioUrl &&
    isURL(portfolioUrl, {
      require_protocol: false,
      require_tld: true,
      allow_underscores: true,
    });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={v2ContainerVariants}
      className="w-full max-w-[36rem] rounded-3xl bg-white p-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.10),_0_1px_2px_-1px_rgba(0,0,0,0.10)] mobile:rounded-none mobile:shadow-none mobile:p-6"
    >
      <motion.h1
        variants={v2ItemVariants}
        className="mb-1 text-[1.875rem] font-semibold text-dark"
      >
        Where can I learn about your work?
      </motion.h1>
      <motion.p
        variants={v2ItemVariants}
        className="mb-8 text-base text-secondary"
      >
        Enter the link to your portfolio or any of your public profile like
        LinkedIn, GitHub, Twitter, etc.
      </motion.p>

      <Form {...form}>
        <motion.form
          variants={v2ContainerVariants}
          onSubmit={onSubmit}
          noValidate
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="portfolioUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <motion.div variants={v2ItemVariants}>
                    <UrlInput
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      disabled={isLoading}
                    />
                  </motion.div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {error && <ApiErrorBanner message={error} />}

          <motion.div
            variants={v2ItemVariants}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.985 }}
            transition={v2Spring}
          >
            <Button
              type="submit"
              disabled={!isValidUrl || isLoading}
              className="w-full rounded-xl"
            >
              {isLoading ? "Saving..." : "Next"}
            </Button>
          </motion.div>
        </motion.form>
      </Form>

      <motion.div variants={v2ItemVariants} className="mt-4 text-center">
        <Link
          to="/optimizer"
          className="text-sm text-primary hover:underline font-medium"
        >
          Skip for now
        </Link>
      </motion.div>
    </motion.div>
  );
}
