import { motion } from "motion/react";
import Logo from "@/Reusables/Logo";
import { HEADER_ANIMATIONS } from "@/constants/header";
import type { HeaderLogoProps } from "@/types/header";

const HeaderLogo: React.FC<HeaderLogoProps> = ({ config }) => {
  return (
    <motion.div className="flex mr-10" variants={HEADER_ANIMATIONS.navItem}>
      <motion.a 
        href={config.logo.href} 
        className="" 
        whileHover={HEADER_ANIMATIONS.logoHover} 
        whileTap={HEADER_ANIMATIONS.logoTap}
      >
        <span className="sr-only">{config.logo.alt}</span>
        <Logo />
      </motion.a>
    </motion.div>
  );
};

export default HeaderLogo;