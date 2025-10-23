export interface UserProfileTouchedFields {
  name: boolean;
  title: boolean;
  description: boolean;
  profileLink: boolean;
}

export interface UserProfileState {
  profileLink: string;
  portalLoading: boolean;
  snackbarOpen: boolean;
  snackbarMessage: string;
}

export interface UserProfileHeaderProps {
  displayName: string;
  loadingUserData: boolean;
  user: any;
  portalLoading: boolean;
  onOpenSubscriptionPortal: () => void;
}

export interface UserProfileInfoProps {
  user: any;
  profileLink: string;
  touched: UserProfileTouchedFields;
  onProfileLinkChange: (value: string) => void;
  onProfileLinkBlur: () => void;
}

export interface UserProfileCardProps {
  // No props needed as it's static content
}

export interface UserProfileSnackbarProps {
  snackbarMessage: string;
  snackbarOpen: boolean;
  onClose: () => void;
}
