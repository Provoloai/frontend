import { motion } from "motion/react";
import { DESCRIPTION_ANIMATIONS } from "@/constants/description";
import vidSeven from "@/assets/vids/vidSeven.mov";
import type { DescriptionVideoProps } from "@/types/description";

const DescriptionVideo: React.FC<DescriptionVideoProps> = ({ videoRef, onVideoLoad }) => {
  return (
    <motion.div
      className="flex mt-10 lg:mt-0 lg:text-center justify-end items-center overflow-hidden"
      variants={DESCRIPTION_ANIMATIONS.scale}
    >
      <video
        ref={videoRef}
        data-src={vidSeven}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="m-auto object-fit rounded-2xl"
        style={{ willChange: "transform" }}
        onLoadedData={onVideoLoad}
      />
    </motion.div>
  );
};

export default DescriptionVideo;
