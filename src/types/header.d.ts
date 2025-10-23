import { ComponentType } from "react";

export interface HeaderConfig {
  products: {
    name: string;
    description: string;
    href: string;
    icon: ComponentType<any>;
  }[];
  callsToAction: {
    name: string;
    href: string;
    icon: ComponentType<any>;
  }[];
  navigation: {
    name: string;
    href: string;
    isExternal: boolean;
  }[];
}

export interface HeaderState {
  mobileMenuOpen: boolean;
}

export interface HeaderLogoProps {
  onLogoClick?: () => void;
}

export interface HeaderMobileButtonProps {
  onClick: () => void;
}

export interface HeaderNavigationProps {
  config: HeaderConfig;
}

export interface HeaderCommunityProps {
  config: HeaderConfig;
}

export interface HeaderMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  config: HeaderConfig;
}

export interface HeaderContentProps {
  config: HeaderConfig;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export interface HeaderAnimationVariants {
  header: {
    hidden: {
      opacity: number;
      y: number;
    };
    visible: {
      opacity: number;
      y: number;
      transition: {
        duration: number;
        ease: string;
        staggerChildren: number;
        delayChildren: number;
      };
    };
  };
  navItem: {
    hidden: { opacity: number; y: number };
    visible: {
      opacity: number;
      y: number;
      transition: {
        duration: number;
        ease: string;
      };
    };
  };
  mobileMenuMd: {
    hidden: {
      opacity: number;
      x: string;
      transition: {
        duration: number;
        ease: string;
      };
    };
    visible: {
      opacity: number;
      x: number;
      transition: {
        duration: number;
        ease: string;
        staggerChildren: number;
        delayChildren: number;
      };
    };
  };
  mobileMenuSm: {
    hidden: {
      opacity: number;
      y: string;
      transition: {
        duration: number;
        ease: string;
      };
    };
    visible: {
      opacity: number;
      y: number;
      transition: {
        duration: number;
        ease: string;
        staggerChildren: number;
        delayChildren: number;
      };
    };
  };
  popover: {
    hidden: {
      opacity: number;
      scale: number;
      y: number;
    };
    visible: {
      opacity: number;
      scale: number;
      y: number;
      transition: {
        duration: number;
        ease: string;
      };
    };
    exit: {
      opacity: number;
      scale: number;
      y: number;
      transition: {
        duration: number;
        ease: string;
      };
    };
  };
}