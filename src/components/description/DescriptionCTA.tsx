import { motion } from "motion/react";
import LandingpageButton from "@/pages/landing/LandingpageButton";
import { DESCRIPTION_ANIMATIONS } from "@/constants/description";
import type { DescriptionConfig } from "@/types/description";

interface DescriptionCTAProps {
  config: DescriptionConfig;
}

const DescriptionCTA: React.FC<DescriptionCTAProps> = ({ config }) => {
  return (
    <motion.div variants={DESCRIPTION_ANIMATIONS.fadeUp}>
      <motion.div
        whileHover={DESCRIPTION_ANIMATIONS.ctaButton.hover}
        whileTap={DESCRIPTION_ANIMATIONS.ctaButton.tap}
      >
        <LandingpageButton to={config.ctaLink} btnText={config.ctaText} />
      </motion.div>
    </motion.div>
  );
};

export default DescriptionCTA;
