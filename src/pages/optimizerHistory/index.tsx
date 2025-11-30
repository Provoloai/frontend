import { useState, useMemo, useRef } from "react";
import { useGetOptimizer } from "@/api";
import { Link, useParams } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import { AlertCircle, CheckCircle, Lightbulb, Image, ArrowLeftRight, ArrowLeft } from "lucide-react";

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
  
  // Content ref for copy functionality
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Memoize tab sections based on the fetched data
  const tabSections = useMemo(
    () => [
      { 
        title: "Weaknesses and Optimization Ideas", 
        content: results?.weaknessesAndOptimization || "No data available",
        icon: AlertCircle
      },
      { 
        title: "Optimized Profile Overview", 
        content: results?.optimizedProfileOverview || "No data available",
        icon: CheckCircle
      },
      { 
        title: "Suggested Project Titles and Layouts", 
        content: results?.suggestedProjectTitles || "No data available",
        icon: Lightbulb
      },
      { 
        title: "Recommended Visuals/Layout Hierarchies", 
        content: results?.recommendedVisuals || "No data available",
        icon: Image
      },
      { 
        title: "Before and After Comparison", 
        content: results?.beforeAfterComparison || "No data available",
        icon: ArrowLeftRight
      },
    ],
    [results]
  );

  const colorClassMap: Record<string, { tab: string; content: string; copy: string }> = {
    "Weaknesses and Optimization Ideas": {
      tab: "border-red-500 text-red-600",
      content: "border-red-100 bg-red-50",
      copy: "text-red-600 border-red-300 hover:bg-red-100",
    },
    "Optimized Profile Overview": {
      tab: "border-green-500 text-green-600",
      content: "border-green-100 bg-green-50",
      copy: "text-green-600 border-green-300 hover:bg-green-100",
    },
    "Suggested Project Titles and Layouts": {
      tab: "border-yellow-500 text-yellow-600",
      content: "border-yellow-100 bg-yellow-50",
      copy: "text-yellow-600 border-yellow-300 hover:bg-yellow-100",
    },
    "Recommended Visuals/Layout Hierarchies": {
      tab: "border-blue-500 text-blue-600",
      content: "border-blue-100 bg-blue-50",
      copy: "text-blue-600 border-blue-300 hover:bg-blue-100",
    },
    "Before and After Comparison": {
      tab: "border-purple-500 text-purple-600",
      content: "border-purple-100 bg-purple-50",
      copy: "text-purple-600 border-purple-300 hover:bg-purple-100",
    },
  };

   if (isLoading) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="p-6 sm:p-10 m-auto w-full">
          {/* Back button skeleton */}
          <div className="h-5 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
          
          {/* Title skeleton */}
          <div className="h-7 w-64 bg-gray-200 rounded mb-8 animate-pulse"></div>
          
          {/* Tab navigation skeleton */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex flex-wrap gap-2 -mb-px pb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-10 w-48 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>
          
          {/* Content skeleton */}
          <div className="rounded-lg shadow-sm border border-gray-200 bg-gray-50">
            <div className="p-6">
              {/* Content title skeleton */}
              <div className="h-6 w-72 bg-gray-200 rounded mb-4 animate-pulse"></div>
              
              {/* Content lines skeleton */}
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            
            {/* Copy button skeleton */}
            <div className="w-full text-end px-6 pb-6">
              <div className="h-8 w-16 bg-gray-200 rounded inline-block animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-lg text-gray-500">No optimizer results found</p>
        </div>
      </div>
    );
  }

  const currentSection = tabSections[activeTab];
  const classes = colorClassMap[currentSection.title];

  return (
    <div className="flex-1 flex flex-col py-10">
      <div className="p-6 sm:p-10 m-auto w-full">
        <Link
            to="/optimizer"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Optimizer
          </Link>
        <h2 className="text-lg mb-8 font-bold truncate">
          {optimizer?.data?.originalInput?.professionalTitle || "Optimizer History"}
        </h2>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex flex-wrap -mb-px">
            {tabSections.map((section, index) => {
              const isActive = activeTab === index;
              const tabColors = colorClassMap[section.title];
              const Icon = section.icon;
              
              return (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`
                    mr-2 py-3 px-4 text-sm font-medium border-b-2 transition-colors
                    flex items-center gap-2
                    ${
                      isActive
                        ? tabColors.tab
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }
                  `}
                >
                  <Icon size={16} />
                  {section.title}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className={`rounded-lg shadow-sm border ${classes.content}`}>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              {currentSection.title}
            </h3>
            <div
              ref={contentRef}
              className="prose prose-sm max-w-none max-h-[500px] overflow-y-auto pr-4"
            >
              <ReactMarkdown>{currentSection.content}</ReactMarkdown>
            </div>
          </div>
          <div className="w-full text-end px-6 pb-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                let textToCopy = currentSection.content;
                if (contentRef.current) {
                  textToCopy = contentRef.current.innerText;
                }
                navigator.clipboard.writeText(textToCopy);

                const target = e.currentTarget;
                const original = target.innerText;
                target.innerText = "Copied!";
                setTimeout(() => {
                  target.innerText = original;
                }, 1200);
              }}
              className={`text-xs border px-3 py-1.5 rounded transition ${classes.copy}`}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizerHistoryPage;