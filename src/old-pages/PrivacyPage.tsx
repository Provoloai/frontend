import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import PrivacyPolicy from "@/components/privacy";
import { useSEO, SEO_CONFIGS } from "@/hooks/useSEO";

const PrivacyPolicyPage = () => {
  useSEO(SEO_CONFIGS.privacy);

  return (
    <>
      <Header />
      <PrivacyPolicy />
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
