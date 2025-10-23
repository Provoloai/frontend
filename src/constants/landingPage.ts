// Re-export all landing page constants for centralized access
export * from './hero';
export * from './features';
export * from './footer';
export * from './header';
export * from './landingpageButton';

// Landing page specific constants
export const LANDING_PAGE_CONFIG = {
  animations: {
    page: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.5 },
    },
  },
  sections: {
    header: { id: 'header', name: 'Header', order: 1 },
    hero: { id: 'hero', name: 'Hero', order: 2 },
    features: { id: 'features', name: 'Features', order: 3 },
    footer: { id: 'footer', name: 'Footer', order: 4 },
  },
} as const;

export const LANDING_PAGE_STYLES = {
  container: "min-h-screen bg-white",
  main: "relative",
} as const;
