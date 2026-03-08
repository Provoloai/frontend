import { motion } from "motion/react";
import { PRICING_ANIMATIONS } from "@/constants/pricing";
import type { PricingSkeletonBoxProps } from "@/types/pricing";

const PricingSkeletonBox: React.FC<PricingSkeletonBoxProps> = ({ className = "", delay = 0 }) => {
  return (
    <motion.div
      className={`bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] rounded-xl ${className}`}
      initial={PRICING_ANIMATIONS.skeleton.hidden}
      animate={{
        ...PRICING_ANIMATIONS.skeleton.animate,
        backgroundPosition: PRICING_ANIMATIONS.skeleton.animate.backgroundPosition,
      }}
      transition={{
        opacity: { duration: 0.4, delay },
        scale: { duration: 0.3, delay, ease: "easeOut" },
        backgroundPosition: {
          duration: 2,
          repeat: Infinity,
          ease: "linear",
          delay,
        },
      }}
    />
  );
};

export default PricingSkeletonBox;
