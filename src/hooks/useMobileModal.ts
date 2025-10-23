import { useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { logout } from "@/utils/logout.util";

export const useMobileModal = () => {
  const navigate = useNavigate();

  const handleSignOut = useCallback(async () => {
    try {
      await logout();
      navigate({ to: "/login", replace: true });
    } catch (error) {
      navigate({ to: "/login", replace: true });
    }
  }, [navigate]);

  return {
    handleSignOut,
  };
};
