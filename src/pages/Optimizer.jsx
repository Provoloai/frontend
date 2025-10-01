import { useState } from "react";
import ResultsAccordion from "../Reusables/ResultsAccordion";
import TextInputField from "../Reusables/TextInputField";
import CustomButton from "../Reusables/CustomButton";
import CustomSnackbar from "../Reusables/CustomSnackbar";
import { validatePortfolioInput } from "../schemas/portfolioSchema";
import useSession from "../hooks/useSession";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { ChevronDownIcon, CornerDownLeft, Link, SendHorizonal, Settings2 } from "lucide-react";

const PortfolioOptimizer = () => {
  // Get user from backend session
  const { user } = useSession();

  // State variables for input data ==========>>>>>>>>>>>>
  const [freelancerName, setFreelancerName] = useState("");
  const [profileTitle, setProfileTitle] = useState("");
  const [profileDescription, setProfileDescription] = useState("");

  // State variables for output from the AI ==========>>>>>>>>>>>>
  const [analysisResults, setAnalysisResults] = useState("");
  const [optimizedOverview, setOptimizedOverview] = useState("");
  const [projectSuggestions, setProjectSuggestions] = useState("");
  const [visualSuggestions, setVisualSuggestions] = useState("");
  const [beforeAfter, setBeforeAfter] = useState("");
  const [weaknessesSummary, setWeaknessesSummary] = useState("");

  // State for loading and error handling ==========>>>>>>>>>>>>
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Input Field STated for Ui Styling ==========>>>>>>>>>>>>
  const [touched, setTouched] = useState({
    name: false,
    title: false,
    description: false,
  });

  // Function to call the backend API ====================>>>>>>>>>>>>>>>>>>> START
  const analyzePortfolio = async () => {
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
        credentials: "include", // Include session cookie for authentication
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
      console.log("result", result);
      // Set the analysis results from backend response
      setAnalysisResults(result.data.fullAnalysis || "Analysis completed successfully");
      setWeaknessesSummary(result.data.weaknessesAndOptimization || "N/A");
      setOptimizedOverview(result.data.optimizedProfileOverview || "N/A");
      setProjectSuggestions(result.data.suggestedProjectTitles || "N/A");
      setVisualSuggestions(result.data.recommendedVisuals || "N/A");
      setBeforeAfter(result.data.beforeAfterComparison || "N/A");
      // } else {
      //   setError(result.message || "The analysis returned an empty response.");
      // }
    } catch (err) {
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto py-20">
      <div className="p-6 sm:p-10 max-w-3xl m-auto w-full">
        <div>
          {/* <h1 className="mb-3 text-gray-300">{loading ? "Loading..." : `Welcome, ${user?.displayName || user?.email?.split("@")[0] || "User"}`}</h1> */}

          <h2 className="text-2xl mb-3 text-center">
            Let's Get to Know Your Profile,{" "}
            {user?.displayName || user?.email?.split("@")[0] || "User"}
          </h2>
          {/* Input Section ====================>>>>>>>>>>>>>>>>>>> START*/}
          {/* New Input Fields for NAME & PROFILE HEADER ====================>>>>>>>>>>>>>>>>>>> */}
          {/* <div className="mb-8 p-5 bg-white rounded-lg border border-gray-200">
            <div className="gap-4 mb-4">
              <TextInputField
                id="freelancerName"
                // label="Profile Link"
                placeholder="https://www.upwork.com/Profile-link"
                iconStart={<Link size={20} />}
                value={freelancerName}
                onChange={(e) => setFreelancerName(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                touched={touched.name || error}
                required
              />
            </div>

            <div className="flex justify-between">
              <Menu as="div" className="relative inline-block mt-auto">
                <MenuButton className="inline-flex w-full gap-x-3 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-xs hover:bg-gray-100 transition-all duration-300">
                  <Settings2 aria-hidden="true" className="-mr-1 size-5" />
                  Tools
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute left-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 hover:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        Upwork
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 hover:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        Linkedln
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>

              <button className="inline-flex items-center justify-center  rounded-full p-2 gap-x-3 hover:bg-gray-50 transition-all duration-300 px-3 py-2 text-xs text-gray-900 shadow-xs">
                <CornerDownLeft aria-hidden="true" className="-mr-1 size-3" />
                Enter
              </button>
            </div>

            {error && (
              <CustomSnackbar
                open={error}
                close={() => setError("")}
                snackbarColor={"danger"}
                snackbarMessage={error}
              />
            )}
          </div> */}

          <div className="mb-8 p-10 bg-white rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

              <TextInputField
                id="profileTitle"
                label=" Professional Title"
                placeholder="Senior Full-Stack Developer | React & Node.js Expert"
                value={profileTitle}
                onChange={(e) => setProfileTitle(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
                touched={touched.title || error}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="profileDescription" className="block text-sm mb-2 bg-g">
                About You (Profile Overview)
              </label>

              <textarea
                required
                id="profileDescription"
                className={`w-full p-3 border rounded-md transition duration-150 ease-in-out bg-gray-50 placeholder:text-sm ${
                  error || (touched.description && !profileDescription.trim())
                    ? "ring-1 ring-red-600/10 ring-inset focus:ring-red-500 bg-red-50 placeholder-red-700"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
                rows="8"
                placeholder="Paste your Upwork profile overview & summary of your services here..."
                value={profileDescription}
                onChange={(e) => setProfileDescription(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, description: true }))}
              ></textarea>

              {(error || (touched.description && !profileDescription.trim())) && (
                <p className="text-xs text-red-700">Required</p>
              )}
            </div>

            <CustomButton onClick={analyzePortfolio} isLoading={isLoading} className="btn-primary">
              {" "}
              Run Optimization{" "}
            </CustomButton>

            {error && (
              <CustomSnackbar
                open={error}
                close={() => setError("")}
                snackbarColor={"danger"}
                snackbarMessage={error}
              />
            )}
          </div>

          {!analysisResults && <p className="text-center text-xs text-gray-300">Provolo.org</p>}

          {/* Input Section ====================>>>>>>>>>>>>>>>>>>> END*/}

          {/* Output Section ====================>>>>>>>>>>>>>>>>>>> START*/}
          {analysisResults && (
            <CustomSnackbar
              open={analysisResults}
              snackbarColor={"success"}
              snackbarMessage={"Analysis Complete"}
            />
          )}

          {analysisResults && (
            <ResultsAccordion
              sections={[
                { title: "Weaknesses and Optimization Ideas", content: weaknessesSummary },
                { title: "Optimized Profile Overview", content: optimizedOverview },
                { title: "Suggested Project Titles and Layouts", content: projectSuggestions },
                { title: "Recommended Visuals/Layout Hierarchies", content: visualSuggestions },
                { title: "Before and After Comparison", content: beforeAfter },
              ]}
            />
          )}

          {/* Output Section ====================>>>>>>>>>>>>>>>>>>> END*/}
        </div>
      </div>
    </div>
  );
};

export default PortfolioOptimizer;
