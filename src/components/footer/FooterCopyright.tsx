import { motion } from "motion/react";
import { Copyright } from "lucide-react";
import { FOOTER_ANIMATIONS } from "@/constants/footer";
import type { FooterCopyrightProps } from "@/types/footer";

const FooterCopyright: React.FC<FooterCopyrightProps> = ({ config }) => {
  return (
    <motion.p 
      className="hidden lg:flex items-center gap-3 text-sm" 
      variants={FOOTER_ANIMATIONS.footerItem}
    >
      <Copyright size={15} aria-hidden="true" /> {config.footer.copyright}
    </motion.p>
  );
};

export default FooterCopyright;
