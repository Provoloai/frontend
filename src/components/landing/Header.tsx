"use client";

import { useState } from "react";
import { motion } from "motion/react";
import HeaderContent from "@/components/header/HeaderContent";
import { HEADER_CONFIG, HEADER_STYLES } from "@/constants/header";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <motion.header
      className={HEADER_STYLES.container}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <HeaderContent
        config={HEADER_CONFIG}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </motion.header>
  );
}