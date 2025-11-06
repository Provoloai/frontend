export interface UserProfileTouchedFields {
  name: boolean;
  title: boolean;
  description: boolean;
  portfolioLink: boolean;
  professionalTitle: boolean;
}

export interface UserProfileState {
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
  portfolioLink: string;
  professionalTitle: string;
  touched: UserProfileTouchedFields;
  updateLoading: boolean;
  onPortfolioLinkChange: (value: string) => void;
  onPortfolioLinkBlur: () => void;
  onProfessionalTitleChange: (value: string) => void;
  onProfessionalTitleBlur: () => void;
  onUpdateProfile: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UserProfileCardProps {}

export interface UserProfileSnackbarProps {
  snackbarMessage: string;
  snackbarOpen: boolean;
  onClose: () => void;
}
