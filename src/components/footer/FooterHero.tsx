import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { FOOTER_ANIMATIONS } from "@/constants/footer";
import FooterFloatingImage from "./FooterFloatingImage";
import Vector3 from "@/assets/img/Vector3.png";
import Vector4 from "@/assets/img/Vector4.png";
import Vector5 from "@/assets/img/Vector5.png";
import freelancers from "@/assets/img/freelancers.png";
import upwork from "@/assets/img/upwork.png";
import proposals from "@/assets/img/proposals.png";
import type { FooterHeroProps } from "@/types/footer";

const FooterHero: React.FC<FooterHeroProps> = ({ config }) => {
  return (
    <motion.div
      className="relative isolate overflow-hidden bg-[#0F56EE] px-6 pt-16 rounded-3xl sm:px-16 flex lg:gap-x-20 lg:px-24 min-h-[600px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px", amount: 0.2 }}
      variants={FOOTER_ANIMATIONS.container}
    >
      {/* Gradient Overlay */}
      <motion.div
        className="absolute z-20 h-full left-0 w-full bg-gradient-to-b from-white/0 to-white/30 top-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.8, delay: 0.3 } }}
      />

      <motion.div
        className="text-center lg:w-[703px] m-auto flex flex-col lg:gap-[20px] gap-[15px] relative z-20"
        variants={FOOTER_ANIMATIONS.container}
      >
        <motion.h2
          className="tracking-tight leading-tight text-balance lg:text-xl md:text-7xl text-4xl font-medium text-white"
          variants={FOOTER_ANIMATIONS.fadeUp}
        >
          {config.hero.title}
        </motion.h2>

        <motion.p
          className="text-white/70 lg:text-base md:text-[20px] text-[14px] mx-auto"
          variants={FOOTER_ANIMATIONS.fadeUp}
        >
          {config.hero.description}
        </motion.p>

        <motion.div variants={FOOTER_ANIMATIONS.fadeUp}>
          <motion.div 
            whileHover={FOOTER_ANIMATIONS.ctaHover} 
            whileTap={FOOTER_ANIMATIONS.ctaTap}
          >
            <Link
              to={config.hero.ctaLink}
              className="bg-white hover:bg-white/90 transition-all duration-200 py-[18px] px-[30px] rounded-full mx-auto w-[180px] h-[45px] flex items-center justify-center text-sm text-black font-headingmd"
            >
              {config.hero.ctaText}
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Images - Lazy Loaded */}
        <FooterFloatingImage
          src={proposals}
          alt="Proposals"
          className="absolute lg:-top-20 lg:-right-14 right-0 -bottom-16 lg:w-32 w-[100px]"
          initial={{ opacity: 0, x: 20, rotate: 5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          delay={0.6}
        />
        <FooterFloatingImage
          src={freelancers}
          alt="Freelancers"
          className="absolute lg:-left-48 -top-20 lg:w-32 w-[100px]"
          initial={{ opacity: 0, x: -20, rotate: -5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          delay={0.4}
        />
        <FooterFloatingImage
          src={upwork}
          alt="Upwork Profile Optimization"
          className="absolute w-[100px] lg:w-32 -bottom-20 left-0 lg:left-auto lg:-right-32 lg:top-50"
          initial={{ opacity: 0, y: 20, rotate: 8 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          delay={0.8}
        />
      </motion.div>

      {/* Background vectors - Lazy Loaded */}
      <motion.img
        alt=""
        src={Vector4}
        className="absolute lg:top-0 bottom-0 left-0 lg:w-1/4 w-1/2 z-0 opacity-50"
        variants={FOOTER_ANIMATIONS.vector}
        loading="lazy"
      />
      <motion.img
        alt=""
        src={Vector5}
        className="absolute top-0 right-0 lg:w-1/4 w-1/2 z-0 opacity-50 lg:hidden md:hidden"
        variants={FOOTER_ANIMATIONS.vector}
        loading="lazy"
      />
      <motion.img
        alt=""
        src={Vector3}
        className="absolute bottom-0 right-0 w-1/4 z-0 opacity-50"
        variants={FOOTER_ANIMATIONS.vector}
        loading="lazy"
      />
    </motion.div>
  );
};

export default FooterHero;
