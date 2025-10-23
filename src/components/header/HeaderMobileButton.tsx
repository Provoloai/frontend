import { motion } from "motion/react";
import { HEADER_STYLES } from "@/constants/header";
import type { HeaderMobileButtonProps } from "@/types/header";

const HeaderMobileButton: React.FC<HeaderMobileButtonProps> = ({ onClick }) => {
  const navItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div className={HEADER_STYLES.mobileButton} variants={navItemVariants}>
      <motion.button
        type="button"
        onClick={onClick}
        className={HEADER_STYLES.mobileButtonInner}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="sr-only">Open main menu</span>
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          <path
            d="M6.04163 4.4585H13.9583"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.66663 10H16.3333"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.04163 15.5415H13.9583"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.button>
    </motion.div>
  );
};

export default HeaderMobileButton;
