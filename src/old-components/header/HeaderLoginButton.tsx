import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { HEADER_STYLES } from "@/constants/header";

const HeaderLoginButton: React.FC = () => {
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
    <motion.div className={HEADER_STYLES.loginButton} variants={navItemVariants}>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link
          to="/login"
          className={HEADER_STYLES.loginButtonInner}
        >
          Log in
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default HeaderLoginButton;
