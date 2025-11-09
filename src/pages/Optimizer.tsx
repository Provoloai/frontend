import { useState, useCallback, useMemo } from "react";
import { motion } from "motion/react";
import { validatePortfolioInput } from "../schemas/portfolioSchema";
import useSession from "../hooks/useSession";
import { optimizerApi } from "@/api";
import { optimizerContainerVariants, optimizerItemVariants } from "@/constants/animations";
import type { OptimizerFormData, OptimizerTouchedFields, OptimizerResults, AccordionSection } from "@/types/optimizer";
import OptimizerForm from "@/components/optimizer/OptimizerForm";
import OptimizerResultsComponent from "@/components/optimizer/OptimizerResults";

const PortfolioOptimizer = () => {
  // Get user from backend session
  const { user } = useSession();
  console.log(user)

  // Form state
  const [formData, setFormData] = useState<OptimizerFormData>({
    freelancerName: "",
    profileTitle: "",
    profileDescription: "",
  });

  // Results state
  const [results, setResults] = useState<OptimizerResults | null>(null);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState<OptimizerTouchedFields>({
    name: false,
    title: false,
    description: false,
  });

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

  // Optimized function with useCallback to prevent recreation
  const analyzePortfolio = useCallback(async () => {
    setIsLoading(true);
    setError("");
    setResults(null);

    try {
      // Validate input data with Zod
      const inputValidation = validatePortfolioInput(formData);
      if (!inputValidation.success) {
        const errorMessages = inputValidation.errors 
          ? Object.values(inputValidation.errors)
              .flatMap((err) => (typeof err === 'object' && err !== null && '_errors' in err) ? err._errors : [])
              .join(", ")
          : "Please provide valid profile details";
        setError(errorMessages);
        setIsLoading(false);
        return;
      }

      // Prepare request payload
      if (!inputValidation.data) {
        setError("Please provide valid profile details");
        setIsLoading(false);
        return;
      }

      const requestPayload = {
        full_name: inputValidation.data.freelancerName,
        professional_title: inputValidation.data.profileTitle,
        profile: inputValidation.data.profileDescription,
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
  }, [formData]);

  // Event handlers
  const handleInputChange = (field: keyof OptimizerFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof OptimizerTouchedFields) => {
    setTouched(prev => ({ ...prev, [field]: true }));
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
            formData={formData}
            touched={touched}
            isLoading={isLoading}
            error={error}
            onInputChange={handleInputChange}
            onBlur={handleBlur}
            onSubmit={analyzePortfolio}
            onErrorClose={handleErrorClose}
          />

          {/* Output Section */}
          <OptimizerResultsComponent
            sections={accordionSections}
            hasResults={!!results}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default PortfolioOptimizer;