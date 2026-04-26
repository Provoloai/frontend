export interface AccountField {
  displayName: string;
  email: string;
  professionalTitle: string;
  portfolioLink: string;
  tierId: string;
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  location: string;
}

export interface Skill {
  name: string;
  level: string; // e.g. "Beginner", "Intermediate", "Expert"
}

export interface Project {
  title: string;
  description: string;
  link: string;
  technologies: string[];
  startDate: string;
  endDate: string;
}

export interface Certification {
  name: string;
  issuer: string;
  issueDate: string;
}

export interface KnowledgeSection {
  professionalSummary: string;
  location: string;
  experienceYears: number;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
}

export interface RecentOptimization {
  id: string;
  optimizerType: string;
  createdAt: string;
  updatedAt: string;
  originalInputPreview: string;
  optimizedOverviewPreview: string;
}

export interface RecentProposal {
  id: string;
  clientName: string;
  jobTitle: string;
  proposalTone: string;
  jobSummary: string;
  createdAt: string;
  updatedAt: string;
  textPreview: string;
}

export interface EnrichmentSection {
  recentOptimizations: RecentOptimization[];
  recentProposals: RecentProposal[];
}

export interface MetaSection {
  hasResume: boolean;
  latestResumeId: string;
  profileCompletionPercent: number;
}

export interface KnowledgeBaseData {
  account: AccountField;
  knowledge: KnowledgeSection;
  enrichment: EnrichmentSection;
  meta: MetaSection;
}

export interface KnowledgeBaseResponse {
  title: string;
  message: string;
  status: "success" | "error";
  data: KnowledgeBaseData;
}

export interface ImportKnowledgeBasePayload {
  source: "resume" | "optimizer" | "all";
  resumeId?: string;
  overwrite?: boolean;
}

export interface ImportKnowledgeBaseResponse {
  title: string;
  message: string;
  status: "success" | "error";
  data: {
    knowledge: KnowledgeSection;
  };
}

export type KnowledgeBasePatchPayload = Partial<KnowledgeSection>;
export type KnowledgeBaseManualUpdatePayload = Partial<KnowledgeSection>;
