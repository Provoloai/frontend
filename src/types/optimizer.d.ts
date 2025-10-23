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
  fullAnalysis: string;
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

export interface OptimizerState {
  formData: OptimizerFormData;
  results: OptimizerResults | null;
  isLoading: boolean;
  error: string;
  touched: OptimizerTouchedFields;
}
