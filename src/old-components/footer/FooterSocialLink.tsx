import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { FOOTER_ANIMATIONS, FOOTER_STYLES } from "@/constants/footer";
import type { SocialLinkComponentProps } from "@/types/footer";

const FooterSocialLink: React.FC<SocialLinkComponentProps> = ({ to, icon: Icon }) => {
  return (
    <motion.div 
      whileHover={FOOTER_ANIMATIONS.socialHover} 
      whileTap={FOOTER_ANIMATIONS.socialTap}
    >
      <Link target="_blank" to={to} className={FOOTER_STYLES.linkBase} rel="noopener noreferrer">
        <Icon size={20} />
      </Link>
    </motion.div>
  );
};

export default FooterSocialLink;
