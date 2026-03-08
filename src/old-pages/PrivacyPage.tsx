import Footer from "@/old-components/landing/Footer";
import Header from "@/old-components/landing/Header";
import PrivacyPolicy from "@/old-components/privacy";
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
