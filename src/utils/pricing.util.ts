import { PRICING_ICON_MAP } from "@/constants/pricing";
import type { PricingTier } from "@/types/pricing";

// Transform backend tier to UI format
export const transformTierForUI = (tier: any): PricingTier => ({
  ...tier,
  id: tier.slug,
  priceMonthly: `$${(tier.price / 100).toFixed(2)}`,
  featured: tier.price > 0,
  href: "#",
});

// Get feature icon based on feature name
export const getFeatureIcon = (featureName: string) => {
  const name = featureName.toLowerCase();

  if (name.includes("profile") || name.includes("optimization")) return PRICING_ICON_MAP.profile;
  if (name.includes("proposal") || name.includes("application")) return PRICING_ICON_MAP.proposal;
  if (name.includes("search") || name.includes("seo")) return PRICING_ICON_MAP.search;
  if (name.includes("support") || name.includes("help")) return PRICING_ICON_MAP.support;
  if (name.includes("analytics") || name.includes("insight")) return PRICING_ICON_MAP.analytics;
  if (name.includes("premium") || name.includes("advanced")) return PRICING_ICON_MAP.premium;
  if (name.includes("unlimited") || name.includes("infinite")) return PRICING_ICON_MAP.unlimited;
  if (name.includes("priority") || name.includes("fast")) return PRICING_ICON_MAP.priority;
  if (name.includes("ai") || name.includes("smart")) return PRICING_ICON_MAP.ai;
  if (name.includes("templates") || name.includes("examples")) return PRICING_ICON_MAP.templates;
  if (name.includes("branding") || name.includes("custom")) return PRICING_ICON_MAP.branding;
  if (name.includes("global") || name.includes("international")) return PRICING_ICON_MAP.global;

  return PRICING_ICON_MAP.default;
};

// Compute inherited and new features for a tier
export const computeTierFeatures = (tier: PricingTier, allTiers: PricingTier[], tierIndex: number) => {
  let inherited: string | null = null;
  let newFeatures = tier.features;
  
  if (tierIndex > 0) {
    const prevTier = allTiers[tierIndex - 1];
    const prevSlugs = new Set(prevTier.features.map((f) => f.slug));
    newFeatures = tier.features.filter((f) => !prevSlugs.has(f.slug));
    inherited = prevTier.name;
  }

  return { inherited, newFeatures };
};

// Utility function for conditional class names
export const classNames = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};
