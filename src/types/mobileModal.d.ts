export interface MobileModalProps {
  operatingSystem: string;
}

export interface MobileModalContentProps {
  operatingSystem: string;
  onSignOut: () => void;
}

export interface MobileModalSVGProps {
  className?: string;
  width?: number;
  height?: number;
}
