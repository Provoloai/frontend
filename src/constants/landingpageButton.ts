import type { LandingpageButtonConfig } from "@/types/landingpageButton";

export const LANDINGPAGE_BUTTON_CONFIG: LandingpageButtonConfig = {
  variants: {
    primary: "bg-primary hover:bg-primary/90 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  },
  sizes: {
    sm: "py-2 px-4 text-xs w-[140px] h-[36px]",
    md: "py-[18px] px-[24px] text-sm w-[180px] h-[44px]",
    lg: "py-4 px-8 text-base w-[220px] h-[52px]",
  },
  base: "transition-all duration-300 rounded-full text-center align-middle flex justify-center items-center font-medium",
};

export const LANDINGPAGE_BUTTON_STYLES = {
  container: "inline-block",
  link: "block w-full h-full",
} as const;
