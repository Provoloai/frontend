import { motion } from "motion/react";
import { GenerateAvatar } from "@/Reusables/GenerateAvatar";
import { USER_PROFILE_CONFIG } from "@/constants/userProfile";
import type { UserProfileHeaderProps } from "@/types/userProfile";

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
  displayName,
  loadingUserData,
  user,
  portalLoading,
  onOpenSubscriptionPortal,
}) => {
  return (
    <motion.div
      className="border-b border-gray-900/10 pb-5 flex flex-col sm:flex-row justify-between gap-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex align-middle gap-5 items-center">
        {loadingUserData ? (
          <div className="size-12 rounded-full bg-gray-300 animate-pulse" />
        ) : (
          <GenerateAvatar name={user?.displayName} size={48} />
        )}
        <p className="text-2xl sm:text-3xl font-medium">{displayName}</p>
      </div>

      {user?.polarId && (
        <motion.button
          type="button"
          onClick={onOpenSubscriptionPortal}
          disabled={portalLoading}
          className="h-fit mt-auto items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-primary ring-1 ring-primary/10 ring-inset hover:bg-blue-100 hover:text-primary/90 transition-all duration-200 flex w-fit disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: portalLoading ? 1 : 1.05 }}
          whileTap={{ scale: portalLoading ? 1 : 0.98 }}
        >
          {portalLoading && (
            <svg className="size-4 animate-spin mr-1" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          )}
          {USER_PROFILE_CONFIG.subscription.buttonText}
        </motion.button>
      )}
    </motion.div>
  );
};

export default UserProfileHeader;
