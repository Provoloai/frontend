import { useState } from "react";

export const useSidebar = (defaultOpen = true) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [proposalDropdownOpen, setProposalDropdownOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const openProposalDropdown = () => {
    setProposalDropdownOpen(true);
  };

  const closeProposalDropdown = () => {
    setProposalDropdownOpen(false);
  };

  return {
    isOpen,
    toggle,
    proposalDropdownOpen,
    openProposalDropdown,
    closeProposalDropdown,
  };
};