import { useState, useEffect, useCallback, useMemo } from "react";
import Snackbar from "@mui/joy/Snackbar";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";
import { IconButton } from "@mui/joy";
import { motion, AnimatePresence } from "motion/react";

interface CustomSnackbarProps {
  snackbarMessage: string;
  snackbarColor: "primary" | "neutral" | "danger" | "success" | "warning";
  open: boolean;
  close?: () => void;
}

export default function CustomSnackbar({
  snackbarMessage,
  snackbarColor,
  open,
  close,
}: CustomSnackbarProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof close === "function";
  const isOpen = isControlled ? open : internalOpen;

  const handleClose = useCallback(() => {
    if (isControlled && close) {
      close();
    } else {
      setInternalOpen(false);
    }
  }, [isControlled, close]);

  useEffect(() => {
    if (!isControlled) setInternalOpen(!!open);

    if (open) {
      const timer = setTimeout(handleClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [open, handleClose, isControlled]);

  const statusConfig = useMemo(() => {
    switch (snackbarColor) {
      case "success":
        return {
          icon: <CheckCircle2 className="text-emerald-500" size={20} />,
          border: "border-emerald-100",
          bg: "bg-emerald-50/80",
          text: "text-emerald-900",
        };
      case "danger":
        return {
          icon: <AlertCircle className="text-rose-500" size={20} />,
          border: "border-rose-100",
          bg: "bg-rose-50/80",
          text: "text-rose-900",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="text-amber-500" size={20} />,
          border: "border-amber-100",
          bg: "bg-amber-50/80",
          text: "text-amber-900",
        };
      case "primary":
      case "neutral":
      default:
        return {
          icon: <Info className="text-blue-500" size={20} />,
          border: "border-blue-100",
          bg: "bg-blue-50/80",
          text: "text-blue-900",
        };
    }
  }, [snackbarColor]);

  return (
    <Snackbar
      variant="plain"
      open={isOpen}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      className="p-0 bg-transparent overflow-visible"
      sx={{
        bottom: { xs: 16, sm: 32 },
        backgroundColor: 'transparent',
        boxShadow: 'none',
        '& .MuiSnackbar-root': {
          backgroundColor: 'transparent',
        }
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className={`
              flex items-center gap-3 px-4 py-3 
              ${statusConfig.bg} ${statusConfig.border} border
              backdrop-blur-md rounded-2xl shadow-2xl shadow-black/5
              min-w-[320px] max-w-md
            `}
          >
            <div className="shrink-0">{statusConfig.icon}</div>
            <p className={`text-[13px] font-medium flex-1 ${statusConfig.text}`}>
              {snackbarMessage}
            </p>
            <IconButton
              size="sm"
              variant="plain"
              onClick={handleClose}
              className="hover:bg-black/5 rounded-lg ml-2"
            >
              <X size={14} className="opacity-40" />
            </IconButton>
          </motion.div>
        )}
      </AnimatePresence>
    </Snackbar>
  );
}
