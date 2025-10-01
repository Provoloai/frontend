import { Link } from "@tanstack/react-router";
import { Copyright, Instagram, Linkedin, Twitter, LibraryBig } from "lucide-react";
import { motion } from "motion/react";

import Vector3 from "../../assets/img/Vector3.png";
import Vector4 from "../../assets/img/Vector4.png";
import Vector5 from "../../assets/img/Vector5.png";
import freelancers from "../../assets/img/freelancers.png";
import upwork from "../../assets/img/upwork.png";
import proposals from "../../assets/img/proposals.png";

// Reusable styles
const linkBase =
  "p-3 flex items-center gap-3 rounded text-gray-500 hover:text-primary transition-all duration-300 text-sm";

/* ---------------------- Animation Variants ---------------------- */
const variants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1, delayChildren: 0.2 },
    },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  },
  floating: {
    animate: {
      y: [-5, 5, -5],
      rotate: [-1, 1, -1],
      transition: { duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" },
    },
  },
  vector: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 0.5, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  },
  footer: {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, staggerChildren: 0.05, delayChildren: 0.1 },
    },
  },
  footerItem: {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  },
};

/* ---------------------- Utility Components ---------------------- */
function SocialLink({ to, icon: Icon }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link target="_blank" to={to} className={linkBase}>
        <Icon size={20} />
      </Link>
    </motion.div>
  );
}

function FloatingImage({ src, alt, className, initial, animate, delay }) {
  return (
    <motion.img
      alt={alt}
      src={src}
      className={className}
      initial={initial}
      animate={{
        ...animate,
        transition: { duration: 0.6, delay, ease: "easeOut" },
      }}
      variants={variants.floating}
      whileInView="animate"
      whileHover={{ scale: 1.05, rotate: animate?.rotate ?? 0 }}
    />
  );
}

/* ---------------------- Sections ---------------------- */
function HeroSection() {
  return (
    <motion.div
      className="relative isolate overflow-hidden bg-[#0F56EE] px-6 pt-16 rounded-3xl sm:px-16 flex lg:gap-x-20 lg:px-24 min-h-[600px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants.container}
    >
      {/* Gradient Overlay */}
      <motion.div
        className="absolute z-20 h-full left-0 w-full bg-gradient-to-b from-white/0 to-white/30 top-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1, delay: 0.5 } }}
      />

      <motion.div
        className="text-center lg:w-[703px] m-auto flex flex-col lg:gap-[20px] gap-[15px] relative z-20"
        variants={variants.container}
      >
        <motion.p
          className="tracking-tight leading-tight text-balance lg:text-[44px] text-2xl font-headingmd text-white"
          variants={variants.fadeUp}
        >
          Stop Guessing. <br /> Start Winning More Jobs on Upwork.
        </motion.p>

        <motion.p
          className="text-white/70 lg:text-base md:text-[20px] text-[14px] mx-auto"
          variants={variants.fadeUp}
        >
          Your skills deserve to be seen and paid. Provolo helps you attract clients, rank higher,
          and turn views into interviews. Make every word work for you.
        </motion.p>

        <motion.div variants={variants.fadeUp} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/signup"
            className="bg-white hover:bg-white/90 transition-all duration-300 py-[18px] px-[30px] rounded-full mx-auto w-[180px] h-[45px] flex items-center justify-center text-sm text-black font-headingmd"
          >
            Get Started
          </Link>
        </motion.div>

        {/* Floating Images */}
        <FloatingImage
          src={proposals}
          alt="Proposals"
          className="absolute lg:-top-20 lg:-right-14 right-0 -bottom-16 lg:w-32 w-[100px]"
          initial={{ opacity: 0, x: 20, rotate: 5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          delay={0.8}
        />
        <FloatingImage
          src={freelancers}
          alt="Freelancers"
          className="absolute lg:-left-48 -top-20 lg:w-32 w-[100px]"
          initial={{ opacity: 0, x: -20, rotate: -5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          delay={0.6}
        />
        <FloatingImage
          src={upwork}
          alt="Upwork Profile Optimization"
          className="absolute w-[100px] lg:w-32 -bottom-20 left-0 lg:left-auto lg:-right-32 lg:top-50"
          initial={{ opacity: 0, y: 20, rotate: 8 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          delay={1.0}
        />
      </motion.div>

      {/* Background vectors */}
      <motion.img alt="Vector" src={Vector4} className="absolute lg:top-0 bottom-0 left-0 lg:w-1/4 w-1/2 z-0 opacity-50" variants={variants.vector} />
      <motion.img alt="Vector" src={Vector5} className="absolute top-0 right-0 lg:w-1/4 w-1/2 z-0 opacity-50 lg:hidden md:hidden" variants={variants.vector} />
      <motion.img alt="Vector" src={Vector3} className="absolute bottom-0 right-0 w-1/4 z-0 opacity-50" variants={variants.vector} />
    </motion.div>
  );
}

function FooterSection() {
  const footerLinks = [
    { label: "Careers", href: "https://buildsbyesuoladaniel.hashnode.space/provolo/open-collaborations" },
    { label: "Terms & Conditions", href: "https://buildsbyesuoladaniel.hashnode.space/provolo/terms-and-conditions" },
    { label: "Privacy Policy", href: "https://buildsbyesuoladaniel.hashnode.space/provolo/privacy-policy" },
    { label: "Docs", href: "https://buildsbyesuoladaniel.hashnode.space/provolo/provoloai-project-documentation" },
  ];

  const socialLinks = [
    { href: "https://x.com/provoloai", icon: Twitter },
    { href: "https://www.linkedin.com/company/provoloai", icon: Linkedin },
    { href: "https://www.instagram.com/provoloai", icon: Instagram },
    { href: "https://substack.com/@provoloai", icon: LibraryBig },
  ];

  return (
    <motion.div
      className="lg:flex mt-10 lg:justify-between items-center border-t border-gray-200 pt-10 px-6 lg:px-8 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants.footer}
    >
      <motion.p className="hidden lg:flex items-center gap-3 text-sm" variants={variants.footerItem}>
        <Copyright size={15} /> Provolo '25
      </motion.p>

      <motion.div className="flex flex-col lg:flex-row md:flex-row items-center gap-10 justify-center" variants={variants.footerItem}>
        {/* Footer Nav Links */}
        <motion.span
          className="flex lg:flex-row md:flex-row flex-col justify-center items-center"
          variants={{ visible: { transition: { staggerChildren: 0.03, delayChildren: 0.1 } } }}
        >
          {footerLinks.map(({ label, href }) => (
            <motion.div key={label} variants={variants.footerItem} whileHover={{ x: 2 }}>
              <Link target="_blank" to={href} className={linkBase}>
                {label}
              </Link>
            </motion.div>
          ))}
        </motion.span>

        {/* Social Links */}
        <motion.span
          className="flex items-center justify-center"
          variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
        >
          {socialLinks.map(({ href, icon }, idx) => (
            <motion.div key={idx} variants={variants.footerItem}>
              <SocialLink to={href} icon={icon} />
            </motion.div>
          ))}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

/* ---------------------- Main Component ---------------------- */
export default function Example() {
  return (
    <div className="bg-white p-5">
      <div className="mx-auto max-w-[93.75rem] lg:py-24 sm:py-10 lg:p-0">
        <HeroSection />
        <FooterSection />
      </div>
    </div>
  );
}
