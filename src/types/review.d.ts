export interface ProfessionalSummary {
  text: string;
}

export interface ExperienceEntry {
  id: string;
  title: string;
  employmentType: string;
  company: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  currentlyWorking: boolean;
  location: string;
  description: string;
}

export interface SkillEntry {
  id: string;
  name: string;
}

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade: string;
  description: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuingOrganization: string;
  issueMonth: string;
  issueYear: string;
  expirationMonth: string;
  expirationYear: string;
  credentialId: string;
  credentialUrl: string;
}

export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  currentlyWorking: boolean;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  projectLink: string;
}

export interface ReviewProfileData {
  summary: ProfessionalSummary;
  experience: ExperienceEntry[];
  skills: SkillEntry[];
  education: EducationEntry[];
  certifications: CertificationEntry[];
  projects: ProjectEntry[];
}
