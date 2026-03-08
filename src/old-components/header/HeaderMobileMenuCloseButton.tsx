import { motion } from "motion/react";
import { HEADER_ANIMATIONS, HEADER_STYLES } from "@/constants/header";
import type { MobileMenuCloseButtonProps } from "@/types/header";

const HeaderMobileMenuCloseButton: React.FC<MobileMenuCloseButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={HEADER_STYLES.closeButton}
      whileHover={HEADER_ANIMATIONS.closeButtonHover}
      whileTap={HEADER_ANIMATIONS.closeButtonTap}
    >
      <span className="sr-only">Close menu</span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.75 5.25L5.25064 14.7494M14.7494 14.75L5.25 5.25067"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
};

export default HeaderMobileMenuCloseButton;
