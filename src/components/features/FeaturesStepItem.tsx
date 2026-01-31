import { motion } from "motion/react";
import { FEATURES_ANIMATIONS } from "@/constants/features";
import type { FeaturesStepItemProps } from "@/types/features";

const FeaturesStepItem: React.FC<FeaturesStepItemProps> = ({
  step,
  index,
  videoRef,
  onVideoLoad,
}) => {
  return (
    <motion.div
      className="flex-shrink-0 w-full sm:w-full lg:w-[450px] snap-start"
      variants={FEATURES_ANIMATIONS.card}
      whileHover={FEATURES_ANIMATIONS.cardHover}
    >
      <motion.div
        className="bg-[#F0F1F2] mb-8 lg:h-[500px] h-[420px] rounded-3xl lg:px-20 flex overflow-hidden"
        whileHover={{
          transition: { duration: 0.2 },
        }}
      >
        <video
          ref={videoRef}
          data-src={step.vidSrc}
          data-index={index}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-fit"
          style={{ willChange: "transform" }}
          onLoadedData={() => {
            onVideoLoad();
            // Ensure video plays after loading
            if (videoRef.current) {
              videoRef.current.play().catch(console.error);
            }
          }}
        />
      </motion.div>
      <div className="px-5">
        <motion.p
          className="font-headingmd lg:text-2xl text-[16px] mb-3"
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { duration: 0.3, delay: 0.05 },
          }}
          viewport={{ once: true }}
        >
          {step.title}
        </motion.p>
        <motion.p
          className="lg:text-[18px] text-[14px] text-[#6B7280]"
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { duration: 0.3, delay: 0.1 },
          }}
          viewport={{ once: true }}
        >
          {step.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default FeaturesStepItem;
