import { motion } from "motion/react";
import { DESCRIPTION_ANIMATIONS } from "@/constants/description";
import type { DescriptionConfig } from "@/types/description";

interface DescriptionFeaturesProps {
  config: DescriptionConfig;
}

const DescriptionFeatures: React.FC<DescriptionFeaturesProps> = ({ config }) => {
  return (
    <motion.ol
      className="list-none lg:text-base text-[14px] text-[#6B7280] flex flex-col gap-6"
      variants={DESCRIPTION_ANIMATIONS.container}
    >
      {config.features.map((feature) => (
        <motion.li
          key={feature.id}
          className="flex items-center font-headingmd text-x"
          variants={DESCRIPTION_ANIMATIONS.slideIn}
          whileHover={{
            x: 2,
            transition: { duration: 0.15 },
          }}
        >
          <motion.span
            className="px-2 py-1 bg-[#6B7280]/10 rounded-lg mr-2 text-sm font-headingmd"
            whileHover={DESCRIPTION_ANIMATIONS.featureNumber.hover}
          >
            {feature.id}
          </motion.span>
          {feature.text}
        </motion.li>
      ))}
    </motion.ol>
  );
};

export default DescriptionFeatures;
