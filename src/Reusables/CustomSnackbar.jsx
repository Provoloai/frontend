import * as React from 'react';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';

export default function CustomSnackbar({
    snackbarMessage,
    snackbarColor,
    open,
    close
}) {
    const [internalOpen, setInternalOpen] = React.useState(false);

    // Fallback close handler
    const handleClose = () => {
        if (typeof close === 'function') {
            close();
        } else {
            setInternalOpen(false);
        }
    };

    // Sync open state
    React.useEffect(() => {
        if (typeof close !== 'function') {
            setInternalOpen(open);
        }

        if (open) {
            const timer = setTimeout(() => {
                handleClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [open]);

    return (
        <Snackbar
            variant="soft"
            color={snackbarColor}
            open={typeof close === 'function' ? open : internalOpen}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
            endDecorator={
                <Button
                    onClick={handleClose}
                    size="sm"
                    variant="soft"
                    color={snackbarColor}
                >
                    Dismiss
                </Button>
            }
        >
            {snackbarMessage}
        </Snackbar>
    );
}
