import { motion } from "motion/react";
import { FEATURES_ANIMATIONS } from "@/constants/features";
import FeaturesStepItem from "./FeaturesStepItem";
import type { FeaturesStepsProps } from "@/types/features";

const FeaturesSteps: React.FC<FeaturesStepsProps> = ({
  config,
  videoRefs,
  onVideoLoad,
}) => {
  return (
    <div className="relative">
      {/* Right fade gradient - hidden on mobile/tablet */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

      <motion.div
        className="lg:flex [@media(min-width:1920px)]:justify-center grid md:grid-cols-2 grid-cols-1 gap-7 lg:overflow-x-auto no-scrollbar py-5 lg:px-2 lg:m snap-x snap-mandatory"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px", amount: 0.1 }}
        variants={FEATURES_ANIMATIONS.stepContainer}
      >
        {config.steps.map((step, index) => {
          const videoRef = (el: HTMLVideoElement | null) => {
            videoRefs.current[index] = el;
          };
          
          return (
            <FeaturesStepItem
              key={step.id}
              step={step}
              index={index}
              videoRef={videoRef}
              onVideoLoad={() => onVideoLoad(index)}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export default FeaturesSteps;
