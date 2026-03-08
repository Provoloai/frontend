import MobileModalContent from "@/old-components/mobile/MobileModalContent";
import { useMobileModal } from "@/hooks/useMobileModal";
import type { MobileModalProps } from "@/types/mobileModal";

export const MobilePageModal: React.FC<MobileModalProps> = ({ operatingSystem }) => {
  const { handleSignOut } = useMobileModal();

  return (
    <MobileModalContent
      operatingSystem={operatingSystem}
      onSignOut={handleSignOut}
    />
  );
};
