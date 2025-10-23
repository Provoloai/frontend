import { motion } from "motion/react";
import HeaderLogo from "./HeaderLogo";
import HeaderCommunity from "./HeaderCommunity";
import HeaderMobileMenuButton from "./HeaderMobileMenuButton";
import HeaderCTA from "./HeaderCTA";
import HeaderMobileMenu from "./HeaderMobileMenu";
import { HEADER_ANIMATIONS } from "@/constants/header";
import type { HeaderContentProps } from "@/types/header";

const HeaderContent: React.FC<HeaderContentProps> = ({
  config,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  return (
    <motion.header
      className="bg-transparent lg:pt-10 md:pt-8 pt-10 fixed z-20 w-screen px-5"
      variants={HEADER_ANIMATIONS.header}
      initial="hidden"
      animate="visible"
    >
      <motion.nav
        aria-label="Global"
        className="mx-auto flex max-w-[906.67px] items-center justify-between lg:p-[15px] py-2 px-4 bg-white rounded-full"
      >
        <HeaderLogo config={config} />
        <HeaderMobileMenuButton onClick={() => setMobileMenuOpen(true)} />
        <HeaderCommunity config={config} />
        <HeaderCTA config={config} />
      </motion.nav>

      <HeaderMobileMenu
        config={config}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </motion.header>
  );
};

export default HeaderContent;
