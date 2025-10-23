import { motion } from "motion/react";
import Logo from "@/Reusables/Logo";
import { HEADER_STYLES } from "@/constants/header";
import type { HeaderLogoProps } from "@/types/header";

const HeaderLogo: React.FC<HeaderLogoProps> = ({ onLogoClick }) => {
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
    <motion.div className={HEADER_STYLES.logo} variants={navItemVariants}>
      <motion.a 
        href="/" 
        whileHover={{ scale: 1.02 }} 
        whileTap={{ scale: 0.98 }}
        onClick={onLogoClick}
      >
        <span className="sr-only">Provolo</span>
        <Logo />
      </motion.a>
    </motion.div>
  );
};

export default HeaderLogo;