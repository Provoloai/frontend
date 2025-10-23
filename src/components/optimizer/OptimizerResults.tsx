import { motion } from "motion/react";
import ResultsAccordion from "@/Reusables/ResultsAccordion";
import CustomSnackbar from "@/Reusables/CustomSnackbar";
import type { AccordionSection } from "@/types/optimizer";

interface OptimizerResultsProps {
  sections: AccordionSection[];
  hasResults: boolean;
}

const OptimizerResults: React.FC<OptimizerResultsProps> = ({
  sections,
  hasResults,
}) => {
  if (!hasResults) {
    return (
      <motion.p
        className="text-center text-xs text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        Provolo.org
      </motion.p>
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
