import React, { useState, useEffect } from "react";
import hero from "@/assets/img/privacy-page.webp";
import { motion } from "motion/react";

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
    id: "privacy-policy",
    title: "Privacy Policy",
    content: (
      <div className="space-y-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-600">Effective Date: 31st July 2025</p>

        {/* Hero Image */}
        <div className="">
          <img
            src={hero}
            alt="hero image for privacy page"
            className="w-full h-full object-cover  rounded-lg"
          />
        </div>

        <p className="text-lg text-gray-700 leading-relaxed">
          This Privacy Policy explains how Provolo ("we," "our," or "us")
          collects, uses, and protects your personal information when you use
          our website and services. By using Provolo, you agree to the terms
          outlined in this policy.
        </p>
      </div>
    ),
  },
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    content: (
      <>
        <h2 className="text-lg font-bold mb-6 text-gray-900">
          1. Information We Collect
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          When you use our services, we may collect the following types of
          information:
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Information You Provide Directly:
            </h3>
            <ul className="space-y-4 ml-6">
              <li className="text-gray-700 leading-relaxed">
                <strong className="text-gray-900">Contact Information:</strong>{" "}
                Your name and email address when you sign up for our newsletter
                or contact us.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong className="text-gray-900">Upwork Profile Data:</strong>{" "}
                The content of your Upwork profile, including your bio, skills,
                project titles, and other details you provide to our tool for
                optimization. We do{" "}
                <strong className="text-gray-900">not</strong> collect or store
                your Upwork password or login credentials.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Automatically Collected Information:
            </h3>
            <ul className="space-y-4 ml-6">
              <li className="text-gray-700 leading-relaxed">
                <strong className="text-gray-900">Technical Data:</strong>{" "}
                Information about your device, browser type, IP address, and
                operating system.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong className="text-gray-900">Usage Data:</strong> Details
                on how you interact with our website, such as the pages you
                visit, the features you use, and the duration of your session.
                This helps us understand how to improve our services.
              </li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "2. How We Use Your Information",
    content: (
      <>
        <h2 className="text-lg font-bold mb-6 text-gray-900">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          We use the information we collect for the following purposes:
        </p>

        <ul className="space-y-4 ml-6">
          <li className="text-gray-700 leading-relaxed">
            <strong className="text-gray-900">To Provide Our Services:</strong>{" "}
            We use your Upwork profile data to generate AI-optimized suggestions
            for your bio, skills, and project titles.
          </li>
          <li className="text-gray-700 leading-relaxed">
            <strong className="text-gray-900">To Improve Our Product:</strong>{" "}
            We use aggregated usage data to understand user behavior, identify
            popular features, and make improvements to the functionality and
            user experience of Provolo.
          </li>
          <li className="text-gray-700 leading-relaxed">
            <strong className="text-gray-900">To Communicate with You:</strong>{" "}
            We use your email address to send you updates about our product, new
            features, and other relevant information. You can opt out of these
            communications at any time.
          </li>
          <li className="text-gray-700 leading-relaxed">
            <strong className="text-gray-900">To Ensure Security:</strong> We
            use technical data to help maintain the security and integrity of
            our services, including detecting and preventing fraud.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-share",
    title: "3. How We Share and Disclose Inf...",
    content: (
      <>
        <h2 className="text-lg font-bold mb-6 text-gray-900">
          3. How We Share and Disclose Information
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          We do not sell, rent, or trade your personal information. We may share
          your information only in the following limited circumstances:
        </p>

        <ul className="space-y-6 ml-6">
          <li className="text-gray-700 leading-relaxed">
            <strong className="text-gray-900">With Your Consent:</strong> We may
            share your information with third parties when you give us explicit
            permission to do so.
          </li>
          <li>
            <strong className="text-gray-900 block mb-3">
              With Third-Party Service Providers:
            </strong>
            <p className="text-gray-700 mb-3 leading-relaxed">
              We use third-party services to help us operate our business. These
              providers only have access to the information necessary to perform
              their specific tasks and are contractually obligated to protect
              your data. These services include:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="text-gray-700">
                <strong className="text-gray-900">Gemini AI (Google):</strong>{" "}
                For AI-powered text optimization.
              </li>
              <li className="text-gray-700">
                <strong className="text-gray-900">
                  Firebase & Firestore (Google):
                </strong>{" "}
                For secure backend services and temporary data storage.
              </li>
              <li className="text-gray-700">
                <strong className="text-gray-900">Vite & TailwindCSS:</strong>{" "}
                For frontend user interface design.
              </li>
            </ul>
          </li>
          <li className="text-gray-700 leading-relaxed">
            <strong className="text-gray-900">For Legal Reasons:</strong> We may
            disclose your information if required by law, such as to comply with
            a subpoena or other legal process, or to protect our rights, your
            safety, or the safety of others.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-storage",
    title: "4. Data Storage, Security, and Ret...",
    content: (
      <>
        <h2 className="text-lg font-bold mb-6 text-gray-900">
          4. Data Storage, Security, and Retention
        </h2>

        <ul className="space-y-6 ml-6">
          <li className="text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Security:</strong> We use a
            combination of administrative, technical, and physical safeguards to
            protect your information from unauthorized access, use, or
            disclosure.
          </li>
          <li className="text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Data Retention:</strong> We only
            retain your personal information for as long as necessary to provide
            our services and fulfill the purposes outlined in this policy.
            Upwork profile data provided for optimization is temporarily
            processed and is not stored permanently.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "5. Your Rights",
    content: (
      <>
        <h2 className="text-lg font-bold mb-6 text-gray-900">5. Your Rights</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          You have the following rights regarding your personal data:
        </p>

        <ul className="space-y-4 ml-6">
          <li className="text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Access and Correction:</strong>{" "}
            You can request a copy of the personal information we hold about you
            and ask for any inaccuracies to be corrected.
          </li>
          <li className="text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Deletion:</strong> You can request
            the deletion of your personal data.
          </li>
          <li className="text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Opt-Out:</strong> You can
            unsubscribe from our marketing emails at any time by following the
            link at the bottom of the email.
          </li>
        </ul>

        <p className="text-gray-700 mt-6 leading-relaxed">
          To exercise any of these rights, please contact us at{" "}
          <a
            href="mailto:Heyprovolo@gmail.com"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Heyprovolo@gmail.com
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "6. Changes to This Privacy Policy",
    content: (
      <>
        <h2 className="text-lg font-bold mb-6 text-gray-900">
          6. Changes to This Privacy Policy
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or for legal reasons. We will notify you of any
          significant changes by posting the new policy on our website. Your
          continued use of our services after any changes indicates your
          acceptance of the updated policy.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "7. Contact Us",
    content: (
      <>
        <h2 className="text-lg font-bold mb-6 text-gray-900">7. Contact Us</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          If you have any questions or concerns about this Privacy Policy or our
          data practices, please contact us at:
        </p>
        <p className="text-gray-700 leading-relaxed">
          <strong className="text-gray-900">Email:</strong>{" "}
          <a
            href="mailto:Heyprovolo@gmail.com"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Heyprovolo@gmail.com
          </a>
        </p>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Updated on November 25, 2025, 10:37 AM UTC
          </p>
        </div>
      </>
    ),
  },
];

const navigationItems = sections.map(s => ({ id: s.id, title: s.title }));

const PrivacyPolicy: React.FC = () => {
  const [activeSection, setActiveSection] = useState("privacy-policy");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

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
                    ? "p-4 border-b border-gray-200"
                    : "p-4"
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

export default PrivacyPolicy;
