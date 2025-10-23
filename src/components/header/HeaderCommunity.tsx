import { motion, AnimatePresence } from "motion/react";
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { HEADER_ANIMATIONS, HEADER_STYLES } from "@/constants/header";
import HeaderNavigation from "./HeaderNavigation";
import type { HeaderCommunityProps } from "@/types/header";

const HeaderCommunity: React.FC<HeaderCommunityProps> = ({ config }) => {
  return (
    <PopoverGroup className="hidden lg:flex items-center lg:gap-x-[25px]">
      <Popover className="relative">
        <motion.div variants={HEADER_ANIMATIONS.navItem}>
          <PopoverButton className={HEADER_STYLES.popoverButton}>
            Community
            <motion.div
              animate={{ rotate: 0 }}
              whileHover={HEADER_ANIMATIONS.chevronHover}
            >
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
            </motion.div>
          </PopoverButton>
        </motion.div>

        <AnimatePresence>
          <PopoverPanel
            as={motion.div}
            variants={HEADER_ANIMATIONS.popover}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-white shadow-lg outline-1 outline-gray-900/5"
          >
            <div className="p-4">
              {config.community.products.map((item, index) => (
                <motion.div
                  key={item.name}
                  className={HEADER_STYLES.productItem}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: "easeOut",
                    },
                  }}
                  whileHover={{ x: 2 }}
                >
                  <motion.div
                    className={HEADER_STYLES.productIcon}
                    whileHover={{ scale: 1.05 }}
                  >
                    <item.icon
                      aria-hidden="true"
                      className="size-6 text-gray-600 group-hover:text-indigo-600"
                    />
                  </motion.div>
                  <div className="flex-auto">
                    <a href={item.href} className={HEADER_STYLES.productName}>
                      {item.name}
                      <span className="absolute inset-0" />
                    </a>
                    <p className={HEADER_STYLES.productDescription}>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
              {config.community.callsToAction.map((item, index) => (
                <motion.a
                  key={item.name}
                  target="_blank"
                  href={item.href}
                  className={HEADER_STYLES.ctaAction}
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { delay: 0.3 + index * 0.05 },
                  }}
                >
                  <item.icon aria-hidden="true" className="size-5 flex-none text-gray-400" />
                  {item.name}
                </motion.a>
              ))}
            </div>
          </PopoverPanel>
        </AnimatePresence>
      </Popover>

      <HeaderNavigation config={config} />
    </PopoverGroup>
  );
};

export default HeaderCommunity;