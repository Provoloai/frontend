import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { useParams } from "@tanstack/react-router";
import {
  Copy,
  Check,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import CustomButton from "@/Reusables/CustomButton";
import {
  proposalContainerVariants,
  proposalItemVariants,
  proposalCardVariants,
} from "@/constants/animations";
import { Link } from "@tanstack/react-router";
import { useGetProposal } from "@/api";
import SidebarBadge from "@/components/sidebar/SidebarBadge";

const ProposalHistory: React.FC = () => {
  const { proposalId } = useParams({
    from: "/_sidebarlayout/_protected/proposalHistory/$proposalId",
  });

  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [currentVersionIndex, setCurrentVersionIndex] = useState<number>(0);

  // Fetch the proposal based on the ID from URL params
  const { data: proposal, isLoading } = useGetProposal(proposalId);

  // Extract versions from the proposal response
  // The API returns: { data: { versions: [{ proposal: {...} }], proposalResponse: {...} } }
  const rawVersions = proposal?.data?.versions;
  const hasMultipleVersions =
    Array.isArray(rawVersions) && rawVersions.length > 1;

  // Get the current proposal based on the selected version (for train of thoughts)
  let generatedProposal = null;

  if (hasMultipleVersions && rawVersions.length > 0) {
    // If we have multiple versions, get the selected one
    // Each version has a `proposal` property containing the actual proposal data
    const currentVersion = rawVersions[currentVersionIndex] || rawVersions[0];
    generatedProposal = currentVersion?.proposal || null;
  } else {
    // If no versions array or only one version, use the single proposalResponse
    generatedProposal = proposal?.data?.proposalResponse || null;
  }

  // Read MDX directly from the main proposalResponse, not from versions
  const proposalMdx = proposal?.data?.proposalResponse?.mdx || null;

  // For pagination, we need an array of versions
  const proposalVersions = hasMultipleVersions ? rawVersions : [];

  // Format the creation date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Optimized: Copy proposal to clipboard with locked feedback state and cleanup
  const copyToClipboard = useCallback(async (): Promise<void> => {
    const mdxToCopy = proposal?.data?.proposalResponse?.mdx;
    if (copyState !== "idle" || !mdxToCopy) return;
    try {
      await navigator.clipboard.writeText(mdxToCopy);
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
  }, [copyState, proposal?.data?.proposalResponse?.mdx]);

  // Version navigation functions
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

  // Reset version index when proposal changes
  useEffect(() => {
    setCurrentVersionIndex(0);
  }, [proposalId]);

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="flex-1 flex flex-col overflow-y-auto relative">
      <div className="p-6 sm:p-10 w-4xl max-h-fit">
        {/* Title Section Skeleton */}
        <div className="text-start pt-10 animate-pulse">
          <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 w-3/4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-48 bg-gray-200 rounded mb-6"></div>
        </div>

        <div className="grid grid-cols-2 gap-x-5">
          {/* Train of Thoughts Skeleton */}
          <div className="p-5 bg-white rounded-lg border border-gray-200 animate-pulse">
            <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>

            {[1, 2, 3, 4, 5].map(item => (
              <div key={item} className="mb-4">
                <div className="h-5 w-24 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-full bg-gray-100 rounded mb-1"></div>
                <div className="h-4 w-5/6 bg-gray-100 rounded"></div>
              </div>
            ))}
          </div>

          {/* MDX Output Skeleton */}
          <div className="bg-white rounded-lg border border-gray-200 flex">
            <div className="p-6 h-full flex flex-col w-full animate-pulse">
              <div className="flex justify-between items-center mb-4">
                <div className="h-6 w-48 bg-gray-200 rounded"></div>
              </div>

              <div className="flex-1">
                <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="h-3 bg-gray-200 rounded"
                      style={{ width: `${Math.random() * 30 + 70}%` }}
                    ></div>
                  ))}
                </div>
                <div className="h-9 w-16 bg-gray-200 rounded mt-5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Show skeleton loader only while loading AND no proposal data available
  // Stop loading as soon as we have proposal data, don't wait for all history
  const hasProposalData =
    proposal && (proposal.data?.proposalResponse || proposal.data?.versions);

  if (isLoading && !hasProposalData) {
    return <SkeletonLoader />;
  }

  // If proposal not found after loading, show error state
  if (!isLoading && !hasProposalData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10">
        <h2 className="text-2xl font-semibold mb-3">Proposal Not Found</h2>
        <p className="text-gray-500 mb-6">
          The proposal you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/proposal">
          <CustomButton className="flex items-center gap-2">
            <ArrowLeft size={18} />
            Back to Proposals
          </CustomButton>
        </Link>
      </div>
    );
  }

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
          <Link
            to="/proposal"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Proposals
          </Link>
          <h2 className="text-3xl font-medium mb-2 flex items-center gap-3">
            {proposal?.data?.jobTitle}
          </h2>
          <p className="mb-6 text-sm text-gray-400">
            Created on {formatDate(proposal?.data?.createdAt)}
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-x-5 gap-y-5"
          variants={proposalContainerVariants}
        >
          {/* Train of Thoughts Section */}
          <motion.section
            className="p-5 bg-white rounded-lg border border-gray-200"
            variants={proposalCardVariants}
          >
            <h3 className="text-lg font-semibold mb-4">Train of Thoughts</h3>

            {!generatedProposal ? (
              // Show loading state when proposal data is not ready
              <div className="flex items-center justify-center h-64">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
                  </div>
                </div>
              </div>
            ) : (
              <>
                {generatedProposal?.hook && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Hook</h4>
                    <p className="text-gray-700 text-sm">
                      {generatedProposal.hook}
                    </p>
                  </div>
                )}

                {generatedProposal?.solution && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Solution</h4>
                    <p className="text-gray-700 text-sm">
                      {generatedProposal.solution}
                    </p>
                  </div>
                )}

                {generatedProposal?.keyPoints &&
                  generatedProposal.keyPoints.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Key Points
                      </h4>
                      <ul className="space-y-1 list-disc list-inside">
                        {generatedProposal.keyPoints.map(
                          (point: string, index: number) => (
                            <li key={index} className="text-gray-700 text-sm">
                              {point}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Portfolio</h4>
                  {generatedProposal?.portfolioLink ? (
                    <a
                      href={generatedProposal.portfolioLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm break-all"
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
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Availability
                    </h4>
                    <p className="text-gray-700 text-sm">
                      {generatedProposal.availability}
                    </p>
                  </div>
                )}

                {generatedProposal?.support && (
                  <div className="mb-4">
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
              </>
            )}
          </motion.section>

          {/* MDX Output Section */}
          <motion.section
            className="bg-white rounded-lg border border-gray-200 flex"
            variants={proposalCardVariants}
          >
            <div className="p-6 h-full flex flex-col w-full">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold">Proposal</h3>
                  {hasMultipleVersions && (
                    <SidebarBadge
                      badge={{
                        text: `v${currentVersionIndex + 1}`,
                        color: "blue",
                      }}
                      show
                    />
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {!generatedProposal ? (
                  // Show loading spinner when proposal data is not ready
                  <div className="flex items-center justify-center h-64">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-blue-600 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 bg-gray-50 rounded-lg border border-gray-100">
                    <pre
                      className="text-gray-700 text-sm whitespace-pre-wrap overflow-x-auto font-mono leading-relaxed"
                      role="textbox"
                      aria-label="Generated proposal content"
                      tabIndex={0}
                    >
                      {proposalMdx || ""}
                    </pre>
                  </div>
                )}

                {/* Version pagination and copy button at the bottom */}
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
                  {hasMultipleVersions && (
                    <div className="flex items-center">
                      <button
                        onClick={goToPreviousVersion}
                        disabled={currentVersionIndex === 0}
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
                        aria-label="Next version"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProposalHistory;
