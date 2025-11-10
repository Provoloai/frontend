import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { useQueryClient } from "@tanstack/react-query";
import useSession from "../hooks/useSession";
import { optimizerApi, useGetQuota } from "@/api";
import { optimizerContainerVariants, optimizerItemVariants } from "@/constants/animations";
import type { OptimizerResults, AccordionSection } from "@/types/optimizer";
import type { PortfolioFormData } from "@/schemas/portfolioSchema";
import OptimizerForm from "@/components/optimizer/OptimizerForm";
import OptimizerResultsComponent from "@/components/optimizer/OptimizerResults";

const PortfolioOptimizer = () => {
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

  // Memoize accordion sections
  const accordionSections: AccordionSection[] = useMemo(
    () => [
      { title: "Weaknesses and Optimization Ideas", content: results?.weaknessesAndOptimization || "" },
      { title: "Optimized Profile Overview", content: results?.optimizedProfileOverview || "" },
      { title: "Suggested Project Titles and Layouts", content: results?.suggestedProjectTitles || "" },
      { title: "Recommended Visuals/Layout Hierarchies", content: results?.recommendedVisuals || "" },
      { title: "Before and After Comparison", content: results?.beforeAfterComparison || "" },
    ],
    [results]
  );

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
        fullAnalysis: result.data.fullAnalysis || "Analysis completed successfully",
        weaknessesAndOptimization: result.data.weaknessesAndOptimization || "N/A",
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
        setError("You have reached your daily prompt limit. Please try again tomorrow.");
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
    <div className="flex-1 flex flex-col overflow-y-auto py-20">
      <motion.div
        className="p-6 sm:p-10 max-w-3xl m-auto w-full"
        initial="hidden"
        animate="visible"
        variants={optimizerContainerVariants}
      >
        <div>
          <motion.h2 className="text-3xl mb-3 text-center" variants={optimizerItemVariants}>
            Let's Get to Know Your Profile, {displayName}
          </motion.h2>

          {/* Input Section */}
          <OptimizerForm
            isLoading={isLoading}
            error={error}
            onSubmit={handleSubmit}
            onErrorClose={handleErrorClose}
          />

          {/* Output Section */}
          <OptimizerResultsComponent
            sections={accordionSections}
            hasResults={!!results}
            quotaData={quotaData?.data || null}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default PortfolioOptimizer;