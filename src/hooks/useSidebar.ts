import { useState, useCallback } from "react";

export function useSidebar(initialState = true) {
  const [isOpen, setIsOpen] = useState(initialState);
  const [proposalDropdownOpen, setProposalDropdownOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggleProposalDropdown = useCallback(
    () => setProposalDropdownOpen((prev) => !prev),
    []
  );
  const closeProposalDropdown = useCallback(
    () => setProposalDropdownOpen(false),
    []
  );

  return {
    isOpen,
    toggle,
    open,
    close,
    proposalDropdownOpen,
    toggleProposalDropdown,
    closeProposalDropdown,
  };
}

