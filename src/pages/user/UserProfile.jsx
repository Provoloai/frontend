import { useState, useCallback, useMemo } from "react";
import { motion } from "motion/react";
import TextInputField from "../../Reusables/TextInputField";
import { Link, Mail, UserRound } from "lucide-react";
import useSession from "../../hooks/useSession";
import { getCustomerPortalUrl } from "../../server/checkout";
import { GenerateAvatar } from "../../Reusables/GenerateAvatar";
import provoolosvg from "../../assets/img/Provoloaisvg.png";
import CustomSnackbar from "../../Reusables/CustomSnackbar";

export default function UserProfile() {
  const { user, loading: loadingUserData } = useSession();

  const [touched, setTouched] = useState({
    name: false,
    title: false,
    description: false,
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
      setSnackbarMessage("No subscription found. Please contact support.");
      setSnackbarOpen(true);
      return;
    }
    setPortalLoading(true);
    try {
      const url = await getCustomerPortalUrl(user);
      if (url) window.location.href = url;
    } catch (e) {
      setSnackbarMessage(e instanceof Error ? e.message : "Unable to open subscription portal.");
      setSnackbarOpen(true);
    } finally {
      setPortalLoading(false);
    }
  }, [user]);

  // Optimized snackbar close
  const closeSnackbar = useCallback(() => setSnackbarOpen(false), []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.form
      className="flex-1 flex flex-col overflow-y-auto relative h-screen px-6 sm:px-10 lg:px-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="space-y-10 m-auto max-w-3xl w-full py-10">
        {/* Header Section */}
        <motion.div
          className="border-b border-gray-900/10 pb-5 flex flex-col sm:flex-row justify-between gap-4"
          variants={itemVariants}
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
              onClick={openSubscriptionPortal}
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
              Manage Subscription
            </motion.button>
          )}
        </motion.div>

        {/* Personal Information */}
        <motion.div className="border-b border-gray-900/10 pb-10" variants={itemVariants}>
          <h2 className="text-base text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
            variants={containerVariants}
          >
            <motion.div className="sm:col-span-3" variants={itemVariants}>
              <TextInputField
                id="fullname"
                label="UserName"
                placeholder="John Doe"
                iconStart={<UserRound size={20} />}
                value={user?.displayName}
                disabled
              />
            </motion.div>

            <motion.div className="sm:col-span-3" variants={itemVariants}>
              <TextInputField
                id="email"
                type="email"
                label="Email Address"
                placeholder="example@mail.com"
                iconStart={<Mail size={20} />}
                value={user?.email}
                disabled
              />
            </motion.div>

            <motion.div className="sm:col-span-6" variants={itemVariants}>
              <TextInputField
                id="profileLink"
                label="Profile Link"
                placeholder="https://www.upwork.com/Profile-link"
                iconStart={<Link size={20} />}
                value={profileLink}
                onChange={(e) => setProfileLink(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, profileLink: true }))}
                touched={touched.profileLink || error}
                disabled
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Info Card */}
        <motion.div
          className="bg-[#F3F4F5] p-6 rounded-xl border border-gray-300 grid lg:grid-cols-3 lg:gap-0 gap-8"
          variants={itemVariants}
        >
          <div className="lg:col-span-2 flex flex-col gap-3 justify-between lg:pr-20 pr-5">
            <p className="text-sm font-headingmd">🎉 Thanks for joining Provolo!</p>
            <p className="text-sm text-gray-500">
              This page shows the details you've shared with us. We'll use this to help optimize
              your Upwork profile and improve your chances of winning more jobs.
            </p>
            <p className="text-sm text-gray-500">
              Need to update or remove any of your information? Reach out to us anytime at{" "}
              <a href="mailto:Support@provolo.org" className="underline hover:text-gray-700 transition-colors duration-200">
                Support@provolo.org
              </a>
              {" "}and we'll take care of it.
            </p>
          </div>

          <div className="lg:border-l-2 lg:pt-0 pt-10 border-gray-300 border-dashed flex items-center">
            <motion.a
              href="https://linktr.ee/Provoloai"
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
              <p className="text-xs text-gray-400">Scan QR</p>
            </motion.a>
          </div>
        </motion.div>
      </div>

      <CustomSnackbar
        snackbarMessage={snackbarMessage}
        snackbarColor="danger"
        open={snackbarOpen}
        close={closeSnackbar}
      />
    </motion.form>
  );
}