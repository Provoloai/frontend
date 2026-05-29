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

export interface OptimizerHistoryOriginalInput {
  fullName?: string;
  professionalTitle?: string;
  content?: string;
}

export interface OptimizerHistoryVersionEntry {
  id: string;
  versionNumber: number;
  refinementLabel?: string;
  userInstruction?: string;
  targetSection?: string;
  createdAt: string | Date | { _seconds: number; _nanoseconds?: number };
  response: OptimizerResults;
}

/** Single optimizer history record from GET /ai/optimizer-history/:id */
export interface OptimizerHistoryDetailRecord {
  id: string;
  parentRecordId?: string;
  versionNumber?: number;
  response?: Record<string, unknown>;
  originalInput?: OptimizerHistoryOriginalInput;
  versions?: OptimizerHistoryVersionEntry[];
}

export interface ApiSuccessResponse<T> {
  success?: boolean;
  message?: string;
  data: T;
}
