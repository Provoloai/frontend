import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import { proSubscription } from "@/server/checkout";
import { fetchTiers } from "@/server/tiers";
import useSession from "@/hooks/useSession";
import { useState, useMemo } from "react";
import {
  Loader2,
  Zap,
  Target,
  Star,
  Award,
  Search,
  MessageSquare,
  FileText,
  BarChart3,
  Lightbulb,
  Crown,
  Sparkles,
  Globe,
  Asterisk,
  Check,
} from "lucide-react";
import type { PricingTier, PricingFeature } from "@/types/pricing";

// Icon mapping for different feature types
const getFeatureIcon = (featureName: string) => {
  const name = featureName.toLowerCase();

  if (name.includes("profile") || name.includes("optimization")) return Target;
  if (name.includes("proposal") || name.includes("application")) return FileText;
  if (name.includes("search") || name.includes("seo")) return Search;
  if (name.includes("support") || name.includes("help")) return MessageSquare;
  if (name.includes("analytics") || name.includes("insight")) return BarChart3;
  if (name.includes("premium") || name.includes("advanced")) return Crown;
  if (name.includes("unlimited") || name.includes("infinite")) return Infinity;
  if (name.includes("priority") || name.includes("fast")) return Zap;
  if (name.includes("ai") || name.includes("smart")) return Sparkles;
  if (name.includes("templates") || name.includes("examples")) return Lightbulb;
  if (name.includes("branding") || name.includes("custom")) return Award;
  if (name.includes("global") || name.includes("international")) return Globe;

  // Default icons for common features
  return Star;
};

// Enhanced Skeleton Components
const SkeletonBox = ({ className = "", delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={`bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] rounded-xl ${className}`}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{
      opacity: 1,
      scale: 1,
      backgroundPosition: ["200% 0", "-200% 0"],
    }}
    transition={{
      opacity: { duration: 0.4, delay },
      scale: { duration: 0.3, delay, ease: "easeOut" },
      backgroundPosition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear",
        delay,
      },
    }}
  />
);

