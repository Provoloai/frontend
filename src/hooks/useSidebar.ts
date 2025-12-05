// File: src/hooks/useSidebar.ts

import { useState, useEffect } from "react";

interface UseSidebarReturn {
  isOpen: boolean;
  toggle: () => void;
  proposalDropdownOpen: boolean;
  optimizerDropdownOpen: boolean;
  openProposalDropdown: () => void;
  closeProposalDropdown: () => void;
  openOptimizerDropdown: () => void;
  closeOptimizerDropdown: () => void;
}

export const useSidebar = (initialOpen: boolean = true): UseSidebarReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved !== null ? JSON.parse(saved) : initialOpen;
  });

  const [proposalDropdownOpen, setProposalDropdownOpen] = useState<boolean>(
    () => {
      const saved = localStorage.getItem("proposalDropdownOpen");
      return saved !== null ? JSON.parse(saved) : false;
    }
  );

  const [optimizerDropdownOpen, setOptimizerDropdownOpen] = useState<boolean>(
    () => {
      const saved = localStorage.getItem("optimizerDropdownOpen");
      return saved !== null ? JSON.parse(saved) : false;
    }
  );

  // Persist sidebar open state
  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  // Persist proposal dropdown state
  useEffect(() => {
    localStorage.setItem(
      "proposalDropdownOpen",
      JSON.stringify(proposalDropdownOpen)
    );
  }, [proposalDropdownOpen]);

    useEffect(() => {

    localStorage.setItem(
      "optimizerDropdownOpen",
      JSON.stringify(optimizerDropdownOpen)
    );
  }, [optimizerDropdownOpen]);

  const toggle = (): void => setIsOpen(prev => !prev);

  const openProposalDropdown = (): void => setProposalDropdownOpen(true);

  const closeProposalDropdown = (): void => setProposalDropdownOpen(false);

  const openOptimizerDropdown = () => setOptimizerDropdownOpen(true);
  const closeOptimizerDropdown = () => setOptimizerDropdownOpen(false);

  return {
    isOpen,
    toggle,
    proposalDropdownOpen,
    optimizerDropdownOpen,
    openProposalDropdown,
    closeProposalDropdown,
    openOptimizerDropdown,
    closeOptimizerDropdown,
  };
};
