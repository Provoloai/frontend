// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import vidOne from "../../assets/vids/vidOne.mov";
import vidTwo from "../../assets/vids/vidTwo.mov";
import vidThree from "../../assets/vids/vidThree.mov";
import vidFour from "../../assets/vids/vidFour.mov";

const FEATURES = [
  "Rank higher in Upwork search",
  "Convert profile views into interviews",
  "Attract high-value clients",
  "Win more jobs with smarter proposals",
];

const STEPS = [
  {
    title: "Smarter Copy, Instantly",
    vidSrc: vidFour,
    description:
      "Stop guessing what works. Provolo improves your profile and proposals automatically.",
  },
  {
    title: "Optimized for the Algorithm",
    vidSrc: vidTwo,
    description: "Headlines and overviews crafted to boost your visibility in Upwork's search.",
  },
  {
    title: "Works for Any Freelancer",
    vidSrc: vidOne,
    description: "Designer, developer, writer, or marketer, Provolo adapts to your niche.",
  },
  {
    title: "More Invitations & Interviews",
    vidSrc: vidThree,
    description:
      "Rank higher, get noticed, and turn views into conversations with client-focused copy.",
  },
];

const Features = () => {
  const [videosLoaded, setVideosLoaded] = useState({});
  const videoRefs = useRef([]);

  // Lazy load videos on intersection
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "50px",
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
        staggerChildren: 0.06,
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

  const featureVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
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

  return (
    <section className="lg:py-32 pt-20 lg:p-32 md:p-10 sm:px-0 px-5" id="features">
      <motion.div
        className="mx-auto max-w-full lg:max-w-[93.75rem] flex flex-col lg:gap-[102px] gap-[70px]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px", amount: 0.2 }}
      >
        {/* Intro text */}
        <motion.p
          className="lg:w-[69%] w-full font-headingmd lg:text-3xl text-base"
          variants={fadeUpVariants}
        >
          Provolo is an AI-powered copywriting platform built for freelancers on Upwork.{" "}
          <span className="text-[#A6AAB3] font-headingmd">
            It doesn't just write faster, it writes smarter, applying proven strategies to optimize
            your profile and proposals. The result? More visibility, more interviews, and more jobs,
            without the guesswork.
          </span>
        </motion.p>

        {/* Features list */}
        <motion.div variants={fadeUpVariants}>
          <motion.p
            className="font-headingmd mb-5 lg:text-base text-[18px]"
            variants={fadeUpVariants}
          >
            Why Provolo Works
          </motion.p>
          <motion.ol
            className="list-none flex justify-between lg:text-base text-[14px] text-[#6B7280] flex-wrap gap-6"
            variants={containerVariants}
          >
            {FEATURES.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center font-headingmd text-[#6B7280]"
                variants={featureVariants}
                whileHover={{
                  x: 2,
                  transition: { duration: 0.15 },
                }}
              >
                <motion.span
                  className="px-2 py-1 bg-[#6B7280]/10 rounded-lg mr-2 text-sm font-headingmd"
                  whileHover={{
                    backgroundColor: "rgba(107, 114, 128, 0.15)",
                    scale: 1.05,
                    transition: { duration: 0.15 },
                  }}
                >
                  {index + 1}
                </motion.span>
                {feature}
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>

        {/* Steps header */}
        <motion.div variants={fadeUpVariants}>
          <p className="font-headingmd lg:text-base text-[18px]">How Provolo Gets You Hired</p>
        </motion.div>
      </motion.div>

      {/* Steps slider with fade edges */}
      <div className="relative">
        {/* Left fade gradient - hidden on mobile/tablet */}
        {/* <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" /> */}
        
        {/* Right fade gradient - hidden on mobile/tablet */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="lg:flex grid md:grid-cols-2 grid-cols-1 gap-7 lg:overflow-x-auto no-scrollbar py-5 lg:px-2 lg:m snap-x snap-mandatory"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px", amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.15,
              },
            },
          }}
        >
          {STEPS.map((step, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-full sm:w-full lg:w-[450px] snap-start"
              variants={cardVariants}
              whileHover={{
                y: -2,
                transition: { duration: 0.2 },
              }}
            >
              <motion.div
                className="bg-[#F0F1F2] mb-8 lg:h-[500px] h-[420px] rounded-3xl lg:px-20 flex overflow-hidden"
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
      </div>
    </section>
  );
};

export default Features;