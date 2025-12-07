import { motion } from "motion/react";
import { Infinity as InfinityIcon } from "lucide-react";
import ResultsAccordion from "@/Reusables/ResultsAccordion";
import CustomSnackbar from "@/Reusables/CustomSnackbar";
import type { AccordionSection } from "@/types/optimizer";

interface OptimizerResultsProps {
  sections: AccordionSection[];
  hasResults: boolean;
  quotaData?: {
    quota: string;
    count: number;
    limit: string | number;
    remaining: string | number;
  } | null;
}

const OptimizerResults: React.FC<OptimizerResultsProps> = ({
  sections,
  hasResults,
  quotaData,
}) => {
  if (!hasResults) {
    return (
      <motion.div
        className="text-center space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {quotaData && (
          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
            <span>{quotaData.count}</span>
            <span>/</span>
            {quotaData.limit === -1 || quotaData.limit === "unlimited" ? (
              <>
                <InfinityIcon size={20} className="text-gray-500" />
                <span>Optimizations</span>
              </>
            ) : (
              <span>{quotaData.limit} optimizations</span>
            )}
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <>
      <CustomSnackbar
        open={hasResults}
        snackbarColor="success"
        snackbarMessage="Analysis Complete"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <ResultsAccordion sections={sections} />
      </motion.div>
    </>
  );
};

export default OptimizerResults;
