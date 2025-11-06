import { motion } from "motion/react";
import Logo from "../../Reusables/Logo";

interface SidebarLogoProps {
  isOpen: boolean;
}

export default function SidebarLogo({ isOpen }: SidebarLogoProps) {
  return (
    <motion.div
      className={`flex gap-3 mb-10 ${isOpen ? "px-0" : "px-0 mx-auto"} w-fit relative`}
      layout
      transition={{ duration: 0.3 }}
    >
      <Logo />
    </motion.div>
  );
}

