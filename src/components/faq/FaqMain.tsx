import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const faqs = [
  {
    id: 1,
    question: "What is Provolo?",
    answer:
      "Provolo is an AI-powered tool helping freelancers stand out and land more clients through smarter profile optimization and AI-generated proposals. It analyzes your skills, writing tone, and past work to help you present a polished, high-converting freelance profile.",
  },
  {
    id: 2,
    question: "Can Provolo help me write proposals for Upwork jobs?",
    answer:
      "Yes! Provolo includes an AI-powered proposal generator that helps you craft personalized, confident, and high-converting proposals tailored to each job post. You can also customize tone and structure before sending.",
  },
  {
    id: 3,
    question: "What if I don't know what my Upwork title or tags should be?",
    answer:
      "Provolo analyzes your experience and suggests optimized job titles, categories, and skill tags that align with what clients search for. This ensures your profile ranks better and attracts relevant opportunities.",
  },
  {
    id: 4,
    question: "Does Provolo only work for Upwork?",
    answer:
      "Currently, Provolo is optimized for Upwork. However, we're actively working on expanding support to other platforms like Fiverr, Toptal, and Freelancer.com.",
  },
  {
    id: 5,
    question: "Is my data safe with Provolo?",
    answer:
      "Yes. We take privacy seriously. Your data is encrypted and never shared with third parties. All information you enter is stored securely and used solely to enhance your experience inside Provolo.",
  },
  {
    id: 6,
    question: "Can I edit or customize what the AI generates?",
    answer:
      "Of course! Everything Provolo generates is fully editable. You can tweak, rewrite, or personalize any section before saving or exporting — you're always in control.",
  },
];

export default function FaqMain() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleItem = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg- px-6 py-16 sm:pt-52">
      <div className="mx-auto max-w-4xl">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-gray-900 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft size={16} />
            Go Back Home
          </Link>
          <h2>
            Frequently asked questions
          </h2>
        </motion.h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-lg font-medium text-gray-900 pr-8">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  {openId === faq.id ? (
                    <Minus className="h-5 w-5 text-gray-600" />
                  ) : (
                    <Plus className="h-5 w-5 text-gray-600" />
                  )}
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

  );
}