import { NavigationItem } from "@/types/sidebar";
import SidebarLink from "./SidebarLink";
import { useActiveLink } from "@/hooks/useActiveLink";

interface SidebarSectionProps {
  items: NavigationItem[];
  isOpen: boolean;
  getLinkClass: (path: string) => string;
  onProposalClick?: () => void;
  onOptimizerClick?: () => void;
  onOtherItemClick?: () => void;
  proposalDropdown?: React.ReactNode;
  optimizerDropdown?: React.ReactNode;
  isProposalSection?: boolean;
}

export default function SidebarSection({
  items,
  isOpen,
  getLinkClass,
  onProposalClick,
  onOptimizerClick,
  onOtherItemClick,
  proposalDropdown,
  optimizerDropdown,
  isProposalSection = false,
}: SidebarSectionProps) {
  const { isActive } = useActiveLink();

  return (
    <>
      {items.map((item) => {
        const isProposalLink = item.to === "/proposal";
        const isOptimizerLink = item.to === "/optimizer";
        
        return (
          <SidebarLink
            key={item.label}
            item={item}
            isActive={isActive(item.to)}
            isOpen={isOpen}
            linkClass={getLinkClass(item.to)}
            onProposalClick={onProposalClick}
            onOptimizerClick={onOptimizerClick}
            onOtherItemClick={onOtherItemClick}
            proposalDropdown={isProposalLink && isProposalSection ? proposalDropdown : undefined}
            optimizerDropdown={isOptimizerLink && isProposalSection ? optimizerDropdown : undefined}
            isProposalLink={isProposalLink}
            isOptimizerLink={isOptimizerLink}
          />
        );
      })}
    </>
  );
}