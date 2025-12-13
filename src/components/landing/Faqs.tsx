import Header from "./Header";
import FaqMain from "../faq/FaqMain";
import Footer from "./Footer";
import { useSEO, SEO_CONFIGS } from "@/hooks/useSEO";

const Faqs = () => {
  useSEO(SEO_CONFIGS.faq);

  return (
    <>
      <Header />
      <FaqMain />
      <Footer />
    </>
  );
};

export default Faqs;
