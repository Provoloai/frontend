import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "./Logo";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Book,
  Feather,
  LibraryBig,
  Recycle,
  Sparkles,
  PanelLeftClose,
  PanelRightClose,
  MessageSquareMore,
} from "lucide-react";
import UserProfile from "../pages/user/User";

const Sidebar = () => {
  const location = useRouterState({ select: (s) => s.location });
  const [isOpen, setIsOpen] = useState(true);

  const isActive = useCallback((path) => location.pathname === path, [location.pathname]);

  const linkClass = useCallback(
    (path) =>
      `relative group flex items-center rounded-md transition-all duration-200 ${isActive(path)
        ? "bg-gray-50 text-[#0c54f2]"
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-950"
      } ${isOpen ? "p-3 gap-3" : "p-3 justify-center"}`,
    [isActive, isOpen]
  );

  // Memoize navigation items
  const navItems = useMemo(
    () => [
      {
        to: "/optimizer",
        icon: <Sparkles size={20} />,
        label: "Profile Optimizer",
      },
      {
        to: "/proposal",
        icon: <Feather size={20} />,
        label: "Ai Proposals",
        badge: { text: "New", color: "green" },
      },
      {
        to: "/resume",
        icon: <Recycle size={20} />,
        label: "Resume Generator",
      },
    ],
    []
  );

  const upskillItems = useMemo(
    () => [
      {
        to: "/learn",
        icon: <LibraryBig size={20} />,
        label: "Provolo Learn",
      },
      {
        to: "https://buildsbyesuoladaniel.hashnode.space/provolo/provoloai-project-documentation",
        icon: <Book size={20} />,
        label: "Docs",
        external: true,
      },
    ],
    []
  );

  const feedbackItems = useMemo(
    () => [
      {
        to: "https://forms.gle/vWUuG7tu1HU2ksuT8",
        icon: <MessageSquareMore size={20} />,
        label: "FeedBack",
        external: true,
      },
    ],
    []
  );

  const toggleSidebar = useCallback(() => setIsOpen((prev) => !prev), []);

  const renderBadge = useCallback(
    (badge) => {
      if (!badge || !isOpen) return null;
      const colors = {
        green: "bg-green-50 text-green-700 ring-green-600/10",
        blue: "bg-blue-50 text-blue-700 ring-blue-600/10",
      };
      return (
        <motion.span
          className={`ml-auto inline-flex items-center rounded-md px-2 py-1 text-xs ring-1 ring-inset ${colors[badge.color]}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
        >
          {badge.text}
        </motion.span>
      );
    },
    [isOpen]
  );

  const renderLink = useCallback(
    ({ to, icon, label, badge, external }) => {
      const content = (
        <>
          <span className="shrink-0">{icon}</span>
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.span
                className="whitespace-nowrap"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
          {renderBadge(badge)}
          {/* Tooltip when collapsed */}
          {!isOpen && (
            <span className="absolute left-full ml-2 px-2 py-1 text-xs rounded bg-gray-900 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
              {label}
            </span>
          )}
        </>
      );

      const linkProps = {
        to,
        className: `${linkClass(to)} ${isOpen ? "gap-3" : "justify-center"}`,
        ...(external && { target: "_blank", rel: "noopener noreferrer" }),
      };

      return (
        <motion.div
          key={label}
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15 }}
        >
          <Link {...linkProps}>{content}</Link>
        </motion.div>
      );
    },
    [isOpen, linkClass, renderBadge]
  );

  return (
    <motion.div
      className={`relative h-screen flex flex-col border-r border-gray-200 text-sm bg-white ${isOpen ? "w-72 p-6" : "w-20 p-3 py-6"
        }`}
      animate={{ width: isOpen ? 288 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Toggle button */}
      <motion.button
        onClick={toggleSidebar}
        className="absolute z-20 -right-10 top-8 bg-gray-50 rounded-md p-1 hover:bg-gray-100 transition-all duration-200 text-gray-400"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isOpen ? <PanelLeftClose size={20} /> : <PanelRightClose size={20} />}
      </motion.button>

      {/* Logo */}
      <motion.div
        className={`flex gap-3 mb-10 ${isOpen ? "px-3" : "px-0 mx-auto"} w-fit relative`}
        layout
        transition={{ duration: 0.3 }}
      >
        <Logo />
      </motion.div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 h-full" aria-label="Main navigation">
        {navItems.map(renderLink)}

        {/* Upskill Section */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.p
              className="text-xs mt-10 pl-4 text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              Provolo Upskill
            </motion.p>
          )}
        </AnimatePresence>

        <span className="border border-gray-100" />
        {upskillItems.map(renderLink)}

        <span className="border mt-auto border-gray-100" />
        {feedbackItems.map(renderLink)}

        <UserProfile open={isOpen} />
      </nav>
    </motion.div>
  );
};

export default Sidebar;