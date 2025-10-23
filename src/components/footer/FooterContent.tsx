import { motion } from "motion/react";
import { FOOTER_ANIMATIONS } from "@/constants/footer";
import FooterHero from "./FooterHero";
import FooterLinks from "./FooterLinks";
import FooterSocial from "./FooterSocial";
import FooterCopyright from "./FooterCopyright";
import type { FooterContentProps } from "@/types/footer";

const FooterContent: React.FC<FooterContentProps> = ({ config }) => {
  return (
    <div className="bg-white p-5">
      <div className="mx-auto max-w-[93.75rem] sm:py-10 lg:p-0">
        <FooterHero config={config} />
        
        <motion.footer
          className="lg:flex mt-10 lg:justify-between items-center border-t border-gray-200 pt-10 px-6 lg:px-8 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px", amount: 0.2 }}
          variants={FOOTER_ANIMATIONS.footer}
        >
          <FooterCopyright config={config} />

          <motion.div 
            className="flex flex-col lg:flex-row md:flex-row items-center gap-10 justify-center" 
            variants={FOOTER_ANIMATIONS.footerItem}
          >
            <FooterLinks config={config} />
            <FooterSocial config={config} />
          </motion.div>
        </motion.footer>
      </div>
    </div>
  );
};

export default FooterContent;
