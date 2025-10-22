import type { UserNavigationItem } from "@/types/user";

export const USER_NAVIGATION: UserNavigationItem[] = [
  { name: "My profile", href: "/userprofile" },
];

export const USER_CONFIG = {
  subscription: {
    noSubscriptionMessage: "No subscription found. Please contact support.",
    portalErrorMessage: "Unable to open subscription portal.",
    dashboardButtonText: "Dashboard",
    upgradeButtonText: "Upgrade",
  },
  actions: {
    logoutText: "Log Out",
  },
  messages: {
    defaultUserName: "User",
  },
} as const;

export const USER_ANIMATIONS = {
  fadeIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.15 } },
  },
} as const;
