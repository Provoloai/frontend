import { useState, useRef, useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import {
  ChevronDown,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Image,
  ArrowLeftRight,
  Copy,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import CustomButton from "@/Reusables/CustomButton";

// Map titles to icons and colors
const sectionConfig: Record<string, any> = {
  "Weaknesses and Optimization Ideas": {
    icon: AlertCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    shortTitle: "Weaknesses & Ideas",
  },
  "Optimized Profile Overview": {
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    shortTitle: "Optimized Profile",
  },
  "Suggested Project Titles and Layouts": {
    icon: Lightbulb,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    shortTitle: "Project Titles",
  },
  "Recommended Visuals/Layout Hierarchies": {
    icon: Image,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    shortTitle: "Visuals & Layouts",
  },
  "Before and After Comparison": {
    icon: ArrowLeftRight,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    shortTitle: "Comparison",
  },
  default: {
    icon: ChevronDown,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    shortTitle: "Section",
  },
};

interface Section {
  title: string;
  content: string;
}

interface ResultsAccordionProps {
  sections: Section[];
  scrollButton?: React.ReactNode;
}

const ResultsAccordion: React.FC<ResultsAccordionProps> = ({ sections, scrollButton }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Prepare tab data
  const tabs = useMemo(() => {
    return sections.map((section: Section) => {
      const config = sectionConfig[section.title] || sectionConfig.default;
      return {
        ...section,
        ...config,
        fullTitle: section.title,
        title: config.shortTitle || section.title,
      };
    });
  }, [sections]);

  const handleCopy = async () => {
    if (!contentRef.current) return;
    try {
      await navigator.clipboard.writeText(contentRef.current.innerText);
      setCopyState("copied");

      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => {
        setCopyState("idle");
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setCopyState("idle");
    }
  };

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  if (!sections || sections.length === 0) return null;

  const currentSection = tabs[activeTab];

  return (
    <div className="mt-10 p-6 sm:p-10 mx-auto w-4xl w-full">
      <div className="mb-8 flex items-center justify-between gap-3 w-full">
        <h2 className="font-medium text-center text-2xl">
          Optimization Insights ✦︎
        </h2>
        {scrollButton}
      </div>

      {/* Modern Tab Navigation */}
      <div className="mb-8 overflow-x-auto pb-2 -mx-6 px-6 sm:mx-0 sm:px-0 scrollbar-hide">
        <div className="flex space-x-2 min-w-max">
          {tabs.map((section: any, index: number) => {
            const isActive = activeTab === index;
            const Icon = section.icon;

            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`
                  relative px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200
                  flex items-center gap-2 border
                  ${isActive
                    ? "bg-gray-900 text-white border-gray-900 shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }
                `}
              >
                <Icon size={16} className={isActive ? "text-white" : ""} />
                {section.title}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 rounded-full bg-white/10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
        >
          {/* Header */}
          <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${currentSection.bgColor} ${currentSection.color}`}
              >
                <currentSection.icon size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {currentSection.fullTitle}
              </h3>
            </div>

            <span>
              <CustomButton
                onClick={handleCopy}
                className={`
                  text-xs h-9 min-h-0 px-4 border
                  ${copyState === "copied"
                    ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50"
                    : "bg-gray-100 text-black border-gray-200 hover:bg-gray-50"
                  }
                `}
              >
                {copyState === "copied" ? (
                  <p className="flex items-center gap-1 text-blue-600 text-xs">
                    <Check size={14} className="mr-1.5" />
                    Copied
                  </p>
                ) : (
                  <p className="flex items-center gap-1 text-black text-xs">
                    <Copy size={14} className="mr-1.5" />
                    Copy
                  </p>
                )}
              </CustomButton>
            </span>
          </div>

          {/* Markdown Content */}
          <div className="p-6 sm:p-8">
            <div
              ref={contentRef}
              className="prose prose-slate prose-sm sm:prose-sm max-w-none
                prose-headings:font-semibold prose-headings:text-gray-900
                prose-p:text-gray-600 prose-li:text-gray-600
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-gray-900 prose-pre:text-gray-50
                prose-blockquote:border-l-4 prose-blockquote:border-gray-200 prose-blockquote:pl-4 prose-blockquote:italic
              "
            >
              <ReactMarkdown>{currentSection.content}</ReactMarkdown>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ResultsAccordion;
