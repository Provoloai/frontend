import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Resume, ResumeListItem } from "@/types";
import { resumeApi } from "@/api";

interface ResumeStore {
  currentResumeId: string | null;
  resumes: Resume[];
  createNewResume: () => string;
  loadResume: (id: string) => Resume | null;
  saveCurrentResume: (id: string, data: Resume) => void;
  deleteResume: (id: string) => Promise<void>;
  getAllResumes: () => ResumeListItem[];
  setCurrentResumeId: (id: string | null) => void;
  fetchResumes: () => Promise<void>;
  syncResume: (id: string, data: Resume) => Promise<void>;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      currentResumeId: null,
      resumes: [],

      fetchResumes: async () => {
        try {
          const response = await resumeApi.getResumes();
          if (
            (response.success || response.status === "success") &&
            response.data
          ) {
            const fetchedResumes: Resume[] = response.data.map((r: any) => ({
              id: r.id,
              userId: r.userId,
              title: r.title || "Untitled Resume",
              template: r.template || "default",
              content: r.content || {},
              createdAt: r.createdAt,
              updatedAt: r.updatedAt,
            }));

            set({ resumes: fetchedResumes });
          }
        } catch (error) {
          console.error("Failed to fetch resumes:", error);
        }
      },

      syncResume: async (id: string, data: Resume) => {
        try {
          const isTempId = id.startsWith("resume_");

          if (isTempId) {
            // Create new resume
            const { id: _, ...payload } = data;
            const response = await resumeApi.createResume(payload);

            if (
              response.success &&
              (response.data?.id || response.data?.resumeId)
            ) {
              const newBackendId =
                response.data.id || response.data.resumeId || "";
              const updatedResume = { ...data, id: newBackendId };

              set(state => ({
                resumes: state.resumes.map(r =>
                  r.id === id ? updatedResume : r
                ),
                currentResumeId:
                  state.currentResumeId === id
                    ? newBackendId
                    : state.currentResumeId,
              }));
            }
          } else {
            // Update existing resume
            const { id: _, ...rest } = data;
            await resumeApi.createResume({ ...rest, resumeId: id } as any);

            // Update local state to match
            set(state => ({
              resumes: state.resumes.map(r => (r.id === id ? data : r)),
            }));
          }
        } catch (error) {
          console.error("Failed to sync resume:", error);
        }
      },

      createNewResume: () => {
        const newId = `resume_${Date.now()}`;

        const newResume: Resume = {
          id: newId,
          title: "Untitled Resume",
          template: "default",
          content: {
            personalInfo: {
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              city: "",
              country: "",
              jobTitle: "",
              linkedinUrl: "",
              summary: "",
            },
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
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set(state => ({
          resumes: [newResume, ...state.resumes],
          currentResumeId: newId,
        }));

        return newId;
      },

      loadResume: (id: string) => {
        const resume = get().resumes.find(r => r.id === id);
        if (resume) {
          return resume;
        }
        return null;
      },

      saveCurrentResume: (id: string, data: Resume) => {
        const name =
          data.content?.personalInfo?.firstName &&
          data.content?.personalInfo?.lastName
            ? `${data.content.personalInfo.firstName} ${data.content.personalInfo.lastName}`
            : "Untitled Resume";

        const updatedData = {
          ...data,
          title: name,
          updatedAt: new Date().toISOString(),
        };

        set(state => ({
          resumes: state.resumes.map(resume =>
            resume.id === id ? updatedData : resume
          ),
        }));
      },

      deleteResume: async (id: string) => {
        try {
          if (!id.startsWith("resume_")) {
            await resumeApi.deleteResume(id);
          }

          set(state => ({
            resumes: state.resumes.filter(r => r.id !== id),
            currentResumeId:
              state.currentResumeId === id ? null : state.currentResumeId,
          }));
        } catch (error) {
          console.error("Failed to delete resume:", error);
        }
      },

      getAllResumes: () => {
        // Map the full Resume objects to the lightweight list item format
        return get().resumes.map(r => ({
          id: r.id || "",
          name: r.title || "Untitled Resume",
          jobTitle: r.content.personalInfo?.jobTitle || "",
          lastModified:
            typeof r.updatedAt === "string"
              ? r.updatedAt
              : new Date(
                  ((r.updatedAt as any)?._seconds || 0) * 1000
                ).toISOString(),
        }));
      },

      setCurrentResumeId: (id: string | null) => {
        set({ currentResumeId: id });
      },
    }),
    {
      name: "resume-storage",
      partialize: state => ({
        resumes: state.resumes,
        currentResumeId: state.currentResumeId,
      }),
    }
  )
);
