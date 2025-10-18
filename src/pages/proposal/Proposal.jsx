import { useState, useMemo } from "react";
import { motion } from "motion/react";
import TextInputField from "../../Reusables/TextInputField";
import CustomSnackbar from "../../Reusables/CustomSnackbar";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FilePlus, PenLine, Scissors, Sparkles, Workflow } from "lucide-react";
import CustomButton from "../../Reusables/CustomButton";
import { Link } from "@tanstack/react-router";

const PortfolioOptimizer = () => {
  // State variables for input data
  const [clientName, setClientName] = useState("");
  const [setTone, setSetTone] = useState("");
  const [jobSummary, setJobSummary] = useState("");

  // State variables for output from the AI
  const [generatedProposal, setGeneratedProposal] = useState(null);
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

  // Memoized improvement options to prevent re-renders
  const improvementOptions = useMemo(() => [
    {
      to: "/proposal/optimize-overview",
      icon: FilePlus,
      title: "Expand Text",
      description: "Add more details or examples.",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
    },
    {
      to: "/proposal/optimize-overview",
      icon: Workflow,
      title: "Improve Flow",
      description: "Reorganize ideas for clarity.",
      bgColor: "bg-purple-50",
      hoverColor: "hover:bg-purple-100",
    },
    {
      to: "/proposal/optimize-overview",
      icon: Scissors,
      title: "Trim Text",
      description: "Remove unnecessary words.",
      bgColor: "bg-yellow-50",
      hoverColor: "hover:bg-yellow-100",
    },
    {
      to: "/proposal/optimize-overview",
      icon: PenLine,
      title: "Simplify Text",
      description: "Break down complex sentences.",
      bgColor: "bg-red-50",
      hoverColor: "hover:bg-red-100",
    },
  ], []);

  // Function to call the AI model
  const analyzePortfolio = async () => {
    setIsLoading(true);
    setError("");
    setGeneratedProposal(null);
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
    <div className="flex-1 flex flex-col overflow-y-auto relative">
      <motion.div
        className="p-6 sm:p-10 w-4xl max-h-fit"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="text-start pt-10" variants={itemVariants}>
          <h2 className="text-3xl font-medium mb-3 text-center flex items-center gap-3">
            Proposals <Sparkles /> 
          </h2>
          <p className="mb-6 w-1/3 text-gray-400">
            Create winning proposals in minutes with AI-powered personalization and professional templates
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-2 gap-x-5" variants={containerVariants}>
          {/* Input Section */}
          <motion.section
            className="p-5 bg-white rounded-lg border border-gray-200"
            variants={cardVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <TextInputField
                id="clientName"
                label="Client's Name (Personal Touch)"
                placeholder="John Doe"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                touched={touched.name || error}
                required
              />

              <Menu as="div" className="relative inline-block">
                <p className="block text-sm mb-2">Proposal Tone</p>
                <MenuButton className="inline-flex w-full gap-x-1.5 rounded-md px-3 py-4 text-sm text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset bg-gray-50 duration-200 transition-all hover:bg-gray-100">
                  Select Option
                  <ChevronDownIcon aria-hidden="true" className="ml-auto size-5 text-gray-400" />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-none">
                        Conversational
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-none">
                        Professional
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>

            <div className="mb-4">
              <label htmlFor="jobSummary" className="block text-sm mb-2">
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
                onChange={(e) => setJobSummary(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, description: true }))}
              />
              {(error || (touched.description && !jobSummary.trim())) && (
                <p className="text-xs text-red-700">Required</p>
              )}
            </div>

            <div className="w-fit flex justify-end">
              <CustomButton onClick={analyzePortfolio} isLoading={isLoading} className="btn-primary">
                Generate Proposal
              </CustomButton>
            </div>

            {error && (
              <CustomSnackbar
                open={error}
                close={() => setError("")}
                snackbarColor="danger"
                snackbarMessage={error}
              />
            )}
          </motion.section>

          {/* Empty State Section */}
          <motion.section
            className="bg-white rounded-lg border border-gray-200 flex"
            variants={cardVariants}
          >
            <div className="text-center m-auto">
              <div className="w-full text-center flex justify-center">
                <svg width="140" height="118" viewBox="0 0 140 118" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M77.7448 116.122C108.535 116.122 133.497 91.1605 133.497 60.2605C133.497 29.3606 108.425 4.39868 77.7448 4.39868C46.9548 4.39868 21.9929 29.3606 21.9929 60.2605C21.9929 91.1605 46.9548 116.122 77.7448 116.122Z" fill="#F1F3F9" stroke="#D6DCE8" stroke-width="2" stroke-miterlimit="10" />
                  <path d="M129.428 23.7521C131.918 23.7521 133.937 21.7335 133.937 19.2435C133.937 16.7535 131.918 14.735 129.428 14.735C126.938 14.735 124.919 16.7535 124.919 19.2435C124.919 21.7335 126.938 23.7521 129.428 23.7521Z" fill="#F1F3F9" />
                  <path d="M136.026 6.15812C137.726 6.15812 139.105 4.7796 139.105 3.07912C139.105 1.37864 137.726 0.00012207 136.026 0.00012207C134.325 0.00012207 132.947 1.37864 132.947 3.07912C132.947 4.7796 134.325 6.15812 136.026 6.15812Z" fill="#F1F3F9" />
                  <path d="M24.5221 23.6422C26.2226 23.6422 27.6011 22.2637 27.6011 20.5633C27.6011 18.8628 26.2226 17.4843 24.5221 17.4843C22.8216 17.4843 21.4431 18.8628 21.4431 20.5633C21.4431 22.2637 22.8216 23.6422 24.5221 23.6422Z" fill="#F1F3F9" />
                  <path d="M5.71814 83.0233C8.87618 83.0233 11.4363 80.4632 11.4363 77.3052C11.4363 74.1471 8.87618 71.587 5.71814 71.587C2.5601 71.587 0 74.1471 0 77.3052C0 80.4632 2.5601 83.0233 5.71814 83.0233Z" fill="#F1F3F9" />
                  <path d="M118.74 98.1384C108.553 109.202 93.9566 116.122 77.7447 116.122C64.8063 116.122 52.897 111.715 43.4366 104.311V13.14C43.4366 10.1241 45.865 7.66321 48.8945 7.66321H103.04L118.74 23.418V98.1384Z" fill="white" stroke="#D6DCE8" stroke-width="2" stroke-miterlimit="10" />
                  <path d="M65.9046 97.2668H58.0197C57.7255 97.2668 57.4901 96.5045 57.4901 95.5898C57.4901 94.6751 57.7255 93.9128 58.0197 93.9128H65.9046C66.1988 93.9128 66.4342 94.6751 66.4342 95.5898C66.4342 96.657 66.1988 97.2668 65.9046 97.2668Z" fill="#D5DDEA" />
                  <path d="M83.2556 26.8323H58.5568C57.9824 26.8323 57.4901 26.0583 57.4901 25.1553C57.4901 24.2523 57.9824 23.4783 58.5568 23.4783H83.2556C83.83 23.4783 84.3223 24.2523 84.3223 25.1553C84.3223 26.0583 83.83 26.8323 83.2556 26.8323Z" fill="#D6DCE8" />
                  <path d="M64.6501 34.6583H58.2117C57.8231 34.6583 57.4901 33.8843 57.4901 32.9813C57.4901 32.0783 57.8231 31.3043 58.2117 31.3043H64.5946C64.9831 31.3043 65.3162 32.0783 65.3162 32.9813C65.3162 33.8843 64.9831 34.6583 64.6501 34.6583Z" fill="#D6DCE8" />
                  <path d="M103.624 78.2606H73.0098H69.6357H59.4311C59.0196 78.2606 58.6082 78.9594 58.6082 79.9376C58.6082 80.7761 58.9373 81.6146 59.4311 81.6146H69.6357H73.0098H103.624C104.035 81.6146 104.446 80.9159 104.446 79.9376C104.364 78.9594 104.035 78.2606 103.624 78.2606Z" fill="#D6DCE8" />
                  <path d="M103.622 69.3165H92.2449H88.3701H59.4326C59.0204 69.3165 58.6082 70.0153 58.6082 70.9935C58.6082 71.832 58.9379 72.6706 59.4326 72.6706H88.3701H92.2449H103.622C104.034 72.6706 104.446 71.9718 104.446 70.9935C104.364 70.0153 104.034 69.3165 103.622 69.3165Z" fill="#D6DCE8" />
                  <path d="M104.796 61.4905H101.768H98.739H59.4495C59.0288 61.4905 58.6082 62.1892 58.6082 63.1675C58.6082 64.006 58.9447 64.8445 59.4495 64.8445H98.739H102.104H104.712C105.133 64.8445 105.554 64.1457 105.554 63.1675C105.638 62.329 105.217 61.4905 104.796 61.4905Z" fill="#D6DCE8" />
                  <path d="M104.73 52.5464H94.9722H92.5535H59.4422C59.0252 52.5464 58.6082 53.2451 58.6082 54.2234C58.6082 55.0619 58.9418 55.9004 59.4422 55.9004H92.5535H94.9722H104.647C105.231 55.9004 105.564 55.2017 105.564 54.2234C105.564 53.3849 105.231 52.5464 104.73 52.5464Z" fill="#D6DCE8" />
                  <path d="M103.04 8.31995V18.0748C103.04 21.3885 105.726 24.0748 109.04 24.0748H118.74" fill="#F1F3F9" />
                  <path d="M103.04 8.31995V18.0748C103.04 21.3885 105.726 24.0748 109.04 24.0748H118.74" stroke="#D6DCE8" stroke-width="2" stroke-miterlimit="10" />
                  <path d="M49.3032 87.2782C49.3032 87.4436 49.2622 87.6064 49.1838 87.7521L44.3413 96.7508C43.9638 97.4524 42.9576 97.4524 42.5801 96.7508L37.7376 87.7521C37.6592 87.6064 37.6182 87.4436 37.6182 87.2782V35.368V27.8163C37.6182 26.7547 38.4837 25.8861 39.5416 25.8861H47.3797C48.4376 25.8861 49.3032 26.7547 49.3032 27.8163V87.2782Z" fill="#D6DCE8" stroke="#AAB2C5" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round" />
                  <path d="M49.3032 34.8611H37.6182" stroke="#AAB2C5" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round" />
                  <path d="M49.3032 87.5297H37.6182" stroke="#AAB2C5" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round" />
                </svg>

              </div>

              <h3 className="text-base text-center mb-2 mt-5">Ready to start?</h3>
              <p className="text-base leading-tight text-center w-2/3 mx-auto text-gray-400">
                Fill the required fields while I give you the result
              </p>
            </div>
          </motion.section>
        </motion.div>

        {/* Improvement Options Section */}
        <motion.section
          className="p-5 bg-white rounded-lg border border-gray-200 mt-5 grid grid-cols-3 gap-24"
          variants={cardVariants}
        >
          <div className="col-span-2">
            <p className="mb-6">How would you like to improve the proposal</p>

            <motion.div
              className="grid grid-cols-2 grid-rows-2 gap-5"
              variants={containerVariants}
            >
              {improvementOptions.map((option, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Link
                    to={option.to}
                    className={`p-5 rounded-2xl transition-all duration-200 ${option.bgColor} ${option.hoverColor} py-[24px] px-5 block`}
                  >
                    <span className="flex items-center align-middle gap-2 mb-3">
                      <option.icon size={16} />
                      <p className="font-medium">{option.title}</p>
                    </span>
                    <span>
                      <p className="font-thin text-sm">{option.description}</p>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="col-span-1 flex flex-col">
            <Menu as="div" className="relative inline-block w-full">
              <p className="block text-sm mb-2">Proposal Tone</p>
              <MenuButton className="inline-flex w-full gap-x-1.5 rounded-md px-3 py-4 text-sm text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset bg-gray-50 duration-200 transition-all hover:bg-gray-100">
                Select Option
                <ChevronDownIcon aria-hidden="true" className="ml-auto size-5 text-gray-400" />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-none">
                      Conversational
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-none">
                      Professional
                    </a>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>

            <CustomButton onClick={analyzePortfolio} isLoading={isLoading} className="btn-primary mt-auto">
              Generate Proposal Again
            </CustomButton>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default PortfolioOptimizer;