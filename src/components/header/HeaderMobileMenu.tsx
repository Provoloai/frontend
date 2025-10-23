import { motion, AnimatePresence } from "motion/react";
import {
  Dialog,
  DialogPanel,
} from "@headlessui/react";
import { Link } from "@tanstack/react-router";
import Logo from "@/Reusables/Logo";
import Vector from "@/assets/img/Vector.png";
import Vector2 from "@/assets/img/Vector2.png";
import { HEADER_STYLES } from "@/constants/header";
import type { HeaderMobileMenuProps } from "@/types/header";

const HeaderMobileMenu: React.FC<HeaderMobileMenuProps> = ({ isOpen, onClose, config }) => {
  const navItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  const mobileMenuVariantsMd = {
    hidden: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const mobileMenuVariantsSm = {
    hidden: {
      opacity: 0,
      y: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const handleNavClick = (href: string, isExternal: boolean) => {
    onClose();
    if (!isExternal && href.startsWith("#")) {
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose} className="lg:hidden">
          <motion.div
            className={HEADER_STYLES.mobileMenuOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Medium+ screens: slide from right */}
          <DialogPanel
            as={motion.div}
            variants={mobileMenuVariantsMd}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={HEADER_STYLES.mobileMenuMd}
          >
            {/* Background vectors */}
            <motion.img
              alt=""
              src={Vector}
              className={HEADER_STYLES.backgroundVector}
              style={{ zIndex: 0 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { delay: 0.3, duration: 0.5 },
              }}
            />
            <motion.img
              alt=""
              src={Vector2}
              className={HEADER_STYLES.backgroundVector2}
              style={{ zIndex: 0 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { delay: 0.4, duration: 0.5 },
              }}
            />

            {/* Content */}
            <div className="relative z-10">
              <motion.div
                className={HEADER_STYLES.mobileMenuHeader}
                variants={navItemVariants}
              >
                <motion.a href="/" whileHover={{ scale: 1.02 }}>
                  <span className="sr-only">Provolo</span>
                  <Logo />
                </motion.a>

                <motion.button
                  type="button"
                  onClick={onClose}
                  className="rounded-full bg-primary text-white p-2"
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.75 5.25L5.25064 14.7494M14.7494 14.75L5.25 5.25067"
                      stroke="white"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </motion.div>

              <motion.div className={HEADER_STYLES.mobileMenuContent} variants={navItemVariants}>
                <motion.div
                  className={HEADER_STYLES.mobileMenuNav}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.1,
                      },
                    },
                  }}
                >
                  {config.navigation.map((item) => (
                    <motion.div key={item.name} variants={navItemVariants} whileHover={{ x: 5 }}>
                      <Link
                        target={item.isExternal ? "_blank" : undefined}
                        to={item.href}
                        onClick={() => handleNavClick(item.href, item.isExternal)}
                        className={HEADER_STYLES.mobileMenuNavItem}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div className={HEADER_STYLES.mobileMenuLogin} variants={navItemVariants}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/login"
                      className={HEADER_STYLES.mobileMenuLoginButton}
                    >
                      Log in
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </DialogPanel>

          {/* Small screens: slide from bottom */}
          <DialogPanel
            as={motion.div}
            variants={mobileMenuVariantsSm}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={HEADER_STYLES.mobileMenuSm}
          >
            {/* Background vectors */}
            <motion.img
              alt=""
              src={Vector}
              className={HEADER_STYLES.backgroundVector}
              style={{ zIndex: 0 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { delay: 0.3, duration: 0.5 },
              }}
            />
            <motion.img
              alt=""
              src={Vector2}
              className={HEADER_STYLES.backgroundVector2Sm}
              style={{ zIndex: 0 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { delay: 0.4, duration: 0.5 },
              }}
            />

            {/* Content */}
            <div className="relative z-10">
              <motion.div
                className="flex items-center justify-between px-3 py-2 rounded-full bg-white"
                variants={navItemVariants}
              >
                <motion.a href="/" whileHover={{ scale: 1.02 }}>
                  <span className="sr-only">Provolo</span>
                  <Logo />
                </motion.a>

                <motion.button
                  type="button"
                  onClick={onClose}
                  className="rounded-full bg-primary text-white p-2"
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.75 5.25L5.25064 14.7494M14.7494 14.75L5.25 5.25067"
                      stroke="white"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </motion.div>

              <motion.div className={HEADER_STYLES.mobileMenuContent} variants={navItemVariants}>
                <motion.div
                  className={HEADER_STYLES.mobileMenuNav}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.1,
                      },
                    },
                  }}
                >
                  {config.navigation.map((item) => (
                    <motion.div key={item.name} variants={navItemVariants} whileHover={{ x: 5 }}>
                      <Link
                        target={item.isExternal ? "_blank" : undefined}
                        to={item.href}
                        onClick={() => handleNavClick(item.href, item.isExternal)}
                        className={HEADER_STYLES.mobileMenuNavItem}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div className={HEADER_STYLES.mobileMenuLogin} variants={navItemVariants}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/login"
                      className={HEADER_STYLES.mobileMenuLoginButton}
                    >
                      Log in
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </DialogPanel>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default HeaderMobileMenu;