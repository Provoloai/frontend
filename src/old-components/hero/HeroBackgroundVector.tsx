import { motion } from "motion/react";
import { HERO_ANIMATIONS } from "@/constants/hero";
import type { BackgroundVectorProps } from "@/types/hero";

const HeroBackgroundVector: React.FC<BackgroundVectorProps> = ({
  src,
  alt,
  className,
  dataKey,
  imageRef,
}) => {
  return (
    <motion.img
      ref={imageRef}
      data-key={dataKey}
      data-src={src}
      alt={alt}
      className={className}
      variants={HERO_ANIMATIONS.vector}
      initial="hidden"
      animate="visible"
      loading="lazy"
    />
  );
};

export default HeroBackgroundVector;
