import React, { useState } from "react";
import ResultsAccordion from "../../Reusables/ResultsAccordion";
import TextInputField from "../../Reusables/TextInputField";
import CustomSnackbar from "../../Reusables/CustomSnackbar";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { CornerDownLeft, Sparkle, Sparkles, SparklesIcon } from "lucide-react";
import useSession from "../../hooks/useSession";

const PortfolioOptimizer = () => {
  const { user } = useSession();

  // State variables for input data ==========>>>>>>>>>>
  const [clientName, setclientName] = useState("");
  const [setTone, setsetTone] = useState("");
  const [jobSummary, setjobSummary] = useState(""); // Renamed from profileText for clarity

  // State variables for output from the AI ==========>>>>>>>>>>
  const [generatedProposal, setgeneratedProposal] = useState(null);
  const [optimizedOverview, setOptimizedOverview] = useState("");
  const [projectSuggestions, setProjectSuggestions] = useState("");
  const [visualSuggestions, setVisualSuggestions] = useState("");
  const [beforeAfter, setBeforeAfter] = useState("");
  const [weaknessesSummary, setWeaknessesSummary] = useState("");

  // State for loading and error handling ==========>>>>>>>>>>
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Input Field STated for Ui Styling ==========>>>>>>>>>>
  const [touched, setTouched] = useState({
    name: false,
    title: false,
    description: false,
  });

  // Function to call the AI model GEMINI ====================>>>>>>>>>>>>>>>>>>> START
  const analyzePortfolio = async () => {
    setIsLoading(true);
    setError("");
    setgeneratedProposal(null);
    setOptimizedOverview("");
    setProjectSuggestions("");
    setVisualSuggestions("");
    setBeforeAfter("");
    setWeaknessesSummary("");
  };

  const parseAndSetResults = (fullText) => {
    const sectionHeadings = [
      { label: "1. Weaknesses and Optimization Ideas", setter: setWeaknessesSummary },
      { label: "2. Optimized Profile Overview", setter: setOptimizedOverview },
      { label: "3. Suggested Project Titles and Layouts", setter: setProjectSuggestions },
      { label: "4. Recommended Visuals/Layout Hierarchies", setter: setVisualSuggestions },
      { label: "5. Before and After Comparison", setter: setBeforeAfter },
    ];

    sectionHeadings.forEach((section) => {
      const startPattern = new RegExp(`${section.label}[\\s\\S]*?(?=\\n*\\s*\\d\\.|\\Z)`, "i");
      const match = fullText.match(startPattern);

      if (match && match[0]) {
        const content = match[0].replace(new RegExp(`^${section.label}\\s*`, "i"), "").trim();
        section.setter(content);
      } else {
        section.setter("N/A");
      }
    });
  };

  return (
    <>
      <div className="flex-1 flex flex-col overflow-y-auto relative">
        <div className="p-6 sm:p-10 max-w-4xl m-auto w-full">
          <div>
            {/* Input Section ====================>>>>>>>>>>>>>>>>>>> START*/}
            <h2 className="text-3xl font-medium mb-3 text-center flex items-center gap-3 justify-center"><SparklesIcon/> Proposals</h2>
            <p className=" mb-6 text-center w-1/2 mx-auto text-gray-400">Create winning proposals in minutes with AI-powered personalization and professional templates</p>

            <div className="mb-8 p-10 bg-white rounded-lg border border-gray-200">
              {/* New Input Fields for NAME & PROFILE HEADER ====================>>>>>>>>>>>>>>>>>>> */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <TextInputField
                  id="clientName"
                  label="Client's Name (Personal Touch)"
                  placeholder="John Doe"
                  value={clientName}
                  onChange={(e) => setclientName(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                  touched={touched.name || error}
                  required
                />

                <Menu as="div" className="relative inline-block mt-auto">
                  <p className="block text-sm mb-2">Proposal Tone</p>
                  <MenuButton className="inline-flex w-full gap-x-1.5 rounded-md bg-white px-3 py-4 text-sm text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
                    Select Option
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                  </MenuButton>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <div className="py-1">
                      <MenuItem>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                          Conversational
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                          Professional
                        </a>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
              </div>

              {/* Profle Description Input Fields ====================>>>>>>>>>>>>>>>>>>> */}
              <div className="mb-4">
                <label htmlFor="jobSummary" className="block text-sm mb-2 bg-g">
                  Job Summary
                </label>

                <textarea
                  required
                  id="jobSummary"
                  className={`w-full p-3 border rounded-md transition duration-150 ease-in-out bg-gray-50 placeholder:text-sm ${error || (touched.description && !jobSummary.trim())
                      ? "ring-1 ring-red-600/10 ring-inset focus:ring-red-500 bg-red-50 placeholder-red-700"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                  rows="8"
                  placeholder="Paste Job Summary here..."
                  value={jobSummary}
                  onChange={(e) => setjobSummary(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, description: true }))}
                ></textarea>
                {(error || (touched.description && !jobSummary.trim())) && <p className="text-xs text-red-700">Required</p>}
              </div>

              {/* <CustomButton onClick={analyzePortfolio} isLoading={isLoading} className="btn-primary">
                                {" "}
                                Generate Proposal{" "}
                            </CustomButton> */}
              <div className="w-full flex  justify-end">
                <button className="inline-flex items-center justify-center rounded-full p-2 gap-x-3 hover:bg-gray-50 transition-all duration-300 px-3 py-2 text-xs text-gray-900 shadow-xs">
                  <CornerDownLeft aria-hidden="true" className="-mr-1 size-3" />
                  Enter
                </button>
              </div>

              {error && <CustomSnackbar open={error} close={() => setError("")} snackbarColor={"danger"} snackbarMessage={error} />}
            </div>
            {!generatedProposal && <p className="text-center text-xs text-gray-300">Provolo.org</p>}

            {/* Input Section ====================>>>>>>>>>>>>>>>>>>> END*/}

            {/* Output Section ====================>>>>>>>>>>>>>>>>>>> START*/}
            {generatedProposal && <CustomSnackbar open={generatedProposal} snackbarColor={"success"} snackbarMessage={"Proposal Complete"} />}

            {generatedProposal && (
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
    </>
  );
};

export default PortfolioOptimizer;
