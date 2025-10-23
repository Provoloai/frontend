// Common types for all landing components
export interface LandingImageProps {
  src: string;
  alt: string;
  className?: string;
  dataKey?: string;
  dataSrc?: string;
  initial?: any;
  animate?: any;
  delay?: number;
  loading?: "lazy" | "eager";
}

export interface LandingVideoProps {
  src: string;
  dataSrc?: string;
  dataIndex?: number;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: "metadata" | "auto" | "none";
}

// Hero component types
export interface HeroFloatingImageProps extends LandingImageProps {
  variants?: any;
  whileInView?: any;
  viewport?: any;
  whileHover?: any;
}

export interface HeroContentProps {
  // No props needed as it's static content
}

export interface HeroScreenshotProps {
  // No props needed as it's static content
}

// Features component types
export interface FeatureItem {
  title: string;
  description: string;
  vidSrc: string;
}

export interface FeaturesListProps {
  features: string[];
}

export interface FeaturesStepsProps {
  steps: FeatureItem[];
}

// Header component types
export interface HeaderProduct {
  name: string;
  description: string;
  href: string;
  icon: any;
}

export interface HeaderCallToAction {
  name: string;
  href: string;
  icon: any;
}

export interface HeaderNavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export interface HeaderMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Footer component types
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSocialLink {
  href: string;
  icon: any;
}

export interface FooterHeroSectionProps {
  // No props needed as it's static content
}

export interface FooterSectionProps {
  // No props needed as it's static content
}


// Testimonials component types
export interface TestimonialPost {
  id: number;
  title: string;
  description: string;
  date: string;
  datetime: string;
  category: { title: string };
  author: {
    name: string;
    role: string;
    imageUrl: string;
  };
}

export interface TestimonialCardProps {
  post: TestimonialPost;
  index: number;
}

// Pricing component types
export interface PricingFeature {
  name: string;
  slug: string;
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: number;
  priceMonthly: string;
  features: PricingFeature[];
  featured: boolean;
  href: string;
  polarRefId: string;
}

export interface PricingCardProps {
  tier: PricingTier;
  tierIdx: number;
  inherited?: string;
  newFeatures: PricingFeature[];
  checkoutLoading: boolean;
  onCheckout: (polarRefId: string) => void;
}


// Common animation variants
export interface AnimationVariants {
  container: any;
  item: any;
  card: any;
  fadeUp: any;
  slideIn: any;
  scale: any;
  floating: any;
  vector: any;
}
