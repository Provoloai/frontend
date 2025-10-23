import { motion, AnimatePresence } from "motion/react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Link } from "@tanstack/react-router";
import Vector from "@/assets/img/Vector.png";
import Vector2 from "@/assets/img/Vector2.png";
import Logo from "@/Reusables/Logo";
import HeaderMobileMenuCloseButton from "./HeaderMobileMenuCloseButton";
import HeaderCTA from "./HeaderCTA";
import { HEADER_ANIMATIONS, HEADER_STYLES } from "@/constants/header";
import type { HeaderMobileMenuProps } from "@/types/header";

const HeaderMobileMenu: React.FC<HeaderMobileMenuProps> = ({ config, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose} className="lg:hidden">
          <motion.div
            className="fixed inset-0 z-50 bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <DialogPanel
            as={motion.div}
            variants={HEADER_ANIMATIONS.mobileMenu}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={HEADER_STYLES.mobileMenuContainer}
          >
            <motion.div
              className={HEADER_STYLES.mobileMenuHeader}
              variants={HEADER_ANIMATIONS.navItem}
            >
              <motion.a 
                href={config.logo.href} 
                className="" 
                whileHover={{ scale: 1.02 }}
              >
                <span className="sr-only">{config.logo.alt}</span>
                <Logo />
              </motion.a>

              <HeaderMobileMenuCloseButton onClick={onClose} />
            </motion.div>

            <motion.div className={HEADER_STYLES.mobileMenuContent} variants={HEADER_ANIMATIONS.navItem}>
              <div className="">
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
                  {config.navigation.items.map((item) => (
                    <motion.div 
                      key={item.name} 
                      variants={HEADER_ANIMATIONS.navItem} 
                      whileHover={HEADER_ANIMATIONS.mobileLinkHover}
                    >
                      <Link
                        target={item.isExternal ? "_blank" : undefined}
                        to={item.href}
                        className={HEADER_STYLES.mobileNavLink}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                <HeaderCTA config={config} isMobile />
              </div>
            </motion.div>

            <motion.img
              alt="Provolo background vector graphic"
              src={Vector}
              className="absolute top-0 left-0 lg:w-1/5 w-[60%] -z-5"
              variants={HEADER_ANIMATIONS.backgroundVector}
            />
            <motion.img
              alt="Provolo accent vector design"
              src={Vector2}
              className="absolute bottom-0 right-0 w-[80%]"
              variants={HEADER_ANIMATIONS.backgroundVector2}
            />
          </DialogPanel>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default HeaderMobileMenu;
