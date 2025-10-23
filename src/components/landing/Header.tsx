import { useHeader } from "@/hooks/useHeader";
import { HEADER_CONFIG } from "@/constants/header";
import HeaderContent from "@/components/header/HeaderContent";

export default function Header() {
  const { mobileMenuOpen, setMobileMenuOpen } = useHeader();

  return (
    <HeaderContent
      config={HEADER_CONFIG}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
    />
  );
}
