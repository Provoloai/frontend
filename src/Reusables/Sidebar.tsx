import { useEffect } from "react";
import { motion } from "motion/react";
import { useSidebar } from "@/hooks/useSidebar";
import { useActiveLink } from "@/hooks/useActiveLink";
import { useSidebarLinkClass } from "@/hooks/useSidebarLinkClass";
import { useGetProposalList } from "@/api";
import { useRouterState } from "@tanstack/react-router";
import { NAV_ITEMS, UPSKILL_ITEMS, FEEDBACK_ITEMS } from "@/constants/sidebar";
import { ProposalHistoryItem } from "@/types/sidebar";
import SidebarToggle from "@/components/sidebar/SidebarToggle";
import SidebarLogo from "@/components/sidebar/SidebarLogo";
import SidebarSection from "@/components/sidebar/SidebarSection";
import SidebarSectionTitle from "@/components/sidebar/SidebarSectionTitle";
import ProposalDropdown from "@/components/sidebar/ProposalDropdown";
import UserProfile from "../pages/user/User";

const Sidebar = () => {
  const location = useRouterState({ select: (s) => s.location });
  const isOnProposalHistoryPage = location.pathname.startsWith('/proposalHistory/');
  
  const {
    isOpen,
    toggle,
    proposalDropdownOpen,
    openProposalDropdown,
    closeProposalDropdown,
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

  // Auto-open dropdown if on a proposal history page
  useEffect(() => {
    if (isOnProposalHistoryPage) {
      openProposalDropdown();
    }
  }, [isOnProposalHistoryPage, openProposalDropdown]);

  const handleProposalClick = (): void => {
    openProposalDropdown();
  };

  const proposalDropdown = (
    <ProposalDropdown
      isOpen={proposalDropdownOpen && isOpen}
      proposals={proposals}
    />
  );

  return (
    <motion.div
      className={`relative h-screen flex flex-col border-r border-gray-200 text-sm bg-white ${
        isOpen ? "w-72 p-6" : "w-20 p-3 py-6"
      }`}
      animate={{ width: isOpen ? 288 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Toggle button */}
      <SidebarToggle isOpen={isOpen} onToggle={toggle} />

      {/* Logo */}
      <SidebarLogo isOpen={isOpen} />

      {/* Navigation */}
      <nav className="flex flex-col gap-2 h-full " aria-label="Main navigation">
        {/* Main Navigation Items */}
        <SidebarSection
          items={NAV_ITEMS}
          isOpen={isOpen}
          getLinkClass={getLinkClass}
          onProposalClick={handleProposalClick}
          onOtherItemClick={closeProposalDropdown}
          proposalDropdown={proposalDropdown}
          isProposalSection={true}
        />

        {/* Upskill Section */}
        <SidebarSectionTitle title="Provolo Upskill" isOpen={isOpen} />

        <span className="border border-gray-100" />

        <SidebarSection
          items={UPSKILL_ITEMS}
          isOpen={isOpen}
          getLinkClass={getLinkClass}
          onOtherItemClick={closeProposalDropdown}
        />

        {/* Feedback Section */}
        <span className="border mt-auto border-gray-100" />
        <SidebarSection
          items={FEEDBACK_ITEMS}
          isOpen={isOpen}
          getLinkClass={getLinkClass}
          onOtherItemClick={closeProposalDropdown}
        />

        <UserProfile open={isOpen} />
        
      </nav>
    </motion.div>
  );
};

export default Sidebar;