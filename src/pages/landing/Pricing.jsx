import { useQuery } from "@tanstack/react-query";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import { listCustomer, proSubscription } from "../../server/checkout";
import { fetchTiers } from "../../server/tiers";
import useSession from "../../hooks/useSession";
import { useState, useMemo } from "react";
import {
  Loader2,
  Check,
  Zap,
  Target,
  Users,
  TrendingUp,
  Shield,
  Clock,
  Star,
  Rocket,
  Award,
  Search,
  MessageSquare,
  FileText,
  BarChart3,
  Lightbulb,
  Crown,
  Sparkles,
  Globe,
} from "lucide-react";
import { useEffect } from "react";

// Icon mapping for different feature types
const getFeatureIcon = (featureName) => {
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
const SkeletonBox = ({ className = "", delay = 0 }) => (
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
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  useEffect(() => {
    listCustomer();
  }, []);

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
              className={`${
                index === 1
                  ? "bg-slate-900 shadow-2xl ring-1 ring-slate-800"
                  : "bg-white/80 shadow-lg ring-1 ring-slate-200"
              } rounded-3xl p-8 sm:p-10`}
              variants={cardVariants}
            >
              <div className="space-y-6">
                {/* Plan Name */}
                <SkeletonBox
                  className={`h-7 w-32 ${index === 1 ? "bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600" : ""}`}
                  delay={0.2 + index * 0.1}
                />

                {/* Price */}
                <div className="flex items-center gap-x-2">
                  <SkeletonBox
                    className={`h-16 w-28 ${index === 1 ? "bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600" : ""}`}
                    delay={0.3 + index * 0.1}
                  />
                  <SkeletonBox
                    className={`h-8 w-16 ${index === 1 ? "bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700" : ""}`}
                    delay={0.35 + index * 0.1}
                  />
                </div>

                {/* Description */}
                <SkeletonBox
                  className={`h-5 w-full ${index === 1 ? "bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600" : ""}`}
                  delay={0.4 + index * 0.1}
                />

                {/* Features List */}
                <div className="space-y-4 pt-4">
                  {[0, 1, 2, 3, 4].map((featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <SkeletonBox
                        className={`h-5 w-5 rounded-full ${index === 1 ? "bg-gradient-to-r from-blue-400 via-indigo-300 to-indigo-400" : "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500"}`}
                        delay={0.5 + index * 0.1 + featureIndex * 0.05}
                      />
                      <SkeletonBox
                        className={`h-4 ${
                          featureIndex % 3 === 0 ? "w-40" : featureIndex % 3 === 1 ? "w-32" : "w-36"
                        } ${index === 1 ? "bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600" : ""}`}
                        delay={0.52 + index * 0.1 + featureIndex * 0.05}
                      />
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <SkeletonBox
                  className={`h-12 w-full mt-8 ${index === 1 ? "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500" : "bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300"}`}
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
const transformTierForUI = (tier) => ({
  ...tier,
  id: tier.slug,
  priceMonthly: `$${(tier.price / 100).toFixed(2)}`,
  featured: tier.price > 0,
  href: "#",
});

function classNames(...classes) {
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

  const displayTiers = useMemo(() => (tiers ? tiers.map(transformTierForUI) : []), [tiers]);
  const { user } = useSession();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState("");

  const checkout = async (polarRefId) => {
    setCheckoutLoading(true);
    setSubscriptionError("");
    try {
      const paymentUrl = await proSubscription(polarRefId, user);
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
                className="rounded-full bg-primary px-10 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 transition-all duration-300"
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
          <h2 className="text-base/7 font-semibold text-primary">Pricing</h2>
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
        <h2 className="text-4xl tracking-tight text-pretty text-gray-900 sm:text-5xl">
          Upgrade your plan
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-gray-600 text-lg/8 text-pretty">
          Need more capabilities for your Freelance business?
        </p>
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
        className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-6xl lg:grid-cols-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {displayTiers.map((tier, tierIdx) => {
          const IconComponent = getFeatureIcon(tier.name);

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
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={classNames(
                    tier.featured ? "bg-white/10" : "bg-primary/10",
                    "p-2 rounded-lg"
                  )}
                >
                  <IconComponent
                    className={classNames(
                      tier.featured ? "text-indigo-200" : "text-primary",
                      "h-5 w-5"
                    )}
                  />
                </div>
                <h3
                  className={classNames(
                    tier.featured ? "text-white" : "text-black",
                    "text-lg/8 font-semibold"
                  )}
                >
                  {tier.name}
                </h3>
              </div>

              <p className="mt-4 flex items-center gap-x-2">
                <span
                  className={classNames(
                    tier.featured ? "text-white" : "text-gray-900",
                    "text-5xl font-semibold tracking-tight"
                  )}
                >
                  {tier.priceMonthly}
                </span>
                <span
                  className={classNames(
                    tier.featured ? "text-gray-400" : "text-gray-500",
                    "text-xs leading-none"
                  )}
                >
                  USD /<br /> month
                </span>
              </p>

              <p
                className={classNames(
                  tier.featured ? "text-gray-300" : "text-gray-600",
                  "mt-6 text-lg"
                )}
              >
                {tier.description}
              </p>

              <ul
                role="list"
                className={classNames(
                  tier.featured ? "text-gray-300" : "text-gray-600",
                  "mt-8 space-y-3 text-lg sm:mt-10"
                )}
              >
                {tier.features.map((feature, index) => {
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
                        <FeatureIcon
                          className={classNames(
                            tier.featured ? "text-gray-100" : "text-primary",
                            "h-3 w-3"
                          )}
                        />
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
                        "block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold cursor-default"
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
                      "block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold cursor-default"
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
                      "block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 w-full transition-all duration-200"
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
                      Get started today
                    </span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* <svg width="21" height="20" viewBox="0 0 21 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M10.2441 10.7759C12.7597 10.8965 14.8838 12.8648 14.8838 15.0601C14.8838 15.4273 14.586 15.7251 14.2188 15.7251H5.78125C5.41399 15.7251 5.11623 15.4273 5.11621 15.0601C5.11621 12.7959 7.37906 10.77 10 10.77L10.2441 10.7759Z"></path><path d="M0 14.436C0 11.5616 3.13043 10.5652 5.2998 11.4478C4.37179 12.4185 3.78619 13.6736 3.78613 15.0601L3.78809 15.1011H0.665039C0.298096 15.1011 0.000527744 14.8029 0 14.436Z"></path><path d="M14.7988 11.5532C16.969 10.4969 20.3301 11.4561 20.3301 14.436C20.3295 14.8029 20.032 15.1011 19.665 15.1011H16.2119L16.2139 15.0601C16.2138 13.7223 15.6689 12.5079 14.7988 11.5532Z"></path><path d="M3.4248 5.00146C4.85516 5.00146 6.01454 6.16098 6.01465 7.59131C6.01454 9.02164 4.85516 10.1812 3.4248 10.1812C1.99454 10.181 0.835068 9.02157 0.834961 7.59131C0.835066 6.16105 1.99454 5.00157 3.4248 5.00146Z"></path><path d="M16.5703 5.00146C18.0006 5.00157 19.1601 6.16105 19.1602 7.59131C19.16 9.02157 18.0006 10.181 16.5703 10.1812C15.14 10.1812 13.9806 9.02164 13.9805 7.59131C13.9806 6.16098 15.14 5.00146 16.5703 5.00146Z"></path><path d="M10 4.27002C11.6099 4.27002 12.915 5.57515 12.915 7.18506C12.915 8.79497 11.6099 10.1001 10 10.1001C8.39009 10.1001 7.08496 8.79497 7.08496 7.18506C7.08496 5.57515 8.39009 4.27002 10 4.27002Z"></path></svg> */}
      </motion.div>
    </motion.div>
  );
}
