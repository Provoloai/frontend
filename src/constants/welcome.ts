import { Sparkle } from "lucide-react";

export const WELCOME_CONFIG = {
  title: "Welcome to Plus!",
  message: "Enjoy Profile Optimizers and more.",
  continueText: "Continue",
  continueLink: "/optimizer",
  icon: Sparkle,
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
