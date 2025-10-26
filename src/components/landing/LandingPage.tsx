import { motion } from "motion/react";
import { LANDING_PAGE_CONFIG, LANDING_PAGE_STYLES } from "@/constants/landingPage";
import { Hero } from "@/components/landing/Hero";
import Header from "@/components/landing/Header";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import type { LandingPageProps } from "@/types/landingPage";
import LiveChat from "@/Reusables/LiveChat";

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
        <LiveChat />
      </main>
      <Footer />
    </motion.div>
  );
};

export default LandingPage;