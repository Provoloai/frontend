import { useState, useEffect, useCallback } from "react";
import Snackbar from "@mui/joy/Snackbar";
import { BellRing } from "lucide-react";

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

  return (
    <Snackbar
      variant="solid"
      color={snackbarColor}
      open={isOpen}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      startDecorator={<BellRing size={20} />}
      className="max-w-md"
    >
      <p className="text-sm ml-3">{snackbarMessage} </p>
    </Snackbar>
  );
}
