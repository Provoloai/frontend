import { useMemo } from "react";
import CustomSnackbar from "@/Reusables/CustomSnackbar";
import ResultsAccordion from "@/Reusables/ResultsAccordion";
import OptimizerRefineBox from "./OptimizerRefineBox";
import OptimizerVersionBar from "./OptimizerVersionBar";
import type { OptimizerTargetSection, OptimizerVersion } from "@/types/optimizer";
import { resultsToSections } from "@/utils/optimizer.util";

interface OptimizerWorkspaceProps {
  versions: OptimizerVersion[];
  currentVersionIndex: number;
  onVersionSelect: (index: number) => void;
  unlimitedRefine: boolean;
  refinementsRemaining: number;
  isRefining: boolean;
  refineError: string;
  onRefine: (
    instruction: string,
    targetSection: OptimizerTargetSection
  ) => Promise<void>;
  onRefineErrorClose: () => void;
  showSuccessSnackbar?: boolean;
}

const OptimizerWorkspace: React.FC<OptimizerWorkspaceProps> = ({
  versions,
  currentVersionIndex,
  onVersionSelect,
  unlimitedRefine,
  refinementsRemaining,
  isRefining,
  refineError,
  onRefine,
  onRefineErrorClose,
  showSuccessSnackbar = false,
}) => {
  const currentVersion = versions[currentVersionIndex];
  const sections = useMemo(
    () => (currentVersion ? resultsToSections(currentVersion.response) : []),
    [currentVersion]
  );

  if (!currentVersion) return null;

  return (
    <>
      {showSuccessSnackbar && (
        <CustomSnackbar
          open
          snackbarColor="success"
          snackbarMessage="Optimization Complete"
        />
      )}

      <OptimizerVersionBar
        versions={versions}
        currentVersionIndex={currentVersionIndex}
        onVersionSelect={onVersionSelect}
      />

      <ResultsAccordion sections={sections} />

      <OptimizerRefineBox
        isLoading={isRefining}
        error={refineError}
        unlimitedRefine={unlimitedRefine}
        refinementsRemaining={refinementsRemaining}
        onRefine={onRefine}
        onErrorClose={onRefineErrorClose}
      />
    </>
  );
};

export default OptimizerWorkspace;
