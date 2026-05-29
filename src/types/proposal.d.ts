import type { LucideIcon } from "lucide-react";

export type ProposalTone = "conversational" | "professional" | "confident" | "calm";

export interface ProposalToneOption {
  value: ProposalTone;
  label: string;
}

export type RoleFitLevel = "strong" | "moderate" | "weak";

export interface RoleFitAssessment {
  fitLevel: RoleFitLevel;
  fitScore: number;
  summary: string;
  strengths: string[];
  gaps: string[];
  recommendation: string;
}

export interface ProposalData {
  hook: string;
  solution: string;
  keyPoints: string[];
  portfolioLink: string;
  availability: string;
  support: string;
  closing: string;
  mdx: string;
  proposalId?: string;
  roleFit?: RoleFitAssessment;
}

export interface ImprovementOption {
  icon: LucideIcon;
  title: string;
  description: string;
  bgColor: string;
  hoverColor: string;
  value: string;
}
