import { useState } from "react";

export const useHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openMobileMenu = () => setMobileMenuOpen(true);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return {
    mobileMenuOpen,
    setMobileMenuOpen,
    openMobileMenu,
    closeMobileMenu,
  };
};