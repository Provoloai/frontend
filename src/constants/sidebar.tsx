import {
  Book,
  Feather,
  LibraryBig,
  Recycle,
  Sparkles,
  MessageSquareMore,
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
    badge: { text: "New", color: "green" },
  },
  {
    to: "/resume",
    icon: <Recycle size={20} />,
    label: "Resume Generator",
  },
];

export const UPSKILL_ITEMS: NavigationItem[] = [
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

export const FEEDBACK_ITEMS: NavigationItem[] = [
  {
    to: "https://forms.gle/vWUuG7tu1HU2ksuT8",
    icon: <MessageSquareMore size={20} />,
    label: "FeedBack",
    external: true,
  },
];

