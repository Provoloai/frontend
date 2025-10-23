import { motion } from "motion/react";
import { HERO_ANIMATIONS } from "@/constants/hero";
import type { FloatingImageProps } from "@/types/hero";

const HeroFloatingImage: React.FC<FloatingImageProps> = ({
  src,
  alt,
  className,
  dataKey,
  imageRef,
  initial,
  animate,
  delay,
}) => {
  return (
    <motion.img
      ref={imageRef}
      data-key={dataKey}
      data-src={src}
      alt={alt}
      className={className}
      initial={initial}
      animate={{
        ...animate,
        transition: { duration: 0.6, delay, ease: "easeOut" },
      }}
      variants={HERO_ANIMATIONS.floating}
      whileInView="animate"
      viewport={{ once: true }}
      whileHover={HERO_ANIMATIONS.floatingHover}
      loading="lazy"
      style={{ willChange: "transform" }}
    />
  );
};

export default HeroFloatingImage;
