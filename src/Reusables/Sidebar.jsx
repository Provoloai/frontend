// components/Sidebar.js
import React from "react";
import Logo from "./Logo";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import useAuthStore from "../stores/authStore";
import { Book, Feather, LogOut, Sparkles } from "lucide-react";
import Feedback from "./Feedback";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useRouterState({ select: (s) => s.location });

  const signOut = useAuthStore((state) => state.signOut);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleSignOut = async () => {
    try {
      clearAuth();
      await signOut();
      navigate({ to: "/login", replace: true });
    } catch (error) {
      console.error("Error signing out:", error);
      clearAuth();
      navigate({ to: "/login", replace: true });
    }
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `p-3 flex align-middle gap-3 rounded-md transition-all duration-300 ${isActive(path)
      ? "bg-gray-50 text-gray-900"
      : "text-gray-500 hover:bg-gray-50 hover:text-gray-950"
    }`;

  return (
    <div className="w-full sm:w-72 bg-white text-black h-screen flex flex-col p-6 border border-r-gray-200 text-sm">
      <div className="flex items-center gap-3 mb-10 px-3 w-fit text-gray-500">
        <Logo />
        Provolo.org
      </div>

      <div className="flex flex-col gap-4 text-black text-start h-full">
        <Link to="/optimizer" className={linkClass("/optimizer")}>
          <Sparkles size={20} />
          Optimize My Profile
        </Link>

        <Link to="/proposal" className={linkClass("/proposal")}>
          <Feather size={20} />
          Ai Proposals
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700 ring-1 ring-blue-600/10 ring-inset ml-auto">
            Soon
          </span>
        </Link>

        <Link
          target="_blank"
          to="https://buildsbyesuoladaniel.hashnode.space/provolo/provoloai-project-documentation"
          className="p-3 flex align-middle gap-3 rounded text-gray-500 hover:bg-gray-50 hover:text-gray-950 transition-all duration-300"
        >
          <Book size={20} />
          Docs
        </Link>


        <span className="border mt-auto border-gray-100" />

        <Feedback />

        <span className="border border-gray-100" />

        <button
          onClick={handleSignOut}
          className="text-left text-red-400 transition-all duration-300 rounded-md p-3 flex align-middle gap-3 hover:bg-red-50"
        >
          <LogOut size={20} />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
