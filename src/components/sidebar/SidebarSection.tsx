import { NavigationItem } from "@/types/sidebar";
import SidebarLink from "./SidebarLink";
import { useActiveLink } from "@/hooks/useActiveLink";

interface SidebarSectionProps {
  items: NavigationItem[];
  isOpen: boolean;
  getLinkClass: (path: string) => string;
  onProposalClick?: () => void;
  onOtherItemClick?: () => void;
  proposalDropdown?: React.ReactNode;
  isProposalSection?: boolean;
}

export default function SidebarSection({
  items,
  isOpen,
  getLinkClass,
  onProposalClick,
  onOtherItemClick,
  proposalDropdown,
  isProposalSection = false,
}: SidebarSectionProps) {
  const { isActive } = useActiveLink();

  return (
    <>
      {items.map((item) => {
        const isProposalLink = item.to === "/proposal";
        return (
          <SidebarLink
            key={item.label}
            item={item}
            isActive={isActive(item.to)}
            isOpen={isOpen}
            linkClass={getLinkClass(item.to)}
            onProposalClick={onProposalClick}
            onOtherItemClick={onOtherItemClick}
            proposalDropdown={isProposalLink && isProposalSection ? proposalDropdown : undefined}
            isProposalLink={isProposalLink}
          />
        );
      })}
    </>
  );
}

