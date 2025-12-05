import { useState, useMemo, useRef, useEffect } from "react";
import { useGetOptimizer } from "@/api";
import { Link, useParams } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import {
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Image,
  ArrowLeftRight,
  ArrowLeft,
  Copy,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import CustomButton from "@/Reusables/CustomButton";

const OptimizerHistoryPage = () => {
  const { optimizerId } = useParams({
    from: "/_sidebarlayout/_protected/optimizerHistory/$optimizerId",
  });

  // Fetch the optimizer based on the ID from URL params
  const { data: optimizer, isLoading } = useGetOptimizer(optimizerId);

  // Extract results from the optimizer response
  const results = optimizer?.data?.response || null;

  // Tab state
  const [activeTab, setActiveTab] = useState(0);
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Content ref for copy functionality
  const contentRef = useRef<HTMLDivElement>(null);

  // Memoize tab sections based on the fetched data
  const tabSections = useMemo(
    () => [
      {
        title: "Weaknesses & Ideas",
        fullTitle: "Weaknesses and Optimization Ideas",
        content: results?.weaknessesAndOptimization || "No data available",
        icon: AlertCircle,
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
      },
      {
        title: "Optimized Profile",
        fullTitle: "Optimized Profile Overview",
        content: results?.optimizedProfileOverview || "No data available",
        icon: CheckCircle,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
      },
      {
        title: "Project Titles",
        fullTitle: "Suggested Project Titles and Layouts",
        content: results?.suggestedProjectTitles || "No data available",
        icon: Lightbulb,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
      },
      {
        title: "Visuals & Layouts",
        fullTitle: "Recommended Visuals/Layout Hierarchies",
        content: results?.recommendedVisuals || "No data available",
        icon: Image,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
      },
      {
        title: "Comparison",
        fullTitle: "Before and After Comparison",
        content: results?.beforeAfterComparison || "No data available",
        icon: ArrowLeftRight,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
      },
    ],
    [results]
  );

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

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col p-6 sm:p-10 w-4xl mx-auto">
        <div className="h-5 w-32 bg-gray-200 rounded mb-4 animate-pulse mt-10" />
        <div className="h-8 w-64 bg-gray-200 rounded mb-8 animate-pulse" />
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-10 w-32 bg-gray-200 rounded-full animate-pulse flex-shrink-0"
            />
          ))}
        </div>
        <div className="h-96 bg-gray-100 rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10">
        <h2 className="text-2xl font-semibold mb-3">No Results Found</h2>
        <p className="text-gray-500 mb-6">
          We couldn't find any optimization history for this item.
        </p>
        <Link to="/optimizer">
          <CustomButton className="flex items-center gap-2">
            <ArrowLeft size={18} />
            Back to Optimizer
          </CustomButton>
        </Link>
      </div>
    );
  }

  const currentSection = tabSections[activeTab];

  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-gray-50/50">
      <div className="p-6 sm:p-10 mx-auto w-4xl w-full">
        {/* className="p-6 sm:p-10 w-4xl max-h-fit" */}

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-start pt-10"
        >
          <Link
            to="/optimizer"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Optimizer
          </Link>

          <h2 className="text-3xl font-medium text-gray-900 mb-2 truncate">
            {optimizer?.data?.originalInput?.professionalTitle ||
              "Optimization Results"}
          </h2>
          <p className="text-gray-500 mb-8">
            Review your personalized optimization insights and suggestions.
          </p>
        </motion.div>

        {/* Modern Tab Navigation */}
        <div className="mb-8 overflow-x-auto pb-2 -mx-6 px-6 sm:mx-0 sm:px-0 scrollbar-hide">
          <div className="flex space-x-2 min-w-max">
            {tabSections.map((section, index) => {
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
    </div>
  );
};

export default OptimizerHistoryPage;