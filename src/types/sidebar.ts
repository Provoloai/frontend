import { ReactNode } from "react";

export interface Badge {
  text: string;
  color: "green" | "blue";
}

export interface NavigationItem {
  to: string;
  icon: ReactNode;
  label: string;
  badge?: Badge;
  external?: boolean;
}

export interface ProposalHistoryItem {
  id: string;
  jobTitle: string;
}

export interface OptimizerHistoryItem {
  id: string;
  originalInput: string;
}

