import { motion } from "motion/react";
import { DESCRIPTION_ANIMATIONS, DESCRIPTION_CONFIG } from "@/constants/description";
import DescriptionHeader from "./DescriptionHeader";
import DescriptionFeatures from "./DescriptionFeatures";
import DescriptionCTA from "./DescriptionCTA";
import DescriptionVideo from "./DescriptionVideo";
import type { DescriptionContentProps } from "@/types/description";

const DescriptionContent: React.FC<DescriptionContentProps> = ({
  config,
  videoRef,
  onVideoLoad,
}) => {
  return (
    <motion.div
      className="mx-auto md:max-w-full lg:max-w-[93.75rem] bg-[#F3F4F5] rounded-3xl lg:h-[600px] lg:p-10 p-5 lg:grid"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px", amount: 0.2 }}
      variants={DESCRIPTION_ANIMATIONS.container}
    >
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-0">
        <motion.div
          className="flex flex-col lg:gap-20 gap-10 text-start"
          variants={DESCRIPTION_ANIMATIONS.container}
        >
          <DescriptionHeader config={config} />
          <DescriptionFeatures config={config} />
          <DescriptionCTA config={config} />
        </motion.div>

        <DescriptionVideo videoRef={videoRef} onVideoLoad={onVideoLoad} />
      </div>
    </motion.div>
  );
};

export default DescriptionContent;
