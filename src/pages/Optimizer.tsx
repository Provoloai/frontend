import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowUp, ArrowDown, Infinity as InfinityIcon } from "lucide-react";
import { useSearch } from "@tanstack/react-router";
import useSession from "../hooks/useSession";
import { useGetQuota, useGetOptimizer } from "@/api";
import { useOptimizerWorkspace } from "@/hooks/useOptimizerWorkspace";
import {
  optimizerContainerVariants,
  optimizerItemVariants,
} from "@/constants/animations";
import type { PortfolioFormData } from "@/schemas/portfolioSchema";
import OptimizerForm from "@/components/optimizer/OptimizerForm";
import OptimizerWorkspace from "@/components/optimizer/OptimizerWorkspace";
import { useSEO, SEO_CONFIGS } from "@/hooks/useSEO";

const PortfolioOptimizer = () => {
  useSEO(SEO_CONFIGS.optimizer);
  const { recordId: recordIdFromUrl } = useSearch({
    from: "/_sidebarlayout/_protected/optimizer",
  });

  const { user } = useSession();
  const { data: quotaData } = useGetQuota("upwork_profile_optimizer");
  const { data: historyData, isLoading: historyLoading } = useGetOptimizer(
    recordIdFromUrl || ""
  );

  const {
    versions,
    currentVersionIndex,
    hasWorkspace,
    unlimitedRefine,
    refinementsRemaining,
    hydrateFromHistory,
    generate,
    refine,
    selectVersion,
  } = useOptimizerWorkspace();

  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [error, setError] = useState("");
  const [refineError, setRefineError] = useState("");
  const [showGenerateSuccess, setShowGenerateSuccess] = useState(false);

  const [formDefaults, setFormDefaults] = useState<PortfolioFormData>({
    freelancerName: "",
    profileTitle: "",
    profileDescription: "",
  });

  const formRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [isOnFormSection, setIsOnFormSection] = useState(true);

  const displayName = useMemo(
    () => user?.displayName || user?.email?.split("@")[0] || "User",
    [user]
  );

  useEffect(() => {
    if (!user) return;
    setFormDefaults({
      freelancerName: user.displayName || "",
      profileTitle: user.professionalTitle || "",
      profileDescription: "",
    });
  }, [user]);

  useEffect(() => {
    if (!recordIdFromUrl || !historyData?.data) return;
    const formDefaultsFromHistory = hydrateFromHistory(
      historyData.data as Parameters<typeof hydrateFromHistory>[0]
    );
    setFormDefaults(formDefaultsFromHistory);
  }, [recordIdFromUrl, historyData, hydrateFromHistory]);

  useEffect(() => {
    if (!resultsRef.current || !formRef.current) return;

    const handleScroll = () => {
      const resultsTop = resultsRef.current!.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;
      setIsOnFormSection(resultsTop > viewportHeight / 2);
    };

    const scrollContainer = document.querySelector(".snap-y");
    scrollContainer?.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScroll);
    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasWorkspace]);

  useEffect(() => {
    if (hasWorkspace && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  }, [hasWorkspace, versions.length]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToResults = () => {
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (data: PortfolioFormData) => {
    setIsGenerating(true);
    setError("");
    setShowGenerateSuccess(false);

    try {
      await generate(data);
      setShowGenerateSuccess(true);
    } catch (err: unknown) {
      const e = err as Error;
      if (e.name === "TypeError" && e.message.includes("fetch")) {
        setError("Network error. Please check your connection and try again.");
      } else if (e.message.includes("401")) {
        setError("Authentication required. Please log in again.");
      } else if (e.message.includes("429")) {
        setError(
          "You have reached your generation limit. Please try again later or upgrade your plan."
        );
      } else {
        setError(e.message || "Something went wrong. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefine = async (
    instruction: string,
    targetSection: Parameters<typeof refine>[1]
  ) => {
    setIsRefining(true);
    setRefineError("");

    try {
      await refine(instruction, targetSection);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to refine profile.";
      setRefineError(message);
      throw err;
    } finally {
      setIsRefining(false);
    }
  };

  if (recordIdFromUrl && historyLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-10 text-gray-500">
        Loading profile…
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-y-auto snap-y snap-mandatory relative">
      <motion.div
        ref={formRef}
        className="p-6 sm:p-10 max-w-3xl m-auto w-full min-h-screen flex flex-col justify-center snap-start snap-always"
        initial="hidden"
        animate="visible"
        variants={optimizerContainerVariants}
      >
        <motion.h2
          className="text-3xl mb-3 text-center"
          variants={optimizerItemVariants}
        >
          Let&apos;s Optimize Your Profile, {displayName}
        </motion.h2>

        <OptimizerForm
          isLoading={isGenerating}
          error={error}
          onSubmit={handleSubmit}
          onErrorClose={() => setError("")}
          defaultValues={formDefaults}
        />

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {quotaData?.data && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
              <span>{quotaData.data.count}</span>
              <span>/</span>
              {quotaData.data.limit === -1 ||
              quotaData.data.limit === "unlimited" ? (
                <>
                  <InfinityIcon size={20} className="text-gray-500" />
                  <span>generations</span>
                </>
              ) : (
                <span>{quotaData.data.limit} generations</span>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>

      {hasWorkspace && (
        <div
          ref={resultsRef}
          className="w-full min-h-screen flex flex-col snap-start snap-always relative overflow-y-auto pb-16"
        >
          <OptimizerWorkspace
            versions={versions}
            currentVersionIndex={currentVersionIndex}
            onVersionSelect={selectVersion}
            unlimitedRefine={unlimitedRefine}
            refinementsRemaining={refinementsRemaining}
            isRefining={isRefining}
            refineError={refineError}
            onRefine={handleRefine}
            onRefineErrorClose={() => setRefineError("")}
            showSuccessSnackbar={showGenerateSuccess}
          />
        </div>
      )}

      {hasWorkspace && (
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white border shadow-md hover:shadow-lg transition-all duration-300 rounded-full"
          animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.button
            type="button"
            onClick={isOnFormSection ? scrollToResults : scrollToForm}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-full border-gray-200 hover:bg-gray-50 transition-all duration-200 text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOnFormSection ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
            {isOnFormSection ? "Results" : "Optimize"}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default PortfolioOptimizer;
