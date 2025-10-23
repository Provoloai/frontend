import { motion } from "motion/react";
import { LANDING_PAGE_CONFIG, LANDING_PAGE_STYLES } from "@/constants/landingPage";
import { Hero } from "./Hero";
import Header from "./Header";
import Features from "./Features";
import Footer from "./Footer";
import type { LandingPageProps } from "@/types/landingPage";

const LandingPage: React.FC<LandingPageProps> = () => {
  return (
    <motion.div
      className={LANDING_PAGE_STYLES.container}
      initial={LANDING_PAGE_CONFIG.animations.page.initial}
      animate={LANDING_PAGE_CONFIG.animations.page.animate}
      transition={LANDING_PAGE_CONFIG.animations.page.transition}
    >
      <Header />
      <main className={LANDING_PAGE_STYLES.main}>
        <Hero />
        <Features />
      </main>
      <Footer />
    </motion.div>
  );
};

export default LandingPage;