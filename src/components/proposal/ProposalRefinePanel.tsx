import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import CustomButton from "@/Reusables/CustomButton";
import TextareaWordCounter from "@/components/optimizer/TextareaWordCounter";
import { proposalApi } from "@/api";
import {
  proposalToneOptions,
  proposalImprovementOptions,
  PROPOSAL_REFINE_SUGGESTION_CHIPS,
  REFINE_INSTRUCTION_MIN_CHARS,
  REFINE_INSTRUCTION_MAX_CHARS,
} from "@/constants/proposal";
import {
  proposalContainerVariants,
  proposalItemVariants,
} from "@/constants/animations";
import type { ProposalData, ProposalTone } from "@/types";

export interface ProposalRefinePanelProps {
  proposalId: string;
  proposalTone: ProposalTone;
  disabled?: boolean;
  onRefined: (proposal: ProposalData) => void;
  onError: (message: string) => void;
  className?: string;
}

const ProposalRefinePanel: React.FC<ProposalRefinePanelProps> = ({
  proposalId,
  proposalTone: initialTone,
  disabled = false,
  onRefined,
  onError,
  className = "",
}) => {
  const [selectedImprovement, setSelectedImprovement] = useState<string | null>(
    null
  );
  const [customRefineInstruction, setCustomRefineInstruction] = useState("");
  const [tone, setTone] = useState<ProposalTone>(initialTone);
  const [isRefining, setIsRefining] = useState(false);

  const customTrimmed = customRefineInstruction.trim();
  const hasValidCustom =
    customTrimmed.length >= REFINE_INSTRUCTION_MIN_CHARS &&
    customTrimmed.length <= REFINE_INSTRUCTION_MAX_CHARS;
  const canRefine = Boolean(selectedImprovement || hasValidCustom);

  const toneLabel = useMemo(
    () => proposalToneOptions.find(t => t.value === tone)?.label ?? "Select Option",
    [tone]
  );

  const handleRefine = async () => {
    if (!canRefine) {
      onError(
        `Select a quick improvement or describe changes (${REFINE_INSTRUCTION_MIN_CHARS}–${REFINE_INSTRUCTION_MAX_CHARS} characters)`
      );
      return;
    }

    setIsRefining(true);
    onError("");

    try {
      const result = await proposalApi.refineGenerateProposal({
        proposalId,
        newTone: tone,
        refinementType: selectedImprovement ?? "custom",
        ...(hasValidCustom ? { customInstruction: customTrimmed } : {}),
      });

      onRefined(result.data as ProposalData);
      setSelectedImprovement(null);
      setCustomRefineInstruction("");
    } catch (err: unknown) {
      onError(
        err instanceof Error
          ? err.message
          : "Failed to refine proposal. Please try again."
      );
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div
      className={`p-5 bg-white rounded-lg border border-gray-200 grid grid-cols-3 gap-24 lg:col-span-2 min-[1920px]:col-span-1 min-[1920px]:grid-cols-1 min-[1920px]:gap-0 ${className}`}
    >
      <div className="col-span-2 h-fit">
        <p className="mb-6">How would you like to improve the proposal?</p>

        <motion.div
          className="grid grid-cols-2 grid-rows-2 gap-5 min-[1920px]:grid-cols-1"
          variants={proposalContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {proposalImprovementOptions.map((option, index) => (
            <motion.div key={option.value} variants={proposalItemVariants}>
              <button
                type="button"
                disabled={disabled || isRefining}
                onClick={() =>
                  setSelectedImprovement(
                    selectedImprovement === option.value ? null : option.value
                  )
                }
                className={`p-5 rounded-2xl transition-all duration-200 ${option.bgColor} ${option.hoverColor} disabled:opacity-60 ${
                  selectedImprovement === option.value
                    ? "ring-2 ring-blue-600"
                    : ""
                } py-[24px] px-5 block w-full text-left`}
              >
                <span className="flex items-center align-middle gap-2 mb-3">
                  <option.icon size={16} />
                  <p className="font-medium">{option.title}</p>
                </span>
                <p className="font-thin text-sm">{option.description}</p>
              </button>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-6">
          <label
            htmlFor="proposal-custom-refine"
            className="block text-sm font-medium text-gray-900 mb-1"
          >
            Or describe your changes
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Same limits as Profile Optimizer ({REFINE_INSTRUCTION_MIN_CHARS}–
            {REFINE_INSTRUCTION_MAX_CHARS} characters). Proposal edits only — not
            code, general chat, or format tricks.
          </p>
          <textarea
            id="proposal-custom-refine"
            className="w-full p-3 border rounded-md transition duration-150 ease-in-out bg-gray-50 placeholder:text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm disabled:opacity-60"
            rows={4}
            style={{ maxHeight: "28em", resize: "vertical" }}
            placeholder="e.g. Make the hook more specific to their SaaS product and mention my 5 years of React experience..."
            value={customRefineInstruction}
            onChange={e => setCustomRefineInstruction(e.target.value)}
            disabled={disabled || isRefining}
            maxLength={REFINE_INSTRUCTION_MAX_CHARS}
          />
          <TextareaWordCounter
            value={customRefineInstruction}
            minChars={REFINE_INSTRUCTION_MIN_CHARS}
            maxChars={REFINE_INSTRUCTION_MAX_CHARS}
          />
          <div className="flex flex-wrap gap-2 mt-3">
            {PROPOSAL_REFINE_SUGGESTION_CHIPS.map(chip => (
              <button
                key={chip}
                type="button"
                disabled={disabled || isRefining}
                onClick={() => setCustomRefineInstruction(chip)}
                className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-60"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-1 flex flex-col h-full min-[1920px]:h-fit mt-auto">
        <div className="w-full">
          <Menu as="div" className="relative inline-block w-full">
            <p className="block text-sm mb-2">Proposal Tone</p>
            <MenuButton
              disabled={disabled || isRefining}
              className="capitalize inline-flex w-full gap-x-1.5 rounded-md px-3 py-4 text-sm text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset bg-gray-50 duration-200 transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60"
            >
              {toneLabel}
              <ChevronDownIcon
                aria-hidden="true"
                className="ml-auto size-5 text-gray-400"
              />
            </MenuButton>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0"
            >
              <div className="py-1">
                {proposalToneOptions.map(t => (
                  <MenuItem key={t.value}>
                    <button
                      type="button"
                      onClick={() => setTone(t.value)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100"
                    >
                      {t.label}
                    </button>
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>
        </div>

        <CustomButton
          type="button"
          onClick={handleRefine}
          disabled={disabled || !canRefine}
          isLoading={isRefining}
          className="btn-primary mt-auto min-[1920px]:mt-10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Refine proposal
        </CustomButton>
      </div>
    </div>
  );
};

export default ProposalRefinePanel;
