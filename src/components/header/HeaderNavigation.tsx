import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { HEADER_STYLES } from "@/constants/header";
import type { HeaderNavigationProps } from "@/types/header";

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({ config }) => {
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
    <div className={HEADER_STYLES.navigation}>
      {config.navigation.map((item) => (
        <motion.div key={item.name} variants={navItemVariants}>
          <Link
            target={item.isExternal ? "_blank" : undefined}
            to={item.href}
            className="text-sm my-auto hover:text-primary transition-colors duration-200 flex"
          >
            <motion.span whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
              {item.name}
            </motion.span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default HeaderNavigation;