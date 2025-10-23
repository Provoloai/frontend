import { motion } from "motion/react";
import { MenuButton } from "@headlessui/react";
import { GenerateAvatar } from "@/Reusables/GenerateAvatar";
import { USER_ANIMATIONS } from "@/constants/user";
import type { UserButtonProps } from "@/types/user";

const UserButton: React.FC<UserButtonProps> = ({
  user,
  userData,
  loadingUserData,
  open,
}) => {
  return (
    <MenuButton className="relative flex pl-3 w-full items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-opacity duration-200 hover:opacity-80">
      <span className="absolute" aria-hidden="true" />

      {loadingUserData ? (
        <div className="size-8 rounded-full bg-gray-300 animate-pulse" />
      ) : (
        <GenerateAvatar name={userData?.displayName} size={32} />
      )}

      {open && (
        <motion.span
          className="ml-3"
          initial="hidden"
          animate="visible"
          variants={USER_ANIMATIONS.fadeIn}
        >
          <p className="text-sm">{user.name}</p>
          <p className="text-xs text-gray-400 text-start capitalize">
            {userData?.tierId}
          </p>
        </motion.span>
      )}
    </MenuButton>
  );
};

export default UserButton;
