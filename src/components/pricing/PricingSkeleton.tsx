import { motion } from "motion/react";
import { PRICING_STYLES } from "@/constants/pricing";
import PricingSkeletonBox from "./PricingSkeletonBox";
import type { PricingSkeletonProps } from "@/types/pricing";

const PricingSkeleton: React.FC<PricingSkeletonProps> = ({ className = "" }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className={`${PRICING_STYLES.skeletonContainer} ${className}`}>
      <motion.div
        className={PRICING_STYLES.skeletonContent}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Skeleton */}
        <motion.div className={PRICING_STYLES.skeletonHeader} variants={cardVariants}>
          <PricingSkeletonBox className={PRICING_STYLES.skeletonTitle} delay={0} />
          <PricingSkeletonBox className={PRICING_STYLES.skeletonSubtitle} delay={0.1} />
        </motion.div>

        {/* Pricing Cards Skeleton */}
        <motion.div
          className={PRICING_STYLES.skeletonGrid}
          variants={containerVariants}
        >
          {[0, 1].map((index) => (
            <motion.div
              key={index}
              className={`${index === 1
                ? PRICING_STYLES.skeletonCardFeatured
                : PRICING_STYLES.skeletonCardRegular
                } ${PRICING_STYLES.skeletonCard}`}
              variants={cardVariants}
            >
              <div className="space-y-6">
                {/* Plan Name */}
                <PricingSkeletonBox
                  className={`${PRICING_STYLES.skeletonPlanName} ${index === 1 ? "bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600" : ""}`}
                  delay={0.2 + index * 0.1}
                />

                {/* Price */}
                <div className="flex items-center gap-x-2">
                  <PricingSkeletonBox
                    className={`${PRICING_STYLES.skeletonPrice} ${index === 1
                      ? "bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600"
                      : ""}`}
                    delay={0.3 + index * 0.1}
                  />
                  <PricingSkeletonBox
                    className={`${PRICING_STYLES.skeletonPriceUnit} ${index === 1
                      ? "bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700"
                      : ""}`}
                    delay={0.35 + index * 0.1}
                  />
                </div>

                {/* Description */}
                <PricingSkeletonBox
                  className={`${PRICING_STYLES.skeletonDescription} ${index === 1 ? "bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600" : ""}`}
                  delay={0.4 + index * 0.1}
                />

                {/* Features List */}
                <div className={PRICING_STYLES.skeletonFeatures}>
                  {[0, 1, 2, 3, 4].map((featureIndex) => (
                    <div key={featureIndex} className={PRICING_STYLES.skeletonFeature}>
                      <PricingSkeletonBox
                        className={`${PRICING_STYLES.skeletonFeatureIcon} ${index === 1
                          ? "bg-gradient-to-r from-blue-400 via-indigo-300 to-indigo-400"
                          : "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500"
                          }`}
                        delay={0.5 + index * 0.1 + featureIndex * 0.05}
                      />
                      <PricingSkeletonBox
                        className={`${PRICING_STYLES.skeletonFeatureText} ${featureIndex % 3 === 0 ? "w-40" : featureIndex % 3 === 1 ? "w-32" : "w-36"
                          } ${index === 1
                            ? "bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600"
                            : ""}`}
                        delay={0.52 + index * 0.1 + featureIndex * 0.05}
                      />
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <PricingSkeletonBox
                  className={`${PRICING_STYLES.skeletonCTA} ${index === 1
                    ? "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500"
                    : "bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300"
                    }`}
                  delay={0.7 + index * 0.1}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PricingSkeleton;
