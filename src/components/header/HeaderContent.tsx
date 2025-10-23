import { motion } from "motion/react";
import { PopoverGroup } from "@headlessui/react";
import HeaderLogo from "./HeaderLogo";
import HeaderMobileButton from "./HeaderMobileButton";
import HeaderCommunity from "./HeaderCommunity";
import HeaderNavigation from "./HeaderNavigation";
import HeaderLoginButton from "./HeaderLoginButton";
import HeaderMobileMenu from "./HeaderMobileMenu";
import { HEADER_STYLES } from "@/constants/header";
import type { HeaderContentProps } from "@/types/header";

const HeaderContent: React.FC<HeaderContentProps> = ({
  config,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  return (
    <>
      <motion.nav
        aria-label="Global"
        className={HEADER_STYLES.nav}
      >
        <HeaderLogo />

        <HeaderMobileButton onClick={() => setMobileMenuOpen(true)} />

        <PopoverGroup className={HEADER_STYLES.navigation}>
          <HeaderCommunity config={config} />
          <HeaderNavigation config={config} />
        </PopoverGroup>

        <HeaderLoginButton />
      </motion.nav>

      <HeaderMobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        config={config}
      />
    </>
  );
};

export default HeaderContent;