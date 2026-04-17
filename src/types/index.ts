export interface ResumeListItem {
  id: string;
  name: string;
  jobTitle: string;
  lastModified: string;
}

export interface Resume {
  id?: string;
  userId?: string;
  title: string;
  template: string;
  content: ResumeContent;
  sectionOrder?: string[]; // Custom section arrangement
  createdAt?: string | { _seconds: number; _nanoseconds: number };
  updatedAt?: string | { _seconds: number; _nanoseconds: number };
}

export interface ResumeContent {
  personalInfo: PersonalInfo;
  education?: Education[];
  experience?: Experience[];
  skills?: Skill[];
  projects?: Project[];
  languages?: Language[];
  certifications?: Certification[];
  courses?: Course[];
  internships?: Internship[];
  hobbies?: Hobby[];
  references?: Reference[];
  [key: string]: unknown;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  jobTitle: string;
  linkedinUrl: string;
  summary?: string;
}

export interface Experience {
  id?: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  location: string;
}

export interface Education {
  id?: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface Skill {
  id?: string;
  name: string;
  level: SkillLevel;
}

export interface Course {
  id?: string;
  name: string;
  institution: string;
  completionDate: string;
  description: string;
}

export interface Internship {
  id?: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  location: string;
}

export interface Hobby {
  id?: string;
  name: string;
  description: string;
}

export type LanguageProficiency =
  | "Basic"
  | "Beginner"
  | "Conversational"
  | "Intermediate"
  | "Fluent"
  | "Advanced"
  | "Native";

export interface Language {
  id?: string;
  name: string;
  proficiency: LanguageProficiency;
}

export interface Reference {
  id?: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  link: string;
  technologies: string[];
  startDate: string;
  endDate: string;
}

export interface Certification {
  id?: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

// Device Tracking Types
export interface DeviceSession {
  id: string;
  device: string;
  browser: string;
  os: string;
  ip: string;
  userAgent?: string;
  timestamp: string; // ISO Date from backend
  isCurrent?: boolean;
}

// Notification Types
export enum NotificationCategory {
  SYSTEM = "system",
  USER = "user",
  PROMOTION = "promotion",
  ADMIN = "admin",
  OTHER = "other",
  PROFILE = "profile",
  PROPOSAL = "proposal",
  KNOWLEDGE = "knowledge",
  COMMUNITY = "community",
  ACHIEVEMENT = "achievement",
  SUBSCRIPTION = "subscription",
  RESEARCH = "research",
}

export interface FirebaseTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface BackendNotification {
  id: string;
  recipient: string;
  title: string;
  message: string;
  read: boolean;
  category: NotificationCategory;
  createdAt: string | FirebaseTimestamp;
}

export interface NotificationsResponse {
  title: string;
  message: string;
  status: string;
  data: {
    notifications: BackendNotification[];
    lastVisibleId: string;
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
    remainingPages: number;
  };
}

export interface SaveResumeRequest {
  resumeId?: string;
  title?: string;
  template?: string;
  content: ResumeContent;
  sectionOrder?: string[];
  latex?: string;
  html?: string;
}

// Resume API Response Types
export interface CreateResumeResponse {
  success?: boolean;
  status?: string;
  data?: {
    id?: string;
    resumeId?: string;
    [key: string]: any;
  };
  error?: string;
}

export interface GetResumesResponse {
  success?: boolean;
  status?: string;
  message: string;
  data: Resume[];
}

export interface DeleteResumeResponse {
  success?: boolean;
  status?: string;
  message: string;
}

export interface ImportResumePdfData {
  title: string;
  rawText: string;
  detectedSections: string[];
  content: ResumeContent;
}

export interface ImportResumePdfResponse {
  success?: boolean;
  status?: string;
  message: string;
  data: ImportResumePdfData;
}
