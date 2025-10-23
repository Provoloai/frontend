export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  href: string;
  icon: React.ComponentType<any>;
}

export interface FooterConfig {
  hero: {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
  };
  footer: {
    copyright: string;
    links: FooterLink[];
    social: SocialLink[];
  };
}

export interface FooterState {
  imagesLoaded: Record<string, boolean>;
}

export interface FooterHeroProps {
  config: FooterConfig;
}

export interface FooterLinksProps {
  config: FooterConfig;
}

export interface FooterSocialProps {
  config: FooterConfig;
}

export interface FooterCopyrightProps {
  config: FooterConfig;
}

export interface FooterContentProps {
  config: FooterConfig;
}

export interface FloatingImageProps {
  src: string;
  alt: string;
  className: string;
  initial: any;
  animate: any;
  delay: number;
}

export interface SocialLinkComponentProps {
  to: string;
  icon: React.ComponentType<any>;
}
