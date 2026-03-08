import { motion } from "motion/react";
import { HEADER_ANIMATIONS, HEADER_STYLES } from "@/constants/header";
import type { MobileMenuButtonProps } from "@/types/header";

const HeaderMobileMenuButton: React.FC<MobileMenuButtonProps> = ({ onClick }) => {
  return (
    <motion.div className="flex lg:hidden" variants={HEADER_ANIMATIONS.navItem}>
      <motion.button
        type="button"
        onClick={onClick}
        className={HEADER_STYLES.mobileMenuButton}
        whileHover={HEADER_ANIMATIONS.mobileMenuButtonHover}
        whileTap={HEADER_ANIMATIONS.mobileMenuButtonTap}
      >
        <span className="sr-only">Open main menu</span>
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ rotate: 0 }}
          whileHover={HEADER_ANIMATIONS.hamburgerHover}
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

export default HeaderMobileMenuButton;
