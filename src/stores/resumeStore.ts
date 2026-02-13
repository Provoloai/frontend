import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Simple resume list item for the dashboard
export interface ResumeListItem {
  id: string;
  name: string;
  jobTitle: string;
  lastModified: string;
}

// Properly typed structures
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  jobTitle: string;
  linkedinUrl: string;
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
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

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

export type LanguageProficiency = 'Basic' | 'Conversational' | 'Fluent' | 'Native';

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

// Complete resume data structure
export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  courses: Course[];
  internships: Internship[];
  hobbies: Hobby[];
  languages: Language[];
  references: Reference[];
  projects: Project[];
  certifications: Certification[];
}

// Backend API payload structure
export interface BackendResumePayload {
  resumeId?: string;
  title: string;
  template: string;
  content: {
    personalInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address?: string;
      city: string;
      country: string;
      summary: string;
      jobTitle: string;
      links?: Record<string, string>;
    };
    education: Array<{
      institution: string;
      degree: string;
      fieldOfStudy: string;
      startDate: string;
      endDate: string;
      current: boolean;
      description: string;
    }>;
    experience: Array<{
      company: string;
      position: string;
      startDate: string;
      endDate: string;
      current: boolean;
      description: string;
      location: string;
    }>;
    skills: Array<{
      name: string;
      level: SkillLevel;
    }>;
    projects: Array<{
      title: string;
      description: string;
      link: string;
      technologies: string[];
      startDate: string;
      endDate: string;
    }>;
    languages: Array<{
      name: string;
      level: LanguageProficiency;
    }>;
    certifications: Certification[];
    [key: string]: unknown;
  };
}

interface ResumeStore {
  currentResumeId: string | null;
  resumes: ResumeListItem[];
  createNewResume: () => string;
  loadResume: (id: string) => ResumeData | null;
  saveCurrentResume: (id: string, data: ResumeData) => void;
  deleteResume: (id: string) => void;
  getAllResumes: () => ResumeListItem[];
  setCurrentResumeId: (id: string | null) => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      currentResumeId: null,
      resumes: [],

      createNewResume: () => {
        const newId = `resume_${Date.now()}`;
        const newResume: ResumeListItem = {
          id: newId,
          name: 'Untitled Resume',
          jobTitle: '',
          lastModified: new Date().toISOString(),
        };

        set((state) => ({
          resumes: [newResume, ...state.resumes],
          currentResumeId: newId,
        }));

        const emptyData: ResumeData = {
          personalInfo: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            city: '',
            country: '',
            jobTitle: '',
            linkedinUrl: '',
          },
          summary: '',
          experience: [],
          education: [],
          skills: [],
          courses: [],
          internships: [],
          hobbies: [],
          languages: [],
          references: [],
          projects: [],
          certifications: [],
        };
        localStorage.setItem(`resume_data_${newId}`, JSON.stringify(emptyData));

        return newId;
      },

      loadResume: (id: string) => {
        const data = localStorage.getItem(`resume_data_${id}`);
        if (data) {
          set({ currentResumeId: id });
          return JSON.parse(data) as ResumeData;
        }
        return null;
      },

      saveCurrentResume: (id: string, data: ResumeData) => {
        localStorage.setItem(`resume_data_${id}`, JSON.stringify(data));

        const name =
          data.personalInfo.firstName && data.personalInfo.lastName
            ? `${data.personalInfo.firstName} ${data.personalInfo.lastName}`
            : 'Untitled Resume';

        set((state) => ({
          resumes: state.resumes.map((resume) =>
            resume.id === id
              ? {
                  ...resume,
                  name,
                  jobTitle: data.personalInfo.jobTitle || '',
                  lastModified: new Date().toISOString(),
                }
              : resume
          ),
        }));
      },

      deleteResume: (id: string) => {
        localStorage.removeItem(`resume_data_${id}`);

        set((state) => ({
          resumes: state.resumes.filter((r) => r.id !== id),
          currentResumeId: state.currentResumeId === id ? null : state.currentResumeId,
        }));
      },

      getAllResumes: () => {
        return get().resumes;
      },

      setCurrentResumeId: (id: string | null) => {
        set({ currentResumeId: id });
      },
    }),
    {
      name: 'resume-storage',
      partialize: (state) => ({
        resumes: state.resumes,
        currentResumeId: state.currentResumeId,
      }),
    }
  )
);

// Helper function to transform ResumeData to BackendResumePayload
export const transformToBackendPayload = (
  data: ResumeData,
  resumeId?: string
): BackendResumePayload => {
  const links: Record<string, string> = {};

  if (data.personalInfo?.linkedinUrl) {
    links.linkedin = data.personalInfo.linkedinUrl;
  }

  const additionalSections: Record<string, unknown> = {};

  if ((data.courses ?? []).length > 0) {
    additionalSections.courses = (data.courses ?? []).map(course => ({ ...course }));
  }

  if ((data.internships ?? []).length > 0) {
    additionalSections.internships = (data.internships ?? []).map(internship => ({ ...internship }));
  }

  if ((data.hobbies ?? []).length > 0) {
    additionalSections.hobbies = (data.hobbies ?? []).map(hobby => ({ ...hobby }));
  }

  if ((data.references ?? []).length > 0) {
    additionalSections.references = (data.references ?? []).map(ref => ({ ...ref }));
  }

  return {
    resumeId,
    title:
      `${data.personalInfo?.firstName ?? ''} ${data.personalInfo?.lastName ?? ''} - ${data.personalInfo?.jobTitle ?? ''}`.trim() ||
      'Untitled Resume',
    template: 'default',
    content: {
      personalInfo: {
        firstName: data.personalInfo?.firstName ?? '',
        lastName: data.personalInfo?.lastName ?? '',
        email: data.personalInfo?.email ?? '',
        phone: data.personalInfo?.phone ?? '',
        city: data.personalInfo?.city ?? '',
        country: data.personalInfo?.country ?? '',
        summary: data.summary ?? '',
        jobTitle: data.personalInfo?.jobTitle ?? '',
        links: Object.keys(links).length > 0 ? links : undefined,
      },
      education: (data.education ?? []).map(edu => ({
        ...edu,
        fieldOfStudy: edu.fieldOfStudy || '',
      })),
      experience: (data.experience ?? []).map(exp => ({ ...exp })),
      skills: (data.skills ?? []).map(skill => ({ ...skill })),
      projects: (data.projects ?? []).map(project => ({ ...project })),
      languages: (data.languages ?? []).map(({ name, proficiency }) => ({
        name,
        level: proficiency,
      })),
      certifications: (data.certifications ?? []).map(cert => ({ ...cert })),
      additionalProp1:
        Object.keys(additionalSections).length > 0 ? additionalSections : {},
    },
  };
};
