import { motion } from "motion/react";
import Logo from "../../Reusables/Logo";

interface SidebarLogoProps {
  isOpen: boolean;
}

export default function SidebarLogo({ isOpen }: SidebarLogoProps) {
  return (
    <motion.div
      className={`flex gap-3 mb-10 ${isOpen ? "px-1.5" : "px-1.5"} w-fit  transition-all duration-300`}
      layout
      transition={{ duration: 0.3 }}
    >
      <Logo />
    </motion.div>
  );
}

