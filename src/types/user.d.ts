export interface UserNavigationItem {
  name: string;
  href: string;
}

export interface UserData {
  name?: string;
  email: string;
  providers?: string[];
}

export interface UserState {
  portalLoading: boolean;
  snackbarOpen: boolean;
  snackbarMessage: string;
}

export interface UserButtonProps {
  user: UserData;
  userData: any;
  loadingUserData: boolean;
  open: boolean;
}

export interface UserMenuProps {
  user: UserData;
  userData: any;
  isPro: boolean;
  portalLoading: boolean;
  open: boolean;
  onOpenSubscriptionPortal: () => void;
}

export interface UserActionsProps {
  user: UserData;
  userData: any;
  isPro: boolean;
  portalLoading: boolean;
  onOpenSubscriptionPortal: () => void;
}

export interface UserSnackbarProps {
  snackbarMessage: string;
  snackbarOpen: boolean;
  onClose: () => void;
}
