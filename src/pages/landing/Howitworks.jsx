import LandingpageButton from "./LandingpageButton";

// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import vidFive from "../../assets/vids/vidFive.MOV";
import vidSix from "../../assets/vids/vidSix.MOV";
import vidTwo from "../../assets/vids/vidTwo.MOV";



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
      "Provolo applies proven copywriting strategies to rewrite your profile into a client-magnet. Watch weak words transform into persuasive ones in real time.",
  },
  {
    title: "Get Seen & Hired",
    vidSrc: vidTwo,
    description:
      "Rank higher in search, attract more views, and convert them into interviews and jobs.",
  },
];

const HowItWorks = () => {
  // Minimal container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  // Subtle fade up for header elements
  const fadeUpVariants = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Step card animation with minimal movement
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Grid container for staggered card animations
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className="lg:py-32 py-10 px-5" id="howitworks">
      <motion.div
        className="mx-auto mmd:ax-w-full lg:max-w-[93.75rem] flex flex-col gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
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
            className="font-headingmd text-[#6B7280] lg:text-[22px] text-[14px]"
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
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              }}
            >
              <motion.div
                className="bg-[#F0F1F2] mb-8 lg:h-[500px] h-[420px] rounded-3xl lg:p-10 flex "
                whileHover={{
                  // backgroundColor: "#EAEBEC",
                  transition: { duration: 0.3 },
                }}
              >
                <video src={step.vidSrc} autoPlay loop muted></video>
                {/* <motion.div
                  className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-sm font-headingmd text-gray-600"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.4,
                      delay: index * 0.1 + 0.5
                    }
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    transition: { duration: 0.2 }
                  }}
                >
                  {index + 1}
                </motion.div> */}
              </motion.div>
              <div className="px-5">
                <motion.p
                  className="font-headingmd lg:text-[18px] text-[16px] mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{
                    opacity: 1,
                    transition: {
                      duration: 0.4,
                      delay: 0.1,
                    },
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
                    transition: {
                      duration: 0.4,
                      delay: 0.2,
                    },
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
              transition: { duration: 0.2, ease: "easeOut" },
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
