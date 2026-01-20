// store/resumeStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ResumeStore, PersonalInfo, Experience, Education, Skill } from '../types/resume';

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
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

      setPersonalInfo: (info: Partial<PersonalInfo>) =>
        set((state) => ({
          personalInfo: { ...state.personalInfo, ...info },
        })),

      setSummary: (summary: string) => set({ summary }),

      addExperience: () =>
        set((state) => ({
          experience: [
            ...state.experience,
            {
              id: Date.now().toString(),
              jobTitle: '',
              employer: '',
              city: '',
              country: '',
              startDate: '',
              endDate: '',
              currentlyWorking: false,
              description: '',
            },
          ],
        })),

      updateExperience: (id: string, data: Partial<Experience>) =>
        set((state) => ({
          experience: state.experience.map((exp) =>
            exp.id === id ? { ...exp, ...data } : exp
          ),
        })),

      removeExperience: (id: string) =>
        set((state) => ({
          experience: state.experience.filter((exp) => exp.id !== id),
        })),

      addEducation: () =>
        set((state) => ({
          education: [
            ...state.education,
            {
              id: Date.now().toString(),
              degree: '',
              school: '',
              city: '',
              country: '',
              startDate: '',
              endDate: '',
              currentlyStudying: false,
              description: '',
            },
          ],
        })),

      updateEducation: (id: string, data: Partial<Education>) =>
        set((state) => ({
          education: state.education.map((edu) =>
            edu.id === id ? { ...edu, ...data } : edu
          ),
        })),

      removeEducation: (id: string) =>
        set((state) => ({
          education: state.education.filter((edu) => edu.id !== id),
        })),

      addSkill: () =>
        set((state) => ({
          skills: [
            ...state.skills,
            {
              id: Date.now().toString(),
              name: '',
              level: 3,
            },
          ],
        })),

      updateSkill: (id: string, data: Partial<Skill>) =>
        set((state) => ({
          skills: state.skills.map((skill) =>
            skill.id === id ? { ...skill, ...data } : skill
          ),
        })),

      removeSkill: (id: string) =>
        set((state) => ({
          skills: state.skills.filter((skill) => skill.id !== id),
        })),

      resetResume: () =>
        set({
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
        }),

      loadFromJSON: (data: any) =>
        set({
          personalInfo: data.personalInfo || {},
          summary: data.summary || '',
          experience: data.experience || [],
          education: data.education || [],
          skills: data.skills || [],
        }),
    }),
    {
      name: 'resume-storage', // localStorage key
    }
  )
);