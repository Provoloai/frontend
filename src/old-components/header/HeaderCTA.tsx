import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { HEADER_ANIMATIONS, HEADER_STYLES } from "@/constants/header";
import type { HeaderConfig } from "@/types/header";

interface HeaderCTAProps {
  config: HeaderConfig;
  isMobile?: boolean;
}

const HeaderCTA: React.FC<HeaderCTAProps> = ({ config, isMobile = false }) => {
  return (
    <motion.div 
      className={isMobile ? "py-6" : "hidden lg:flex lg:flex-1 lg:justify-end"} 
      variants={HEADER_ANIMATIONS.navItem}
    >
      <motion.div 
        whileHover={HEADER_ANIMATIONS.hover} 
        whileTap={HEADER_ANIMATIONS.tap}
      >
        <Link
          to={config.cta.href}
          className={isMobile ? HEADER_STYLES.mobileCtaButton : HEADER_STYLES.ctaButton}
        >
          {config.cta.text}
          <motion.span
            aria-hidden="true"
            animate={{ x: 0 }}
            whileHover={HEADER_ANIMATIONS.ctaHover}
          />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default HeaderCTA;
