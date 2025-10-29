import { Minimize2 } from "lucide-react";
import BlackLogo from "@/assets/svg/BlackLogo.svg";

interface ChatHeaderProps {
  onMinimize: () => void;
}

export default function ChatHeader({ onMinimize }: ChatHeaderProps) {
  return (
    <div className="bg-black px-4 sm:px-6 py-4 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <img src={BlackLogo} alt="Logo" />
        </div>
      </div>
      <button
        onClick={onMinimize}
        className="text-white/80 hover:text-white transition-colors"
      >
        <Minimize2 className="w-5 h-5" />
      </button>
    </div>
  );
}

