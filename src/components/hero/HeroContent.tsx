import { motion } from "motion/react";
import LandingpageButton from "@/pages/landing/LandingpageButton";
import HeroFloatingImages from "./HeroFloatingImages";
import { HERO_ANIMATIONS, HERO_STYLES } from "@/constants/hero";
import type { HeroContentProps } from "@/types/hero";

const HeroContent: React.FC<HeroContentProps> = ({ config, imageRefs, imagesLoaded, onImageLoad }) => {
  return (
    <motion.div
      className={HERO_STYLES.content}
      variants={HERO_ANIMATIONS.container}
      initial="hidden"
      animate="visible"
    >
      <div className={HERO_STYLES.inner}>
        <div className={HERO_STYLES.textContainer}>
          {/* Subtitle */}
          <motion.p
            className={HERO_STYLES.subtitle}
            variants={HERO_ANIMATIONS.item}
          >
            {config.subtitle}
          </motion.p>

          {/* H1 */}
          <motion.h1
            className={HERO_STYLES.title}
            variants={HERO_ANIMATIONS.item}
          >
            {config.title}{" "}
            <span className={HERO_STYLES.titleHighlight}>{config.titleHighlight}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className={HERO_STYLES.description}
            variants={HERO_ANIMATIONS.item}
          >
            {config.description}
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={HERO_ANIMATIONS.item}
            whileHover={HERO_ANIMATIONS.ctaHover}
            whileTap={HERO_ANIMATIONS.ctaTap}
          >
            <LandingpageButton to={config.cta.href} btnText={config.cta.text} />
          </motion.div>

          {/* Floating Images */}
          <HeroFloatingImages
            config={config}
            imageRefs={imageRefs}
            imagesLoaded={imagesLoaded}
            onImageLoad={onImageLoad}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default HeroContent;
