import { motion } from "motion/react";
import { PRICING_CONFIG, PRICING_STYLES } from "@/constants/pricing";
import type { PricingErrorProps } from "@/types/pricing";

const PricingError: React.FC<PricingErrorProps> = ({ onRetry }) => {
  return (
    <motion.div
      className={PRICING_STYLES.errorContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={PRICING_STYLES.errorContent}>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className={PRICING_STYLES.errorTitle}>Error</h2>
          <p className={PRICING_STYLES.errorMessage}>
            {PRICING_CONFIG.errorMessages.loadFailed}
          </p>
          <p className={PRICING_STYLES.errorDescription}>
            Please refresh the page or try again later.
          </p>
          <div className="mt-10">
            <motion.button
              onClick={onRetry}
              className={PRICING_STYLES.errorButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {PRICING_CONFIG.buttons.tryAgain}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PricingError;
