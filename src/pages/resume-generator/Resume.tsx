import { motion, AnimatePresence } from "motion/react";
import { ResumeEditor } from "@/components/resumeBuilder/ResumeEditor";
import { LinkedInImportModal } from "@/components/resumeBuilder/LinkedInImportModal";
import CustomButton from "@/Reusables/CustomButton";
import { useResumeStore } from "@/stores/resumeStore";
import { resumeApi } from "@/api";
import {
  FileText,
  ChevronRight,
  Upload,
  Linkedin,
  Loader2,
  X,
  Plus,
  Edit,
  Trash2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { useEffect, useState } from "react";
import CustomSnackbar from "@/Reusables/CustomSnackbar";
import type {
  Certification,
  Course,
  Education,
  Experience,
  Hobby,
  ImportResumePdfData,
  Internship,
  Language,
  Project,
  Reference,
  Resume as ResumeType,
  Skill,
} from "@/types";

interface LinkedInExperienceData {
  position?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  location?: string;
  current?: boolean;
}

interface LinkedInEducationData {
  institution?: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  location?: string;
  current?: boolean;
}

interface LinkedInImportData {
  firstName?: string;
  lastName?: string;
  headline?: string;
  summary?: string;
  username?: string;
  email?: string;
  country?: string;
  locationName?: string;
  experience?: LinkedInExperienceData[];
  education?: LinkedInEducationData[];
  raw?: Record<string, unknown>;
}

function ensureArrayItemIds<T extends { id?: string }>(
  items: T[] | undefined
): T[] {
  return (items ?? []).map(item => ({
    ...item,
    id: item.id ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  }));
}

function buildImportedResume(
  baseResume: ResumeType,
  importedResume: ImportResumePdfData
): ResumeType {
  const personalInfo = importedResume.content.personalInfo;

  return {
    ...baseResume,
    title:
      importedResume.title ||
      `${personalInfo.firstName || ""} ${personalInfo.lastName || ""}`.trim() ||
      baseResume.title,
    content: {
      ...baseResume.content,
      ...importedResume.content,
      personalInfo: {
        ...baseResume.content.personalInfo,
        ...personalInfo,
      },
      experience: ensureArrayItemIds(
        importedResume.content.experience as Experience[] | undefined
      ),
      education: ensureArrayItemIds(
        importedResume.content.education as Education[] | undefined
      ),
      skills: ensureArrayItemIds(
        importedResume.content.skills as Skill[] | undefined
      ),
      languages: ensureArrayItemIds(
        importedResume.content.languages as Language[] | undefined
      ),
      courses: ensureArrayItemIds(
        baseResume.content.courses as Course[] | undefined
      ),
      internships: ensureArrayItemIds(
        baseResume.content.internships as Internship[] | undefined
      ),
      hobbies: ensureArrayItemIds(
        baseResume.content.hobbies as Hobby[] | undefined
      ),
      references: ensureArrayItemIds(
        baseResume.content.references as Reference[] | undefined
      ),
      projects: ensureArrayItemIds(
        importedResume.content.projects as Project[] | undefined
      ),
      certifications: ensureArrayItemIds(
        importedResume.content.certifications as Certification[] | undefined
      ),
    },
  };
}

export const Resume: React.FC = () => {
  const [step, setStep] = useState<"method" | "builder">("method");
  const [showModal, setShowModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [resumeToDeleteId, setResumeToDeleteId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [isImportingPdf, setIsImportingPdf] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    color: "primary" | "neutral" | "danger" | "success" | "warning";
  }>({
    open: false,
    message: "",
    color: "success",
  });

  const {
    getAllResumes,
    createNewResume,
    setCurrentResumeId,
    deleteResume,
    fetchResumes,
  } = useResumeStore();

  const resumes = getAllResumes();
  const isImportBusy = isImportingPdf;

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const handleMethodSelect = (method: string) => {
    if (method === "manual") {
      createNewResume();
      setShowModal(false);
      setStep("builder");
    } else if (method === "linkedin") {
      setShowModal(false);
      setShowImportModal(true);
    }
  };

  const handleLinkedInImport = async (url: string) => {
    const response = await resumeApi.scrapeLinkedIn(url);

    // We assume data has { firstName, lastName, headline, summary, email, etc }
    const linkedInData = response.data as LinkedInImportData;

    const newId = createNewResume();
    const currentResume = getAllResumes().find(r => r.id === newId);

    if (currentResume) {
      // Find full resume from store
      const { resumes, saveCurrentResume, syncResume } =
        useResumeStore.getState();
      const fullResume = resumes.find(r => r.id === newId);

      if (fullResume) {
        const updatedContent: ResumeType["content"] & {
          metadata?: Record<string, unknown>;
        } = {
          ...fullResume.content,
          personalInfo: {
            ...fullResume.content.personalInfo,
            firstName: linkedInData.firstName || "",
            lastName: linkedInData.lastName || "",
            jobTitle: linkedInData.headline || "",
            summary: linkedInData.summary || "",
            linkedinUrl: `https://www.linkedin.com/in/${linkedInData.username}`,
            email: linkedInData.email || "",
            country: linkedInData.country || "",
            city: linkedInData.locationName?.split(",")[0] || "",
          },
          experience:
            linkedInData.experience?.map((exp: LinkedInExperienceData) => ({
              id: Date.now().toString() + Math.random(),
              position: exp.position || "",
              company: exp.company || "",
              startDate: exp.startDate || "",
              endDate: exp.endDate || "",
              description: exp.description || "",
              location: exp.location || "",
              current: exp.current || !exp.endDate,
            })) || [],
          education:
            linkedInData.education
              ?.filter(
                (edu: LinkedInEducationData) =>
                  edu.institution?.trim() ||
                  edu.degree?.trim() ||
                  edu.fieldOfStudy?.trim() ||
                  edu.description?.trim()
              )
              .map((edu: LinkedInEducationData) => ({
                id: Date.now().toString() + Math.random(),
                institution: edu.institution || "",
                degree: edu.degree || "",
                fieldOfStudy: edu.fieldOfStudy || "",
                startDate: edu.startDate || "",
                endDate: edu.endDate || "",
                description: edu.description || "",
                location: edu.location || "",
                current: edu.current || !edu.endDate,
              })) || [],
        };

        if (linkedInData.raw) {
          updatedContent.metadata = {
            ...updatedContent.metadata,
            scrapedData: linkedInData.raw,
          };
        }

        const finalResume = {
          ...fullResume,
          content: updatedContent,
          title: `${linkedInData.firstName || "Untitled"} ${linkedInData.lastName || "Resume"}`,
        };

        saveCurrentResume(newId, finalResume);
        await syncResume(newId, finalResume);
      }
    }

    setStep("builder");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";

    if (!file) return;

    if (file.type !== "application/pdf") {
      setUploadError("Please upload a PDF file");
      return;
    }

    const maxPdfBytes = 2 * 1024 * 1024;
    if (file.size > maxPdfBytes) {
      setUploadError("PDF must be 2MB or smaller");
      return;
    }

    setUploadError("");
    setIsImportingPdf(true);

    try {
      const response = await resumeApi.importResumePdf(file);
      const importedResume = response.data;
      const newId = createNewResume();
      const { resumes, saveCurrentResume, syncResume } =
        useResumeStore.getState();
      const baseResume = resumes.find(r => r.id === newId);

      if (!baseResume) {
        throw new Error("Failed to create a new resume draft for import");
      }

      const finalResume = buildImportedResume(baseResume, importedResume);
      saveCurrentResume(newId, finalResume);
      await syncResume(newId, finalResume);

      setShowModal(false);
      setStep("builder");
      setSnackbar({
        open: true,
        message:
          "Resume imported. Review the extracted fields before exporting.",
        color: "success",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to import and extract your resume PDF";
      setUploadError(message);
    } finally {
      setIsImportingPdf(false);
    }
  };

  const handleEditResume = (id: string) => {
    setCurrentResumeId(id);
    setStep("builder");
  };

  const handleDeleteResume = (id: string) => {
    setResumeToDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (resumeToDeleteId) {
      deleteResume(resumeToDeleteId);
      setShowDeleteModal(false);
      setResumeToDeleteId(null);
      setSnackbar({
        open: true,
        message: "Resume deleted forever",
        color: "danger",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  if (step === "builder") {
    return <ResumeEditor onBack={() => setStep("method")} />;
  }

  return (
    <div className="flex-1 h-screen bg-gray-50 overflow-y-auto pt-10">
      <div className="mx-auto p-6 sm:p-10 w-full">
        {/* Header - ALWAYS VISIBLE */}
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Resumes</h1>
            <p className="text-sm text-gray-600 mt-1">
              Create and manage your resumes
            </p>
          </div>
          {/* <div className="w-fit flex justify-end">
            <CustomButton
              onClick={() => setShowModal(true)}
              className="btn-primary flex items-center gap-2 w-fit h-fit my-auto"
            >
              <Plus size={15} />
            </CustomButton>
          </div> */}
        </div>

        <LinkedInImportModal
          isOpen={showImportModal}
          onClose={() => setShowImportModal(false)}
          onSubmit={handleLinkedInImport}
        />

        {/* Content Area - Hybrid Approach */}
        {resumes.length === 0 ? (
          /* Empty State - Original Design Restored */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg
              width="203"
              height="152"
              viewBox="0 0 203 152"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100.014 123.173C132.335 123.173 158.539 96.9689 158.539 64.5319C158.539 32.0948 132.22 5.89117 100.014 5.89117C67.6919 5.89117 41.4883 32.0948 41.4883 64.5319C41.4883 96.9689 67.6919 123.173 100.014 123.173Z"
                fill="#EAEEF9"
              />
              <path
                d="M165.968 45.9523C168.582 45.9523 170.701 43.8333 170.701 41.2194C170.701 38.6056 168.582 36.4866 165.968 36.4866C163.355 36.4866 161.236 38.6056 161.236 41.2194C161.236 43.8333 163.355 45.9523 165.968 45.9523Z"
                fill="#F1F3F9"
              />
              <path
                d="M172.894 27.4829C174.679 27.4829 176.126 26.0359 176.126 24.2508C176.126 22.4657 174.679 21.0186 172.894 21.0186C171.109 21.0186 169.662 22.4657 169.662 24.2508C169.662 26.0359 171.109 27.4829 172.894 27.4829Z"
                fill="#EAEEF9"
              />
              <path
                d="M44.1433 26.0921C45.9284 26.0921 47.3755 24.645 47.3755 22.8599C47.3755 21.0748 45.9284 19.6277 44.1433 19.6277C42.3582 19.6277 40.9111 21.0748 40.9111 22.8599C40.9111 24.645 42.3582 26.0921 44.1433 26.0921Z"
                fill="#EAEEF9"
              />
              <path
                d="M24.404 88.4269C27.7191 88.4269 30.4065 85.7395 30.4065 82.4243C30.4065 79.1092 27.7191 76.4218 24.404 76.4218C21.0888 76.4218 18.4014 79.1092 18.4014 82.4243C18.4014 85.7395 21.0888 88.4269 24.404 88.4269Z"
                fill="#EAEEF9"
              />
              <g filter="url(#filter0_d_567_20936)">
                <path
                  d="M83.96 95.8298L37.5702 105.346C36.8921 105.452 36.27 105.099 36.1648 104.421L22.0182 35.1722C21.913 34.4941 22.2654 33.872 22.9435 33.7668L69.3333 24.2502C70.0114 24.145 70.6335 24.4974 70.7387 25.1755L84.961 94.4211C85.063 95.0235 84.6382 95.7246 83.96 95.8298Z"
                  fill="url(#paint0_linear_567_20936)"
                />
              </g>
              <path
                d="M34.7841 68.5579L52.9355 64.8281"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M58.3458 63.7323L62.332 62.9135"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M67.1722 61.9141L71.1584 61.0953"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M35.7863 73.4695L53.9377 69.7398"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M59.3454 68.5722L63.3347 67.8251"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M68.1031 66.829L72.0893 66.0102"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M36.7858 78.3099L54.9372 74.5802"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M60.3477 73.4842L64.3339 72.6654"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M69.1021 71.6691L73.0883 70.8502"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M37.7854 83.1499L55.9399 79.4919"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M40.6029 96.8164L45.7267 95.7329"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M39.874 93.2572L48.9871 91.4266"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M67.8738 89.7476L76.9152 87.9202"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M61.3472 78.3243L65.3334 77.5055"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M70.1051 76.581L74.0912 75.7622"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M40.9174 42.2165C39.3546 42.5452 38.2644 43.8795 38.0842 45.506C38.0288 45.863 38.2858 46.1543 38.6262 46.2209C38.9666 46.2874 39.2374 46.0233 39.2929 45.6663C39.3968 44.6084 40.1815 43.6836 41.1817 43.4733C42.1819 43.2629 43.2587 43.7272 43.7938 44.7198C43.9883 45.0242 44.3426 45.1569 44.6274 44.9589C44.9121 44.7609 45.0301 44.3907 44.8355 44.0863C44.0016 42.604 42.4802 41.8879 40.9174 42.2165Z"
                fill="#989FB0"
              />
              <path
                d="M55.2597 39.2004C53.6969 39.529 52.6067 40.8634 52.4265 42.4898C52.371 42.8469 52.6281 43.1381 52.9685 43.2047C53.3089 43.2713 53.5797 43.0071 53.6352 42.6501C53.7391 41.5922 54.5238 40.6674 55.524 40.4571C56.5242 40.2468 57.6009 40.711 58.1361 41.7036C58.3306 42.0081 58.6849 42.1408 58.9697 41.9427C59.2544 41.7447 59.3724 41.3746 59.1778 41.0701C58.3439 39.5878 56.8225 38.8717 55.2597 39.2004Z"
                fill="#989FB0"
              />
              <path
                d="M45.7327 47.6407L46.6361 47.4437C47.7643 48.9448 49.916 49.1307 51.3325 47.9481C51.8973 47.5337 52.332 46.8565 52.4735 46.1705L53.3769 45.9734C53.0824 48.2944 50.8232 49.952 48.5565 49.5728C47.4926 49.368 46.4073 48.7312 45.7327 47.6407Z"
                fill="#989FB0"
              />
              <circle
                opacity="0.4"
                cx="60.2717"
                cy="47.7742"
                r="2.44265"
                transform="rotate(-11.8756 60.2717 47.7742)"
                fill="#D5DDEA"
              />
              <circle
                opacity="0.4"
                cx="39.7829"
                cy="52.0828"
                r="2.44265"
                transform="rotate(-11.8756 39.7829 52.0828)"
                fill="#D5DDEA"
              />
              <g filter="url(#filter1_d_567_20936)">
                <path
                  d="M128.134 115.487L76.954 118.484C76.2156 118.561 75.6459 117.983 75.5691 117.245L71.1116 40.967C71.0348 40.2286 71.6128 39.6588 72.3512 39.5821L123.531 36.5854C124.269 36.5087 124.839 37.0866 124.916 37.825L129.373 114.103C129.368 114.84 128.872 115.411 128.134 115.487Z"
                  fill="url(#paint1_linear_567_20936)"
                />
              </g>
              <path
                d="M93.5479 80.5991L118.127 79.1643"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M93.2998 76.1173L117.809 74.6821"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M93.7957 85.0806L118.375 83.6458"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M82.5602 90.1802L118.624 88.0573"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M82.8079 94.6618L103.425 93.409"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M83.6953 109.637L88.8072 109.324"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M83.5102 106.136L92.5437 105.571"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M110.61 104.509L119.573 104.013"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M90.087 86.0331C90.0169 86.0326 89.9468 86.032 89.9473 85.9621L88.7717 83.435L84.3558 83.6785L83.4986 86.3287C83.4981 86.3986 83.4276 86.468 83.3576 86.4674L82.4463 86.5298C82.3762 86.5293 82.3061 86.5287 82.3066 86.4588C82.2369 86.3883 82.2369 86.3883 82.3074 86.3189L85.4496 76.7646C85.45 76.6946 85.5205 76.6253 85.5906 76.6259L86.8522 76.5663C86.9223 76.5669 86.9924 76.5674 86.9919 76.6374L91.2798 85.7632C91.2794 85.8331 91.279 85.903 91.279 85.903C91.2785 85.973 91.2085 85.9724 91.1384 85.9718L90.087 86.0331ZM84.6434 82.492L88.2181 82.3116L86.1442 77.7492L84.6434 82.492Z"
                fill="#D5DDEA"
              />
              <path
                d="M107.31 53.5796C108.384 53.511 109.246 52.5317 109.178 51.4577C109.109 50.3837 108.13 49.522 107.056 49.5905C105.982 49.6591 105.12 50.6384 105.189 51.7124C105.262 52.8631 106.16 53.653 107.31 53.5796Z"
                fill="#989FB0"
              />
              <path
                d="M91.7976 54.594C92.8715 54.5255 93.7333 53.5461 93.6647 52.4722C93.5961 51.3982 92.6168 50.5364 91.5429 50.605C90.4689 50.6736 89.6071 51.6529 89.6757 52.7269C89.8259 53.8727 90.7236 54.6626 91.7976 54.594Z"
                fill="#989FB0"
              />
              <path
                d="M96.3735 58.1779C96.5612 59.9518 98.0368 61.287 99.7461 61.1907C101.455 61.0944 102.772 59.6019 102.759 57.8182L96.3735 58.1779Z"
                fill="#989FB0"
              />
              <circle
                opacity="0.4"
                cx="111.439"
                cy="60.2875"
                r="2.64249"
                transform="rotate(-3.22458 111.439 60.2875)"
                fill="#D5DDEA"
              />
              <circle
                opacity="0.4"
                cx="88.8245"
                cy="61.5615"
                r="2.64249"
                transform="rotate(-3.22458 88.8245 61.5615)"
                fill="#D5DDEA"
              />
              <g filter="url(#filter2_d_567_20936)">
                <path
                  d="M179.437 81.9481L133.524 93.4395C132.863 93.6212 132.216 93.2258 132.034 92.5641L114.888 24.0255C114.707 23.3638 115.102 22.7172 115.764 22.5356L161.677 11.0442C162.338 10.8625 162.985 11.2578 163.167 11.9196L180.313 80.4582C180.494 81.1199 180.099 81.7665 179.437 81.9481Z"
                  fill="url(#paint2_linear_567_20936)"
                />
              </g>
              <path
                d="M127.128 51.8067L132.819 74.5153L169.972 65.2044L164.281 42.4958L127.128 51.8067Z"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M135.435 84.7559L140.665 83.473"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M134.479 81.1496L143.755 78.8154"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M163.227 76.2535L172.504 73.9194"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M136.205 49.6084L141.884 72.3046"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M145.689 47.1922L151.436 69.861"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M155.268 44.8173L160.946 67.5135"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M128.61 57.5725L165.716 48.2358"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M129.988 63.243L167.122 53.9752"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M131.463 68.955L168.569 59.6183"
                stroke="#D5DDEA"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M134.037 27.671C132.174 28.1214 130.915 29.7611 130.757 31.7185C130.703 32.1487 131.022 32.4889 131.433 32.5565C131.843 32.6241 132.159 32.2975 132.212 31.8673C132.299 30.5946 133.207 29.4572 134.399 29.1689C135.591 28.8807 136.9 29.3989 137.577 30.5702C137.821 30.9284 138.251 31.0748 138.585 30.8271C138.92 30.5793 139.048 30.1311 138.804 29.7729C137.75 28.0249 135.9 27.2207 134.037 27.671Z"
                fill="#989FB0"
              />
              <path
                d="M146.586 24.6368C144.879 25.0496 143.75 26.6578 143.642 28.6032C143.6 29.0304 143.901 29.375 144.28 29.4501C144.66 29.5252 144.944 29.2062 144.985 28.7789C145.041 27.5138 145.856 26.3989 146.949 26.1347C148.041 25.8705 149.257 26.4111 149.903 27.59C150.135 27.9511 150.534 28.1051 150.837 27.8648C151.14 27.6246 151.25 27.1809 151.018 26.8197C150.014 25.0597 148.294 24.2239 146.586 24.6368Z"
                fill="#989FB0"
              />
              <path
                d="M143.937 38.9196C145.061 38.6478 145.751 37.5164 145.48 36.3925C145.208 35.2685 144.076 34.5777 142.953 34.8495C141.829 35.1212 141.138 36.2526 141.41 37.3766C141.681 38.5005 142.813 39.1913 143.937 38.9196Z"
                fill="#989FB0"
              />
              <defs>
                <filter
                  id="filter0_d_567_20936"
                  x="0"
                  y="13.2319"
                  width="106.976"
                  height="125.133"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="11" />
                  <feGaussianBlur stdDeviation="11" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_567_20936"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_567_20936"
                    result="shape"
                  />
                </filter>
                <filter
                  id="filter1_d_567_20936"
                  x="49.1047"
                  y="25.5786"
                  width="102.269"
                  height="125.912"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="11" />
                  <feGaussianBlur stdDeviation="11" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_567_20936"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_567_20936"
                    result="shape"
                  />
                </filter>
                <filter
                  id="filter2_d_567_20936"
                  x="92.844"
                  y="0"
                  width="109.513"
                  height="126.484"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="11" />
                  <feGaussianBlur stdDeviation="11" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_567_20936"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_567_20936"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_567_20936"
                  x1="51.6678"
                  y1="23.1605"
                  x2="55.2283"
                  y2="105.452"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FDFEFF" />
                  <stop offset="0.9964" stop-color="#ECF0F5" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_567_20936"
                  x1="100.526"
                  y1="34.5112"
                  x2="99.9202"
                  y2="119.542"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FDFEFF" />
                  <stop offset="0.9964" stop-color="#ECF0F5" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_567_20936"
                  x1="132.357"
                  y1="13.9667"
                  x2="162.449"
                  y2="89.6274"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FDFEFF" />
                  <stop offset="0.9964" stop-color="#ECF0F5" />
                </linearGradient>
              </defs>
            </svg>

            <h3 className="text-lg font-semibold text-gray-900 my-2">
              No resumes yet
            </h3>
            <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
              Get started by creating your first resume. Choose from multiple
              creation methods to get started quickly.
            </p>
            <div className="w-fit flex justify-end">
              <CustomButton
                onClick={() => setShowModal(true)}
                className="btn-primary flex items-center gap-2"
              >
                Create New Resume
              </CustomButton>
            </div>
          </div>
        ) : (
          /* Resume Grid - Visible when resumes exist */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
             {/* Add New Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`"group relative  rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 overflow-hidden flex items-center p-6 cursor-pointer min-h-[200px] shadow-sm " ${resumes.length === 0 &&"col-span-2"}`}
              onClick={() => setShowModal(true)}
            >
              <div className={`${resumes.length === 0 && "flex items-center gap-6 "} w-full space-y-3`}>
                {/* Left: Plus Icon */}
                <div className="shrink-0 w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                  <Plus className="w-8 h-8 text-blue-600" />
                </div>

                {/* Right: Instructions */}
                <div className="flex items-center gap-6 w-full">
                  <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    Create New Resume
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed max-w-[280px]">
                    Build your professional profile in minutes. Choose from
                    multiple methods to get started.
                  </p>
                </div>

                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.div>
            {/* Existing Resume Cards - AnimatePresence follows */}
            <AnimatePresence mode="popLayout">
              {resumes.map((resume, index) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative bg-white rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full"
                >
                  {/* Card Spine Decor */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/40 to-blue-600/10 group-hover:w-1.5 transition-all duration-300" />

                  {/* Top Preview Section */}
                  <div className="h-32 bg-gray-50/50 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative transform group-hover:scale-110 transition-transform duration-500">
                      <div className="w-12 h-16 bg-white rounded shadow-sm border border-gray-100 flex flex-col gap-1.5 p-2 overflow-hidden rotate-[-2deg] group-hover:rotate-[2deg] transition-transform duration-500">
                        <div className="h-1 w-full bg-blue-100 rounded-full" />
                        <div className="h-1 w-3/4 bg-gray-100 rounded-full" />
                        <div className="h-1 w-1/2 bg-gray-100 rounded-full" />
                        <div className="h-1 w-5/6 bg-gray-100 rounded-full" />
                      </div>
                      <FileText className="absolute bottom-[-4px] right-[-4px] w-5 h-5 text-blue-500 shadow-sm" />
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="mb-auto">
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate leading-tight">
                        {resume.name}
                        {/* {resume.name || "Untitled Position"} */}
                      </h3>
                      <p className="text-[11px] text-gray-500 font-medium truncate mt-1">
                        {resume.jobTitle || "Untitled Position"}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(resume.lastModified)}</span>
                      </div>

                      <div className="flex items-center gap-1 relative z-10">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleEditResume(resume.id);
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-all active:scale-90"
                          title="Edit Resume"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleDeleteResume(resume.id);
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all active:scale-90"
                          title="Delete Resume"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Full Card Interaction Overlay */}
                  <div
                    className="absolute inset-0 cursor-pointer pointer-events-auto"
                    onClick={() => handleEditResume(resume.id)}
                    style={{ zIndex: 0 }}
                  />

                  {/* Action Re-entry (to ensure buttons work above the full card click) */}
                  <div
                    className="absolute bottom-4 right-4 flex items-center gap-1 pointer-events-auto"
                    style={{ zIndex: 10 }}
                  >
                    {/* Buttons are already in the layout, this is just a reminder layer */}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
           
          </div>
        )}
      </div>

      {/* Modal - Your Original Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-50 p-4"
            onClick={(e: React.MouseEvent) => {
              if (e.target === e.currentTarget) setShowModal(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -10 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col border border-gray-100"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Create New Resume
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Choose your preferred method
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (!isImportBusy) {
                      setShowModal(false);
                    }
                  }}
                  disabled={isImportBusy}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <div className="p-4 overflow-y-auto">
                <div className="space-y-2">
                  <div
                    onClick={() => {
                      if (!isImportBusy) {
                        handleMethodSelect("manual");
                      }
                    }}
                    className={`flex items-center gap-4 p-4 rounded-lg border border-transparent group ${
                      isImportBusy
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer transition-colors hover:bg-gray-50 hover:border-gray-200"
                    }`}
                  >
                    <div className="shrink-0">
                      <FileText className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900">
                        Create from Scratch
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Build your resume manually with our guide
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-400" />
                  </div>

                  <label
                    className={`flex items-center gap-4 p-4 rounded-lg border border-transparent group ${
                      isImportBusy
                        ? "cursor-wait bg-gray-50"
                        : "cursor-pointer transition-colors hover:bg-gray-50 hover:border-gray-200"
                    }`}
                  >
                    <div className="shrink-0">
                      <Upload className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900">
                        Upload Existing PDF
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {isImportBusy
                          ? "Fetching PDF info and extracting resume details..."
                          : "Import and edit your current resume (PDF, max 2MB)"}
                      </p>
                      {uploadError && (
                        <p className="text-xs text-red-500 mt-1">
                          {uploadError}
                        </p>
                      )}
                    </div>
                    {isImportBusy ? (
                      <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-400" />
                    )}
                    <input
                      type="file"
                      accept=".pdf"
                      disabled={isImportBusy}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <div
                    onClick={() => {
                      if (!isImportBusy) {
                        handleMethodSelect("linkedin");
                      }
                    }}
                    className={`flex items-center gap-4 p-4 rounded-xl border border-gray-100 group ${
                      isImportBusy
                        ? "cursor-not-allowed opacity-60 bg-gray-50/40"
                        : "cursor-pointer bg-gray-50/50 hover:bg-gray-50 transition-colors"
                    }`}
                  >
                    <div className="shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-100 shadow-sm">
                      <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-semibold text-gray-900 leading-tight">
                        Import from LinkedIn
                      </h3>
                      <p className="text-[13px] text-gray-500 mt-0.5">
                        Quickly sync your profile data
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50/30">
                {isImportBusy ? (
                  <div className="flex items-center justify-center gap-2 text-[11px] text-blue-600">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Fetching PDF info...</span>
                  </div>
                ) : (
                  <p className="text-[10px] text-gray-400 text-center">
                    You can further customize your resume later
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-[60] p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-gray-100"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Delete Resume?
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  This action cannot be undone. All your progress on this resume
                  will be permanently removed.
                </p>
              </div>

              <div className="flex border-t border-gray-100">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-4 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors border-r border-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-4 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                >
                  Delete Forever
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CustomSnackbar
        open={snackbar.open}
        snackbarMessage={snackbar.message}
        snackbarColor={snackbar.color}
        close={() => setSnackbar({ ...snackbar, open: false })}
      />
    </div>
  );
};
