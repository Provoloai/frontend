import {
  Feather,
  LibraryBig,
  Sparkles,
  MessageSquareMore,
  Headset,
  FileUser,
  GraduationCap,
} from "lucide-react";
import { NavigationItem } from "@/types/sidebar";

export const NAV_ITEMS: NavigationItem[] = [
  {
    to: "/optimizer",
    icon: <Sparkles size={20} />,
    label: "Profile Optimizer",
  },
  {
    to: "/proposal",
    icon: <Feather size={20} />,
    label: "Proposals",
    // badge: { text: "New", color: "green" },
  },
  {
    to: "/resume",
    icon: <FileUser size={20} />,
    label: "Resume",
    badge: { text: "New", color: "green" },
  },
];

export const UPSKILL_ITEMS: NavigationItem[] = [
  {
    to: "/learn",
    icon: <GraduationCap size={20} />,
    label: "Provolo Learn",
  },
  {
    to: "https://buildsbyesuoladaniel.hashnode.space/provolo/provoloai-project-documentation",
    icon: <Headset size={20} />,
    label: "Help Center",
    external: true,
  },
];

export const FEEDBACK_ITEMS: NavigationItem[] = [
  {
    to: "https://forms.gle/vWUuG7tu1HU2ksuT8",
    icon: <MessageSquareMore size={20} />,
    label: "Give FeedBack",
    external: true,
  },
];

