import { FOOTER_CONFIG } from "@/constants/footer";
import FooterContent from "@/components/footer/FooterContent";

export default function Footer() {
  return (
    <FooterContent
      config={FOOTER_CONFIG}
    />
  );
}
