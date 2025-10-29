import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { FAQ } from "@/types/liveChat";

interface FAQAccordionProps {
  faqs: FAQ[];
  openFaqId: number | null;
  onToggleFaq: (id: number) => void;
}

export default function FAQAccordion({
  faqs,
  openFaqId,
  onToggleFaq,
}: FAQAccordionProps) {
  return (
    <motion.div
      key="faqs"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      className="p-4 sm:p-6 relative bg-gradient-to-b from-black via-white to-white"
    >
      <div>
        <div className="my-6">
          <h3 className="text-white font-semibold text-base sm:text-lg">
            Need Help? 🤔
          </h3>
          <p className="text-white font-semibold text-sm sm:text-sm">
            We're right here for you.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3 mb-6">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => onToggleFaq(faq.id)}
                className="w-full text-left px-3 sm:px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between gap-2"
              >
                <span className="text-gray-700 text-xs sm:text-sm font-medium">
                  {faq.question}
                </span>
                <motion.div
                  animate={{
                    rotate: openFaqId === faq.id ? 180 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaqId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 sm:px-4 py-3 bg-white text-gray-600 text-xs sm:text-sm">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

