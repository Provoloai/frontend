import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link, useNavigate } from "@tanstack/react-router";
import useSession from "../../hooks/useSession";
import { GenerateAvatar } from "../../Reusables/GenerateAvatar";
import { LogOut, UserRound } from "lucide-react";
import { logout } from "../../utils/logout.util";


const userNavigation = [
  { name: "My profile", href: "/userprofile" },
  // { name: 'Settings', href: '#' },
];

export default function User({ open }) {
  const { user: userData, loading: loadingUserData } = useSession();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate({ to: "/login", replace: true });
    } catch (error) {
      navigate({ to: "/login", replace: true });
    }
  };

  const user = {
    name: userData?.displayName ?? "User",
    email: userData?.email,
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };
  return (
    <Menu as="div" className="rounded-lg z-10 mt-3 w-full">
      <div className="flex">
        <MenuButton className="relative flex pl-3 w-full items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">

          <span className="absolute" />

          {loadingUserData ? <div className="size-8 rounded-full bg-gray-300 animate-pulse"></div> : <GenerateAvatar name={userData?.displayName} size={32} />}

          {open && (
            <span className="ml-3">
              <p className="text-sm">{user.name}</p>
              <p className=" text-xs text-gray-400 text-start">{userData?.tierId}</p>
            </span>
          )}
        </MenuButton>

        {open &&
          <Link to={"/pricing"}
            className="inline-flex h-fit my-auto items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-gray-500/10 ring-inset ml-auto hover:bg-gray-100 hover:text-gray-700 transition-all duration-300">
            Upgrade
          </Link>
        }

      </div>

      <MenuItems
        transition
        className="absolute z-10 -mt-36 w-60 origin-bottom-right rounded-md bg-white py-1 shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        {userNavigation.map((item) => (
          <MenuItem key={item.name}>
            <Link to={item.href} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">
              <UserRound size={15} />
              {item.name}
            </Link>
          </MenuItem>
        ))}

        {/* Logout */}
        <button onClick={handleSignOut} className={`text-left text-red-400 bg-red-50/70 transition-all duration-300 rounded-md p-3 flex items-center gap-3 hover:bg-red-50 w-full`}>
          <LogOut size={20} />
          Log Out
        </button>
      </MenuItems>
    </Menu >
  );
}
