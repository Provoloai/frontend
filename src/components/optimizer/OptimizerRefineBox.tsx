import { useState } from "react";
import { motion } from "motion/react";
import CustomButton from "@/Reusables/CustomButton";
import {
  REFINE_INSTRUCTION_MAX_CHARS,
  REFINE_INSTRUCTION_MIN_CHARS,
  REFINE_SUGGESTION_CHIPS,
  OPTIMIZER_TARGET_SECTION_OPTIONS,
  getRefinePlaceholder,
} from "@/constants/optimizer";
import type { OptimizerTargetSection } from "@/types/optimizer";
import TextareaWordCounter from "./TextareaWordCounter";

interface OptimizerRefineBoxProps {
  isLoading: boolean;
  error: string;
  unlimitedRefine: boolean;
  refinementsRemaining: number;
  onRefine: (
    instruction: string,
    targetSection: OptimizerTargetSection
  ) => Promise<void>;
  onErrorClose: () => void;
}

const OptimizerRefineBox: React.FC<OptimizerRefineBoxProps> = ({
  isLoading,
  error,
  unlimitedRefine,
  refinementsRemaining,
  onRefine,
  onErrorClose,
}) => {
  const [instruction, setInstruction] = useState("");
  const [targetSection, setTargetSection] =
    useState<OptimizerTargetSection>("all");

  const charCount = instruction.length;
  const canSubmit =
    charCount >= REFINE_INSTRUCTION_MIN_CHARS &&
    charCount <= REFINE_INSTRUCTION_MAX_CHARS &&
    !isLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const trimmed = instruction.trim();
    try {
      await onRefine(trimmed, targetSection);
      setInstruction("");
    } catch {
      // Keep instruction visible so the user can retry or edit
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mt-8 p-5 bg-white rounded-lg border border-gray-200 max-w-3xl mx-auto w-full"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-lg font-medium mb-1">What would you like to change?</h3>
      <p className="text-sm text-gray-500 mb-3">
        Describe any change in your own words — tone, length, role pivot, or a
        specific section.
      </p>

      <textarea
        id="refineInstruction"
        className={`w-full p-3 border rounded-md transition duration-150 ease-in-out bg-gray-50 placeholder:text-sm text-sm disabled:opacity-60 border-gray-300 focus:border-blue-500 focus:ring-blue-500`}
        rows={4}
        style={{ maxHeight: "28em", resize: "vertical" }}
        placeholder={getRefinePlaceholder(targetSection)}
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
        disabled={isLoading}
        maxLength={REFINE_INSTRUCTION_MAX_CHARS}
      />

      <TextareaWordCounter
        value={instruction}
        minChars={REFINE_INSTRUCTION_MIN_CHARS}
        maxChars={REFINE_INSTRUCTION_MAX_CHARS}
      />

      <div className="flex flex-wrap gap-2 mt-2">
        {REFINE_SUGGESTION_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50"
            onClick={() => setInstruction(chip)}
            disabled={isLoading}
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
        <div className="flex items-center gap-2">
          <label htmlFor="targetSection" className="text-sm text-gray-600 shrink-0">
            Apply to:
          </label>
          <select
            id="targetSection"
            className="text-sm border border-gray-300 rounded-md px-2 py-1.5 bg-white"
            value={targetSection}
            onChange={(e) =>
              setTargetSection(e.target.value as OptimizerTargetSection)
            }
            disabled={isLoading}
          >
            {OPTIMIZER_TARGET_SECTION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-end sm:justify-start">
          <CustomButton
            type="submit"
            isLoading={isLoading}
            disabled={!canSubmit}
            className="btn-primary"
          >
            Refine profile
          </CustomButton>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-3 text-center">
        {unlimitedRefine
          ? "Refinements are unlimited on your plan."
          : refinementsRemaining >= 0
            ? `${refinementsRemaining} refinement${refinementsRemaining === 1 ? "" : "s"} left on this profile`
            : "No refinements remaining on this profile"}
      </p>

      {error && (
        <p className="text-sm text-red-600 mt-2" role="alert">
          {error}{" "}
          <button type="button" className="underline" onClick={onErrorClose}>
            Dismiss
          </button>
        </p>
      )}
    </motion.form>
  );
};

export default OptimizerRefineBox;
