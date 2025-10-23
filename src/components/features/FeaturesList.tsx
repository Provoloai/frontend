import { motion } from "motion/react";
import { FEATURES_ANIMATIONS } from "@/constants/features";
import type { FeaturesListProps } from "@/types/features";

const FeaturesList: React.FC<FeaturesListProps> = ({ config }) => {
  return (
    <motion.div variants={FEATURES_ANIMATIONS.fadeUp}>
      <motion.p
        className="font-headingmd mb-5 lg:text-base text-[18px]"
        variants={FEATURES_ANIMATIONS.fadeUp}
      >
        Why Provolo Works
      </motion.p>
      <motion.ol
        className="list-none flex justify-between lg:text-base text-[14px] text-[#6B7280] flex-wrap gap-6"
        variants={FEATURES_ANIMATIONS.container}
      >
        {config.features.map((feature) => (
          <motion.li
            key={feature.id}
            className="flex items-center font-headingmd text-[#6B7280]"
            variants={FEATURES_ANIMATIONS.featureItem}
            whileHover={FEATURES_ANIMATIONS.hover}
          >
            <motion.span
              className="px-2 py-1 bg-[#6B7280]/10 rounded-lg mr-2 text-sm font-headingmd"
              whileHover={FEATURES_ANIMATIONS.featureNumber.hover}
            >
              {feature.id}
            </motion.span>
            {feature.text}
          </motion.li>
        ))}
      </motion.ol>
    </motion.div>
  );
};

export default FeaturesList;
