// Re-export all landing page types for centralized access
export * from './hero';
export * from './features';
export * from './footer';
export * from './header';
export * from './landingpageButton';

// Landing page specific types
export interface LandingPageProps {
  // No props needed as it's a complete page
}

export interface LandingPageSection {
  id: string;
  name: string;
  component: React.ComponentType;
  order: number;
}

export interface LandingPageConfig {
  sections: LandingPageSection[];
  animations: {
    page: {
      initial: { opacity: number };
      animate: { opacity: number };
      transition: { duration: number };
    };
  };
}
