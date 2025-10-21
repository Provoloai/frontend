import LandingpageButton from "./LandingpageButton";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import vidFive from "../../assets/vids/vidFive.mov";
import vidSix from "../../assets/vids/vidSix.mov";
import vidTwo from "../../assets/vids/vidTwo.mov";

const STEPS = [
  {
    title: "Connect Your Profile",
    vidSrc: vidFive,
    description:
      "Import your Upwork profile in one click. Provolo scans your headline, overview, and proposals.",
  },
  {
    title: "AI Optimizes Your Copy",
    vidSrc: vidSix,
    description:
      "Provolo applies proven copywriting strategies to rewrite your profile into a client-magnet.",
  },
  {
    title: "Get Seen & Hired",
    vidSrc: vidTwo,
    description:
      "Rank higher in search, attract more views, and convert them into interviews and jobs.",
  },
];

const HowItWorks = () => {
  const [videosLoaded, setVideosLoaded] = useState({});
  const videoRefs = useRef([]);

  // Lazy load videos on intersection
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const video = entry.target;
          if (video.dataset.src && !videosLoaded[video.dataset.index]) {
            video.src = video.dataset.src;
            video.load();
            setVideosLoaded(prev => ({ ...prev, [video.dataset.index]: true }));
          }
        }
      });
    }, options);

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [videosLoaded]);

  // Optimized animation variants with reduced complexity
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.08,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  return (
    <section className="lg:pt-32 py-10 lg:px-32 md:px-10 px-5" id="howitworks">
      <motion.div
        className="mx-auto max-w-full lg:max-w-[93.75rem] flex flex-col gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px", amount: 0.2 }}
      >
        {/* Section header */}
        <motion.header variants={fadeUpVariants}>
          <motion.p
            className="font-headingmd lg:text-[28px] text-[18px] mb-3"
            variants={fadeUpVariants}
          >
            From Profile to Paycheck in 3 Steps.
          </motion.p>
          <motion.p
            className="text-[#6B7280] lg:text-[22px] text-[14px]"
            variants={fadeUpVariants}
          >
            No learning curve. No guesswork. Just connect, optimize, and start landing clients.
          </motion.p>
        </motion.header>

        {/* Steps */}
        <motion.div
          className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7"
          variants={gridVariants}
        >
          {STEPS.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -3,
                transition: { duration: 0.2 },
              }}
            >
              <motion.div
                className="bg-[#F0F1F2] mb-8 lg:h-[500px] h-[420px] rounded-3xl lg:p-10 flex overflow-hidden"
                whileHover={{
                  transition: { duration: 0.2 },
                }}
              >
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  data-src={step.vidSrc}
                  data-index={index}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-fit"
                  style={{ willChange: "transform" }}
                />
              </motion.div>
              <div className="px-5">
                <motion.p
                  className="font-headingmd lg:text-[18px] text-[16px] mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{
                    opacity: 1,
                    transition: { duration: 0.3, delay: 0.05 },
                  }}
                  viewport={{ once: true }}
                >
                  {step.title}
                </motion.p>
                <motion.p
                  className="lg:text-[18px] text-[14px] text-[#6B7280]"
                  initial={{ opacity: 0 }}
                  whileInView={{
                    opacity: 1,
                    transition: { duration: 0.3, delay: 0.1 },
                  }}
                  viewport={{ once: true }}
                >
                  {step.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.span
          className="text-center justify-center hidden lg:flex"
          variants={fadeUpVariants}
        >
          <motion.div
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.15 },
            }}
            whileTap={{ scale: 0.98 }}
          >
            <LandingpageButton to={"/signup"} btnText={"Boost My Profile Now"} />
          </motion.div>
        </motion.span>
      </motion.div>
    </section>
  );
};

export default HowItWorks;