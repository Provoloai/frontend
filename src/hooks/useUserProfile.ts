import { useState, useCallback, useMemo } from "react";
import { getCustomerPortalUrl } from "@/server/checkout";
import { USER_PROFILE_CONFIG } from "@/constants/userProfile";
import type { UserProfileTouchedFields } from "@/types/userProfile";

export const useUserProfile = (user: any) => {
  const [touched, setTouched] = useState<UserProfileTouchedFields>({
    name: false,
    title: false,
    description: false,
    profileLink: false,
  });
  const [error] = useState("");
  const [profileLink, setProfileLink] = useState("");
  const [portalLoading, setPortalLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Memoize display name
  const displayName = useMemo(
    () => user?.displayName || user?.email?.split("@")[0] || "User",
    [user]
  );

  // Optimized subscription portal handler
  const openSubscriptionPortal = useCallback(async () => {
    if (!user?.polarId) {
      setSnackbarMessage(USER_PROFILE_CONFIG.subscription.noSubscriptionMessage);
      setSnackbarOpen(true);
      return;
    }
    setPortalLoading(true);
    try {
      const url = await getCustomerPortalUrl(user);
      if (url) window.location.href = url;
    } catch (e) {
      setSnackbarMessage(
        e instanceof Error ? e.message : USER_PROFILE_CONFIG.subscription.portalErrorMessage
      );
      setSnackbarOpen(true);
    } finally {
      setPortalLoading(false);
    }
  }, [user]);

  // Optimized snackbar close
  const closeSnackbar = useCallback(() => setSnackbarOpen(false), []);

  // Profile link handlers
  const handleProfileLinkChange = useCallback((value: string) => {
    setProfileLink(value);
  }, []);

  const handleProfileLinkBlur = useCallback(() => {
    setTouched(prev => ({ ...prev, profileLink: true }));
  }, []);

  return {
    displayName,
    touched,
    error,
    profileLink,
    portalLoading,
    snackbarOpen,
    snackbarMessage,
    openSubscriptionPortal,
    closeSnackbar,
    handleProfileLinkChange,
    handleProfileLinkBlur,
  };
};
