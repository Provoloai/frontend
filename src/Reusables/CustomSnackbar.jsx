import { useState, useEffect } from 'react';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';

export default function CustomSnackbar({ 
  snackbarMessage, 
  snackbarColor, 
  open, 
  close 
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof close === 'function';
  const isOpen = isControlled ? open : internalOpen;

  const handleClose = () => {
    isControlled ? close() : setInternalOpen(false);
  };

  useEffect(() => {
    if (!isControlled) setInternalOpen(open);
    
    if (open) {
      const timer = setTimeout(handleClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Snackbar
      variant="soft"
      color={snackbarColor}
      open={isOpen}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
      endDecorator={
        <Button onClick={handleClose} size="sm" variant="soft" color={snackbarColor}>
          Dismiss
        </Button>
      }
    >
      {snackbarMessage}
    </Snackbar>
  );
}