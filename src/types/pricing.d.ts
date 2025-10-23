import { ComponentType } from "react";

export interface PricingFeature {
  name: string;
  slug: string;
  description?: string;
}

export interface PricingTier {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  priceMonthly: string;
  polarRefId: string;
  featured: boolean;
  href: string;
  features: PricingFeature[];
}

export interface PricingConfig {
  title: string;
  subtitle: string;
  errorMessages: {
    loadFailed: string;
    noPlans: string;
    subscriptionFailed: string;
  };
  buttons: {
    tryAgain: string;
    getStarted: string;
    currentPlan: string;
  };
}

export interface PricingState {
  checkoutLoading: boolean;
  subscriptionError: string;
}

export interface PricingSkeletonProps {
  className?: string;
}

export interface PricingSkeletonBoxProps {
  className?: string;
  delay?: number;
}

export interface PricingErrorProps {
  onRetry: () => void;
}

export interface PricingEmptyProps {
  // No props needed for empty state
}

export interface PricingHeaderProps {
  config: PricingConfig;
  subscriptionError: string;
}

export interface PricingTierCardProps {
  tier: PricingTier;
  tierIndex: number;
  inheritedTier?: string;
  newFeatures: PricingFeature[];
  userTierId?: string;
  checkoutLoading: boolean;
  onCheckout: (polarRefId: string) => void;
}

export interface PricingFeatureItemProps {
  feature: PricingFeature;
  tierFeatured: boolean;
  index: number;
  tierIndex: number;
}

export interface PricingTierButtonProps {
  tier: PricingTier;
  userTierId?: string;
  checkoutLoading: boolean;
  onCheckout: (polarRefId: string) => void;
}

export interface PricingContentProps {
  tiers: PricingTier[];
  userTierId?: string;
  checkoutLoading: boolean;
  subscriptionError: string;
  onCheckout: (polarRefId: string) => void;
}

export interface PricingMainProps {
  tiers: PricingTier[];
  userTierId?: string;
  checkoutLoading: boolean;
  subscriptionError: string;
  onCheckout: (polarRefId: string) => void;
}

export interface PricingIconMap {
  [key: string]: ComponentType<any>;
}

export interface PricingAnimationVariants {
  container: {
    hidden: { opacity: number };
    visible: {
      opacity: number;
      transition: {
        duration: number;
        staggerChildren?: number;
        delayChildren?: number;
      };
    };
  };
  card: {
    hidden: { opacity: number; y: number; scale: number };
    visible: {
      opacity: number;
      y: number;
      scale: number;
      transition: {
        duration: number;
        ease: string;
      };
    };
  };
  skeleton: {
    hidden: { opacity: number; scale: number };
    animate: {
      opacity: number;
      scale: number;
      backgroundPosition: string[];
    };
    transition: {
      opacity: { duration: number; delay: number };
      scale: { duration: number; delay: number; ease: string };
      backgroundPosition: {
        duration: number;
        repeat: number;
        ease: string;
        delay: number;
      };
    };
  };
  skeletonContainer: {
    hidden: { opacity: number };
    visible: {
      opacity: number;
      transition: {
        duration: number;
        staggerChildren?: number;
        delayChildren?: number;
      };
    };
  };
  skeletonCard: {
    hidden: { opacity: number; y: number; scale: number };
    visible: {
      opacity: number;
      y: number;
      scale: number;
      transition: {
        duration: number;
        ease: string;
      };
    };
  };
}
