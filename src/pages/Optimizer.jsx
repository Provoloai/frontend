import { useState, useCallback, useMemo } from "react";
import { motion } from "motion/react";
import ResultsAccordion from "../Reusables/ResultsAccordion";
import TextInputField from "../Reusables/TextInputField";
import CustomButton from "../Reusables/CustomButton";
import CustomSnackbar from "../Reusables/CustomSnackbar";
import { validatePortfolioInput } from "../schemas/portfolioSchema";
import useSession from "../hooks/useSession";

const PortfolioOptimizer = () => {
  // Get user from backend session
  const { user } = useSession();

  // State variables for input data
  const [freelancerName, setFreelancerName] = useState("");
  const [profileTitle, setProfileTitle] = useState("");
  const [profileDescription, setProfileDescription] = useState("");

  // State variables for output from the AI
  const [analysisResults, setAnalysisResults] = useState("");
  const [optimizedOverview, setOptimizedOverview] = useState("");
  const [projectSuggestions, setProjectSuggestions] = useState("");
  const [visualSuggestions, setVisualSuggestions] = useState("");
  const [beforeAfter, setBeforeAfter] = useState("");
  const [weaknessesSummary, setWeaknessesSummary] = useState("");

  // State for loading and error handling
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Input Field States for UI Styling
  const [touched, setTouched] = useState({
    name: false,
    title: false,
    description: false,
  });

  // Memoize user display name to prevent recalculation
  const displayName = useMemo(
    () => user?.displayName || user?.email?.split("@")[0] || "User",
    [user]
  );

  // Memoize accordion sections to prevent unnecessary re-renders
  const accordionSections = useMemo(
    () => [
      { title: "Weaknesses and Optimization Ideas", content: weaknessesSummary },
      { title: "Optimized Profile Overview", content: optimizedOverview },
      { title: "Suggested Project Titles and Layouts", content: projectSuggestions },
      { title: "Recommended Visuals/Layout Hierarchies", content: visualSuggestions },
      { title: "Before and After Comparison", content: beforeAfter },
    ],
    [weaknessesSummary, optimizedOverview, projectSuggestions, visualSuggestions, beforeAfter]
  );

  // Optimized function with useCallback to prevent recreation
  const analyzePortfolio = useCallback(async () => {
    setIsLoading(true);
    setError("");
    setAnalysisResults(null);
    setOptimizedOverview("");
    setProjectSuggestions("");
    setVisualSuggestions("");
    setBeforeAfter("");
    setWeaknessesSummary("");

    try {
      // Validate input data with Zod
      const inputData = {
        freelancerName,
        profileTitle,
        profileDescription,
      };

      const inputValidation = validatePortfolioInput(inputData);
      if (!inputValidation.success) {
        const errorMessages = Object.values(inputValidation.errors)
          .flatMap((err) => err._errors || [])
          .join(", ");
        setError(errorMessages || "Please provide valid profile details");
        setIsLoading(false);
        return;
      }

      // Prepare request payload
      const requestPayload = {
        full_name: inputValidation.data.freelancerName,
        professional_title: inputValidation.data.profileTitle,
        profile: inputValidation.data.profileDescription,
      };

      // Call backend API endpoint
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/ai/optimize-upwork`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("Authentication required. Please log in again.");
        } else if (response.status === 429) {
          setError("You have reached your daily prompt limit. Please try again tomorrow.");
        } else {
          const errorData = await response.json().catch(() => ({}));
          setError(errorData.message || "Something went wrong. Please try again.");
        }
        setIsLoading(false);
        return;
      }

      const result = await response.json();

      // Set the analysis results from backend response
      setAnalysisResults(result.data.fullAnalysis || "Analysis completed successfully");
      setWeaknessesSummary(result.data.weaknessesAndOptimization || "N/A");
      setOptimizedOverview(result.data.optimizedProfileOverview || "N/A");
      setProjectSuggestions(result.data.suggestedProjectTitles || "N/A");
      setVisualSuggestions(result.data.recommendedVisuals || "N/A");
      setBeforeAfter(result.data.beforeAfterComparison || "N/A");
    } catch (err) {
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [freelancerName, profileTitle, profileDescription]);

  // Optimized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto py-20">
      <motion.div
        className="p-6 sm:p-10 max-w-3xl m-auto w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div>
          <motion.h2 className="text-3xl mb-3 text-center" variants={itemVariants}>
            Let's Get to Know Your Profile, {displayName}
          </motion.h2>

          {/* Input Section */}
          <motion.div
            className="mb-8 p-5 bg-white rounded-lg border border-gray-200"
            variants={cardVariants}
          >
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <TextInputField
                  id="freelancerName"
                  label="Full Name"
                  placeholder="John Doe"
                  value={freelancerName}
                  onChange={(e) => setFreelancerName(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                  touched={touched.name || error}
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <TextInputField
                  id="profileTitle"
                  label="Professional Title"
                  placeholder="Senior Full-Stack Developer | React & Node.js Expert"
                  value={profileTitle}
                  onChange={(e) => setProfileTitle(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
                  touched={touched.title || error}
                  required
                />
              </motion.div>
            </motion.div>

            <motion.div className="mb-4" variants={itemVariants}>
              <label htmlFor="profileDescription" className="block text-sm mb-2">
                About You (Profile Overview)
              </label>

              <textarea
                required
                id="profileDescription"
                className={`w-full p-3 border rounded-md transition duration-150 ease-in-out bg-gray-50 placeholder:text-sm ${error || (touched.description && !profileDescription.trim())
                    ? "ring-1 ring-red-600/10 ring-inset focus:ring-red-500 bg-red-50 placeholder-red-700"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                rows="8"
                placeholder="Paste your profile overview & summary of your services here..."
                value={profileDescription}
                onChange={(e) => setProfileDescription(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, description: true }))}
              />

              {(error || (touched.description && !profileDescription.trim())) && (
                <p className="text-xs text-red-700">Required</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <CustomButton onClick={analyzePortfolio} isLoading={isLoading} className="btn-primary">
                Run Optimization
              </CustomButton>
            </motion.div>

            {error && (
              <CustomSnackbar
                open={error}
                close={() => setError("")}
                snackbarColor="danger"
                snackbarMessage={error}
              />
            )}
          </motion.div>

          {!analysisResults && (
            <motion.p
              className="text-center text-xs text-gray-300"
              variants={itemVariants}
            >
              Provolo.org
            </motion.p>
          )}

          {/* Output Section */}
          {analysisResults && (
            <>
              <CustomSnackbar
                open={analysisResults}
                snackbarColor="success"
                snackbarMessage="Analysis Complete"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <ResultsAccordion sections={accordionSections} />
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PortfolioOptimizer;