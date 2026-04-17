import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { getCustomerPortalUrl } from "@/server/checkout";
import { logout } from "@/utils/logout.util";
import { USER_CONFIG } from "@/constants/user";
import type { UserData } from "@/types/user";

export const useUser = (userData: any) => {
  const navigate = useNavigate();
  const [portalLoading, setPortalLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Memoize user data to prevent recalculation
  const user = useMemo(
    (): UserData => ({
      name: userData?.displayName ?? USER_CONFIG.messages.defaultUserName,
      email: userData?.email,
    }),
    [userData]
  );

  const isPro = useMemo(() => userData?.tierId === "plus", [userData?.tierId]);

  // Optimized subscription portal handler
  const openSubscriptionPortal = useCallback(async () => {
    if (!userData?.polarId) {
      setSnackbarMessage(USER_CONFIG.subscription.noSubscriptionMessage);
      setSnackbarOpen(true);
      return;
    }
    setPortalLoading(true);
    try {
      const url = await getCustomerPortalUrl(userData);
      if (url) window.location.href = url;
    } catch (e) {
      setSnackbarMessage(
        e instanceof Error ? e.message : USER_CONFIG.subscription.portalErrorMessage
      );
      setSnackbarOpen(true);
    } finally {
      setPortalLoading(false);
    }
  }, [userData]);

  // Optimized sign out handler
  const handleSignOut = useCallback(async () => {
    try {
      await logout();
      // Force reload the page so react-query and all contexts are thoroughly wiped, 
      // preventing any cached session data from redirecting them back to the dashboard immediately.
      window.location.href = "/login";
    } catch {
      window.location.href = "/login";
    }
  }, []);

  // Optimized snackbar close handler
  const closeSnackbar = useCallback(() => setSnackbarOpen(false), []);

  return {
    user,
    isPro,
    portalLoading,
    snackbarOpen,
    snackbarMessage,
    openSubscriptionPortal,
    handleSignOut,
    closeSnackbar,
  };
};
