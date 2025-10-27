import { motion, AnimatePresence } from "motion/react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { HEADER_STYLES } from "@/constants/header";
import type { HeaderCommunityProps } from "@/types/header";

const HeaderCommunity: React.FC<HeaderCommunityProps> = ({ config }) => {
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

  const popoverVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut" as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.15,
        ease: "easeIn" as const,
      },
    },
  };

  return (
    <Popover className="relative">
      <motion.div variants={navItemVariants}>
        <PopoverButton className="focus:outline-none flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 hover:text-primary transition-colors duration-200">
          Company
          <motion.div
            animate={{ rotate: 0 }}
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
          </motion.div>
        </PopoverButton>
      </motion.div>

      <AnimatePresence>
        <PopoverPanel
          as={motion.div}
          variants={popoverVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={HEADER_STYLES.popover}
        >
          <div className={HEADER_STYLES.popoverContent}>
            {config.products.map((item, index) => (
              <motion.div
                key={item.name}
                className={HEADER_STYLES.popoverItem}
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
                  className={HEADER_STYLES.popoverIcon}
                  whileHover={{ scale: 1.05 }}
                >
                  <item.icon
                    aria-hidden="true"
                    className="size-6 text-gray-600 group-hover:text-indigo-600"
                  />
                </motion.div>
                <div className="flex-auto">
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="block font-bold text-gray-900">
                    {item.name}
                    <span className="absolute inset-0" />
                  </a>
                  <p className="mt-1 text-gray-600 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className={HEADER_STYLES.popoverActions}>
            {config.callsToAction.map((item, index) => (
              <motion.a
                key={item.name}
                target="_blank"
                rel="noopener noreferrer"
                href={item.href}
                className={HEADER_STYLES.popoverAction}
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
  );
};

export default HeaderCommunity;