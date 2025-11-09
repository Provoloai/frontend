import { motion } from "motion/react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { learnImageVariants } from "@/constants/animations";
import type { LearnContentProps } from "@/types/learn";

const LearnContent: React.FC<LearnContentProps> = ({ imageProps }) => {
  const { elementRef } = useIntersectionObserver<HTMLImageElement>({
    onIntersect: () => {
      const img = elementRef.current;
      if (img && img.dataset.src) {
        img.src = img.dataset.src;
      }
    },
  });

  return (
    <>
      <motion.div
        className="border-b border-gray-900/10 pb-10"
        variants={learnImageVariants}
      />

      <motion.div
        className="overflow-hidden mt-10 relative h-[550px] rounded-2xl bg-gray-50"
        variants={learnImageVariants}
      >
        <img
          ref={elementRef}
          data-src={imageProps.src}
          alt={imageProps.alt}
          className="absolute z-10 w-full h-full object-contain object-top"
          loading="lazy"
          style={{ willChange: "transform", ...imageProps.style }}
        />
      </motion.div>
    </>
  );
};

export default LearnContent;
