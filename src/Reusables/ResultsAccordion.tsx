import { ChevronDown } from "lucide-react";
import React from "react";
import ReactMarkdown from "react-markdown";

// 1. Create a map for the FULL class strings.
// Tailwind will scan this and generate all the classes.
const colorClassMap = {
  "Weaknesses and Optimization Ideas": {
    details: "border-red-100 bg-red-50",
    summary: "bg-red-50 text-red-800", // Note: bg-red is not a default color, using bg-red-50
    copy: "text-red-600 border-red-300", // Example: "text-red" is not a specific class
  },
  "Optimized Profile Overview": {
    details: "border-green-100 bg-green-50",
    summary: "bg-green-50 text-green-800",
    copy: "text-green-600 border-green-300",
  },
  "Suggested Project Titles and Layouts": {
    details: "border-yellow-100 bg-yellow-50",
    summary: "bg-yellow-50 text-yellow-800",
    copy: "text-yellow-600 border-yellow-300",
  },
  "Recommended Visuals/Layout Hierarchies": {
    details: "border-blue-100 bg-blue-50",
    summary: "bg-blue-50 text-blue-800",
    copy: "text-blue-600 border-blue-300",
  },
  "Before and After Comparison": {
    details: "border-purple-100 bg-purple-50",
    summary: "bg-purple-50 text-purple-800",
    copy: "text-purple-600 border-purple-300",
  },
  default: {
    details: "border-gray-100 bg-gray-50",
    summary: "bg-gray-50 text-gray-800",
    copy: "text-gray-600 border-gray-300",
  },
};

const ResultsAccordion = ({ sections }) => {
  return (
    <div className="mt-10 p-6 max-w-4xl mx-auto w-full bg-white rounded-xl border border-gray-200 card">
      <h2 className="font-medium mb-8 text-center flex items-center gap-3 text-2xl">
        Optimization Insights ✦︎
      </h2>

      {sections.map(({ title, content }, idx) => {
        // 2. Look up the classes. Fall back to 'default' if title not found.
        const classes = colorClassMap[title] || colorClassMap.default;
        const contentRef = React.createRef<HTMLDivElement>();

        return (
          <details
            key={idx}
            open={idx === 0}
            // 3. Apply the full, static classes
            className={`mb-5 border rounded-lg overflow-hidden group transition-all ${classes.details}`}
          >
            <summary
              className={`flex justify-between items-center cursor-pointer px-6 py-5 ${classes.summary}`}
            >
              <p className="text-lg flex align-middle items-center justify-between w-full">
                {title}
                <ChevronDown size={18} />
              </p>
            </summary>

            {/*
              4. The 'prose' fix:
              - Removed text-base, text-gray-800, leading-relaxed, space-y-4
              - 'prose' and 'prose-sm' will handle all markdown styling.
            */}
            <div
              ref={contentRef}
              className="px-7 py-6 prose prose-sm max-w-none"
            >
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
            <div className="w-full text-end p-6">
              <button
                onClick={e => {
                  e.preventDefault();
                  let textToCopy = content;
                  if (contentRef.current) {
                    // .textContent can be lossy, prefer innerText
                    textToCopy = contentRef.current.innerText;
                  }
                  navigator.clipboard.writeText(textToCopy);

                  const target = e.currentTarget; // Use currentTarget
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
          </details>
        );
      })}
    </div>
  );
};

export default ResultsAccordion;
