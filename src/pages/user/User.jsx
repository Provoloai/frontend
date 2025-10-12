import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link, useNavigate } from "@tanstack/react-router";
import useSession from "../../hooks/useSession";
import { GenerateAvatar } from "../../Reusables/GenerateAvatar";
import { LogOut, UserRound } from "lucide-react";
import { logout } from "../../utils/logout.util";
import { getCustomerPortalUrl } from "../../server/checkout";
import { useState } from "react";

const userNavigation = [
  { name: "My profile", href: "/userprofile" },
  // { name: 'Settings', href: '#' },
];

export default function User({ open }) {
  const { user: userData, loading: loadingUserData } = useSession();
  const navigate = useNavigate();

  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState("");

  const openSubscriptionPortal = async () => {
    if (!userData?.polarId) {
      setPortalError("No subscription found. Please contact support.");
      return;
    }
    setPortalLoading(true);
    setPortalError("");
    try {
      const url = await getCustomerPortalUrl(userData);
      if (url) window.location.href = url;
    } catch (e) {
      setPortalError(
        e instanceof Error ? e.message : "Unable to open subscription portal."
      );
    } finally {
      setPortalLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      navigate({ to: "/login", replace: true });
    } catch {
      navigate({ to: "/login", replace: true });
    }
  };

  const user = {
    name: userData?.displayName ?? "User",
    email: userData?.email,
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };
  return (
    <Menu as="div" className="rounded-lg z-10 mt-3 w-full">
      <div className="flex">
        <MenuButton className="relative flex pl-3 w-full items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          <span className="absolute" />

          {loadingUserData ? (
            <div className="size-8 rounded-full bg-gray-300 animate-pulse"></div>
          ) : (
            <GenerateAvatar name={userData?.displayName} size={32} />
          )}

          {open && (
            <span className="ml-3">
              <p className="text-sm">{user.name}</p>
              <p className=" text-xs text-gray-400 text-start">
                {userData?.tierId}
              </p>
            </span>
          )}
        </MenuButton>

        {open && (
          <>
            {userData?.tierId === "pro" ? (
              <button
                onClick={openSubscriptionPortal}
                disabled={portalLoading}
                 className="inline-flex h-fit my-auto items-center gap-1 rounded bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 border border-blue-300 hover:bg-blue-200 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 ml-auto"
              >
                {portalLoading && (
                  <svg
                    className="size-3 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
                Pro
              </button>
            ) : (
              <Link
                to={"/pricing"}
                className="inline-flex h-fit my-auto items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-gray-500/10 ring-inset ml-auto hover:bg-gray-100 hover:text-gray-700 transition-all duration-300"
              >
                Upgrade
              </Link>
            )}
            {portalError && (
              <p className="mt-1 text-xs text-red-600">{portalError}</p>
            )}
          </>
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
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
            >
              <UserRound size={15} />
              {item.name}
            </Link>
          </MenuItem>
        ))}

        {/* Logout */}
        <button
          onClick={handleSignOut}
          className={`text-left text-red-400 bg-red-50/70 transition-all duration-300 rounded-md p-3 flex items-center gap-3 hover:bg-red-50 w-full`}
        >
          <LogOut size={20} />
          Log Out
        </button>
      </MenuItems>
    </Menu>
  );
}
