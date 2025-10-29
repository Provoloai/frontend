import { useCallback } from "react";

export function useSidebarLinkClass(
  isActive: (path: string) => boolean,
  isOpen: boolean
) {
  const getLinkClass = useCallback(
    (path: string): string =>
      `relative group flex items-center rounded-md transition-all duration-200 ${
        isActive(path)
          ? "bg-gray-50 text-[#0c54f2]"
          : "text-gray-500 hover:bg-gray-50 hover:text-gray-950"
      } ${isOpen ? "p-3 gap-3" : "p-3 justify-center"}`,
    [isActive, isOpen]
  );

  return { getLinkClass };
}

