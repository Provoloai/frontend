import { useEffect } from "react";
import { motion } from "motion/react";
import { useSidebar } from "@/hooks/useSidebar";
import { useActiveLink } from "@/hooks/useActiveLink";
import { useSidebarLinkClass } from "@/hooks/useSidebarLinkClass";
import { useGetOptimizerList, useGetProposalList } from "@/api";
import { useRouterState } from "@tanstack/react-router";
import { NAV_ITEMS, UPSKILL_ITEMS, FEEDBACK_ITEMS } from "@/constants/sidebar";
import { OptimizerHistoryItem, ProposalHistoryItem } from "@/types/sidebar";
import SidebarToggle from "@/components/sidebar/SidebarToggle";
import SidebarLogo from "@/components/sidebar/SidebarLogo";
import SidebarSection from "@/components/sidebar/SidebarSection";
import SidebarSectionTitle from "@/components/sidebar/SidebarSectionTitle";
import ProposalDropdown from "@/components/sidebar/ProposalDropdown";
import UserProfile from "../pages/user/User";
import OptimizerDropdown from "@/components/sidebar/OptimizerDropdown";
import Notifications from "@/components/sidebar/Notifications";

const Sidebar = () => {
  const location = useRouterState({ select: s => s.location });
  const isOnProposalHistoryPage =
    location.pathname.startsWith("/proposalHistory/");
  const isOnOptimizerHistoryPage =
    location.pathname.startsWith("/optimizerHistory/");

  const {
    isOpen,
    toggle,
    proposalDropdownOpen,
    openProposalDropdown,
    closeProposalDropdown,
    optimizerDropdownOpen,
    openOptimizerDropdown,
    closeOptimizerDropdown,
  } = useSidebar(true);

  const { isActive } = useActiveLink();
  const { getLinkClass } = useSidebarLinkClass(isActive, isOpen);

  // Fetch proposal history
  const { data: proposalHistory } = useGetProposalList();
  const proposals: ProposalHistoryItem[] =
    proposalHistory?.data?.proposals?.map(
      (item: { id: string; jobTitle: string }) => ({
        id: item.id,
        jobTitle: item.jobTitle,
      })
    ) || [];

  // Fetch optimizer history
  const { data: optimizerHistory } = useGetOptimizerList();
  const optimizers: OptimizerHistoryItem[] =
    optimizerHistory?.data?.records?.map(
      (item: { id: string; originalInput: OptimizerHistoryItem["originalInput"] }) => ({
        id: item.id,
        originalInput: item.originalInput,
      })
    ) || [];

  // Auto-open dropdowns based on current page
  useEffect(() => {
    if (isOnProposalHistoryPage) {
      openProposalDropdown();
    }
  }, [isOnProposalHistoryPage, openProposalDropdown]);

  useEffect(() => {
    if (isOnOptimizerHistoryPage) {
      openOptimizerDropdown();
    }
  }, [isOnOptimizerHistoryPage, openOptimizerDropdown]);

  const handleProposalClick = (): void => {
    openProposalDropdown();
    closeOptimizerDropdown();
  };

  const handleOptimizerClick = (): void => {
    openOptimizerDropdown();
    closeProposalDropdown();
  };

  const handleOtherItemClick = (): void => {
    closeProposalDropdown();
    closeOptimizerDropdown();
  };

  const proposalDropdown = (
    <ProposalDropdown
      isOpen={proposalDropdownOpen && isOpen}
      proposals={proposals}
    />
  );

  const optimizerDropdown = (
    <OptimizerDropdown
      isOpen={optimizerDropdownOpen && isOpen}
      optimizers={optimizers}
    />
  );

  return (
    <motion.div
      className={`relative h-screen flex flex-col border-r border-gray-200 text-sm bg-white px-3 py-6 z-50 ${isOpen ? "w-72" : "w-20"
        }`}
      animate={{ width: isOpen ? 288 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Toggle button */}
      <SidebarToggle isOpen={isOpen} onToggle={toggle} />


      {/* Logo */}
      <SidebarLogo isOpen={isOpen} />

      {/* Navigation */}
      <nav className="flex flex-col gap-2 h-full" aria-label="Main navigation">
        {/* Main Navigation Items */}
        <SidebarSection
          items={NAV_ITEMS}
          isOpen={isOpen}
          getLinkClass={getLinkClass}
          onProposalClick={handleProposalClick}
          onOptimizerClick={handleOptimizerClick}
          onOtherItemClick={handleOtherItemClick}
          proposalDropdown={proposalDropdown}
          optimizerDropdown={optimizerDropdown}
          isProposalSection={true}
        />

        {/* Upskill Section */}
        <SidebarSectionTitle title="Provolo Upskill" isOpen={isOpen} />

        <span className="border border-gray-100" />

        <SidebarSection
          items={UPSKILL_ITEMS}
          isOpen={isOpen}
          getLinkClass={getLinkClass}
          onOtherItemClick={handleOtherItemClick}
        />

        {/* Feedback Section */}
        <span className="border mt-auto border-gray-100" />
        <SidebarSection
          items={FEEDBACK_ITEMS}
          isOpen={isOpen}
          getLinkClass={getLinkClass}
          onOtherItemClick={handleOtherItemClick}
        />

        <UserProfile open={isOpen} />
      </nav>
    </motion.div>
  );
};

export default Sidebar;