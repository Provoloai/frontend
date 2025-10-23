import { motion } from "motion/react";
import { FEATURES_ANIMATIONS } from "@/constants/features";
import FeaturesHeader from "./FeaturesHeader";
import FeaturesList from "./FeaturesList";
import FeaturesSteps from "./FeaturesSteps";

interface FeaturesContentProps {
  config: any;
  videoRefs: React.RefObject<(HTMLVideoElement | null)[]>;
  onVideoLoad: (index: number) => void;
}

const FeaturesContent: React.FC<FeaturesContentProps> = ({
  config,
  videoRefs,
  onVideoLoad,
}) => {
  return (
    <section className="lg:p-28 pt-20 md:p-10 sm:px-0 px-5" id="features">
      <motion.div
        className="mx-auto max-w-full lg:max-w-[93.75rem] flex flex-col lg:gap-[102px] gap-[70px]"
        variants={FEATURES_ANIMATIONS.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px", amount: 0.2 }}
      >
        <FeaturesHeader config={config} />
        <FeaturesList config={config} />

        {/* Steps header */}
        <motion.div variants={FEATURES_ANIMATIONS.fadeUp}>
          <p className="font-headingmd lg:text-base text-[18px]">{config.sectionTitle}</p>
        </motion.div>
      </motion.div>

      <FeaturesSteps
        config={config}
        videoRefs={videoRefs}
        onVideoLoad={onVideoLoad}
      />
    </section>
  );
};

export default FeaturesContent;
