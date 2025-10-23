export interface LandingpageButtonProps {
  to: string;
  btnText: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

export interface LandingpageButtonConfig {
  variants: {
    primary: string;
    secondary: string;
    outline: string;
  };
  sizes: {
    sm: string;
    md: string;
    lg: string;
  };
  base: string;
}
