import { useState, useCallback, useMemo } from "react";
import { motion } from "motion/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link, useNavigate } from "@tanstack/react-router";
import useSession from "../../hooks/useSession";
import { GenerateAvatar } from "../../Reusables/GenerateAvatar";
import { LogOut, UserRound } from "lucide-react";
import { logout } from "../../utils/logout.util";
import { getCustomerPortalUrl } from "../../server/checkout";
import CustomSnackbar from "../../Reusables/CustomSnackbar";

const userNavigation = [
  { name: "My profile", href: "/userprofile" },
];

export default function User({ open }) {
  const { user: userData, loading: loadingUserData } = useSession();
  const navigate = useNavigate();

  const [portalLoading, setPortalLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Memoize user data to prevent recalculation
  const user = useMemo(
    () => ({
      name: userData?.displayName ?? "User",
      email: userData?.email,
    }),
    [userData]
  );

  const isPro = useMemo(() => userData?.tierId === "pro", [userData?.tierId]);

  // Optimized subscription portal handler
  const openSubscriptionPortal = useCallback(async () => {
    if (!userData?.polarId) {
      setSnackbarMessage("No subscription found. Please contact support.");
      setSnackbarOpen(true);
      return;
    }
    setPortalLoading(true);
    try {
      const url = await getCustomerPortalUrl(userData);
      if (url) window.location.href = url;
    } catch (e) {
      setSnackbarMessage(
        e instanceof Error ? e.message : "Unable to open subscription portal."
      );
      setSnackbarOpen(true);
    } finally {
      setPortalLoading(false);
    }
  }, [userData]);

  // Optimized sign out handler
  const handleSignOut = useCallback(async () => {
    try {
      await logout();
      navigate({ to: "/login", replace: true });
    } catch {
      navigate({ to: "/login", replace: true });
    }
  }, [navigate]);

  // Optimized snackbar close handler
  const closeSnackbar = useCallback(() => setSnackbarOpen(false), []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.15 } },
  };

  return (
    <Menu as="div" className="rounded-lg z-10 mt-3 w-full">
      <div className="flex">
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
              variants={fadeIn}
            >
              <p className="text-sm">{user.name}</p>
              <p className="text-xs text-gray-400 text-start capitalize">
                {userData?.tierId}
              </p>
            </motion.span>
          )}
        </MenuButton>

        {open && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="ml-auto my-auto"
          >
            {isPro ? (
              <motion.button
                onClick={openSubscriptionPortal}
                disabled={portalLoading}
                className="inline-flex h-fit items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-primary ring-1 ring-primary/10 ring-inset hover:bg-blue-100 hover:text-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: portalLoading ? 1 : 1.05 }}
                whileTap={{ scale: portalLoading ? 1 : 0.98 }}
              >
                {portalLoading && (
                  <svg
                    className="size-3 animate-spin mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                )}
                Dashboard
              </motion.button>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/pricing"
                  className="inline-flex h-fit items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-gray-500/10 ring-inset hover:bg-gray-100 hover:text-gray-700 transition-all duration-200"
                >
                  Upgrade
                </Link>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      <MenuItems
        transition
        className="absolute z-10 -mt-36 w-60 origin-bottom-right rounded-md bg-white py-1 shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        {userNavigation.map((item) => (
          <MenuItem key={item.name}>
            <Link
              to={item.href}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden transition-colors duration-150"
            >
              <UserRound size={15} aria-hidden="true" />
              {item.name}
            </Link>
          </MenuItem>
        ))}

        {/* Logout */}
        <MenuItem>
          <button
            onClick={handleSignOut}
            className="text-left text-red-400 bg-red-50/70 transition-all duration-200 rounded-md p-3 flex items-center gap-3 hover:bg-red-50 w-full"
          >
            <LogOut size={20} aria-hidden="true" />
            Log Out
          </button>
        </MenuItem>
      </MenuItems>

      <CustomSnackbar
        snackbarMessage={snackbarMessage}
        snackbarColor="danger"
        open={snackbarOpen}
        close={closeSnackbar}
      />
    </Menu>
  );
}