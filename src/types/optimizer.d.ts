// Types for the Portfolio Optimizer component

export interface OptimizerFormData {
  freelancerName: string;
  profileTitle: string;
  profileDescription: string;
}

export interface OptimizerTouchedFields {
  name: boolean;
  title: boolean;
  description: boolean;
}

export interface OptimizerResults {
  fullAnalysis?: string;
  weaknessesAndOptimization: string;
  optimizedProfileOverview: string;
  suggestedProjectTitles: string;
  recommendedVisuals: string;
  beforeAfterComparison: string;
}

export interface AccordionSection {
  title: string;
  content: string;
}

export type OptimizerTargetSection =
  | "all"
  | "weaknessesAndOptimization"
  | "optimizedProfileOverview"
  | "suggestedProjectTitles"
  | "recommendedVisuals"
  | "beforeAfterComparison";

export interface OptimizerVersion {
  id: string;
  versionNumber: number;
  refinementLabel?: string;
  userInstruction?: string;
  targetSection?: OptimizerTargetSection;
  createdAt: string;
  response: OptimizerResults;
}

export interface OptimizerWorkspaceState {
  rootRecordId: string | null;
  versions: OptimizerVersion[];
  currentVersionIndex: number;
  unlimitedRefine: boolean;
  refinementsRemaining: number;
}
