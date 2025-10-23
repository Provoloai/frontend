import vidOne from "@/assets/vids/vidOne.mov";
import vidTwo from "@/assets/vids/vidTwo.mov";
import vidThree from "@/assets/vids/vidThree.mov";
import vidFour from "@/assets/vids/vidFour.mov";
import type { FeaturesConfig } from "@/types/features";

export const FEATURES_CONFIG: FeaturesConfig = {
  intro: {
    main: "Provolo is an AI-powered copywriting platform built for freelancers on Upwork.",
    highlight: "It doesn't just write faster, it writes smarter, applying proven strategies to optimize your profile and proposals. The result? More visibility, more interviews, and more jobs, without the guesswork.",
  },
  features: [
    { id: 1, text: "Rank higher in Upwork search" },
    { id: 2, text: "Convert profile views into interviews" },
    { id: 3, text: "Attract high-value clients" },
    { id: 4, text: "Win more jobs with smarter proposals" },
  ],
  steps: [
    {
      id: 1,
      title: "Smarter Copy, Instantly",
      vidSrc: vidFour,
      description: "Stop guessing what works. Provolo improves your profile and proposals automatically.",
    },
    {
      id: 2,
      title: "Optimized for the Algorithm",
      vidSrc: vidTwo,
      description: "Headlines and overviews crafted to boost your visibility in Upwork's search.",
    },
    {
      id: 3,
      title: "Works for Any Freelancer",
      vidSrc: vidOne,
      description: "Designer, developer, writer, or marketer, Provolo adapts to your niche.",
    },
    {
      id: 4,
      title: "More Invitations & Interviews",
      vidSrc: vidThree,
      description: "Rank higher, get noticed, and turn views into conversations with client-focused copy.",
    },
  ],
  sectionTitle: "How Provolo Gets You Hired",
};

export const FEATURES_ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.06,
      },
    },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  },
  featureItem: {
    hidden: { opacity: 0, x: -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  },
  card: {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  },
  stepContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  },
  stepTitle: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, delay: 0.05 },
    },
  },
  stepDescription: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, delay: 0.1 },
    },
  },
  hover: {
    x: 2,
    transition: { duration: 0.15 },
  },
  cardHover: {
    y: -2,
    transition: { duration: 0.2 },
  },
  featureNumber: {
    hover: {
      backgroundColor: "rgba(107, 114, 128, 0.15)",
      scale: 1.05,
      transition: { duration: 0.15 },
    },
  },
} as const;