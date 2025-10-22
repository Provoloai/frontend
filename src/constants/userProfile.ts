export const USER_PROFILE_CONFIG = {
  personalInfo: {
    title: "Personal Information",
    description: "Use a permanent address where you can receive mail.",
  },
  fields: {
    fullname: {
      label: "UserName",
      placeholder: "John Doe",
    },
    email: {
      label: "Email Address",
      placeholder: "example@mail.com",
    },
    profileLink: {
      label: "Profile Link",
      placeholder: "https://www.upwork.com/Profile-link",
    },
  },
  subscription: {
    buttonText: "Manage Subscription",
    noSubscriptionMessage: "No subscription found. Please contact support.",
    portalErrorMessage: "Unable to open subscription portal.",
  },
  infoCard: {
    title: "🎉 Thanks for joining Provolo!",
    description: "This page shows the details you've shared with us. We'll use this to help optimize your Upwork profile and improve your chances of winning more jobs.",
    supportText: "Need to update or remove any of your information? Reach out to us anytime at",
    supportEmail: "Support@provolo.org",
    supportEndText: "and we'll take care of it.",
    qrText: "Scan QR",
    qrLink: "https://linktr.ee/Provoloai",
  },
} as const;

export const USER_PROFILE_ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
  },
} as const;
