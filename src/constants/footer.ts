import { Instagram, Linkedin, Twitter, LibraryBig } from "lucide-react";
import type { FooterConfig } from "@/types/footer";

export const FOOTER_CONFIG: FooterConfig = {
  hero: {
    title: "Stop Guessing. Start Winning More Jobs on Upwork.",
    description: "Your skills deserve to be seen and paid. Provolo helps you attract clients, rank higher, and turn views into interviews. Make every word work for you.",
    ctaText: "Get Started",
    ctaLink: "/signup",
  },
  footer: {
    copyright: "Provolo '25",
    links: [
      { label: "Careers", href: "https://buildsbyesuoladaniel.hashnode.space/provolo/open-collaborations" },
      { label: "Terms & Conditions", href: "https://buildsbyesuoladaniel.hashnode.space/provolo/terms-and-conditions" },
      { label: "Privacy Policy", href: "https://buildsbyesuoladaniel.hashnode.space/provolo/privacy-policy" },
      { label: "Help Center", href: "https://buildsbyesuoladaniel.hashnode.space/provolo/provoloai-project-documentation" },
    ],
    social: [
      { href: "https://x.com/provoloai", icon: Twitter },
      { href: "https://www.linkedin.com/company/provoloai", icon: Linkedin },
      { href: "https://www.instagram.com/provoloai", icon: Instagram },
      { href: "https://provoloai.substack.com", icon: LibraryBig },
    ],
  },
};

export const FOOTER_ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, staggerChildren: 0.06 },
    },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  },
  floating: {
    animate: {
      y: [-3, 3, -3] as number[],
      rotate: [-0.5, 0.5, -0.5] as number[],
      transition: { duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" as const },
    },
  },
  vector: {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 0.5, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  },
  footer: {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, staggerChildren: 0.04 },
    },
  },
  footerItem: {
    hidden: { opacity: 0, y: 4 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  },
  socialHover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  socialTap: {
    scale: 0.95,
  },
  linkHover: {
    x: 2,
    transition: { duration: 0.15 },
  },
  ctaHover: {
    scale: 1.02,
    transition: { duration: 0.15 },
  },
  ctaTap: {
    scale: 0.98,
  },
} as const;

export const FOOTER_STYLES = {
  linkBase: "p-3 flex items-center gap-3 rounded text-gray-500 hover:text-primary transition-all duration-200 text-sm",
} as const;
