import {
  ChartPieIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/24/outline";
import { PlayCircleIcon } from "@heroicons/react/20/solid";
import { Send } from "lucide-react";
import type { HeaderConfig, HeaderAnimationVariants } from "@/types/header";

export const HEADER_CONFIG: HeaderConfig = {
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
  navigation: [
    { name: "Features", href: "#features", isExternal: false },
    { name: "FAQs", href: "/faq", isExternal: false },
    { name: "Blogs", href: "https://provoloai.substack.com/", isExternal: true },
    // { name: "Blogs", href: "/blog", isExternal: false },
  ],
};

export const HEADER_ANIMATIONS: HeaderAnimationVariants = {
  header: {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
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
  mobileMenuMd: {
    hidden: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  },
  mobileMenuSm: {
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
        ease: "easeOut" as const,
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
};

export const HEADER_STYLES = {
  container: "backdrop-blur lg:pt-10 md:pt-8 pt-10 fixed z-20 w-screen px-5",
  nav: "mx-auto flex max-w-[906.67px] items-center justify-between lg:p-[15px] py-2 px-4 bg-white rounded-full",
  logo: "flex mr-10",
  mobileButton: "flex lg:hidden",
  mobileButtonInner: "inline-flex items-center justify-center rounded-full bg-primary text-white p-2",
  navigation: "hidden lg:flex items-center lg:gap-x-[25px]",
  loginButton: "hidden lg:flex lg:flex-1 lg:justify-end",
  loginButtonInner: "bg-primary hover:bg-primary/90 transition-all duration-300 py-[18px] px-[24px] rounded-full text-sm text-white h-[44px] text-center align-middle flex justify-center items-center",
  mobileMenuOverlay: "fixed inset-0 z-50 bg-black/20 backdrop-blur-sm",
  mobileMenuMd: "hidden md:block fixed inset-y-0 right-0 z-50 w-full md:max-w-sm overflow-y-auto bg-[#F7F8F9] p-6 ring-1 ring-gray-900/10",
  mobileMenuSm: "md:hidden fixed inset-x-0 bottom-0 z-50 h-[85vh] overflow-y-auto bg-[#F7F8F9] p-6 rounded-t-3xl",
  mobileMenuHeader: "flex items-center justify-between mt-5 px-3 py-2 rounded-full bg-white",
  mobileMenuContent: "mt-10 flow-root",
  mobileMenuNav: "space-y-2 py-6",
  mobileMenuNavItem: "text-3xl font-bold block p-3 rounded-lg hover:bg-white/50 transition-colors duration-200",
  mobileMenuLogin: "py-6",
  mobileMenuLoginButton: "bg-primary hover:bg-primary/90 transition-all duration-300 py-[18px] px-[24px] rounded-full text-sm text-white h-[44px] text-center flex justify-center items-center w-fit",
  popover: "absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-white shadow-lg outline-1 outline-gray-900/5",
  popoverContent: "p-4",
  popoverItem: "group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50",
  popoverIcon: "flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white",
  popoverActions: "grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50",
  popoverAction: "flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100",
  backgroundVector: "absolute top-0 left-0 w-[60%] pointer-events-none",
  backgroundVector2: "absolute -bottom-10 -right-10 w-[80%] pointer-events-none",
  backgroundVector2Sm: "absolute bottom-0 right-0 w-[80%] pointer-events-none",
} as const;