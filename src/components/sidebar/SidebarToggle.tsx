import { motion } from "motion/react";
import { PanelLeftClose, PanelRightClose } from "lucide-react";

interface SidebarToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function SidebarToggle({ isOpen, onToggle }: SidebarToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className="absolute z-20 -right-10 top-8 bg-gray-50 rounded-md p-1 hover:bg-gray-100 transition-all duration-200 text-gray-400"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
    >
      {isOpen ? <PanelLeftClose size={20} /> : <PanelRightClose size={20} />}
    </motion.button>
  );
}

