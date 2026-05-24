import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInputField from "../../Reusables/TextInputField";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  Sparkles,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import DocumentIllustration from "@/assets/svg/DocumentIllustration";
import CustomButton from "@/Reusables/CustomButton";
import { proposalApi, useGetOptimizerList, useGetProposal } from "@/api";
import { proposalToneOptions } from "@/constants/proposal";
import {
  proposalContainerVariants,
  proposalItemVariants,
  proposalCardVariants,
} from "@/constants/animations";
import type { ProposalData, ProposalTone } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useSEO, SEO_CONFIGS } from "@/hooks/useSEO";
import { queryKeys } from "@/lib/queryClient";
import ProposalRefinePanel from "@/components/proposal/ProposalRefinePanel";
import RoleFitCard from "@/components/proposal/RoleFitCard";
// import Banner from "@/components/dashboard/Banner";
import { Link, useSearch } from "@tanstack/react-router";
import {
  proposalFormSchema,
  type ProposalFormData,
} from "@/schemas/proposalSchema";
import SidebarBadge from "@/components/sidebar/SidebarBadge";
import CustomSnackbar from "../../Reusables/CustomSnackbar";

const PortfolioOptimizer: React.FC = () => {
  useSEO(SEO_CONFIGS.proposal);

  const [error, setError] = useState<string>("");
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queryClient = useQueryClient();
  const { proposalId: proposalIdFromUrl } = useSearch({
    from: "/_sidebarlayout/_protected/proposal",
  });
  const { data: savedProposal, isLoading: savedProposalLoading } = useGetProposal(
    proposalIdFromUrl || ""
  );
  const { data: optimizerHistoryData } = useGetOptimizerList(1, 50);
  const optimizerProfiles = useMemo(
    () => optimizerHistoryData?.data?.records ?? [],
    [optimizerHistoryData]
  );

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
  const [savedProposalTone, setSavedProposalTone] = useState<ProposalTone>("professional");

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
      optimizerRecordId: "",
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

  const activeProposalId =
    generatedProposal?.proposalId || proposalIdFromUrl || undefined;

  const isOnLatestVersion =
    proposalVersions.length === 0 ||
    currentVersionIndex === proposalVersions.length - 1;

  // Hydrate from saved proposal when opening via ?proposalId=
  useEffect(() => {
    if (!proposalIdFromUrl || !savedProposal?.data) return;

    const data = savedProposal.data;
    const rawVersions = data.versions as
      | Array<{ proposal: ProposalData; version?: number }>
      | undefined;

    if (rawVersions && rawVersions.length > 0) {
      const mapped = rawVersions.map((v, i) => ({
        ...v.proposal,
        versionNumber: (v.version ?? i) + 1,
        versionType: "saved",
        createdAt: data.createdAt ?? new Date().toISOString(),
        proposalId: data.id ?? proposalIdFromUrl,
      }));
      setProposalVersions(mapped);
      setCurrentVersionIndex(mapped.length - 1);
    } else if (data.proposalResponse) {
      setProposalVersions([
        {
          ...data.proposalResponse,
          versionNumber: 1,
          versionType: "saved",
          createdAt: data.createdAt ?? new Date().toISOString(),
          proposalId: data.id ?? proposalIdFromUrl,
        },
      ]);
      setCurrentVersionIndex(0);
    }

    if (data.proposalTone) {
      setSavedProposalTone(data.proposalTone as ProposalTone);
    }
  }, [proposalIdFromUrl, savedProposal]);

  const handleProposalRefined = useCallback(
    async (refined: ProposalData) => {
      const versionedProposal = {
        ...refined,
        versionType: "custom",
        createdAt: new Date().toISOString(),
        proposalId: activeProposalId ?? refined.proposalId,
      };
      setProposalVersions(prev => {
        const next = [
          ...prev,
          {
            ...versionedProposal,
            versionNumber: prev.length + 1,
          },
        ];
        setCurrentVersionIndex(next.length - 1);
        return next;
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.proposalHistory.all(),
      });
      if (activeProposalId) {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.proposalHistory.detail(activeProposalId),
        });
      }
    },
    [activeProposalId, queryClient]
  );

  // Handle form submission - React Hook Form handles validation
  const generateProposal = useCallback(
    async (data: ProposalFormData): Promise<void> => {
      setIsGenerating(true);
      setError("");

      try {
        const optimizerId = data.optimizerRecordId?.trim();
        const result = await proposalApi.generateProposal({
          client_name: data.clientName.trim(),
          proposal_tone: data.proposalTone,
          job_summary: data.jobSummary.trim(),
          job_title: data.jobTitle.trim(),
          ...(optimizerId ? { optimizer_record_id: optimizerId } : {}),
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
        setSavedProposalTone(data.proposalTone);

        await queryClient.invalidateQueries({
          queryKey: queryKeys.proposalHistory.all(),
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

  const refineTone: ProposalTone =
    watch("proposalTone") || savedProposalTone;

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
          {/* <div className="mb-10">
            <Banner />
          </div> */}

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
          className={`grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-x-5 gap-y-5 ${generatedProposal ? "min-[1920px]:grid-cols-3" : ""
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
                        className={`capitalize inline-flex w-full gap-x-1.5 rounded-md px-3 py-4 text-sm text-gray-900 shadow-xs ring-1 duration-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${errors.proposalTone
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

            <Controller
              name="optimizerRecordId"
              control={control}
              render={({ field }) => (
                <div className="w-full">
                  <Menu as="div" className="relative inline-block w-full">
                    <label
                      className="block text-sm mb-2"
                      htmlFor="optimizer-profile-selector"
                    >
                      Optimized profile{" "}
                      <span className="text-gray-400 font-normal">
                        (optional)
                      </span>
                    </label>
                    <MenuButton
                      id="optimizer-profile-selector"
                      className="capitalize inline-flex w-full gap-x-1.5 rounded-md px-3 py-4 text-sm text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset bg-gray-50 hover:bg-gray-100 duration-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      aria-label="Select optimized profile for role fit"
                    >
                      {field.value
                        ? (() => {
                            const selected = optimizerProfiles.find(
                              (p: { id: string }) => p.id === field.value
                            );
                            const title =
                              selected?.originalInput?.professionalTitle ||
                              "Selected profile";
                            const platform =
                              selected?.optimizerType === "linkedin"
                                ? "LinkedIn"
                                : "Upwork";
                            return `${title} · ${platform}`;
                          })()
                        : "None — use account profile only"}
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="ml-auto size-5 text-gray-400"
                      />
                    </MenuButton>
                    <p className="text-xs text-gray-500 mt-1">
                      Compare your optimized profile to this job before you
                      apply.{" "}
                      {optimizerProfiles.length === 0 && (
                        <Link
                          to="/optimizer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Create one in Profile Optimizer
                        </Link>
                      )}
                    </p>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 max-h-60 overflow-y-auto w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                      <div className="py-1">
                        <MenuItem>
                          <button
                            type="button"
                            onClick={() => field.onChange("")}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-none"
                          >
                            None — use account profile only
                          </button>
                        </MenuItem>
                        {optimizerProfiles.map(
                          (profile: {
                            id: string;
                            optimizerType?: string;
                            originalInput?: {
                              professionalTitle?: string;
                            };
                          }) => {
                            const title =
                              profile.originalInput?.professionalTitle ||
                              "Untitled profile";
                            const platform =
                              profile.optimizerType === "linkedin"
                                ? "LinkedIn"
                                : "Upwork";
                            return (
                              <MenuItem key={profile.id}>
                                <button
                                  type="button"
                                  onClick={() => field.onChange(profile.id)}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-none"
                                >
                                  {title} · {platform}
                                </button>
                              </MenuItem>
                            );
                          }
                        )}
                      </div>
                    </MenuItems>
                  </Menu>
                </div>
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
                      className={`w-full p-3 border rounded-md transition duration-150 ease-in-out bg-gray-50 placeholder:text-sm ${errors.jobSummary
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
                        className={`text-xs ${characterCount < minChars
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
                {generatedProposal.roleFit && (
                  <RoleFitCard roleFit={generatedProposal.roleFit} />
                )}

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

                <svg className="m-auto" width="177" height="145" viewBox="0 0 177 145" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M89.3427 110.58C119.768 110.58 144.394 85.8083 144.394 55.2452C144.394 24.6821 119.768 0 89.3427 0C59.0064 0 34.2913 24.7712 34.2913 55.3343C34.2913 85.8974 59.0064 110.58 89.3427 110.58Z" fill="#EAEEF9" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7837 111.847C12.7837 111.018 13.4553 110.347 14.2837 110.347H165.302C166.13 110.347 166.802 111.018 166.802 111.847C166.802 112.675 166.13 113.347 165.302 113.347H14.2837C13.4553 113.347 12.7837 112.675 12.7837 111.847Z" fill="#EAEEF9" />
                  <path d="M27.689 48.6515C29.7411 48.6515 31.3472 47.0476 31.3472 44.9982C31.3472 42.9487 29.7411 41.3448 27.689 41.3448C25.6368 41.3448 24.0308 42.9487 24.0308 44.9982C24.0308 47.0476 25.726 48.6515 27.689 48.6515Z" fill="#EAEEF9" />
                  <path d="M24.0308 36.8004C25.3691 36.8004 26.529 35.642 26.529 34.3054C26.529 32.9689 25.3691 31.8105 24.0308 31.8105C22.6924 31.8105 21.5325 32.9689 21.5325 34.3054C21.5325 35.7311 22.6924 36.8004 24.0308 36.8004Z" fill="#EAEEF9" />
                  <path d="M154.923 57.8293C157.51 57.8293 159.563 55.7798 159.563 53.1958C159.563 50.6117 157.51 48.5623 154.923 48.5623C152.335 48.5623 150.283 50.6117 150.283 53.1958C150.283 55.7798 152.335 57.8293 154.923 57.8293Z" fill="#EAEEF9" />
                  <g filter="url(#filter0_d_567_20901)">
                    <path d="M144.662 101.56H154.82C154.82 106.543 150.891 110.568 146.195 110.664C146.195 110.664 146.099 110.664 146.004 110.664H115.338V101.656H138.625L144.662 101.56Z" fill="#EAEEF9" />
                  </g>
                  <path d="M142.074 108.46C141.979 108.364 141.883 108.268 141.787 108.076C140.733 106.831 139.966 105.106 139.966 103.381V49.6202C139.87 44.637 136.133 40.708 131.342 40.6122C131.342 40.6122 131.246 40.6122 131.15 40.6122H100.58V49.6202H88.1223V102.806C88.2181 104.626 88.9848 106.351 90.0389 107.501C94.0638 111.622 90.4222 110.664 95.0221 110.664H146.77C144.949 110.568 143.32 109.705 142.074 108.46Z" fill="#D5DDEA" />
                  <g filter="url(#filter1_d_567_20901)">
                    <path d="M131.437 40.6122C129.712 40.6122 128.083 41.6663 127.029 42.9121C125.975 44.2537 125.113 46.9369 125.113 48.6619V101.847C125.113 106.926 121.088 110.951 116.2 110.951H73.3645V47.3203C73.4603 45.4995 74.227 43.7746 75.2811 42.6246C76.6227 41.283 77.8685 40.6122 79.7851 40.6122L123.483 40.5164L131.15 40.6122C131.341 40.6122 131.341 40.6122 131.437 40.6122Z" fill="url(#paint0_linear_567_20901)" />
                  </g>
                  <path d="M100.772 19.9131C98.951 20.0089 97.3219 20.8714 96.0762 22.0213C95.9803 22.1172 95.8845 22.213 95.7887 22.4047C94.7345 23.6504 93.8721 25.4712 93.8721 27.1961V59.2033H42.124V26.8128C42.2199 24.9921 42.9865 23.2671 44.0406 22.1172C45.3822 20.7756 47.1072 19.9131 49.1196 19.9131H100.772Z" fill="#E7EBF0" />
                  <path d="M110.93 108.843C109.588 107.501 108.917 105.681 108.917 103.764L108.822 29.1127C108.822 24.1296 104.988 20.1047 100.197 20.0089C100.197 20.0089 100.101 20.0089 100.005 20.0089H99.6219H99.4302H69.3397H67.4231V29.1127H56.8818V52.2077H57.7443V103.764C57.7443 105.776 58.6068 107.693 59.7567 108.843C61.0025 110.28 62.8233 110.951 64.644 110.951H115.817C113.901 110.951 112.08 109.993 110.93 108.843Z" fill="#D5DDEA" />
                  <g filter="url(#filter2_d_567_20901)">
                    <path d="M100.101 19.9131C98.1846 20.0089 96.4596 20.7756 95.2138 22.1172C95.118 22.213 95.0222 22.3088 94.8305 22.5005C93.6806 23.8421 92.9139 25.4712 92.9139 27.3878V101.752C92.9139 106.926 88.7933 111.047 83.7143 111.047H38.6743V26.9087C38.7701 24.9921 39.5368 23.2671 40.7826 22.0213C42.1242 20.7756 43.945 19.9131 45.9574 19.9131H91.189H99.8137C99.9095 19.9131 100.005 19.9131 100.101 19.9131Z" fill="url(#paint1_linear_567_20901)" />
                  </g>
                  <path d="M83.7142 32.5626H70.298C69.8189 32.5626 69.4355 32.1793 69.4355 31.7001C69.4355 31.221 69.8189 30.8376 70.298 30.8376H83.6183C84.0975 30.8376 84.4808 31.221 84.4808 31.7001C84.5766 32.1793 84.1933 32.5626 83.7142 32.5626Z" fill="#989FB0" />
                  <path d="M64.0691 32.5626H46.6281C46.1489 32.5626 45.7656 32.1793 45.7656 31.7001C45.7656 31.221 46.1489 30.8376 46.6281 30.8376H64.0691C64.5482 30.8376 64.9316 31.221 64.9316 31.7001C64.9316 32.1793 64.5482 32.5626 64.0691 32.5626Z" fill="#D6DCE8" />
                  <path d="M75.1852 41.2832H57.84C57.3609 41.2832 56.9775 40.8998 56.9775 40.4207C56.9775 39.9415 57.3609 39.5582 57.84 39.5582H75.1852C75.6643 39.5582 76.0477 39.9415 76.0477 40.4207C76.1435 40.8998 75.7602 41.2832 75.1852 41.2832Z" fill="#989FB0" />
                  <path d="M52.282 41.2832H46.6281C46.1489 41.2832 45.7656 40.8998 45.7656 40.4207C45.7656 39.9415 46.1489 39.5582 46.6281 39.5582H52.282C52.7612 39.5582 53.1445 39.9415 53.1445 40.4207C53.1445 40.8998 52.7612 41.2832 52.282 41.2832Z" fill="#D6DCE8" />
                  <path d="M83.7144 50.0035H73.0773C72.5982 50.0035 72.2148 49.6202 72.2148 49.141C72.2148 48.6619 72.5982 48.2786 73.0773 48.2786H83.7144C84.1936 48.2786 84.5769 48.6619 84.5769 49.141C84.5769 49.6202 84.1936 50.0035 83.7144 50.0035Z" fill="#D6DCE8" />
                  <path d="M67.9023 50.0035H46.6281C46.1489 50.0035 45.7656 49.6202 45.7656 49.141C45.7656 48.6619 46.1489 48.2786 46.6281 48.2786H67.9023C68.3814 48.2786 68.7648 48.6619 68.7648 49.141C68.7648 49.6202 68.4773 50.0035 67.9023 50.0035Z" fill="#989FB0" />
                  <path d="M75.1855 58.82H63.4943C63.0152 58.82 62.6318 58.4367 62.6318 57.9576C62.6318 57.4784 63.0152 57.0951 63.4943 57.0951H75.1855C75.6647 57.0951 76.048 57.4784 76.048 57.9576C76.1438 58.3409 75.7605 58.82 75.1855 58.82Z" fill="#989FB0" />
                  <path d="M58.4151 58.82H46.6281C46.1489 58.82 45.7656 58.4367 45.7656 57.9576C45.7656 57.4784 46.1489 57.0951 46.6281 57.0951H58.4151C58.8943 57.0951 59.2776 57.4784 59.2776 57.9576C59.2776 58.4367 58.8943 58.82 58.4151 58.82Z" fill="#D6DCE8" />
                  <path d="M83.7143 67.5404H75.5688C75.0896 67.5404 74.7063 67.157 74.7063 66.6779C74.7063 66.1987 75.0896 65.8154 75.5688 65.8154H83.7143C84.1934 65.8154 84.5768 66.1987 84.5768 66.6779C84.5768 67.157 84.1934 67.5404 83.7143 67.5404Z" fill="#989FB0" />
                  <path d="M70.2023 67.5404H56.4987C56.0196 67.5404 55.6362 67.157 55.6362 66.6779C55.6362 66.1987 56.0196 65.8154 56.4987 65.8154H70.2023C70.6815 65.8154 71.0648 66.1987 71.0648 66.6779C71.0648 67.157 70.6815 67.5404 70.2023 67.5404Z" fill="#D6DCE8" />
                  <path d="M51.4196 67.5404H46.6281C46.1489 67.5404 45.7656 67.157 45.7656 66.6779C45.7656 66.1987 46.1489 65.8154 46.6281 65.8154H51.4196C51.8987 65.8154 52.282 66.1987 52.282 66.6779C52.282 67.157 51.8029 67.5404 51.4196 67.5404Z" fill="#989FB0" />
                  <path d="M83.7144 85.1732H73.0773C72.5982 85.1732 72.2148 84.7899 72.2148 84.3107C72.2148 83.8316 72.5982 83.4482 73.0773 83.4482H83.7144C84.1936 83.4482 84.5769 83.8316 84.5769 84.3107C84.5769 84.7899 84.1936 85.1732 83.7144 85.1732Z" fill="#D6DCE8" />
                  <path d="M67.9023 85.1732H46.6281C46.1489 85.1732 45.7656 84.7899 45.7656 84.3107C45.7656 83.8316 46.1489 83.4482 46.6281 83.4482H67.9023C68.3814 83.4482 68.7648 83.8316 68.7648 84.3107C68.7648 84.7899 68.4773 85.1732 67.9023 85.1732Z" fill="#989FB0" />
                  <path d="M75.1855 93.9895H63.4943C63.0152 93.9895 62.6318 93.6061 62.6318 93.127C62.6318 92.6478 63.0152 92.2645 63.4943 92.2645H75.1855C75.6647 92.2645 76.048 92.6478 76.048 93.127C76.1438 93.5103 75.7605 93.9895 75.1855 93.9895Z" fill="#989FB0" />
                  <path d="M58.4151 93.9895H46.6281C46.1489 93.9895 45.7656 93.6061 45.7656 93.127C45.7656 92.6478 46.1489 92.2645 46.6281 92.2645H58.4151C58.8943 92.2645 59.2776 92.6478 59.2776 93.127C59.2776 93.5103 58.8943 93.9895 58.4151 93.9895Z" fill="#D6DCE8" />
                  <path d="M75.1852 76.2608H67.0397C66.5606 76.2608 66.1772 75.8775 66.1772 75.3984C66.1772 74.9192 66.5606 74.5359 67.0397 74.5359H75.1852C75.6644 74.5359 76.0477 74.9192 76.0477 75.3984C76.1435 75.8775 75.7602 76.2608 75.1852 76.2608Z" fill="#989FB0" />
                  <path d="M61.7692 76.2608H46.6281C46.1489 76.2608 45.7656 75.8775 45.7656 75.3984C45.7656 74.9192 46.1489 74.5359 46.6281 74.5359H61.7692C62.2483 74.5359 62.6317 74.9192 62.6317 75.3984C62.6317 75.8775 62.2483 76.2608 61.7692 76.2608Z" fill="#D6DCE8" />
                  <g filter="url(#filter3_d_567_20901)">
                    <path d="M63.5901 103.668H75.473C75.473 105.681 76.3354 107.502 77.5812 108.843C78.9228 110.185 80.7436 110.951 82.6602 110.951H29.2831C27.2706 110.951 25.4499 110.089 24.2041 108.843C22.8625 107.502 22 105.681 22 103.668H57.1695C57.1695 103.668 63.7817 103.668 63.5901 103.668Z" fill="url(#paint2_linear_567_20901)" />
                  </g>
                  <g filter="url(#filter4_d_567_20901)">
                    <path d="M85.0433 97.3072C79.5405 87.6188 80.0235 83.7616 80.8285 80.5922C82.2511 81.2622 83.3185 81.8789 83.3185 81.8789C83.0695 81.7503 83.3815 79.6951 83.4164 79.5176C83.657 77.3604 83.8629 75.3807 84.2811 73.2501C86.6564 62.5481 93.9351 52.946 102.394 45.7139C104.022 44.4042 105.651 43.0945 107.316 42.0644C108.166 41.4606 109.087 40.9588 109.937 40.355C110.149 40.204 112.488 39.0007 112.345 38.7966C112.594 48.7035 112.792 54.2163 115.967 58.53C113.167 59.7556 111.784 60.2796 108.305 60.3069C113.537 63.9234 115.167 63.0708 115.167 63.0708C115.167 63.0708 114.596 72.0325 100.622 85.4753C103.042 87.1172 103.787 87.046 103.787 87.046C103.787 87.046 95.3747 97.3008 86.8891 97.2181C85.0433 97.3072 85.0433 97.3072 85.0433 97.3072Z" fill="url(#paint3_linear_567_20901)" />
                  </g>
                  <path d="M83.4242 111.227C84.9012 97.6508 85.8271 78.9669 95.8118 62.0963C105.831 45.0483 114.002 36.9519 114.002 36.9519L113.264 38.8515C113.264 38.8515 101.451 51.0625 94.3829 69.3748C87.3492 87.5096 86.9709 100.611 86.2905 108.732C83.4242 111.227 83.4242 111.227 83.4242 111.227Z" fill="#989FB0" />
                  <defs>
                    <filter id="filter0_d_567_20901" x="93.3381" y="90.5598" width="83.4819" height="53.1038" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="11" />
                      <feGaussianBlur stdDeviation="11" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_567_20901" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_567_20901" result="shape" />
                    </filter>
                    <filter id="filter1_d_567_20901" x="51.3645" y="29.5164" width="102.073" height="114.435" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="11" />
                      <feGaussianBlur stdDeviation="11" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_567_20901" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_567_20901" result="shape" />
                    </filter>
                    <filter id="filter2_d_567_20901" x="16.6743" y="8.91309" width="105.427" height="135.134" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="11" />
                      <feGaussianBlur stdDeviation="11" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_567_20901" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_567_20901" result="shape" />
                    </filter>
                    <filter id="filter3_d_567_20901" x="0" y="92.6683" width="104.66" height="51.2831" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="11" />
                      <feGaussianBlur stdDeviation="11" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_567_20901" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_567_20901" result="shape" />
                    </filter>
                    <filter id="filter4_d_567_20901" x="58.3401" y="27.7966" width="79.6274" height="102.511" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="11" />
                      <feGaussianBlur stdDeviation="11" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_567_20901" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_567_20901" result="shape" />
                    </filter>
                    <linearGradient id="paint0_linear_567_20901" x1="102.382" y1="38.8871" x2="102.382" y2="111.711" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#FDFEFF" />
                      <stop offset="0.9964" stop-color="#ECF0F5" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_567_20901" x1="69.3677" y1="17.8051" x2="69.3677" y2="112.03" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#FDFEFF" />
                      <stop offset="0.9964" stop-color="#ECF0F5" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_567_20901" x1="52.3103" y1="103.5" x2="52.3103" y2="111.03" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#FDFEFF" />
                      <stop offset="0.9964" stop-color="#ECF0F5" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_567_20901" x1="88.8953" y1="54.0707" x2="110.371" y2="84.2983" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#FDFEFF" />
                      <stop offset="0.9964" stop-color="#ECF0F5" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* <div className="w-full text-center flex justify-center">
                  <DocumentIllustration />
                </div> */}



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

                <div className="flex-1 overflow-y-auto space-y-4">
                  {generatedProposal?.roleFit && (
                    <RoleFitCard roleFit={generatedProposal.roleFit} />
                  )}
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
                          <ChevronLeft size={15} />
                        </button>

                        <span className="text-sm font-medium text-gray-700 min-w-[20px] text-center">
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
                          <ChevronRight size={15} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.section>

          {activeProposalId &&
            generatedProposal &&
            !isGenerating &&
            !savedProposalLoading &&
            isOnLatestVersion && (
              <motion.section variants={proposalCardVariants}>
                <ProposalRefinePanel
                  proposalId={activeProposalId}
                  proposalTone={refineTone}
                  disabled={isGenerating}
                  onRefined={handleProposalRefined}
                  onError={setError}
                />
              </motion.section>
            )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PortfolioOptimizer;
