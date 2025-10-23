import { LogOut } from "lucide-react";
import MobileModalSVG from "./MobileModalSVG";
import { MOBILE_MODAL_CONFIG } from "@/constants/mobileModal";
import type { MobileModalContentProps } from "@/types/mobileModal";

const MobileModalContent: React.FC<MobileModalContentProps> = ({
  operatingSystem,
  onSignOut,
}) => {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <div className="p-6 sm:p-10 max-w-4xl mx-auto w-full my-auto">
        <div className="p-6 rounded-lg text-center justify-center">
          <div className="w-full text-center flex justify-center">
            <MobileModalSVG 
              width={MOBILE_MODAL_CONFIG.svg.width}
              height={MOBILE_MODAL_CONFIG.svg.height}
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-center mb-2 mt-10 text-gray-400">
            {MOBILE_MODAL_CONFIG.title}
          </h1>
          <p className="text-center text-gray-400 lg:w-2/3 mx-auto text-sm">
            {MOBILE_MODAL_CONFIG.description} ({operatingSystem}). {MOBILE_MODAL_CONFIG.descriptionSuffix}
          </p>
        </div>

        <button 
          onClick={onSignOut} 
          className="text-left text-red-400 transition-all duration-300 rounded-md p-3 flex align-middle gap-3 hover:bg-red-50 mx-auto"
        >
          <LogOut size={20} />
          {MOBILE_MODAL_CONFIG.logoutText}
        </button>
      </div>
    </div>
  );
};

export default MobileModalContent;
