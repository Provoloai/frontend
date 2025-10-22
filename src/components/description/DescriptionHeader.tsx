import { motion } from "motion/react";
import { DESCRIPTION_ANIMATIONS } from "@/constants/description";
import type { DescriptionConfig } from "@/types/description";

interface DescriptionHeaderProps {
  config: DescriptionConfig;
}

const DescriptionHeader: React.FC<DescriptionHeaderProps> = ({ config }) => {
  return (
    <motion.header className="flex flex-col" variants={DESCRIPTION_ANIMATIONS.fadeUp}>
      <motion.p
        className="font-headingmd lg:text-[28px] text-[18px] mb-3"
        variants={DESCRIPTION_ANIMATIONS.fadeUp}
      >
        {config.title}
      </motion.p>
      <motion.p
        className="text-[#6B7280] lg:text-[22px] lg:pr-32 text-[14px]"
        variants={DESCRIPTION_ANIMATIONS.fadeUp}
      >
        {config.subtitle}
      </motion.p>
    </motion.header>
  );
};

export default DescriptionHeader;
