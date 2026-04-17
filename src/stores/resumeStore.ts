import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Resume, ResumeListItem, SaveResumeRequest } from "@/types";
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
            const fetchedResumes: Resume[] = response.data.map((r: any) => {
              const content = r.content || {};

              // Helper to normalize dates
              const normalizeDate = (
                date: string | undefined,
                type: "month" | "date" = "date"
              ) => {
                if (!date) return "";
                const d = date.includes("T") ? date.split("T")[0] : date;
                // For month input, we want YYYY-MM
                if (type === "month") return d.slice(0, 7);
                // For date input, we want YYYY-MM-DD
                return d;
              };

              // Normalize Experience dates (type="month")
              if (content.experience) {
                content.experience = content.experience.map((exp: any) => ({
                  ...exp,
                  startDate: normalizeDate(exp.startDate, "month"),
                  endDate: normalizeDate(exp.endDate, "month"),
                }));
              }

              // Normalize Education dates (type="date")
              if (content.education) {
                content.education = content.education.map((edu: any) => ({
                  ...edu,
                  startDate: normalizeDate(edu.startDate, "month"),
                  endDate: normalizeDate(edu.endDate, "month"),
                }));
              }

              // Normalize Internships dates (type="date")
              if (content.internships) {
                content.internships = content.internships.map((int: any) => ({
                  ...int,
                  startDate: normalizeDate(int.startDate, "date"),
                  endDate: normalizeDate(int.endDate, "date"),
                }));
              }

              // Normalize Projects dates (type="date")
              if (content.projects) {
                content.projects = content.projects.map((proj: any) => ({
                  ...proj,
                  startDate: normalizeDate(proj.startDate, "date"),
                  endDate: normalizeDate(proj.endDate, "date"),
                }));
              }

              // Normalize Certifications dates (type="date")
              if (content.certifications) {
                content.certifications = content.certifications.map(
                  (cert: any) => ({
                    ...cert,
                    issueDate: normalizeDate(cert.issueDate, "date"),
                    expirationDate: normalizeDate(cert.expirationDate, "date"),
                  })
                );
              }

              // Normalize Courses dates (type="date")
              if (content.courses) {
                content.courses = content.courses.map((course: any) => ({
                  ...course,
                  completionDate: normalizeDate(course.completionDate, "date"),
                }));
              }

              return {
                id: r.id,
                userId: r.userId,
                title: r.title || "Untitled Resume",
                template: r.template || "default",
                content,
                createdAt: r.createdAt,
                updatedAt: r.updatedAt,
              };
            });

            set({ resumes: fetchedResumes });
          }
        } catch (error) {
          console.error("Failed to fetch resumes:", error);
        }
      },

      syncResume: async (id: string, data: Resume | SaveResumeRequest) => {
        const isTempId = id.startsWith("resume_");

        // Convert SaveResumeRequest to Partial<Resume> for local update
        // We only update fields that are present in Resume interface
        const localUpdate: Partial<Resume> = {
          content: data.content,
          title: data.title,
          template: data.template,
        };
        const safeData = data as Resume & SaveResumeRequest;
        if (safeData.id) localUpdate.id = safeData.id;
        if (safeData.userId) localUpdate.userId = safeData.userId;

        // Optimistically update local state (excluding latex/html which are invalid for Resume type)
        set(state => ({
          resumes: state.resumes.map(r =>
            r.id === id
              ? { ...r, ...localUpdate, updatedAt: new Date().toISOString() }
              : r
          ),
        }));

        // Send to backend (including latex/html if present in data)
        const response = await resumeApi.createResume({
          ...data,
          resumeId: isTempId ? undefined : id,
        });

        const isSuccess =
          response.success === true || response.status === "success";
        if (isSuccess && response.data) {
          const newId = response.data.id || response.data.resumeId;
          if (newId && newId !== id) {
            set(state => ({
              currentResumeId: newId,
              resumes: state.resumes.reduce<Resume[]>((acc, r) => {
                if (r.id === id) {
                  acc.push({ ...r, id: newId });
                  return acc;
                }

                // Guard against accidental duplicates when the new id
                // already exists in state for any reason.
                if (r.id === newId) {
                  return acc;
                }

                acc.push(r);
                return acc;
              }, []),
            }));
          }
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
