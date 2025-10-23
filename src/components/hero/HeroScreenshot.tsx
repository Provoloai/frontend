import { motion } from "motion/react";
import { HERO_ANIMATIONS, HERO_STYLES } from "@/constants/hero";
import type { HeroScreenshotProps } from "@/types/hero";

const HeroScreenshot: React.FC<HeroScreenshotProps> = ({ config }) => {
  return (
    <motion.div
      className={HERO_STYLES.screenshotContainer}
      variants={HERO_ANIMATIONS.screenshot}
      initial="hidden"
      animate="visible"
      whileHover={HERO_ANIMATIONS.screenshotHover}
    >
      <motion.img
        src={config.screenshot.src}
        alt={config.screenshot.alt}
        className={HERO_STYLES.screenshot}
        style={{ willChange: "transform" }}
      />
    </motion.div>
  );
};

export default HeroScreenshot;
