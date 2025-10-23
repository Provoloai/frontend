import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { FOOTER_ANIMATIONS, FOOTER_STYLES } from "@/constants/footer";
import type { FooterLinksProps } from "@/types/footer";

const FooterLinks: React.FC<FooterLinksProps> = ({ config }) => {
  return (
    <motion.nav
      className="flex lg:flex-row md:flex-row flex-col justify-center items-center"
      variants={{ visible: { transition: { staggerChildren: 0.02 } } }}
      aria-label="Footer navigation"
    >
      {config.footer.links.map(({ label, href }) => (
        <motion.div 
          key={label} 
          variants={FOOTER_ANIMATIONS.footerItem} 
          whileHover={FOOTER_ANIMATIONS.linkHover}
        >
          <Link target="_blank" to={href} className={FOOTER_STYLES.linkBase} rel="noopener noreferrer">
            {label}
          </Link>
        </motion.div>
      ))}
    </motion.nav>
  );
};

export default FooterLinks;
