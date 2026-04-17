import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  v2NavItemVariants,
  v2SidebarVariants,
  v2Spring,
} from "@/constants/v2Motion";
import desktopLogo from "/src/assets/v2/svg/desktop-logo.svg";
import homeLogo from "/src/assets/v2/svg/nav-home.svg";
import profileLogo from "/src/assets/v2/svg/nav-profile.svg";
import proposalLogo from "/src/assets/v2/svg/nav-proposal.svg";
import resumeLogo from "/src/assets/v2/svg/nav-resume.svg";
import analyticsLogo from "/src/assets/v2/svg/nav-analytics.svg";
import activeKnowledgeBaseLogo from "/src/assets/v2/svg/active-nav-knowledge.svg";
import settingsLogo from "/src/assets/v2/svg/nav-settings.svg";
import useSession from "@/hooks/useSession";
import { useUser } from "@/hooks/useUser";
import { auth } from "@/lib/firebase";

interface NavItem {
  label: string;
  to: string;
  icon: string;
  activeIcon: string;
  /** Match any pathname starting with `to` (for nested routes) */
  matchPrefix?: boolean;
}

const mainNavItems: NavItem[] = [
  {
    label: "Home",
    to: "/home",
    icon: homeLogo,
    activeIcon: homeLogo,
    matchPrefix: true,
  },
  {
    label: "Profile Optimizer",
    to: "/optimizer",
    icon: profileLogo,
    activeIcon: profileLogo,
  },
  {
    label: "Proposal Generator",
    to: "/proposal",
    icon: proposalLogo,
    activeIcon: proposalLogo,
  },
  {
    label: "Resume Generator",
    to: "/resume",
    icon: resumeLogo,
    activeIcon: resumeLogo,
  },
  {
    label: "Analytics",
    to: "/analytics",
    icon: analyticsLogo,
    activeIcon: analyticsLogo,
  },
];

const bottomNavItems: NavItem[] = [
  {
    label: "Knowledge Base",
    to: "/knowledge-base",
    icon: activeKnowledgeBaseLogo,
    activeIcon: activeKnowledgeBaseLogo,
    matchPrefix: true,
  },
  {
    label: "Settings",
    to: "/settings",
    icon: settingsLogo,
    activeIcon: settingsLogo,
  },
];

export default function Sidebar() {
  const pathname = useRouterState({ select: s => s.location.pathname });
  const { user: serverUser } = useSession();
  
  // Combine server session data with Firebase local data as fallback
  const user = serverUser || auth.currentUser;
  const { handleSignOut } = useUser(user);

  const displayName = user?.displayName || user?.name || "Jese Leos";
  const email = user?.email || "name@flowbite.com";
  
  const initials = displayName
    .split(" ")
    .map(n => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "JI";

  const isActive = (item: NavItem) =>
    item.matchPrefix
      ? pathname === item.to || pathname.startsWith(item.to + "/")
      : pathname === item.to;

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={v2SidebarVariants}
      className="flex h-dvh w-[16rem] py-6 px-5 shrink-0 flex-col border-r border-gray-200 bg-white"
    >
      {/* Logo */}
      <motion.div
        variants={v2NavItemVariants}
        className=" pb-5 border-b border-[#E5E7EB]"
      >
        <img src={desktopLogo} alt="Provolo" className="h-7" />
      </motion.div>

      {/* Main nav */}
      <nav className=" space-y-1 pb-4 pt-5 border-b border-[#E5E7EB]">
        {mainNavItems.map(item => {
          const active = isActive(item);

          return (
            <motion.div
              key={item.to}
              variants={v2NavItemVariants}
              whileHover={{ x: active ? 0 : 2 }}
              transition={v2Spring}
            >
              <Link
                to={item.to}
                className={`relative flex items-center gap-3 overflow-hidden rounded-xl px-2 py-1.5 font-medium transition-colors ${
                  active
                    ? "text-primary"
                    : "text-secondary hover:bg-light hover:text-dark"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="sidebar-active-pill"
                    transition={v2Spring}
                    className="absolute inset-0 rounded-xl bg-[#EEF6FF]"
                  />
                )}
                <img
                  src={active ? item.activeIcon : item.icon}
                  alt={`${item.label} icon`}
                  className="relative z-10"
                />
                <span className="relative z-10">{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Bottom nav */}
      <div className="space-y-1 py-4">
        {bottomNavItems.map(item => {
          const active = isActive(item);

          return (
            <motion.div
              key={item.to}
              variants={v2NavItemVariants}
              whileHover={{ x: active ? 0 : 2 }}
              transition={v2Spring}
            >
              <Link
                to={item.to}
                className={`relative flex items-center gap-3 overflow-hidden rounded-xl px-2 py-1.5 font-medium transition-colors ${
                  active
                    ? "text-primary"
                    : "text-secondary hover:bg-light hover:text-dark"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="sidebar-active-pill"
                    transition={v2Spring}
                    className="absolute inset-0 rounded-xl bg-[#EEF6FF]"
                  />
                )}
                <img
                  src={active ? item.activeIcon : item.icon}
                  alt={`${item.label} icon`}
                  className="relative z-10"
                />
                <span className="relative z-10">{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* User footer */}
      <motion.div
        variants={v2NavItemVariants}
        className="border-t border-[#E5E7EB] pt-4 mt-auto"
      >
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarFallback className="bg-primary text-xs font-semibold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-dark">
              {displayName}
            </p>
            <p className="truncate text-xs text-secondary">{email}</p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="mt-3 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 focus:outline-none"
          title="Sign out"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </motion.div>
    </motion.aside>
  );
}
