import { motion } from "motion/react";
import useSession from "@/hooks/useSession";
import { useUserProfile } from "@/hooks/useUserProfile";
import UserProfileHeader from "@/components/user/UserProfileHeader";
import UserProfileInfo from "@/components/user/UserProfileInfo";
import UserProfileCard from "@/components/user/UserProfileCard";
import UserProfileSnackbar from "@/components/user/UserProfileSnackbar";
import { USER_PROFILE_ANIMATIONS } from "@/constants/userProfile";
import Banner from "@/components/dashboard/Banner";

export default function UserProfile() {
  const { user, loading: loadingUserData } = useSession();

  const {
    displayName,
    touched,
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
  } = useUserProfile();

  return (
    <motion.form
      className="flex-1 flex flex-col overflow-y-auto relative h-screen px-6 sm:px-10 lg:p-20 "
      initial="hidden"
      animate="visible"
      variants={USER_PROFILE_ANIMATIONS.container}
    >
      <div className="space-y-10 m-auto max-w-3xl w-full px-10">
        <Banner />

        <UserProfileHeader
          displayName={displayName}
          loadingUserData={loadingUserData}
          user={user}
          portalLoading={portalLoading}
          onOpenSubscriptionPortal={openSubscriptionPortal}
        />

        <UserProfileInfo
          portfolioLink={portfolioLink}
          professionalTitle={professionalTitle}
          touched={touched}
          updateLoading={updateLoading}
          onPortfolioLinkChange={handlePortfolioLinkChange}
          onPortfolioLinkBlur={handlePortfolioLinkBlur}
          onProfessionalTitleChange={handleProfessionalTitleChange}
          onProfessionalTitleBlur={handleProfessionalTitleBlur}
          onUpdateProfile={handleUpdateProfile}
        />

        <UserProfileCard />
      </div>

      <UserProfileSnackbar
        snackbarMessage={snackbarMessage}
        snackbarOpen={snackbarOpen}
        onClose={closeSnackbar}
      />
    </motion.form>
  );
}