import { motion } from "motion/react";
import { Link, Mail, UserRound } from "lucide-react";
import TextInputField from "@/Reusables/TextInputField";
import { USER_PROFILE_CONFIG, USER_PROFILE_ANIMATIONS } from "@/constants/userProfile";
import type { UserProfileInfoProps } from "@/types/userProfile";

const UserProfileInfo: React.FC<UserProfileInfoProps> = ({
  user,
  profileLink,
  touched,
  onProfileLinkChange,
  onProfileLinkBlur,
}) => {
  return (
    <motion.div
      className="border-b border-gray-900/10 pb-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <h2 className="text-base text-gray-900">{USER_PROFILE_CONFIG.personalInfo.title}</h2>
      <p className="mt-1 text-sm text-gray-600">{USER_PROFILE_CONFIG.personalInfo.description}</p>

      <motion.div
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
        initial="hidden"
        animate="visible"
        variants={USER_PROFILE_ANIMATIONS.container}
      >
        <motion.div className="sm:col-span-3" variants={USER_PROFILE_ANIMATIONS.item}>
          <TextInputField
            id="fullname"
            label={USER_PROFILE_CONFIG.fields.fullname.label}
            placeholder={USER_PROFILE_CONFIG.fields.fullname.placeholder}
            iconStart={<UserRound size={20} />}
            value={user?.displayName}
            onChange={() => {}}
            disabled
          />
        </motion.div>

        <motion.div className="sm:col-span-3" variants={USER_PROFILE_ANIMATIONS.item}>
          <TextInputField
            id="email"
            type="email"
            label={USER_PROFILE_CONFIG.fields.email.label}
            placeholder={USER_PROFILE_CONFIG.fields.email.placeholder}
            iconStart={<Mail size={20} />}
            value={user?.email}
            onChange={() => {}}
            disabled
          />
        </motion.div>

        <motion.div className="sm:col-span-6" variants={USER_PROFILE_ANIMATIONS.item}>
          <TextInputField
            id="profileLink"
            label={USER_PROFILE_CONFIG.fields.profileLink.label}
            placeholder={USER_PROFILE_CONFIG.fields.profileLink.placeholder}
            iconStart={<Link size={20} />}
            value={profileLink}
            onChange={(e) => onProfileLinkChange(e.target.value)}
            onBlur={onProfileLinkBlur}
            touched={touched.profileLink}
            disabled
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default UserProfileInfo;
