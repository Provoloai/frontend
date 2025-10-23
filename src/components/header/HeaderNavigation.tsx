import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { HEADER_ANIMATIONS, HEADER_STYLES } from "@/constants/header";
import type { HeaderNavigationProps } from "@/types/header";

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({ config }) => {
  return (
    <>
      {config.navigation.items.map((item) => (
        <motion.div key={item.name} variants={HEADER_ANIMATIONS.navItem}>
          <Link
            target={item.isExternal ? "_blank" : undefined}
            to={item.href}
            className={HEADER_STYLES.navLink}
          >
            <motion.span 
              whileHover={HEADER_ANIMATIONS.linkHover} 
              transition={{ duration: 0.2 }}
            >
              {item.name}
            </motion.span>
          </Link>
        </motion.div>
      ))}
    </>
  );
};

export default HeaderNavigation;