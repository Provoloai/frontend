import { ChartPieIcon, CursorArrowRaysIcon } from "@heroicons/react/24/outline";
import { PlayCircleIcon } from "@heroicons/react/20/solid";
import { Send } from "lucide-react";
import type { HeaderConfig } from "@/types/header";

export const HEADER_CONFIG: HeaderConfig = {
  logo: {
    alt: "Your Company",
    href: "/",
  },
  navigation: {
    items: [
      { name: "Features", href: "#features", isExternal: false },
      { name: "How it Works", href: "#howitworks", isExternal: false },
      { name: "FAQs", href: "https://buildsbyesuoladaniel.hashnode.space/provolo/faqs", isExternal: true },
      { name: "Blogs", href: "https://provoloai.substack.com/", isExternal: true },
    ],
  },
  community: {
    products: [
      {
        name: "Provolo Learn",
        description: "A space to level up your online presence, land more gigs, and grow your career.",
        href: "https://x.com/i/communities/1971577100684431600",
        icon: ChartPieIcon,
      },
      {
        name: "Facebook",
        description: "Get latest updates on our product",
        href: "https://web.facebook.com/profile.php?id=61581683004716",
        icon: CursorArrowRaysIcon,
      },
    ],
    callsToAction: [
      { name: "Watch Demo", href: "https://www.youtube.com/@Provoloai", icon: PlayCircleIcon },
      { name: "Contact Support", href: "mailto:support@provolo.org", icon: Send },
    ],
  },
  cta: {
    text: "Log in",
    href: "/login",
  },
};

export const HEADER_ANIMATIONS = {
  header: {
    hidden: {
      opacity: 0,
      y: -20,
      backdropFilter: "blur(0px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      backdropFilter: "blur(10px)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  navItem: {
    hidden: { opacity: 0, y: -5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  },
  mobileMenu: {
    hidden: {
      opacity: 0,
      y: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  },
  popover: {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut" as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.15,
        ease: "easeIn" as const,
      },
    },
  },
  productItem: {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  },
  ctaAction: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.3 },
    },
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.15 },
  },
  tap: {
    scale: 0.98,
  },
  logoHover: {
    scale: 1.02,
  },
  logoTap: {
    scale: 0.98,
  },
  chevronHover: {
    rotate: 180,
    transition: { duration: 0.2 },
  },
  linkHover: {
    y: -1,
    transition: { duration: 0.2 },
  },
  mobileLinkHover: {
    x: 5,
  },
  ctaHover: {
    x: 3,
    transition: { duration: 0.2 },
  },
  mobileMenuButtonHover: {
    scale: 1.05,
  },
  mobileMenuButtonTap: {
    scale: 0.95,
  },
  closeButtonHover: {
    scale: 1.05,
    rotate: 90,
  },
  closeButtonTap: {
    scale: 0.95,
  },
  hamburgerHover: {
    rotate: 90,
    transition: { duration: 0.2 },
  },
  backgroundVector: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.3, duration: 0.5 },
    },
  },
  backgroundVector2: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.4, duration: 0.5 },
    },
  },
} as const;

export const HEADER_STYLES = {
  mobileMenuButton: "inline-flex items-center justify-center rounded-full bg-primary text-white p-2",
  closeButton: "rounded-full bg-primary text-white p-2",
  ctaButton: "bg-primary hover:bg-primary/90 transition-all duration-300 py-[18px] px-[24px] rounded-full text-sm text-white h-[44px] text-center align-middle flex justify-center items-center",
  mobileCtaButton: "bg-primary hover:bg-primary/90 transition-all duration-300 py-[18px] px-[24px] rounded-full text-sm text-white h-[44px] text-center align-middle flex justify-center items-center w-fit",
  navLink: "text-sm my-auto hover:text-primary transition-colors duration-200 flex",
  mobileNavLink: "text-sm my-auto block p-3 rounded-lg hover:bg-white/50 transition-colors duration-200",
  popoverButton: "focus:outline-none flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 hover:text-primary transition-colors duration-200",
  productItem: "group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50",
  productIcon: "flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white",
  productName: "block font-bold text-gray-900",
  productDescription: "mt-1 text-gray-600 text-sm",
  ctaAction: "flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100",
  mobileMenuContainer: "fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#F7F8F9] p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10",
  mobileMenuHeader: "flex items-center justify-between mt-5 px-3 py-2 rounded-full relative z-50 bg-white",
  mobileMenuContent: "mt-10 flow-root relative z-50",
  mobileMenuNav: "space-y-2 py-6",
  mobileMenuCta: "py-6",
} as const;