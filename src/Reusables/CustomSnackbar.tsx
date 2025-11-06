import { useState, useEffect } from 'react';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import { Info } from 'lucide-react';

interface CustomSnackbarProps {
  snackbarMessage: string;
  snackbarColor: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
  open: boolean;
  close?: () => void;
}

export default function CustomSnackbar({
  snackbarMessage,
  snackbarColor,
  open,
  close
}: CustomSnackbarProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof close === 'function';
  const isOpen = isControlled ? open : internalOpen;

  const handleClose = () => {
    isControlled ? close() : setInternalOpen(false);
  };

  useEffect(() => {
    if (!isControlled) setInternalOpen(!!open);

    if (open) {
      const timer = setTimeout(handleClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Snackbar
      variant="plain"
      color={snackbarColor}
      open={isOpen}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      startDecorator={<Info  size={15}/>}

      // endDecorator={
      //   <Button onClick={handleClose} size="sm" variant="soft" color={snackbarColor}>
      //     <p className='text-xs'>
      //       Dismiss
      //     </p>
      //   </Button>
      // }
    >
      <p className='text-sm'>{snackbarMessage} </p>
    </Snackbar>
  );
}