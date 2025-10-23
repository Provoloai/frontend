import { motion } from "motion/react";
import { FEATURES_ANIMATIONS } from "@/constants/features";
import type { FeaturesHeaderProps } from "@/types/features";

const FeaturesHeader: React.FC<FeaturesHeaderProps> = ({ config }) => {
  return (
    <motion.p
      className="lg:w-[69%] w-full font-headingmd lg:text-3xl text-base"
      variants={FEATURES_ANIMATIONS.fadeUp}
    >
      {config.intro.main}{" "}
      <span className="text-[#A6AAB3] font-headingmd">
        {config.intro.highlight}
      </span>
    </motion.p>
  );
};

export default FeaturesHeader;
