import { motion, AnimatePresence } from "motion/react";
import { Link } from "@tanstack/react-router";
import { NavigationItem } from "@/types/sidebar";
import SidebarBadge from "./SidebarBadge";

interface SidebarLinkProps {
  item: NavigationItem;
  isActive: boolean;
  isOpen: boolean;
  linkClass: string;
  onProposalClick?: () => void;
  onOptimizerClick?: () => void;
  onOtherItemClick?: () => void;
  proposalDropdown?: React.ReactNode;
  optimizerDropdown?: React.ReactNode;
  isProposalLink?: boolean;
  isOptimizerLink?: boolean;
}

export default function SidebarLink({
  item,
  // isActive,
  isOpen,
  linkClass,
  onProposalClick,
  onOptimizerClick,
  onOtherItemClick,
  proposalDropdown,
  optimizerDropdown,
  isProposalLink = false,
  isOptimizerLink = false,
}: SidebarLinkProps) {
  const { to, icon, label, badge, external } = item;

  const content = (
    <>
      <span className="shrink-0 pl-1.5">
        {icon}
      </span>

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

      <SidebarBadge badge={badge} show={isOpen} />

      {/* Tooltip when collapsed */}
      {!isOpen && (
        <span className="absolute left-full ml-5 px-2 py-1 text-xs rounded bg-gray-900 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
          {label}
        </span>
      )}
    </>
  );

  const linkProps = {
    to,
    className: `${linkClass} ${isOpen ? "gap-3" : ""}`,
    ...(external && { target: "_blank", rel: "noopener noreferrer" }),
    ...(isProposalLink && onProposalClick && { onClick: onProposalClick }),
    ...(isOptimizerLink && onOptimizerClick && { onClick: onOptimizerClick }),
    ...(!isProposalLink && !isOptimizerLink && !external && onOtherItemClick && { onClick: onOtherItemClick }),
  };

  return (
    <div key={label}>
      <motion.div
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
      >
        <Link {...linkProps}>{content}</Link>
      </motion.div>

      {/* Proposal History Dropdown */}
      {isProposalLink && proposalDropdown}
      
      {/* Optimizer History Dropdown */}
      {isOptimizerLink && optimizerDropdown}
    </div>
  );
}