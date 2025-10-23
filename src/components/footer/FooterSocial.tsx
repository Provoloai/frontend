import { motion } from "motion/react";
import { FOOTER_ANIMATIONS } from "@/constants/footer";
import FooterSocialLink from "./FooterSocialLink";
import type { FooterSocialProps } from "@/types/footer";

const FooterSocial: React.FC<FooterSocialProps> = ({ config }) => {
  return (
    <motion.div
      className="flex items-center justify-center"
      variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
      role="list"
      aria-label="Social media links"
    >
      {config.footer.social.map(({ href, icon }, idx) => (
        <motion.div key={idx} variants={FOOTER_ANIMATIONS.footerItem}>
          <FooterSocialLink to={href} icon={icon} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FooterSocial;
