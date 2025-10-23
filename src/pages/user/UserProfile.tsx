import { motion } from "motion/react";
import useSession from "@/hooks/useSession";
import { useUserProfile } from "@/hooks/useUserProfile";
import UserProfileHeader from "@/components/user/UserProfileHeader";
import UserProfileInfo from "@/components/user/UserProfileInfo";
import UserProfileCard from "@/components/user/UserProfileCard";
import UserProfileSnackbar from "@/components/user/UserProfileSnackbar";
import { USER_PROFILE_ANIMATIONS } from "@/constants/userProfile";

export default function UserProfile() {
  const { user, loading: loadingUserData } = useSession();
  
  const {
    displayName,
    touched,
    profileLink,
    portalLoading,
    snackbarOpen,
    snackbarMessage,
    openSubscriptionPortal,
    closeSnackbar,
    handleProfileLinkChange,
    handleProfileLinkBlur,
  } = useUserProfile(user);

  return (
    <motion.form
      className="flex-1 flex flex-col overflow-y-auto relative h-screen px-6 sm:px-10 lg:px-20"
      initial="hidden"
      animate="visible"
      variants={USER_PROFILE_ANIMATIONS.container}
    >
      <div className="space-y-10 m-auto max-w-3xl w-full p-10">
        <UserProfileHeader
          displayName={displayName}
          loadingUserData={loadingUserData}
          user={user}
          portalLoading={portalLoading}
          onOpenSubscriptionPortal={openSubscriptionPortal}
        />

        <UserProfileInfo
          user={user}
          profileLink={profileLink}
          touched={touched}
          onProfileLinkChange={handleProfileLinkChange}
          onProfileLinkBlur={handleProfileLinkBlur}
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