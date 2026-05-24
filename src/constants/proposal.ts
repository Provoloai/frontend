import {
  FilePlus,
  PenLine,
  Scissors,
  Workflow,
} from "lucide-react";
import type { ProposalToneOption, ImprovementOption } from "@/types/proposal";

export {
  REFINE_INSTRUCTION_MIN_CHARS,
  REFINE_INSTRUCTION_MAX_CHARS,
} from "@/constants/optimizer";

// Proposal tone options for dropdowns
export const proposalToneOptions: ProposalToneOption[] = [
  { value: "conversational", label: "Conversational" },
  { value: "professional", label: "Professional" },
  { value: "confident", label: "Confident" },
  { value: "calm", label: "Calm" },
];

export const PROPOSAL_REFINE_SUGGESTION_CHIPS = [
  "Make the opening more personal",
  "Shorten it and get to the point faster",
  "Emphasize my relevant experience more",
  "Sound warmer and less formal",
] as const;

export const proposalImprovementOptions: ImprovementOption[] = [
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
];