const PricingSkeleton = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-24 sm:py-32 lg:px-8 bg-gray-50 w-full">
      <motion.div
        className="mx-auto max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Skeleton */}
        <motion.div className="space-y-6 mb-16" variants={cardVariants}>
          <SkeletonBox className="h-12 w-80 mx-auto" delay={0} />
          <SkeletonBox className="h-6 w-96 mx-auto" delay={0.1} />
        </motion.div>

        {/* Pricing Cards Skeleton */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
        >
          {[0, 1].map((index) => (
            <motion.div
              key={index}
              className={`${index === 1
                ? "bg-slate-900 shadow-2xl ring-1 ring-slate-800"
                : "bg-white/80 shadow-lg ring-1 ring-slate-200"
                } rounded-3xl p-8 sm:p-10`}
              variants={cardVariants}
            >
              <div className="space-y-6">
                {/* Plan Name */}
                <SkeletonBox
                  className={`h-7 w-32 ${index === 1 ? "bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600" : ""
                    }`}
                  delay={0.2 + index * 0.1}
                />

                {/* Price */}
                <div className="flex items-center gap-x-2">
                  <SkeletonBox
                    className={`h-16 w-28 ${index === 1
                      ? "bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600"
                      : ""
                      }`}
                    delay={0.3 + index * 0.1}
                  />
                  <SkeletonBox
                    className={`h-8 w-16 ${index === 1
                      ? "bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700"
                      : ""
                      }`}
                    delay={0.35 + index * 0.1}
                  />
                </div>

                {/* Description */}
                <SkeletonBox
                  className={`h-5 w-full ${index === 1 ? "bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600" : ""
                    }`}
                  delay={0.4 + index * 0.1}
                />

                {/* Features List */}
                <div className="space-y-4 pt-4">
                  {[0, 1, 2, 3, 4].map((featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <SkeletonBox
                        className={`h-5 w-5 rounded-full ${index === 1
                          ? "bg-gradient-to-r from-slate-400 via-slate-300 to-slate-400"
                          : "bg-gradient-to-r from-slate-500 via-slate-400 to-slate-500"
                          }`}
                        delay={0.5 + index * 0.1 + featureIndex * 0.05}
                      />
                      <SkeletonBox
                        className={`h-4 ${featureIndex % 3 === 0 ? "w-40" : featureIndex % 3 === 1 ? "w-32" : "w-36"
                          } ${index === 1
                            ? "bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600"
                            : ""
                          }`}
                        delay={0.52 + index * 0.1 + featureIndex * 0.05}
                      />
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <SkeletonBox
                  className={`h-12 w-full mt-8 ${index === 1
                    ? "bg-gradient-to-r from-slate-500 via-slate-400 to-slate-500"
                    : "bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300"
                    }`}
                  delay={0.7 + index * 0.1}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};





// Transform backend tier to UI format
const transformTierForUI = (tier: any): PricingTier => ({
  ...tier,
  id: tier.slug,
  priceMonthly: `$${(tier.price / 100).toFixed(2)}`,
  featured: tier.price > 0,
  href: "#",
});

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Pricing() {
  const {
    data: tiers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payment-tiers"],
    queryFn: fetchTiers,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  
  // const displayTiers = useMemo(() => (tiers ? tiers.map(transformTierForUI) : []), [tiers]);
  const displayTiers = useMemo(() => {
    if (!tiers) return [];

    // Group tiers by their name (base product)
    const tierGroups = tiers.reduce((acc: Record<string, any[]>, tier: any) => {
      const baseName = tier.name; // use name directly since it's consistent
      if (!acc[baseName]) acc[baseName] = [];
      acc[baseName].push(tier);
      return acc;
    }, {});

    // Pick tier based on billing period using recurringInterval
    return Object.values(tierGroups).map((group: any[]) => {
      const selectedTier =
        group.find(t =>
          billingPeriod === "monthly"
            ? t.recurringInterval === "monthly"
            : t.recurringInterval === "yearly"
        ) || group[0];

      return transformTierForUI(selectedTier);
    });
  }, [tiers, billingPeriod]);

  // console.log('All tiers from backend:', tiers);
  // console.log('Display tiers:', displayTiers);


  const { user } = useSession();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState("");
  // const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  const checkout = async (polarRefId: string) => {
    setCheckoutLoading(true);
    setSubscriptionError("");
    try {
      const paymentUrl = await proSubscription(polarRefId, user as any);
      if (paymentUrl) window.location.href = paymentUrl;
    } catch (error) {
      console.error("Subscription error:", error);
      setSubscriptionError(
        "An error occurred during subscription. Please try again, if persists, contact support."
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Show enhanced loading state
  if (isLoading || !user) {
    return <PricingSkeleton />;
  }

  // Show error state
  if (error) {
    return (
      <motion.div
        className="flex-1 overflow-y-auto px-6 py-24 sm:py-32 lg:px-8 bg-gray-50 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h2 className="text-base text-red-600 font-semibold">Error</h2>
            <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Failed to load pricing plans
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Please refresh the page or try again later.
            </p>
            <div className="mt-10">
              <motion.button
                onClick={() => window.location.reload()}
                className="rounded-full bg-primary px-10 py-3 text-sm text-white shadow-sm hover:bg-primary/80 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Try Again
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Show empty state
  if (!displayTiers || displayTiers.length === 0) {
    return (
      <motion.div
        className="px-6 py-24 sm:py-32 lg:px-8 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold text-primary">Pricing</h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            No pricing plans available
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Please check back later for our pricing plans.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex-1 flex flex-col overflow-y-auto px-6 py-20 lg:px-8 bg-gray-50 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h2 className="text-3xl font-medium mb-3 text-center gap-3"
        >
          Upgrade your plan
        </h2>
        <p className="text-gray-400">
          Need more capabilities for your Freelance business?
        </p>

        {/* Billing Period Toggle */}
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="relative flex bg-slate-100 rounded-full p-1">
            <motion.div
              className="absolute top-1 bottom-1 bg-white rounded-full shadow-sm"
              animate={{
                left: billingPeriod === "monthly" ? "0.25rem" : "50%",
                right: billingPeriod === "monthly" ? "50%" : "0.25rem",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={classNames(
                "relative z-10 px-6 py-2 text-sm font-normal rounded-full transition-colors duration-200",
                billingPeriod === "monthly"
                  ? "text-gray-600"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("annual")}
              className={classNames(
                "relative z-10 px-6 py-2 text-sm font-normal rounded-full transition-colors duration-200",
                billingPeriod === "annual"
                  ? "text-gray-600"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Annually
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {subscriptionError && (
            <motion.div
              className="mt-4 text-center min-h-[32px]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-red-600 font-bold text-lg">{subscriptionError}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {displayTiers.map((tier, tierIdx) => {
          const IconComponent = getFeatureIcon(tier.name);

          // Compute inherited and new features
          let inherited: string | null = null;
          let newFeatures: PricingFeature[] = tier.features;
          if (tierIdx > 0) {
            const prevTier = displayTiers[tierIdx - 1];
            const prevSlugs = new Set(prevTier.features.map((f: PricingFeature) => f.slug));
            newFeatures = tier.features.filter((f: PricingFeature) => !prevSlugs.has(f.slug));
            inherited = prevTier.name;
          }

          return (
            <motion.div
              key={tier.id}
              className={classNames(
                tier.featured ? "relative bg-gray-900 shadow-2xl" : "bg-white/60 sm:mx-8 lg:mx-0",
                tier.featured
                  ? ""
                  : tierIdx === 0
                    ? "rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl"
                    : "sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none",
                "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10"
              )}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.3 + tierIdx * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
            >
              {/* Best Offer Badge */}
              <AnimatePresence>
                {tier.featured && billingPeriod === "annual" && (
                  <motion.div
                    className="absolute -top-3.5 right-10 -translate-x-1/2"
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <span className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5">
                      <Crown className="h-3 w-3" />
                      Save 10%
                    </span>
                  </motion.div>
                )}

              </AnimatePresence>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={classNames(
                    tier.featured ? "bg-white/10" : "bg-primary/10",
                    "p-2 rounded-lg"
                  )}
                >
                  {typeof IconComponent === 'function' ? (
                    <IconComponent
                      className={classNames(
                        tier.featured ? "text-indigo-200" : "text-primary",
                        "h-5 w-5"
                      )}
                    />
                  ) : (
                    <Asterisk
                      className={classNames(
                        tier.featured ? "text-indigo-200" : "text-primary",
                        "h-5 w-5"
                      )}
                    />
                  )}
                </div>
                <h3
                  className={classNames(
                    tier.featured ? "text-white" : "text-black",
                    "text-sm"
                  )}
                >
                  {tier.name}
                </h3>
              </div>

              <p className="mt-4 flex items-center gap-x-2">
                <span
                  className={classNames(
                    tier.featured ? "text-white" : "text-gray-900",
                    "text-4xl tracking-tight"
                  )}
                >
                  {tier.priceMonthly}
                </span>
                <span
                  className={classNames(
                    tier.featured ? "text-gray-400" : "text-gray-500",
                    "text-xs leading-none capitalize"
                  )}
                >
                  USD /<br /> {billingPeriod === "monthly" ? "month" : "year"}
                </span>
              </p>

              <p
                className={classNames(
                  tier.featured ? "text-gray-300" : "text-gray-600",
                  "mt-6 text-sm"
                )}
              >
                {tier.description}
              </p>

              <ul
                role="list"
                className={classNames(
                  tier.featured ? "text-gray-300" : "text-gray-600",
                  "mt-8 space-y-3 text-sm sm:mt-10"
                )}
              >
                {inherited && (
                  <li className="font-semibold mb-2 flex items-center gap-x-5">
                    <div
                      className={classNames(
                        tier.featured ? "bg-gray-100/20" : "bg-gray-100",
                        "p-1 rounded-md"
                      )}
                    >
                      <Check
                        className={classNames(
                          tier.featured ? "text-gray-100" : "text-primary",
                          "h-3 w-3"
                        )}
                      />
                    </div>
                    <span>All features from {inherited}</span>
                  </li>
                )}
                {newFeatures.map((feature: PricingFeature, index: number) => {
                  const FeatureIcon = getFeatureIcon(feature.name);
                  return (
                    <motion.li
                      key={feature.name}
                      className="flex gap-x-5 items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.5 + tierIdx * 0.1 + index * 0.05,
                        ease: "easeOut",
                      }}
                    >
                      <div
                        className={classNames(
                          tier.featured ? "bg-gray-100/20" : "bg-gray-100",
                          "p-1 rounded-md"
                        )}
                      >
                        {typeof FeatureIcon === 'function' ? (
                          <FeatureIcon
                            className={classNames(
                              tier.featured ? "text-gray-100" : "text-primary",
                              "h-3 w-3"
                            )}
                          />
                        ) : (
                          <Check
                            className={classNames(
                              tier.featured ? "text-gray-100" : "text-primary",
                              "h-3 w-3"
                            )}
                          />
                        )}
                      </div>

                      <span>{feature.name}</span>
                    </motion.li>
                  );
                })}
              </ul>

              {/* CTA Button */}
              <div className="mt-8 sm:mt-10">
                {tier.id === "starter" ? (
                  user?.tierId === tier.id ? (
                    <motion.span
                      className={classNames(
                        tier.featured
                          ? "bg-indigo-600/20 text-indigo-200 ring-1 ring-inset ring-indigo-500/30"
                          : "text-indigo-700 ring-1 ring-indigo-200 ring-inset",
                        "block rounded-md px-3.5 py-2.5 text-center text-sm  cursor-default"
                      )}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + tierIdx * 0.1 }}
                    >
                      Current plan
                    </motion.span>
                  ) : null
                ) : user?.tierId === tier.id ? (
                  <motion.span
                    className={classNames(
                      tier.featured
                        ? "bg-indigo-600/20 text-indigo-200 ring-1 ring-inset ring-indigo-500/30"
                        : "text-indigo-700 ring-1 ring-indigo-200 ring-inset",
                      "block rounded-md px-3.5 py-2.5 text-center text-sm cursor-default"
                    )}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + tierIdx * 0.1 }}
                  >
                    Current plan
                  </motion.span>
                ) : (
                  <motion.button
                    onClick={() => checkout(tier.polarRefId)}
                    className={classNames(
                      tier.featured
                        ? "bg-indigo-500 text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-indigo-500"
                        : "text-indigo-600 ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300 focus-visible:outline-indigo-600",
                      "block rounded-md px-3.5 py-2.5 text-center text-sm focus-visible:outline-2 focus-visible:outline-offset-2 w-full transition-all duration-200"
                    )}
                    disabled={checkoutLoading}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + tierIdx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {checkoutLoading ? <Loader2 className="animate-spin h-4 w-4" /> : null}
                      Upgrade Plan
                    </span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}