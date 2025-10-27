// Common types used throughout the application

export interface User {
  id: string;
  email: string;
  name?: string;
  displayName?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
  tierId?: string;
  polarId?: string;
  profileLink?: string;
}

export interface ProposalData {
  hook?: string;
  solution?: string;
  keyPoints?: string[];
  portfolioLink?: string;
  availability?: string;
  support?: string;
  closing?: string;
  mdx?: string;
}

export interface ProposalFormData {
  clientName: string;
  proposalTone: 'conversational' | 'professional' | 'confident' | 'calm';
  jobSummary: string;
}

export interface TouchedFields {
  name: boolean;
  title: boolean;
  description: boolean;
  tone: boolean;
  profileLink?: boolean;
}

export interface ImprovementOption {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  description: string;
  bgColor: string;
  hoverColor: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ErrorState {
  message: string;
  type?: 'error' | 'warning' | 'info';
}

// Environment variables
export interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string;
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
