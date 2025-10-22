"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from "@heroicons/react/20/solid";
import Logo from "../../Reusables/Logo";
import { Link } from "@tanstack/react-router";
import { Book, LibraryBig, MailIcon, MoveRight, Send } from "lucide-react";
import Vector from "../../assets/img/Vector.png";
import Vector2 from "../../assets/img/Vector2.png";

const products = [
  {
    name: "Provolo Learn",
    description: "A space to level up your online presence, land more gigs, and grow your career.",
    href: "https://x.com/i/communities/1971577100684431600",
    icon: ChartPieIcon,
  },
  {
    name: "Facebook",
    description: "Get latest updates on our product",
    href: "https://web.facebook.com/profile.php?id=61581683004716",
    icon: CursorArrowRaysIcon,
  },
  // {
  //   name: "Security",
  //   description: "Your customers data will be safe and secure",
  //   href: "#",
  //   icon: FingerPrintIcon,
  // },
  // {
  //   name: "Substack",
  //   description: "Connect with third-party tools",
  //   href: "#",
  //   icon: LibraryBig,
  // },
  // {
  //   name: "Automations",
  //   description: "Build strategic funnels that will convert",
  //   href: "#",
  //   icon: ArrowPathIcon,
  // },
];
const callsToAction = [
  { name: "Watch Demo", href: "https://www.youtube.com/@Provoloai", icon: PlayCircleIcon },
  { name: "Contact Support", href: "mailto:support@provolo.org", icon: Send },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Header entrance animation
  const headerVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      backdropFilter: "blur(0px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      backdropFilter: "blur(10px)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Navigation items animation
  const navItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  // Mobile menu animation
  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  // Popover animation
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
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.15,
        ease: "easeIn",
      },
    },
  };

  return (
    <motion.header
      className="bg-transparent lg:pt-10 md:pt-8 pt-10 fixed z-20 w-screen px-5"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.nav
        aria-label="Global"
        className="mx-auto flex max-w-[906.67px] items-center justify-between lg:p-[15px] py-2 px-4 bg-white rounded-full"
      // style={{
      //     boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)"
      // }}
      // whileHover={{
      //     boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
      //     transition: { duration: 0.3, ease: "easeOut" }
      // }}
      >
        <motion.div className="flex mr-10" variants={navItemVariants}>
          <motion.a href="/" className="" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <span className="sr-only">Your Company</span>
            <Logo />
          </motion.a>
        </motion.div>

        <motion.div className="flex lg:hidden" variants={navItemVariants}>
          <motion.button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className=" inline-flex items-center justify-center rounded-full bg-primary text-white p-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">Open main menu</span>
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <path
                d="M6.04163 4.4585H13.9583"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.66663 10H16.3333"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.04163 15.5415H13.9583"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.button>
        </motion.div>

        <PopoverGroup className="hidden lg:flex items-center lg:gap-x-[25px]">
          <Popover className="relative">
            <motion.div variants={navItemVariants}>
              <PopoverButton className=" focus:outline-none flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 hover:text-primary transition-colors duration-200">
                Community
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
                className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-white shadow-lg outline-1 outline-gray-900/5"
              >
                <div className="p-4">
                  {products.map((item, index) => (
                    <motion.div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
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
                        className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
                        whileHover={{ scale: 1.05 }}
                      >
                        <item.icon
                          aria-hidden="true"
                          className="size-6 text-gray-600 group-hover:text-indigo-600"
                        />
                      </motion.div>
                      <div className="flex-auto">
                        <a href={item.href} className="block font-bold text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item, index) => (
                    <motion.a
                      key={item.name}
                      target="_blank"
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
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

          {["Features", "How it Works", "FAQs", "Blogs"].map((item, index) => {
            const links = [
              "#features",
              "#howitworks",
              "https://buildsbyesuoladaniel.hashnode.space/provolo/faqs",
              "https://provoloai.substack.com/",
            ];
            const isExternal = index >= 2;

            return (
              <motion.div key={item} variants={navItemVariants}>
                <Link
                  target={isExternal ? "_blank" : undefined}
                  to={links[index]}
                  className="text-sm my-auto hover:text-primary transition-colors duration-200 flex"
                >
                  <motion.span whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                    {item}
                  </motion.span>
                </Link>
              </motion.div>
            );
          })}
        </PopoverGroup>

        <motion.div className="hidden lg:flex lg:flex-1 lg:justify-end" variants={navItemVariants}>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to={"/login"}
              className="bg-primary hover:bg-primary/90 transition-all duration-300 py-[18px] px-[24px] rounded-full text-sm text-white h-[44px] text-center align-middle flex justify-center items-center"
            >
              Log in
              <motion.span
                aria-hidden="true"
                animate={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                {/* <MoveRight size={20} /> */}
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
            <motion.div
              className="fixed inset-0 z-50 bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            <DialogPanel
              as={motion.div}
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#F7F8F9] p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
            >
              <motion.div
                className="flex items-center justify-between mt-5 px-3 py-2 rounded-full relative z-50 bg-white"
                variants={navItemVariants}
              >
                <motion.a href="/" className="" whileHover={{ scale: 1.02 }}>
                  <span className="sr-only">Your Company</span>
                  <Logo />
                </motion.a>

                <motion.button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className=" rounded-full bg-primary text-white p-2"
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

              <motion.div className="mt-10 flow-root relative z-50" variants={navItemVariants}>
                <div className="">
                  <motion.div
                    className="space-y-2 py-6"
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
                    {["Features", "How it Works", "FAQs", "Blogs"].map((item, index) => {
                      const links = [
                        "#features",
                        "#howitworks",
                        "https://buildsbyesuoladaniel.hashnode.space/provolo/faqs",
                        "https://provoloai.substack.com/",
                      ];
                      const isExternal = index >= 2;

                      return (
                        <motion.div key={item} variants={navItemVariants} whileHover={{ x: 5 }}>
                          <Link
                            target={isExternal ? "_blank" : undefined}
                            to={links[index]}
                            className="text-sm my-auto block p-3 rounded-lg hover:bg-white/50 transition-colors duration-200"
                          >
                            {item}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.div>

                  <motion.div className="py-6" variants={navItemVariants}>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to={"/login"}
                        className="bg-primary hover:bg-primary/90 transition-all duration-300 py-[18px] px-[24px] rounded-full text-sm text-white h-[44px] text-center align-middle flex justify-center items-center w-fit"
                      >
                        Log in
                        <motion.span aria-hidden="true" whileHover={{ x: 3 }}>
                          {/* <MoveRight size={20} /> */}
                        </motion.span>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.img
                alt="Provolo background vector graphic"
                src={Vector}
                className="absolute top-0 left-0 lg:w-1/5 w-[60%] -z-5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { delay: 0.3, duration: 0.5 },
                }}
              />
              <motion.img
                alt="Provolo accent vector design"
                src={Vector2}
                className="absolute bottom-0 right-0 w-[80%]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { delay: 0.4, duration: 0.5 },
                }}
              />
            </DialogPanel>
          </Dialog>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
