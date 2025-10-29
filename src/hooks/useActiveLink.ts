import { useRouterState } from "@tanstack/react-router";
import { useMemo, useCallback } from "react";

export function useActiveLink() {
  const location = useRouterState({ select: (s) => s.location });

  const isActive = useMemo(
    () => (path: string) => location.pathname === path,
    [location.pathname]
  );

  return { isActive, currentPath: location.pathname };
}

