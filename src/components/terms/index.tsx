import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import hero from "@/assets/img/terms-of-service-page.jpeg";

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const sections: Section[] = [
  {
    id: "terms-conditions",
    title: "Terms & Conditions",
    content: (
      <div className="space-y-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900">
          Terms & Conditions
        </h1>
        <p className="text-lg text-gray-600">Effective Date: 31st July 2025</p>

        {/* Hero Image */}
        <div className="aspect-[3/2] rounded-2xl overflow-hidden">
          <img
            src={hero}
            alt="hero image for privacy page"
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-lg text-gray-700 leading-relaxed">
          By using <strong className="text-gray-900">Provolo</strong>, you agree
          to these Terms & Conditions.
        </p>
      </div>
    ),
  },
  {
    id: "use-of-service",
    title: "1. Use of Service",
    content: (
      <>
        <h2 className="text-lg font-bold mb-6 text-gray-900">
          1. Use of Service
        </h2>
        <p className="text-gray-700 leading-relaxed">
          This tool is provided "as-is" for informational and improvement
          purposes. It does not guarantee job success on Upwork.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "2. Intellectual Property",
    content: (
      <>
        <h2 className="text-lg font-bold mb-6 text-gray-900">
          2. Intellectual Property
        </h2>
        <p className="text-gray-700 leading-relaxed">
          All content generated using this tool is yours. However, the platform,
          interface, and AI prompt engineering remain the property of{" "}
          <strong className="text-gray-900">Seventhstreet Studio</strong>.
        </p>
      </>
    ),
  },
  {
    id: "no-guarantees",
    title: "3. No Guarantees",
    content: (
      <>
        <h2 className="text-lg font-bold mb-6 text-gray-900">
          3. No Guarantees
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We strive for accuracy, but results from the AI are not always
          perfect. You are responsible for reviewing and editing final outputs
          before using them publicly.
        </p>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "4. Limitation of Liability",
    content: (
      <>
        <h2 className="text-lg font-bold mb-6 text-gray-900">
          4. Limitation of Liability
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We are not liable for any damages, loss of jobs, or profile issues
          resulting from use of this service.
        </p>
      </>
    ),
  },
  {
    id: "modifications",
    title: "5. Modifications",
    content: (
      <>
        <h2 className="text-lg font-bold mb-6 text-gray-900">
          5. Modifications
        </h2>
        <p className="text-gray-700 leading-relaxed mb-8">
          We may update these terms from time to time. Continued use of the
          platform constitutes agreement to the latest version.
        </p>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Updated on November 25, 2025, 10:37 AM UTC
          </p>
        </div>
      </>
    ),
  },
];

const navigationItems = sections.map(s => ({ id: s.id, title: s.title }));

const TermsConditions: React.FC = () => {
  const [activeSection, setActiveSection] = useState("terms-conditions");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg- px-6 py-16 sm:pt-52">
      <div className="mx-auto max-w-7xl">
        <div className="flex gap-12">
          {/* Left Sidebar - Table of Contents */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-32">
              <h3 className="text-sm font-semibold text-gray-500 mb-4">
                On this page
              </h3>
              <nav className="space-y-2">
                {navigationItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-2 text-sm transition-all ${
                      activeSection === item.id
                        ? "text-blue-600 border-l-2 border-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-gray-900 border-l-2 border-transparent hover:border-gray-300"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-4xl">
            {sections.map((section, index) => (
              <motion.section
                key={section.id}
                id={section.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className={
                  index < sections.length - 1
                    ? "mb-16 pb-16 border-b border-gray-200"
                    : "mb-16"
                }
              >
                {section.content}
              </motion.section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
