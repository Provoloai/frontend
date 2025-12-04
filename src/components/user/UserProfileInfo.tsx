import { motion } from "motion/react";
import { Mail, UserRound, Briefcase, Globe } from "lucide-react";
import TextInputField from "@/Reusables/TextInputField";
import { USER_PROFILE_CONFIG, USER_PROFILE_ANIMATIONS } from "@/constants/userProfile";
import type { UserProfileInfoProps } from "@/types/userProfile";
import useSession from "@/hooks/useSession";

const UserProfileInfo: React.FC<UserProfileInfoProps> = ({
  portfolioLink,
  professionalTitle,
  touched,
  updateLoading,
  onPortfolioLinkChange,
  onPortfolioLinkBlur,
  onProfessionalTitleChange,
  onProfessionalTitleBlur,
  onUpdateProfile,
}) => {
  const { user } = useSession();
  return (
    <motion.div
      className="border-b border-gray-900/10 pb-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <h2 className="text-lg text-gray-900">{USER_PROFILE_CONFIG.personalInfo.title}</h2>
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
            value={user?.displayName || ""}
            onChange={() => { }}
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
            value={user?.email || ""}
            onChange={() => { }}
            disabled
          />
        </motion.div>

        <motion.div className="sm:col-span-6" variants={USER_PROFILE_ANIMATIONS.item}>
          <TextInputField
            id="professionalTitle"
            label={USER_PROFILE_CONFIG.fields.professionalTitle.label}
            placeholder={USER_PROFILE_CONFIG.fields.professionalTitle.placeholder}
            iconStart={<Briefcase size={20} />}
            value={professionalTitle}
            onChange={(e) => onProfessionalTitleChange(e.target.value)}
            onBlur={onProfessionalTitleBlur}
            touched={touched.professionalTitle}
          />
        </motion.div>

        <motion.div className="sm:col-span-6" variants={USER_PROFILE_ANIMATIONS.item}>
          <TextInputField
            id="portfolioLink"
            label={USER_PROFILE_CONFIG.fields.portfolioLink.label}
            placeholder={USER_PROFILE_CONFIG.fields.portfolioLink.placeholder}
            iconStart={<Globe size={20} />}
            value={portfolioLink}
            onChange={(e) => onPortfolioLinkChange(e.target.value)}
            onBlur={onPortfolioLinkBlur}
            touched={touched.portfolioLink}
          />
        </motion.div>

        <motion.div className="sm:col-span-6" variants={USER_PROFILE_ANIMATIONS.item}>
          <button
            type="button"
            onClick={onUpdateProfile}
            disabled={updateLoading}
            className="btn-primary w-full px-6 py-2.5 "
          >
            {updateLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Updating...
              </span>
            ) : (
              "Update Profile"
            )}
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default UserProfileInfo;
