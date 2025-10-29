import { motion, AnimatePresence } from "motion/react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ProposalHistoryItem } from "@/types/sidebar";

interface ProposalDropdownProps {
  isOpen: boolean;
  proposals: ProposalHistoryItem[];
}

export default function ProposalDropdown({
  isOpen,
  proposals,
}: ProposalDropdownProps) {
  const location = useRouterState({ select: (s) => s.location });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="ml-6 mt-1 space-y-1 relative"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Vertical timeline line */}
        <div className="absolute left-3 top-2 bottom-2 w-px bg-gray-200" />

        {proposals.map((item) => {
          const historyPath = `/proposalHistory/${item.id}`;
          const isHistoryActive = location.pathname === historyPath;

          return (
            <div key={item.id} className="relative flex items-start">
              {/* Timeline dot */}
              <div
                className={`absolute left-3 top-[0.85rem] w-1.5 h-1.5 rounded-full -translate-x-1/2 transition-colors duration-200 ${
                  isHistoryActive ? "bg-[#0c54f2]" : "bg-gray-300"
                }`}
              />

              <Link
                to={historyPath}
                className={`block pl-6 pr-3 py-2 text-sm rounded-md transition-all duration-200 flex-1 truncate ${
                  isHistoryActive
                    ? "bg-gray-50 text-[#0c54f2]"
                    : "text-gray-600 hover:text-gray-950 hover:bg-gray-50"
                }`}
                params={{ proposalId: item.id }}
              >
                {item.jobTitle}
              </Link>
            </div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}

