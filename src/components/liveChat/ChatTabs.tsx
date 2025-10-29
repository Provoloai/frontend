import { Home, MessageCircle } from "lucide-react";
import { ChatTab } from "@/types/liveChat";

interface ChatTabsProps {
  activeTab: ChatTab;
  onTabChange: (tab: ChatTab) => void;
}

export default function ChatTabs({ activeTab, onTabChange }: ChatTabsProps) {
  return (
    <div className="flex border-t border-gray-200 bg-white flex-shrink-0">
      <button
        onClick={() => onTabChange("faqs")}
        className={`flex-1 py-3 sm:py-4 flex flex-col items-center gap-1 transition-colors ${
          activeTab === "faqs"
            ? "text-black"
            : "text-gray-400 hover:text-gray-600"
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-xs font-medium">Home</span>
      </button>
      <button
        onClick={() => onTabChange("contact")}
        className={`flex-1 py-3 sm:py-4 flex flex-col items-center gap-1 transition-colors ${
          activeTab === "contact"
            ? "text-black"
            : "text-gray-400 hover:text-gray-600"
        }`}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-xs font-medium">Message</span>
      </button>
    </div>
  );
}

