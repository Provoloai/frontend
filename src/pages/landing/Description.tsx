import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import LandingpageButton from "./LandingpageButton";
import vidSeven from "../../assets/vids/vidSeven.mov";
import { containerVariants, fadeInVariants, slideInVariants, scaleVariants } from "../../types/motion";

export default function Description() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const FEATURES = [
    "Crafted to grab client attention.",
    "Built to boost algorithm ranking.",
    "Designed to help you win more jobs.",
  ];

  // Lazy load video on intersection
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !videoLoaded) {
          const video = entry.target;
          if (video.dataset.src) {
            video.src = video.dataset.src;
            video.load();
            setVideoLoaded(true);
          }
        }
      });
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [videoLoaded]);

  // Use properly typed motion variants
  const customContainerVariants = {
    ...containerVariants,
    visible: {
      ...containerVariants.visible,
      transition: {
        duration: 0.4,
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <section className="py-10 lg:px-32 md:px-10 px-5" id="features">
      <motion.div
        className="mx-auto md:max-w-full lg:max-w-[93.75rem] bg-[#F3F4F5] rounded-3xl lg:h-[600px] lg:p-10 p-5 lg:grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px", amount: 0.2 }}
        variants={customContainerVariants}
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-0">
          <motion.div
            className="flex flex-col lg:gap-20 gap-10 text-start"
            variants={containerVariants}
          >
            <motion.header className="flex flex-col" variants={fadeInVariants}>
              <motion.p
                className="font-headingmd lg:text-[28px] text-[18px] mb-3"
                variants={fadeInVariants}
              >
                Every Word Works Harder.
              </motion.p>
              <motion.p
                className="text-[#6B7280] lg:text-[22px] lg:pr-32 text-[14px]"
                variants={fadeInVariants}
              >
                Provolo isn't just about writing faster, it's about writing smarter.
              </motion.p>
            </motion.header>

            <motion.ol
              className="list-none lg:text-base text-[14px] text-[#6B7280] flex flex-col gap-6"
              variants={containerVariants}
            >
              {FEATURES.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-center font-headingmd text-x"
                  variants={slideInVariants}
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

            <motion.div variants={fadeInVariants}>
              <motion.div
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.15 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <LandingpageButton to={"/signup"} btnText={"Get Started"} />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex mt-10 lg:mt-0 lg:text-center justify-end items-center overflow-hidden"
            variants={scaleVariants}
          >
            <video
              ref={videoRef}
              data-src={vidSeven}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="m-auto object-fit rounded-2xl"
              style={{ willChange: "transform" }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}