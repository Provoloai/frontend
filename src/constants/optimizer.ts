import type { OptimizerTargetSection } from "@/types/optimizer";

export const PROFILE_DESCRIPTION_MIN_CHARS = 50;
export const PROFILE_DESCRIPTION_MAX_CHARS = 5000;

export const REFINE_INSTRUCTION_MIN_CHARS = 10;
export const REFINE_INSTRUCTION_MAX_CHARS = 500;

export const REFINE_SUGGESTION_CHIPS = [
  "Make it shorter and more direct",
  "More client-friendly tone",
  "Target a different role or niche",
  "Emphasize my mobile development experience",
] as const;

export const OPTIMIZER_TARGET_SECTION_OPTIONS: {
  value: OptimizerTargetSection;
  label: string;
}[] = [
  { value: "all", label: "Entire profile" },
  {
    value: "optimizedProfileOverview",
    label: "Optimized Profile Overview",
  },
  {
    value: "weaknessesAndOptimization",
    label: "Weaknesses and Optimization Ideas",
  },
  {
    value: "suggestedProjectTitles",
    label: "Suggested Project Titles",
  },
  {
    value: "recommendedVisuals",
    label: "Recommended Visuals",
  },
  {
    value: "beforeAfterComparison",
    label: "Before and After Comparison",
  },
];

export const OPTIMIZER_RESULT_SECTIONS = [
  {
    key: "weaknessesAndOptimization" as const,
    title: "Weaknesses and Optimization Ideas",
  },
  {
    key: "optimizedProfileOverview" as const,
    title: "Optimized Profile Overview",
  },
  {
    key: "suggestedProjectTitles" as const,
    title: "Suggested Project Titles and Layouts",
  },
  {
    key: "recommendedVisuals" as const,
    title: "Recommended Visuals/Layout Hierarchies",
  },
  {
    key: "beforeAfterComparison" as const,
    title: "Before and After Comparison",
  },
];

export function getRefinePlaceholder(targetSection: OptimizerTargetSection): string {
  if (targetSection === "all") {
    return "e.g. Make the overview shorter and more technical. Or: Rewrite for React Native Mobile Developer.";
  }
  const label =
    OPTIMIZER_TARGET_SECTION_OPTIONS.find((o) => o.value === targetSection)
      ?.label ?? "this section";
  return `Describe changes for ${label}…`;
}
