import { Link } from '@tanstack/react-router';
import React from 'react';
import { LANDINGPAGE_BUTTON_CONFIG, LANDINGPAGE_BUTTON_STYLES } from '@/constants/landingpageButton';
import type { LandingpageButtonProps } from '@/types/landingpageButton';

const LandingpageButton: React.FC<LandingpageButtonProps> = ({
  to,
  btnText,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
}) => {
  const buttonClasses = [
    LANDINGPAGE_BUTTON_CONFIG.base,
    LANDINGPAGE_BUTTON_CONFIG.variants[variant],
    LANDINGPAGE_BUTTON_CONFIG.sizes[size],
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={LANDINGPAGE_BUTTON_STYLES.container}>
      <Link
        to={to}
        className={`${LANDINGPAGE_BUTTON_STYLES.link} ${buttonClasses}`}
        onClick={onClick}
        aria-disabled={disabled}
      >
        {btnText}
      </Link>
    </div>
  );
};

export default LandingpageButton
