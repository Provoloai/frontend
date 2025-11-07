import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import TextInputField from "../../Reusables/TextInputField";
import CustomSnackbar from "../../Reusables/CustomSnackbar";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  FilePlus,
  PenLine,
  Scissors,
  Sparkles,
  Workflow,
  Copy,
  Check,
} from "lucide-react";
import DocumentIllustration from "@/assets/svg/DocumentIllustration";
import CustomButton from "@/Reusables/CustomButton";
import { proposalApi } from "@/api";
import { proposalToneOptions } from "@/constants/proposal";
import {
  proposalContainerVariants,
  proposalItemVariants,
  proposalCardVariants,
} from "@/constants/animations";
import type { ProposalData, TouchedFields, ImprovementOption } from "@/types";
import type { ProposalTone } from "@/types/proposal";
import { useQueryClient } from "@tanstack/react-query";
import Banner from "@/components/dashboard/Banner";

const PortfolioOptimizer: React.FC = () => {
  const [clientName, setClientName] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [proposalTone, setProposalTone] = useState<ProposalTone | null>(null);
  const [jobSummary, setJobSummary] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queryClient = useQueryClient();
  // State variables for output from the AI
  const [generatedProposal, setGeneratedProposal] =
    useState<ProposalData | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Memoized improvement options to prevent re-renders
  const improvementOptions: ImprovementOption[] = useMemo(
    () => [
      {
        icon: FilePlus,
        title: "Expand Text",
        description: "Add more details or examples.",
        bgColor: "bg-blue-50",
        hoverColor: "hover:bg-blue-100",
      },
      {
        icon: Workflow,
        title: "Improve Flow",
        description: "Reorganize ideas for clarity.",
        bgColor: "bg-purple-50",
        hoverColor: "hover:bg-purple-100",
      },
      {
        icon: Scissors,
        title: "Trim Text",
        description: "Remove unnecessary words.",
        bgColor: "bg-yellow-50",
        hoverColor: "hover:bg-yellow-100",
      },
      {
        icon: PenLine,
        title: "Simplify Text",
        description: "Break down complex sentences.",
        bgColor: "bg-red-50",
        hoverColor: "hover:bg-red-100",
      },
    ],
    []
  );

  // Input Field States for UI Styling
  const [touched, setTouched] = useState<TouchedFields>({
    name: false,
    title: false,
    description: false,
    tone: false,
    jobTitle: false,
  });

  // Function to call the AI model
  const generateProposal = useCallback(async (): Promise<void> => {
    if (!clientName.trim() || !proposalTone || !jobSummary.trim()) {
      setTouched({
        name: true,
        title: false,
        description: true,
        tone: true,
        jobTitle: true,
      });
      setError("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);
    setError("");
    setGeneratedProposal(null);

    try {
      const data = await proposalApi.generateProposal({
        client_name: clientName.trim(),
        proposal_tone: proposalTone!,
        job_summary: jobSummary.trim(),
        job_title: jobTitle.trim(),
      });
      setGeneratedProposal(data.data);
      await queryClient.invalidateQueries({
        queryKey: ["proposal-history"],
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to generate proposal. Please try again.";
      setError(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  }, [clientName, proposalTone, jobSummary]);

  // Optimized: Copy proposal to clipboard with locked feedback state and cleanup
  const copyToClipboard = useCallback(async (): Promise<void> => {
    if (copyState !== "idle" || !generatedProposal?.mdx) return;
    try {
      await navigator.clipboard.writeText(generatedProposal.mdx);
      setCopyState("copied");

      // only set the timeout if one is not already running
      if (!copyTimeoutRef.current) {
        copyTimeoutRef.current = setTimeout(() => {
          setCopyState("idle");
          copyTimeoutRef.current = null;
        }, 2000);
      }
    } catch {
      setCopyState("idle");
    }
  }, [copyState, generatedProposal?.mdx]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
        copyTimeoutRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto relative">
      <motion.div
        className="p-6 sm:p-10 w-4xl max-h-fit"
        initial="hidden"
        animate="visible"
        variants={proposalContainerVariants}
      >
        {/* Title Section */}
        <motion.div
          className="text-start pt-10"
          variants={proposalItemVariants}
        >
          <div className="mb-10">
            <Banner />
          </div>

          <h2 className="text-3xl font-medium mb-3 text-center flex items-center gap-3">
            Proposals <Sparkles />
          </h2>
          <p className="mb-6 lg:w-1/3 text-gray-400">
            Create winning proposals in minutes with AI-powered personalization
            and professional templates
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-x-5 gap-y-5"
          variants={proposalContainerVariants}
        >
          {/* Form Inputs Section */}
          <motion.section
            className="p-5 bg-white rounded-lg border border-gray-200 space-y-4"
            variants={proposalCardVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <TextInputField
                id="clientName"
                label="Client's Name (Personal Touch)"
                placeholder="Nina Nonymous"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
                touched={touched.name || !!error}
                required
              />
              <div className="w-full" onBlur={() => setTouched(prev => ({ ...prev, tone: true }))}>
                <Menu as="div" className="relative inline-block w-full">
                  <label
                    className="block text-sm mb-2"
                    htmlFor="proposal-tone-selector"
                  >
                    Proposal Tone
                  </label>
                  <MenuButton
                    id="proposal-tone-selector"
                    className={`capitalize inline-flex w-full gap-x-1.5 rounded-md px-3 py-4 text-sm text-gray-900 shadow-xs ring-1 duration-200 transition-all ${(error && !proposalTone) || (touched.tone && !proposalTone)
                      ? "ring-red-600/10 ring-inset bg-red-50 hover:bg-red-100"
                      : "ring-gray-300 ring-inset bg-gray-50 hover:bg-gray-100"
                      }`}
                    aria-label="Select proposal tone"
                  >
                    {proposalTone ?? "Select Option"}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="ml-auto size-5 text-gray-400"
                    />
                  </MenuButton>
                  {((error && !proposalTone) ||
                    (touched.tone && !proposalTone)) && (
                      <p className="text-xs text-red-700 mt-1">Required</p>
                    )}
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <div className="py-1">
                      {proposalToneOptions.map(tone => (
                        <MenuItem key={tone.value}>
                          <button
                            onClick={() => {
                              setProposalTone(tone.value);
                              setTouched(prev => ({ ...prev, tone: true }));
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-none"
                          >
                            {tone.label}
                          </button>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>
              </div>
            </div>

            <div>
              <TextInputField
                id="jobTitle"
                label="Job Title"
                placeholder="UiUx Designer | WordPress Developer..."
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
                onBlur={() => setTouched(prev => ({ ...prev, jobTitle: true }))}
                touched={touched.jobTitle || !!error}
                required
              />
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
                rows={8}
                style={{ maxHeight: "28em", resize: "vertical" }}
                placeholder="Paste Job Summary here..."
                value={jobSummary}
                onChange={e => setJobSummary(e.target.value)}
                onBlur={() =>
                  setTouched(prev => ({ ...prev, description: true }))
                }
              />
              {(error || (touched.description && !jobSummary.trim())) && (
                <p className="text-xs text-red-700">Required</p>
              )}
            </div>

            {!isGenerating && !generatedProposal && (
              <div className="w-fit flex justify-end">
                <CustomButton
                  onClick={generateProposal}
                  isLoading={isGenerating}
                  className="btn-primary"
                >
                  Generate Proposal
                </CustomButton>
              </div>
            )}

            {error && (
              <CustomSnackbar
                open={!!error}
                close={() => setError("")}
                snackbarColor="danger"
                snackbarMessage={error}
              />
            )}

            {/* Train of Thoughts Section - Show below Generate button when proposal is generated */}
            {generatedProposal && (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold mb-4">
                  Train of Thoughts
                </h3>

                {generatedProposal?.hook && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Hook</h4>
                    <p className="text-gray-700 text-sm">
                      {generatedProposal.hook}
                    </p>
                  </div>
                )}

                {generatedProposal?.solution && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Solution</h4>
                    <p className="text-gray-700 text-sm">
                      {generatedProposal.solution}
                    </p>
                  </div>
                )}

                {generatedProposal?.keyPoints &&
                  generatedProposal.keyPoints.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Key Points
                      </h4>
                      <ul className="space-y-1">
                        {generatedProposal.keyPoints.map((point, index) => (
                          <li key={index} className="text-gray-700 text-sm">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {generatedProposal?.portfolioLink && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Portfolio
                    </h4>
                    <a
                      href={generatedProposal.portfolioLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      {generatedProposal.portfolioLink}
                    </a>
                  </div>
                )}

                {generatedProposal?.availability && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Availability
                    </h4>
                    <p className="text-gray-700 text-sm">
                      {generatedProposal.availability}
                    </p>
                  </div>
                )}

                {generatedProposal?.support && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Support</h4>
                    <p className="text-gray-700 text-sm">
                      {generatedProposal.support}
                    </p>
                  </div>
                )}

                {generatedProposal?.closing && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Closing</h4>
                    <p className="text-gray-700 text-sm">
                      {generatedProposal.closing}
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.section>

          {/* Empty State Section */}
          <motion.section
            className="bg-white rounded-lg border border-gray-200 flex"
            variants={proposalCardVariants}
          >
            {!generatedProposal && !isGenerating ? (
              <div className="text-center m-auto p-8">
                <div className="w-full text-center flex justify-center">
                  <DocumentIllustration />
                </div>

                <h3 className="text-base text-center mb-2 mt-5">
                  Ready to start?
                </h3>
                <p className="text-base leading-tight text-center w-2/3 mx-auto text-gray-400">
                  Fill the required fields while I give you the result
                </p>
              </div>
            ) : isGenerating ? (
              <div className="text-center m-auto p-8">
                <div className="w-full text-center flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-blue-600 animate-pulse" />
                    </div>
                  </div>
                </div>

                <h3 className="text-base text-center mb-2">
                  Cooking up your proposal...
                </h3>
                <p className="text-base leading-tight text-center w-2/3 mx-auto text-gray-400">
                  Provolo is crafting a personalized proposal just for you
                </p>
              </div>
            ) : (
              <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold w-full">
                    Complete Proposal (MDX)
                  </h3>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {generatedProposal?.mdx && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <pre
                        className="text-gray-700 text-xs whitespace-pre-wrap overflow-x-auto"
                        role="textbox"
                        aria-label="Generated proposal content"
                        tabIndex={0}
                      >
                        {generatedProposal.mdx}
                      </pre>

                    </div>
                  )}
                  <div className=" mt-5">
                    <CustomButton
                      onClick={copyToClipboard}
                      className="btn-secondary p-0 max-w-fit h-fit hover:border-gray-400 items-center bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                      aria-label={
                        copyState === "copied"
                          ? "Copied to clipboard"
                          : "Copy proposal to clipboard"
                      }
                    >
                      {copyState === "copied" ? (
                        <span className="text-black text-sm flex gap-x-3">
                          <Check size={18} className="text-black" />
                          Copied
                        </span>
                      ) : (
                        <span className="text-black text-sm flex gap-x-3">
                          <Copy size={18} className="text-black" />
                          Copy text
                        </span>
                      )}
                    </CustomButton>
                  </div>
                </div>
              </div>
            )}
          </motion.section>
        </motion.div>

        {/* Improvement Options Section - Only show after proposal is generated */}
        {generatedProposal && (
          <motion.section
            className="p-5 bg-white rounded-lg border border-gray-200 mt-5 grid grid-cols-3 gap-24"
            variants={proposalCardVariants}
          >
            {/* List of proposal improvement options */}
            <div className="col-span-2">
              <p className="mb-6">
                How would you like to improve the proposal?
              </p>

              <motion.div
                className="grid grid-cols-2 grid-rows-2 gap-5"
                variants={proposalContainerVariants}
              >
                {improvementOptions.map((option, index) => (
                  <motion.div key={index} variants={proposalItemVariants}>
                    <button
                      onClick={() => {
                        // TODO: Implement improvement action
                        console.log(`Improve proposal: ${option.title}`);
                      }}
                      className={`p-5 rounded-2xl transition-all duration-200 ${option.bgColor} ${option.hoverColor} py-[24px] px-5 block w-full text-left`}
                    >
                      <span className="flex items-center align-middle gap-2 mb-3">
                        <option.icon size={16} />
                        <p className="font-medium">{option.title}</p>
                      </span>
                      <span>
                        <p className="font-thin text-sm">
                          {option.description}
                        </p>
                      </span>
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="col-span-1 flex flex-col">
              {/* Tone selector */}
              <Menu as="div" className="relative inline-block w-full">
                <p className="block text-sm mb-2">Proposal Tone</p>
                <MenuButton className="capitalize inline-flex w-full gap-x-1.5 rounded-md px-3 py-4 text-sm text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset bg-gray-50 duration-200 transition-all hover:bg-gray-100">
                  {proposalTone ?? "Select Option"}
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="ml-auto size-5 text-gray-400"
                  />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {proposalToneOptions.map(tone => (
                      <MenuItem key={tone.value}>
                        <button
                          onClick={() => setProposalTone(tone.value)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-none"
                        >
                          {tone.label}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              {/* Regenerate button */}
              <CustomButton
                onClick={generateProposal}
                isLoading={isGenerating}
                className="btn-primary mt-auto"
              >
                Generate Proposal Again
              </CustomButton>
            </div>
          </motion.section>
        )}
      </motion.div>
    </div>
  );
};

export default PortfolioOptimizer;