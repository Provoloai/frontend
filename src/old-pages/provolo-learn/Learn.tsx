import { motion } from "motion/react";
import learn from "../../assets/img/learn.png";
import { learnContainerVariants } from "@/constants/animations";
import { LEARN_CONFIG, VIEWPORT_CONFIG } from "@/constants/learn";
import type { LearnImageProps } from "@/types/learn";
import LearnHeader from "@/components/learn/LearnHeader";
import LearnContent from "@/components/learn/LearnContent";
import { useSEO, SEO_CONFIGS } from "@/hooks/useSEO";

export default function Learn() {
  useSEO(SEO_CONFIGS.learn);

  // Image props for the content component
  const imageProps: LearnImageProps = {
    src: learn,
    alt: LEARN_CONFIG.imageAlt,
    style: { willChange: "transform" },
  };

  return (
    <section className="flex-1 flex flex-col overflow-y-auto relative">
      <motion.div
        className="w-full max-w-3xl mx-auto px-10"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={learnContainerVariants}
      >
        <LearnHeader
          title={LEARN_CONFIG.title}
          description={LEARN_CONFIG.description}
          buttonText={LEARN_CONFIG.buttonText}
          buttonHref={LEARN_CONFIG.buttonHref}
        />

        <LearnContent imageProps={imageProps} />
      </motion.div>
    </section>
  );
}
