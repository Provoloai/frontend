import { motion } from "motion/react";
import provoolosvg from "@/assets/img/Provoloaisvg.png";
import { USER_PROFILE_CONFIG } from "@/constants/userProfile";

const UserProfileCard: React.FC = () => {
  return (
    <motion.div
      className="bg-[#F3F4F5] p-6 rounded-xl border border-gray-300 grid lg:grid-cols-3 lg:gap-0 gap-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="lg:col-span-2 flex flex-col gap-3 justify-between lg:pr-20 pr-5">
        <p className="text-sm font-headingmd">{USER_PROFILE_CONFIG.infoCard.title}</p>
        <p className="text-sm text-gray-500">{USER_PROFILE_CONFIG.infoCard.description}</p>
        <p className="text-sm text-gray-500">
          {USER_PROFILE_CONFIG.infoCard.supportText}{" "}
          <a
            href={`mailto:${USER_PROFILE_CONFIG.infoCard.supportEmail}`}
            className="underline hover:text-gray-700 transition-colors duration-200"
          >
            {USER_PROFILE_CONFIG.infoCard.supportEmail}
          </a>
          {" "}{USER_PROFILE_CONFIG.infoCard.supportEndText}
        </p>
      </div>

      <div className="lg:border-l-2 lg:pt-0 pt-10 border-gray-300 border-dashed flex items-center">
        <motion.a
          href={USER_PROFILE_CONFIG.infoCard.qrLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col ml-auto items-end justify-between"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <img
            alt="Provolo QR Code"
            src={provoolosvg}
            className="w-[50%] opacity-80 hover:opacity-100 duration-200 transition-all rounded-2xl"
            loading="lazy"
          />
          <p className="text-xs text-gray-400">{USER_PROFILE_CONFIG.infoCard.qrText}</p>
        </motion.a>
      </div>
    </motion.div>
  );
};

export default UserProfileCard;
