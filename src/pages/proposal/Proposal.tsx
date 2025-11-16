import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  ChevronLeft,
  ChevronRight,
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
import type { ProposalData, ImprovementOption } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import Banner from "@/components/dashboard/Banner";
import { Link } from "@tanstack/react-router";
import {
  proposalFormSchema,
  type ProposalFormData,
} from "@/schemas/proposalSchema";
import SidebarBadge from "@/components/sidebar/SidebarBadge";

const PortfolioOptimizer: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queryClient = useQueryClient();

  // NEW: State variables for storing all proposal versions
  const [proposalVersions, setProposalVersions] = useState<
    Array<
      ProposalData & {
        versionNumber: number;
        versionType: string;
        createdAt: string;
      }
    >
  >([]);
  const [currentVersionIndex, setCurrentVersionIndex] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [selectedImprovement, setSelectedImprovement] = useState<string | null>(
    null
  );

  // Get the current proposal based on the selected version
  const generatedProposal = useMemo(() => {
    return proposalVersions[currentVersionIndex] || null;
  }, [proposalVersions, currentVersionIndex]);

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalFormSchema),
    mode: "onBlur",
    defaultValues: {
      clientName: "",
      proposalTone: undefined,
      jobTitle: "",
      jobSummary: "",
    },
  });

  // Watch jobSummary for word/character counter
  const jobSummaryValue = watch("jobSummary") || "";
  const characterCount = jobSummaryValue.length;
  const wordCount = jobSummaryValue.trim()
    ? jobSummaryValue.trim().split(/\s+/).length
    : 0;
  const minChars = 50;
  const maxChars = 5000;

  // Memoized improvement options to prevent re-renders
  const improvementOptions: ImprovementOption[] = useMemo(
    () => [
      {
        icon: FilePlus,
        title: "Expand Text",
        description: "Add more details or examples.",
        bgColor: "bg-blue-50",
        hoverColor: "hover:bg-blue-100",
        value: "expand_text",
      },
      {
        icon: Workflow,
        title: "Improve Flow",
        description: "Reorganize ideas for clarity.",
        bgColor: "bg-purple-50",
        hoverColor: "hover:bg-purple-100",
        value: "improve_flow",
      },
      {
        icon: Scissors,
        title: "Trim Text",
        description: "Remove unnecessary words.",
        bgColor: "bg-yellow-50",
        hoverColor: "hover:bg-yellow-100",
        value: "trim_text",
      },
      {
        icon: PenLine,
        title: "Simplify Text",
        description: "Break down complex sentences.",
        bgColor: "bg-red-50",
        hoverColor: "hover:bg-red-100",
        value: "simplify_text",
      },
    ],
    []
  );

  // Handle form submission - React Hook Form handles validation
  const generateProposal = useCallback(
    async (data: ProposalFormData): Promise<void> => {
      setIsGenerating(true);
      setError("");

      try {
        const result = await proposalApi.generateProposal({
          client_name: data.clientName.trim(),
          proposal_tone: data.proposalTone,
          job_summary: data.jobSummary.trim(),
          job_title: data.jobTitle.trim(),
        });

        // NEW: Add version metadata and store as first version
        const versionedProposal = {
          ...result.data,
          versionNumber: 1,
          versionType: "original",
          createdAt: new Date().toISOString(),
        };

        setProposalVersions([versionedProposal]);
        setCurrentVersionIndex(0);
        setSelectedImprovement(null); // Reset selected improvement when generating new proposal

        await queryClient.invalidateQueries({
          queryKey: ["proposal-history"],
        });
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to generate proposal. Please try again.";
        setError(errorMessage);
      } finally {
        setIsGenerating(false);
      }
    },
    [queryClient]
  );

  const refineProposal = async () => {
    if (!selectedImprovement) {
      setError("Please select an improvement option");
      return;
    }

    setIsGenerating(true);
    setError("");

    const currentTone = watch("proposalTone");
    if (!currentTone) {
      setError("Please select a proposal tone");
      setIsGenerating(false);
      return;
    }

    try {
      const data = await proposalApi.refineGenerateProposal({
        proposalId: generatedProposal?.proposalId,
        newTone: currentTone,
        refinementType: selectedImprovement,
      });

      // Add version metadata and append to versions array
      const versionedProposal = {
        ...data.data,
        versionNumber: proposalVersions.length + 1,
        versionType: selectedImprovement,
        createdAt: new Date().toISOString(),
      };

      setProposalVersions(prev => [...prev, versionedProposal]);
      setCurrentVersionIndex(proposalVersions.length); // Set to the new version
      setSelectedImprovement(null); // Reset selected improvement

      await queryClient.invalidateQueries({
        queryKey: ["proposal-history"],
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to refine proposal. Please try again.";
      setError(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

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

  // NEW: Version navigation functions
  const goToPreviousVersion = () => {
    if (currentVersionIndex > 0) {
      setCurrentVersionIndex(prev => prev - 1);
    }
  };

  const goToNextVersion = () => {
    if (currentVersionIndex < proposalVersions.length - 1) {
      setCurrentVersionIndex(prev => prev + 1);
    }
  };

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
          // className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-x-5 gap-y-5"
          // className="grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-x-5 gap-y-5"
          className={`grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-x-5 gap-y-5 ${
            generatedProposal ? "min-[1920px]:grid-cols-3" : ""
          }`}
          variants={proposalContainerVariants}
        >
          {/* Form Inputs Section */}
          <motion.form
            onSubmit={handleSubmit(generateProposal)}
            className="p-5 bg-white rounded-lg border border-gray-200 space-y-4"
            variants={proposalCardVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Controller
                name="clientName"
                control={control}
                render={({ field }) => (
                  <TextInputField
                    id="clientName"
                    label="Client's Name (Personal Touch)"
                    placeholder="Nina Nonymous"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    touched={!!errors.clientName}
                    error={errors.clientName?.message}
                    required
                  />
                )}
              />

              <Controller
                name="proposalTone"
                control={control}
                render={({ field }) => (
                  <div className="w-full">
                    <Menu as="div" className="relative inline-block w-full">
                      <label
                        className="block text-sm mb-2"
                        htmlFor="proposal-tone-selector"
                      >
                        Proposal Tone
                      </label>
                      <MenuButton
                        id="proposal-tone-selector"
                        className={`capitalize inline-flex w-full gap-x-1.5 rounded-md px-3 py-4 text-sm text-gray-900 shadow-xs ring-1 duration-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          errors.proposalTone
                            ? "ring-red-600/10 ring-inset bg-red-50 hover:bg-red-100"
                            : "ring-gray-300 ring-inset bg-gray-50 hover:bg-gray-100"
                        }`}
                        aria-label="Select proposal tone"
                      >
                        {field.value
                          ? proposalToneOptions.find(
                              t => t.value === field.value
                            )?.label
                          : "Select Option"}
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="ml-auto size-5 text-gray-400"
                        />
                      </MenuButton>
                      {errors.proposalTone && (
                        <p className="text-xs text-red-700 mt-1">
                          {errors.proposalTone.message}
                        </p>
                      )}
                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                      >
                        <div className="py-1">
                          {proposalToneOptions.map(tone => (
                            <MenuItem key={tone.value}>
                              <button
                                type="button"
                                onClick={() => field.onChange(tone.value)}
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
                )}
              />
            </div>

            <Controller
              name="jobTitle"
              control={control}
              render={({ field }) => (
                <TextInputField
                  id="jobTitle"
                  label="Job Title"
                  placeholder="UiUx Designer | WordPress Developer..."
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  touched={!!errors.jobTitle}
                  error={errors.jobTitle?.message}
                  required
                />
              )}
            />

            <div className="mb-4">
              <label htmlFor="jobSummary" className="block text-sm mb-2">
                Job Summary
              </label>

              <Controller
                name="jobSummary"
                control={control}
                render={({ field }) => (
                  <>
                    <textarea
                      id="jobSummary"
                      name={field.name}
                      className={`w-full p-3 border rounded-md transition duration-150 ease-in-out bg-gray-50 placeholder:text-sm ${
                        errors.jobSummary
                          ? "ring-1 ring-red-600/10 ring-inset focus:ring-red-500 bg-red-50 placeholder-red-700"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                      rows={8}
                      style={{ maxHeight: "28em", resize: "vertical" }}
                      placeholder="Paste Job Summary here..."
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                    {errors.jobSummary && (
                      <p className="text-xs text-red-700 mt-1">
                        {errors.jobSummary.message}
                      </p>
                    )}
                    {/* Word/Character Counter */}
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xs text-gray-500">
                        {wordCount} {wordCount === 1 ? "word" : "words"} •{" "}
                        {characterCount}{" "}
                        {characterCount === 1 ? "character" : "characters"}
                      </div>
                      <div
                        className={`text-xs ${
                          characterCount < minChars
                            ? "text-black"
                            : characterCount > maxChars
                              ? "text-red-600"
                              : "text-gray-500"
                        }`}
                      >
                        {characterCount} / {maxChars} characters
                        {characterCount < minChars && ` (min: ${minChars})`}
                      </div>
                    </div>
                  </>
                )}
              />
            </div>

            {!isGenerating && proposalVersions.length === 0 && (
              <div className="w-fit flex justify-end">
                <CustomButton
                  type="submit"
                  isLoading={isGenerating || isSubmitting}
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

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Portfolio</h4>
                  {generatedProposal?.portfolioLink ? (
                    <a
                      href={generatedProposal.portfolioLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      {generatedProposal.portfolioLink}
                    </a>
                  ) : (
                    <Link
                      to="/userprofile"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Click here to set profile link
                    </Link>
                  )}
                </div>

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
          </motion.form>

          {/* Empty State Section */}
          <motion.section
            className="bg-white rounded-lg border border-gray-200 flex min-[1920px]:col-span-1"
            variants={proposalCardVariants}
          >
            {proposalVersions.length === 0 && !isGenerating ? (
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
                  {proposalVersions.length === 0
                    ? "Cooking up your proposal..."
                    : "Refining your proposal..."}
                </h3>
                <p className="text-base leading-tight text-center w-2/3 mx-auto text-gray-400">
                  Crafting a personalized proposal just for you
                </p>
              </div>
            ) : (
              <div className="p-6 h-full flex flex-col">
                {/* NEW: Version indicator */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Proposal
                    </h3>
                    {generatedProposal?.versionNumber && (
                      <SidebarBadge
                        badge={{
                          text: `v${generatedProposal.versionNumber}`,
                          color: "blue",
                        }}
                        show={true}
                      />
                    )}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {generatedProposal?.mdx && (
                    <div className="p-5 bg-gray-50 rounded-lg border border-gray-100">
                      <pre
                        className="text-gray-700 text-sm whitespace-pre-wrap overflow-x-auto font-mono leading-relaxed"
                        role="textbox"
                        aria-label="Generated proposal content"
                        tabIndex={0}
                      >
                        {generatedProposal.mdx}
                      </pre>
                    </div>
                  )}
                  {/* NEW: Version pagination and copy button at the bottom */}
                  <div className="flex items-center justify-between pt-4">
                    {/* Copy button */}
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
                    {/* Version pagination */}
                    {proposalVersions.length > 1 && (
                      <div className="flex items-center">
                        <button
                          onClick={goToPreviousVersion}
                          disabled={currentVersionIndex === 0}
                          // className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                          aria-label="Previous version"
                        >
                          <ChevronLeft size={24} />
                        </button>

                        <span className="text-base font-medium text-gray-700 min-w-[20px] text-center">
                          {currentVersionIndex + 1}/{proposalVersions.length}
                        </span>

                        <button
                          onClick={goToNextVersion}
                          disabled={
                            currentVersionIndex === proposalVersions.length - 1
                          }
                          // className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                          aria-label="Next version"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.section>

          {/* Improvement Options Section - Only show after proposal is generated AND on the latest version */}
          {generatedProposal && !isGenerating && currentVersionIndex === 0 && (
            <motion.section
              className="p-5 bg-white rounded-lg border border-gray-200 grid grid-cols-3 gap-24 lg:col-span-2 min-[1920px]:col-span-1 min-[1920px]:grid-cols-1 min-[1920px]:gap-0"
              variants={proposalCardVariants}
            >
              {/* List of proposal improvement options */}
              <div className="col-span-2 h-fit">
                <p className="mb-6">
                  How would you like to improve the proposal?
                </p>

                <motion.div
                  className="grid grid-cols-2 grid-rows-2 gap-5 min-[1920px]:grid-cols-1"
                  variants={proposalContainerVariants}
                >
                  {improvementOptions.map((option, index) => (
                    <motion.div key={index} variants={proposalItemVariants}>
                      <button
                        onClick={() => {
                          setSelectedImprovement(
                            selectedImprovement === option.value
                              ? null
                              : option.value
                          );
                        }}
                        className={`p-5 rounded-2xl transition-all duration-200 ${option.bgColor} ${option.hoverColor} ${
                          selectedImprovement === option.value
                            ? "ring-2 ring-blue-600"
                            : ""
                        } py-[24px] px-5 block w-full text-left`}
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

              <div className="col-span-1 flex flex-col h-full min-[1920px]:h-fit mt-auto">
                {/* Tone selector */}
                <Controller
                  name="proposalTone"
                  control={control}
                  render={({ field }) => (
                    <Menu as="div" className="relative inline-block w-full">
                      <p className="block text-sm mb-2">Proposal Tone</p>
                      <MenuButton className="capitalize inline-flex w-full gap-x-1.5 rounded-md px-3 py-4 text-sm text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset bg-gray-50 duration-200 transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        {field.value
                          ? proposalToneOptions.find(
                              t => t.value === field.value
                            )?.label
                          : "Select Option"}
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
                                type="button"
                                onClick={() => field.onChange(tone.value)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-none"
                              >
                                {tone.label}
                              </button>
                            </MenuItem>
                          ))}
                        </div>
                      </MenuItems>
                    </Menu>
                  )}
                />

                {/* Regenerate button */}
                <CustomButton
                  onClick={
                    selectedImprovement
                      ? refineProposal
                      : handleSubmit(generateProposal)
                  }
                  isLoading={isGenerating || isSubmitting}
                  className="btn-primary mt-auto  min-[1920px]:mt-10"
                >
                  Generate Proposal Again
                </CustomButton>
              </div>
            </motion.section>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PortfolioOptimizer;
