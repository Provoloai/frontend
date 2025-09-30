import AppScreenshot from "../../assets/img/screenshot.png";
import Vector from "../../assets/img/Vector.png";
import Vector2 from "../../assets/img/Vector2.png";
import freelancers from "../../assets/img/freelancers.png";
import upwork from "../../assets/img/upwork.png";
import proposals from "../../assets/img/proposals.png";
import LandingpageButton from "./LandingpageButton";

// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

export const Hero = () => {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smooth easing
      },
    },
  };

  // Floating animation for decorative images
  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  // Background vectors animation
  const vectorVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  // Screenshot container animation
  const screenshotVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.95,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.23, 1, 0.32, 1], // Smoother easing for large element
        delay: 0.8,
      },
    },
  };

  return (
    <div className="min-h-screen lg:h-screen overflow-hidden relative bg-light flex flex-col items-center justify-center">
      <motion.div
        className="relative isolate px-6 lg:px-8 z-10 lg:pb-20 pb-44"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto max-w-[75rem] flex flex-col lg:gap-[60px] gap-[100px]">
          <div className="text-center lg:w-[629px] mx-auto flex flex-col lg:gap-[20px] gap-[20px] relative items-center">
            {/* SEO-friendly subtitle */}
            <motion.p
              className="lg:text-sm text-[10px] uppercase tracking-wider"
              variants={itemVariants}
            >
              Designed to Turn Profile Views Into Interviews
            </motion.p>

            {/* H1 with strong keyword placement */}
            <motion.h1
              className="tracking-tight leading-tight text-balance lg:text-xl md:text-7xl text-4xl font-medium"
              variants={itemVariants}
            >
              Win More Jobs on Upwork{" "}
              <span className="font-headingmd text-primary"> Automatically</span>
            </motion.h1>

            {/* SEO-optimized description */}
            <motion.p
              className="text-[#6B7280] lg:text-base text-[15px] w-[80%] mx-auto"
              variants={itemVariants}
            >
              Provolo uses AI + proven copywriting strategies to optimize your profile and
              proposals, so you can land clients faster.
            </motion.p>

            {/* Primary CTA with hover animation */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <LandingpageButton to={"/signup"} btnText={"Optimize My Profile"} />
            </motion.div>

            {/* Floating images with improved alt text and animations */}
            <motion.img
              alt="AI proposal optimization illustration – Provolo"
              src={proposals}
              className="absolute lg:-top-32 -bottom-10 lg:-right-24 right-0 lg:w-32 w-[100px]"
              initial={{ opacity: 0, x: 50, rotate: 10 }}
              animate={{
                opacity: 1,
                x: 0,
                rotate: 0,
                transition: { duration: 0.8, delay: 1.2, ease: "easeOut" },
              }}
              variants={floatingVariants}
              whileInView="animate"
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            />

            <motion.img
              alt="Freelancers using AI to improve Upwork profiles"
              src={freelancers}
              className="absolute lg:-left-48 left-5 -top-14 lg:w-32 w-[100px]"
              initial={{ opacity: 0, x: -50, rotate: -10 }}
              animate={{
                opacity: 1,
                x: 0,
                rotate: 0,
                transition: { duration: 0.8, delay: 1.0, ease: "easeOut" },
              }}
              variants={floatingVariants}
              whileInView="animate"
              whileHover={{
                scale: 1.1,
                rotate: -5,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            />

            <motion.img
              alt="Upwork profile optimization graphic"
              src={upwork}
              className="absolute w-[100px] lg:w-32 -bottom-20 left-0 lg:left-auto lg:-right-96 lg:top-32"
              initial={{ opacity: 0, y: 50, rotate: 15 }}
              animate={{
                opacity: 1,
                y: 0,
                rotate: 0,
                transition: { duration: 0.8, delay: 1.4, ease: "easeOut" },
              }}
              variants={floatingVariants}
              whileInView="animate"
              whileHover={{
                scale: 1.1,
                rotate: 8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* App screenshot with descriptive alt text */}
      <motion.div
        className="absolute z-10 mx-auto w-[1300px] max-w-[1400px] -bottom-[500px] md:-bottom-[500px] lg:-bottom-[450px] lg:left-0 lg:right-0 left-8 rounded-[32px] bg-white p-4 shadow-lg"
        variants={screenshotVariants}
        initial="hidden"
        animate="visible"
        whileHover={{
          y: -10,
          // boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          transition: { duration: 0.4, ease: "easeOut" },
        }}
      >
        <motion.img
          alt="Provolo app screenshot showing AI Upwork profile optimizer dashboard"
          src={AppScreenshot}
          className="w-full rounded-[22px] border object-cover"
          whileHover={{
            // scale: 1.02,
            transition: { duration: 0.4, ease: "easeOut" },
          }}
        />
      </motion.div>

      {/* Decorative vectors with alt text and subtle animations */}
      <motion.img
        alt="Provolo background vector graphic"
        src={Vector}
        className="absolute top-0 left-0 lg:w-1/5 xl:w-1/6 w-1/2"
        variants={vectorVariants}
        initial="hidden"
        animate="visible"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
          backdropFilter: "blur(10px)",
        }}
      />

      <motion.img
        alt="Provolo accent vector design"
        src={Vector2}
        className="absolute bottom-0 right-0 w-1/3"
        variants={vectorVariants}
        initial="hidden"
        animate="visible"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
          backdropFilter: "blur(10px)",
        }}
      />
    </div>
  );
};
