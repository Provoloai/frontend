export interface Product {
  name: string;
  description: string;
  href: string;
  icon: React.ComponentType<any>;
}

export interface CallToAction {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
}

export interface NavItem {
  name: string;
  href: string;
  isExternal: boolean;
}

export interface HeaderConfig {
  logo: {
    alt: string;
    href: string;
  };
  navigation: {
    items: NavItem[];
  };
  community: {
    products: Product[];
    callsToAction: CallToAction[];
  };
  cta: {
    text: string;
    href: string;
  };
}

export interface HeaderState {
  mobileMenuOpen: boolean;
}

export interface HeaderLogoProps {
  config: HeaderConfig;
}

export interface HeaderNavigationProps {
  config: HeaderConfig;
}

export interface HeaderCommunityProps {
  config: HeaderConfig;
}

export interface HeaderMobileMenuProps {
  config: HeaderConfig;
  isOpen: boolean;
  onClose: () => void;
}

export interface HeaderContentProps {
  config: HeaderConfig;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export interface MobileMenuButtonProps {
  onClick: () => void;
}

export interface MobileMenuCloseButtonProps {
  onClick: () => void;
}