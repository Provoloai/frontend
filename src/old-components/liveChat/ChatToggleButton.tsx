import { motion, AnimatePresence } from "motion/react";
import { X, MessageCircle } from "lucide-react";

interface ChatToggleButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ChatToggleButton({
  isOpen,
  onToggle,
}: ChatToggleButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className="w-12 h-12 sm:w-12 sm:h-12 bg-black rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow fixed bottom-4 right-4 z-50"
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X className="w-5 h-5" />
          </motion.div>
        ) : (
          <motion.div
            key="open"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <MessageCircle className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

