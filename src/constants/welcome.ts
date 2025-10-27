import { Check, Sparkle } from "lucide-react";

export const WELCOME_CONFIG = {
  title: "Welcome to Plus!",
  message: "Enjoy Profile Optimizers and more.",
  features: [
    "Upwork & Linkedln Profile Optimizer",
    "Access to the most capable AI-Powered Proposals Generator",
    "Provolo Learn Early Community Access",
    "Newsletters & Provolo Notes",
    "Freelancer Growth Tools"
  ],
  continueText: "Continue",
  continueLink: "/proposal",
  icon: Sparkle,
  featureIcon: Check,
} as const;

export const CONFETTI_CONFIG = {
  count: 150,
  gravity: 0.5,
  terminalVelocity: 5,
  colors: [
    '#ff6b6b',
    '#4ecdc4',
    '#45b7d1',
    '#f9ca24',
    '#6c5ce7',
    '#a29bfe',
    '#fd79a8',
    '#fdcb6e'
  ],
} as const;
