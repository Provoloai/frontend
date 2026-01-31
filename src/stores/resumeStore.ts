import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Simple resume list item for the dashboard
export interface ResumeListItem {
  id: string;
  name: string; // User's full name
  jobTitle: string; // Professional title
  lastModified: string;
}

// Your existing resume structure
interface ResumeData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    country: string;
    professionalTitle: string;
    linkedinUrl: string;
  };
  summary: string;
  experience: any[];
  education: any[];
  skills: any[];
  courses: any[];
  internships: any[];
  hobbies: any[];
  languages: any[];
  references: any[];
}

interface ResumeStore {
  // Current resume being edited
  currentResumeId: string | null;
  
  // List of all resumes (for the dashboard)
  resumes: ResumeListItem[];
  
  // Actions
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

      // Create a new resume and return its ID
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

        // Initialize empty resume data in localStorage
        const emptyData: ResumeData = {
          personalInfo: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            city: '',
            country: '',
            professionalTitle: '',
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
        };
        localStorage.setItem(`resume_data_${newId}`, JSON.stringify(emptyData));

        return newId;
      },

      // Load resume data from localStorage
      loadResume: (id: string) => {
        const data = localStorage.getItem(`resume_data_${id}`);
        if (data) {
          set({ currentResumeId: id });
          return JSON.parse(data);
        }
        return null;
      },

      // Save current resume data to localStorage
      saveCurrentResume: (id: string, data: ResumeData) => {
        // Save the full data
        localStorage.setItem(`resume_data_${id}`, JSON.stringify(data));

        // Update the resume list item
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
                  jobTitle: data.personalInfo.professionalTitle || '',
                  lastModified: new Date().toISOString(),
                }
              : resume
          ),
        }));
      },

      // Delete a resume
      deleteResume: (id: string) => {
        // Remove from localStorage
        localStorage.removeItem(`resume_data_${id}`);

        // Remove from list
        set((state) => ({
          resumes: state.resumes.filter((r) => r.id !== id),
          currentResumeId: state.currentResumeId === id ? null : state.currentResumeId,
        }));
      },

      // Get all resumes
      getAllResumes: () => {
        return get().resumes;
      },

      // Set current resume ID
      setCurrentResumeId: (id: string | null) => {
        set({ currentResumeId: id });
      },
    }),
    {
      name: 'resume-storage',
      // Only persist the resume list, not the full data
      partialize: (state) => ({
        resumes: state.resumes,
        currentResumeId: state.currentResumeId,
      }),
    }
  )
);