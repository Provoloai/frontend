import CustomSnackbar from "@/Reusables/CustomSnackbar";
import type { UserProfileSnackbarProps } from "@/types/userProfile";

const UserProfileSnackbar: React.FC<UserProfileSnackbarProps> = ({
  snackbarMessage,
  snackbarOpen,
  onClose,
}) => {
  return (
    <CustomSnackbar
      snackbarMessage={snackbarMessage}
      snackbarColor="danger"
      open={snackbarOpen}
      close={onClose}
    />
  );
};

export default UserProfileSnackbar;
