import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import AppScreenshot from "../../assets/img/screenshot.png";
import Vector from "../../assets/img/Vector.png";
import Vector2 from "../../assets/img/Vector2.png";
import freelancers from "../../assets/img/freelancers.png";
import upwork from "../../assets/img/upwork.png";
import proposals from "../../assets/img/proposals.png";
import LandingpageButton from "./LandingpageButton";

export const Hero = () => {
  const [imagesLoaded, setImagesLoaded] = useState({});
  const imageRefs = useRef({});

  // Lazy load images on intersection
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 0.01,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const imgKey = img.dataset.key;
          if (img.dataset.src && !imagesLoaded[imgKey]) {
            img.src = img.dataset.src;
            setImagesLoaded(prev => ({ ...prev, [imgKey]: true }));
          }
        }
      });
    }, options);

    Object.values(imageRefs.current).forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => observer.disconnect();
  }, [imagesLoaded]);

  // Optimized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Reduced floating animation
  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      rotate: [-1, 1, -1],
      transition: {
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  const vectorVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  const screenshotVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen lg:h-screen h-[800px] overflow-hidden relative bg-light flex flex-col items-center justify-center">
      <motion.div
        className="relative isolate px-6 lg:px-8 z-10 lg:pb-0 pb-44"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto max-w-[75rem] flex flex-col lg:gap-[60px] gap-[100px]">
          <div className="text-center lg:w-[629px] mx-auto flex flex-col lg:gap-[20px] gap-[20px] relative items-center">
            {/* Subtitle */}
            <motion.p
              className="lg:text-sm text-[10px] uppercase tracking-wider"
              variants={itemVariants}
            >
              Designed to Turn Profile Views Into Interviews
            </motion.p>

            {/* H1 */}
            <motion.h1
              className="tracking-tight leading-tight text-balance lg:text-xl md:text-7xl text-4xl font-medium"
              variants={itemVariants}
            >
              Win More Jobs on Upwork{" "}
              <span className="font-headingmd text-primary">Automatically</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-[#6B7280] lg:text-base text-[15px] w-[80%] mx-auto"
              variants={itemVariants}
            >
              Provolo uses AI + proven copywriting strategies to optimize your profile and
              proposals, so you can land clients faster.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.15 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <LandingpageButton to={"/signup"} btnText={"Optimize My Profile"} />
            </motion.div>

            {/* Floating images - Lazy loaded */}
            <motion.img
              ref={(el) => (imageRefs.current.proposals = el)}
              data-key="proposals"
              data-src={proposals}
              alt="AI proposal optimization"
              className="absolute lg:-top-24 -bottom-10 lg:-right-24 right-0 lg:w-32 w-[100px]"
              initial={{ opacity: 0, x: 30, rotate: 8 }}
              animate={{
                opacity: 1,
                x: 0,
                rotate: 0,
                transition: { duration: 0.6, delay: 0.8, ease: "easeOut" },
              }}
              variants={floatingVariants}
              whileInView="animate"
              viewport={{ once: true }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
              loading="lazy"
              style={{ willChange: "transform" }}
            />

            <motion.img
              ref={(el) => (imageRefs.current.freelancers = el)}
              data-key="freelancers"
              data-src={freelancers}
              alt="Freelancers using AI"
              className="absolute lg:-left-48 left-5 -top-14 lg:w-32 w-[100px]"
              initial={{ opacity: 0, x: -30, rotate: -8 }}
              animate={{
                opacity: 1,
                x: 0,
                rotate: 0,
                transition: { duration: 0.6, delay: 0.6, ease: "easeOut" },
              }}
              variants={floatingVariants}
              whileInView="animate"
              viewport={{ once: true }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
              loading="lazy"
              style={{ willChange: "transform" }}
            />

            <motion.img
              ref={(el) => (imageRefs.current.upwork = el)}
              data-key="upwork"
              data-src={upwork}
              alt="Upwork profile optimization"
              className="absolute w-[100px] lg:w-32 -bottom-20 left-0 lg:left-auto lg:-right-96 lg:top-32"
              initial={{ opacity: 0, y: 30, rotate: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                rotate: 0,
                transition: { duration: 0.6, delay: 1.0, ease: "easeOut" },
              }}
              variants={floatingVariants}
              whileInView="animate"
              viewport={{ once: true }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
              loading="lazy"
              style={{ willChange: "transform" }}
            />
          </div>
        </div>
      </motion.div>

      {/* App screenshot - Load immediately (critical LCP element) */}
      <motion.div
        className="absolute z-10 mx-auto w-[1300px] max-w-[1400px] -bottom-[500px] md:-bottom-[500px] lg:-bottom-[550px] lg:left-0 lg:right-0 left-8 rounded-[32px] bg-white p-4 shadow-lg"
        variants={screenshotVariants}
        initial="hidden"
        animate="visible"
        whileHover={{
          y: -8,
          transition: { duration: 0.3 },
        }}
      >
        <motion.img
          src={AppScreenshot}
          alt="Provolo app dashboard"
          className="w-full rounded-[22px] border object-cover"
          style={{ willChange: "transform" }}
        />
      </motion.div>

      {/* Background vectors - Lazy loaded */}
      <motion.img
        ref={(el) => (imageRefs.current.vector1 = el)}
        data-key="vector1"
        data-src={Vector}
        alt=""
        className="absolute top-0 left-0 lg:w-1/5 xl:w-1/6 w-1/2 opacity-80"
        variants={vectorVariants}
        initial="hidden"
        animate="visible"
        loading="lazy"
      />

      <motion.img
        ref={(el) => (imageRefs.current.vector2 = el)}
        data-key="vector2"
        data-src={Vector2}
        alt=""
        className="absolute bottom-0 right-0 w-1/3 opacity-80"
        variants={vectorVariants}
        initial="hidden"
        animate="visible"
        loading="lazy"
      />
    </div>
  );
};