import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowUp, ArrowDown, Infinity as InfinityIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import useSession from "../hooks/useSession";
import { optimizerApi, useGetQuota } from "@/api";
import {
  optimizerContainerVariants,
  optimizerItemVariants,
} from "@/constants/animations";
import type { OptimizerResults, AccordionSection } from "@/types/optimizer";
import type { PortfolioFormData } from "@/schemas/portfolioSchema";
import OptimizerForm from "@/components/optimizer/OptimizerForm";
import OptimizerResultsComponent from "@/components/optimizer/OptimizerResults";
import { useSEO, SEO_CONFIGS } from "@/hooks/useSEO";

const PortfolioOptimizer = () => {
  useSEO(SEO_CONFIGS.optimizer);

  // Get user from backend session
  const { user } = useSession();

  // Fetch quota information
  const { data: quotaData } = useGetQuota("upwork_profile_optimizer");

  // Results state
  const [results, setResults] = useState<OptimizerResults | null>(null);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Memoize user display name to prevent recalculation
  const displayName = useMemo(
    () => user?.displayName || user?.email?.split("@")[0] || "User",
    [user]
  );

  const queryClient = useQueryClient();
  // Memoize accordion sections
  const accordionSections: AccordionSection[] = useMemo(
    () => [
      {
        title: "Weaknesses and Optimization Ideas",
        content: results?.weaknessesAndOptimization || "",
      },
      {
        title: "Optimized Profile Overview",
        content: results?.optimizedProfileOverview || "",
      },
      {
        title: "Suggested Project Titles and Layouts",
        content: results?.suggestedProjectTitles || "",
      },
      {
        title: "Recommended Visuals/Layout Hierarchies",
        content: results?.recommendedVisuals || "",
      },
      {
        title: "Before and After Comparison",
        content: results?.beforeAfterComparison || "",
      },
    ],
    [results]
  );

  // Refs for scroll functionality
  const formRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Track which section is currently visible
  const [isOnFormSection, setIsOnFormSection] = useState(true);

  // Monitor scroll position to determine which section is visible
  useEffect(() => {
    const handleScroll = () => {
      if (!resultsRef.current || !formRef.current) return;

      const resultsTop = resultsRef.current.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      // If results section is in the upper half of viewport, user is on results
      setIsOnFormSection(resultsTop > viewportHeight / 2);
    };

    const scrollContainer = document.querySelector('.snap-y');
    scrollContainer?.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [results]);

  // Auto-scroll to results when they become available
  useEffect(() => {
    if (results && resultsRef.current) {
      // Small delay to ensure the results are rendered
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  }, [results]);

  // Scroll back to form
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Scroll to results
  const scrollToResults = () => {
    resultsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Handle form submission - React Hook Form handles validation
  const handleSubmit = async (data: PortfolioFormData) => {
    setIsLoading(true);
    setError("");
    setResults(null);

    try {
      // Prepare request payload - data is already validated by React Hook Form
      const requestPayload = {
        full_name: data.freelancerName,
        professional_title: data.profileTitle,
        profile: data.profileDescription,
      };

      // Call backend API endpoint using centralized API function
      const result = await optimizerApi.optimizePortfolio(requestPayload);

      // Set the analysis results from backend response
      setResults({
        fullAnalysis:
          result.data.fullAnalysis || "Analysis completed successfully",
        weaknessesAndOptimization:
          result.data.weaknessesAndOptimization || "N/A",
        optimizedProfileOverview: result.data.optimizedProfileOverview || "N/A",
        suggestedProjectTitles: result.data.suggestedProjectTitles || "N/A",
        recommendedVisuals: result.data.recommendedVisuals || "N/A",
        beforeAfterComparison: result.data.beforeAfterComparison || "N/A",
      });

      // Invalidate quota to refresh the count
      await queryClient.invalidateQueries({
        queryKey: ["quota", "upwork_profile_optimizer"],
      });
    } catch (err: unknown) {
      const error = err as Error;
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        setError("Network error. Please check your connection and try again.");
      } else if (error.message.includes("401")) {
        setError("Authentication required. Please log in again.");
      } else if (error.message.includes("429")) {
        setError(
          "You have reached your daily prompt limit. Please try again tomorrow."
        );
      } else {
        setError(error.message || "Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleErrorClose = () => {
    setError("");
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto snap-y snap-mandatory relative">
      {/* Header and Form Section - Constrained Width, Full Screen */}
      <motion.div
        ref={formRef}
        className="p-6 sm:p-10 max-w-3xl m-auto w-full min-h-screen flex flex-col justify-center snap-start snap-always"
        initial="hidden"
        animate="visible"
        variants={optimizerContainerVariants}
      >
        <motion.h2
          className="text-3xl mb-3 text-center"
          variants={optimizerItemVariants}
        >
          Let's Optimize Your Profile, {displayName}
        </motion.h2>

        {/* Input Section */}
        <OptimizerForm
          isLoading={isLoading}
          error={error}
          onSubmit={handleSubmit}
          onErrorClose={handleErrorClose}
        />

        {/* Quota Counter */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {quotaData?.data && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
              <span>{quotaData.data.count}</span>
              <span>/</span>
              {quotaData.data.limit === -1 || quotaData.data.limit === "unlimited" ? (
                <>
                  <InfinityIcon size={20} className="text-gray-500" />
                  <span>Optimizations</span>
                </>
              ) : (
                <span>{quotaData.data.limit} optimizations</span>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Output Section - Full Width, Full Screen */}
      {results && (
        <div
          ref={resultsRef}
          className="w-full min-h-screen flex flex-col snap-start snap-always relative overflow-y-auto"
        >
          <OptimizerResultsComponent
            sections={accordionSections}
            hasResults={!!results}
          />
        </div>
      )}

      {/* Empty state when no results - No snap behavior */}
      {!results && (
        <div className="w-full">
          <OptimizerResultsComponent
            sections={accordionSections}
            hasResults={false}
          />
        </div>
      )}

      {/* Global Dynamic Scroll Button */}
      {results && (
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white border shadow-md hover:shadow-lg transition-all duration-300 rounded-full"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.button
            onClick={isOnFormSection ? scrollToResults : scrollToForm}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-full border-gray-200 hover:bg-gray-50 transition-all duration-200 text-sm font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOnFormSection ? (
              <ArrowDown size={16} />
            ) : (
              <ArrowUp size={16} />
            )}
            {isOnFormSection ? "Results" : "Optimize"}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default PortfolioOptimizer;
