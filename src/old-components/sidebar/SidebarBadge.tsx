import { motion } from "motion/react";
import { Badge } from "@/types/sidebar";

interface SidebarBadgeProps {
  badge?: Badge;
  show: boolean;
}

export default function SidebarBadge({ badge, show }: SidebarBadgeProps) {
  if (!badge || !show) return null;

  const colors: Record<Badge["color"], string> = {
    green: "bg-green-50 text-green-700 ring-green-600/10",
    blue: "bg-blue-50 text-blue-700 ring-blue-600/10",
  };

  return (
    <motion.span
      className={`ml-auto inline-flex items-center rounded-md px-2 py-1 text-xs ring-1 ring-inset ${colors[badge.color]}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.15 }}
    >
      {badge.text}
    </motion.span>
  );
}

