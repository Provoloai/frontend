import { useState, useCallback, useMemo, useEffect } from "react";
import { getCustomerPortalUrl } from "@/server/checkout";
import { USER_PROFILE_CONFIG } from "@/constants/userProfile";
import type { UserProfileTouchedFields } from "@/types/userProfile";
import { authApi } from "@/api";
import useSession from "./useSession";

export const useUserProfile = () => {
  const { user, refetch } = useSession();
  const [touched, setTouched] = useState<UserProfileTouchedFields>({
    name: false,
    title: false,
    description: false,
    portfolioLink: false,
    professionalTitle: false,
  });
  const [error] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [professionalTitle, setProfessionalTitle] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Sync local state with user session data
  useEffect(() => {
    if (user) {
      setPortfolioLink(user?.portfolioLink || "");
      setProfessionalTitle(user?.professionalTitle || "");
    }
  }, [user]);

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

  // Portfolio link handlers
  const handlePortfolioLinkChange = useCallback((value: string) => {
    setPortfolioLink(value);
  }, []);

  const handlePortfolioLinkBlur = useCallback(() => {
    setTouched(prev => ({ ...prev, portfolioLink: true }));
  }, []);

  // Professional title handlers
  const handleProfessionalTitleChange = useCallback((value: string) => {
    setProfessionalTitle(value);
  }, []);

  const handleProfessionalTitleBlur = useCallback(() => {
    setTouched(prev => ({ ...prev, professionalTitle: true }));
  }, []);

  // Update profile handler
  const handleUpdateProfile = useCallback(async () => {
    if (!user) return;

    const trimmedPortfolioLink = portfolioLink.trim();
    const trimmedProfessionalTitle = professionalTitle.trim();

    // Validate that at least one field is filled
    if (!trimmedPortfolioLink && !trimmedProfessionalTitle) {
      setSnackbarMessage("Please fill in at least one field (Portfolio Link or Professional Title) to update your profile.");
      setSnackbarOpen(true);
      return;
    }

    setUpdateLoading(true);
    try {
      const updateData: {
        portfolio_link?: string;
        professional_title?: string;
      } = {};

      if (trimmedPortfolioLink) {
        updateData.portfolio_link = trimmedPortfolioLink;
      }

      if (trimmedProfessionalTitle) {
        updateData.professional_title = trimmedProfessionalTitle;
      }

      await authApi.updateProfile(updateData);

      // Refresh user session to get updated data
      await refetch();

      setSnackbarMessage("Profile updated successfully!");
      setSnackbarOpen(true);
    } catch (e) {
      setSnackbarMessage(
        e instanceof Error ? e.message : "Failed to update profile. Please try again."
      );
      setSnackbarOpen(true);
    } finally {
      setUpdateLoading(false);
    }
  }, [user, portfolioLink, professionalTitle, refetch]);

  return {
    displayName,
    touched,
    error,
    portfolioLink,
    professionalTitle,
    updateLoading,
    portalLoading,
    snackbarOpen,
    snackbarMessage,
    openSubscriptionPortal,
    closeSnackbar,
    handlePortfolioLinkChange,
    handlePortfolioLinkBlur,
    handleProfessionalTitleChange,
    handleProfessionalTitleBlur,
    handleUpdateProfile,
  };
};
