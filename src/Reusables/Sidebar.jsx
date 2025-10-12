// components/Sidebar.js
import React, { useState } from "react";
import Logo from "./Logo";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { logout } from "../utils/logout.util";
import { Book, Feather, LibraryBig, Recycle, Sparkles, PanelLeftClose, PanelRightClose, Command, MessageSquareMore } from "lucide-react";
import Feedback from "./Feedback";
import UserProfile from "../pages/user/User";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useRouterState({ select: (s) => s.location });
  const [isOpen, setIsOpen] = useState(true);

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `relative group flex items-center rounded-md transition-all duration-300 ${isActive(path) ? "bg-gray-50 text-[#0c54f2]" : "text-gray-500 hover:bg-gray-50 hover:text-gray-950"
    } ${isOpen ? "p-3 gap-3" : "p-3 justify-center"}`;

  // Main navigation links
  const navItems = [
    {
      to: "/optimizer",
      icon: <Sparkles size={20} />,
      label: "Profile Optimizer",
    },
    {
      to: "/proposal",
      icon: <Feather size={20} />,
      label: "Ai Proposals",
      badge: { text: "New", color: "green" },
    },
    {
      to: "/resume",
      icon: <Recycle size={20} />,
      label: "Resume Generator",
      // badge: { text: "New", color: "green" },
    },
  ];

  // Upskill section
  const upskillItems = [
    {
      to: "/learn",
      icon: <LibraryBig size={20} />,
      label: "Provolo Learn",
    },
    {
      to: "https://buildsbyesuoladaniel.hashnode.space/provolo/provoloai-project-documentation",
      icon: <Book size={20} />,
      label: "Docs",
      external: true,
    },
  ];

  // Feedback
  const feedbackItems = [
    {
      to: "https://forms.gle/vWUuG7tu1HU2ksuT8",
      icon: <MessageSquareMore size={20} />,
      label: "FeedBack",
      external: true,
    },
  ];

  const renderBadge = (badge) => {
    if (!badge || !isOpen) return null; // hide badge if sidebar is collapsed
    const colors = {
      green: "bg-green-50 text-green-700 ring-green-600/10",
      blue: "bg-blue-50 text-blue-700 ring-blue-600/10",
    };
    return <span className={`ml-auto inline-flex items-center rounded-md px-2 py-1 text-xs ring-1 ring-inset ${colors[badge.color]}`}>{badge.text}</span>;
  };

  const renderLink = ({ to, icon, label, badge, external }) => {
    const content = (
      <>
        {icon}
        <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isOpen ? "opacity-100 w-auto ml-2" : "opacity-0 w-0"}`}>{label}</span>
        {renderBadge(badge)}
        {/* Tooltip when collapsed */}
        {!isOpen && (
          <span className="absolute left-full ml-2 px-2 py-1 text-xs rounded bg-gray-900 text-white opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
            {label}
          </span>
        )}
      </>
    );

    if (external) {
      return (
        <Link key={label} target="_blank" to={to} className={`${linkClass(to)} ${isOpen ? "gap-3" : "justify-center"}`}>
          {content}
        </Link>
      );
    }

    return (
      <Link key={label} to={to} className={`${linkClass(to)} ${isOpen ? "gap-3" : "justify-center"}`}>
        {content}
      </Link>
    );
  };

  return (
    <div className={`relative h-screen flex flex-col border-r border-gray-200 text-sm bg-white transition-all duration-300 ${isOpen ? "w-72 p-6" : "w-20 p-3 py-6"}`}>
      {/* Toggle button */}
      <button onClick={() => setIsOpen(!isOpen)} className="absolute z-20 -right-10 top-8 bg-gray-50 rounded-md p-1 hover:bg-gray-100 transition-all duration-300 text-gray-400">
        {isOpen ? <PanelLeftClose size={20} /> : <PanelRightClose size={20} />}
      </button>

      {/* Logo */}
      <div className={`flex gap-3 mb-10 ${isOpen ? "px-3" : "px-0 mx-auto"} w-fit relative`}>
        <Logo />
        {/* <p className="text-primary absolute -top-3 right-0 text-lg">✦</p> */}
      </div>



      {/* Navigation */}
      <div className="flex flex-col gap-2 h-full">
        {navItems.map(renderLink)}

        {/* Upskill Section */}
        {isOpen && (
          <>
            <p className="text-xs mt-10 pl-4 text-gray-500">Provolo Upskill</p>
          </>
        )}
        <span className="border border-gray-100" />
        {upskillItems.map(renderLink)}

        <span className="border mt-auto border-gray-100" />

        {feedbackItems.map(renderLink)}
        {/* {isOpen && <Feedback />} */}

        {/* <span className="border border-gray-100" /> */}
        <UserProfile open={isOpen} />


      </div>
    </div>
  );
};

export default Sidebar;
