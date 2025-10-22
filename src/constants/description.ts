import type { DescriptionConfig } from "@/types/description";

export const DESCRIPTION_CONFIG: DescriptionConfig = {
  title: "Every Word Works Harder.",
  subtitle: "Provolo isn't just about writing faster, it's about writing smarter.",
  features: [
    { id: 1, text: "Crafted to grab client attention." },
    { id: 2, text: "Built to boost algorithm ranking." },
    { id: 3, text: "Designed to help you win more jobs." },
  ],
  ctaText: "Get Started",
  ctaLink: "/signup",
};

export const DESCRIPTION_ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.08,
      },
    },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
  slideIn: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
  featureItem: {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  },
  featureNumber: {
    hover: {
      backgroundColor: "rgba(107, 114, 128, 0.15)",
      scale: 1.05,
      transition: { duration: 0.15 },
    },
  },
  ctaButton: {
    hover: {
      scale: 1.02,
      transition: { duration: 0.15 },
    },
    tap: {
      scale: 0.98,
    },
  },
} as const;
