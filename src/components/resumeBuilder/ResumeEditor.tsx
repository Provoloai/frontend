import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ResumeForm } from "./ResumeForm";
import { ResumePreview } from "./ResumePreview";
import { ReviewMode } from "./ReviewMode";
import { useResumeStore } from "@/stores/resumeStore";
import { Resume } from "@/types";
import { ArrowLeft } from "lucide-react";
import { resumeApi } from "@/api";
import CustomSnackbar from "@/Reusables/CustomSnackbar";

interface ResumeEditorProps {
  onBack?: () => void;
}

export const ResumeEditor: React.FC<ResumeEditorProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState<string>("personal");
  const [additionalSections, setAdditionalSections] = useState<string[]>([]);
  const [isReviewMode, setIsReviewMode] = useState<boolean>(false);
  const [sectionOrder, setSectionOrder] = useState<string[]>([
    "personal",
    "summary",
    "experience",
    "education",
    "skills",
  ]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    color: "primary" | "neutral" | "danger" | "success" | "warning";
  }>({
    open: false,
    message: "",
    color: "success",
  });

  const currentResumeId = useResumeStore(state => state.currentResumeId);
  const loadResume = useResumeStore(state => state.loadResume);
  const saveCurrentResume = useResumeStore(state => state.saveCurrentResume);
  const syncResume = useResumeStore(state => state.syncResume);

  const { control, watch, setValue, reset } = useForm<Resume>({
    defaultValues: {
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
        projects: [],
        certifications: [],
        hobbies: [],
        languages: [],
        references: [],
      },
    },
  });

  const formData = watch();
  const firstName = watch("content.personalInfo.firstName");
  const lastName = watch("content.personalInfo.lastName");

  // Sync title with Name (First + Last) whenever name changes
  useEffect(() => {
    if (firstName || lastName) {
      const fullName = `${firstName || ""} ${lastName || ""}`.trim();
      if (fullName) {
        setValue("title", fullName);
      }
    }
  }, [firstName, lastName, setValue]);

  // Handle resume submission to backend
  const handleSubmitResume = async (): Promise<void> => {
    setIsSubmitting(true);

    try {
      // Validate that we have content
      if (
        !formData.content.personalInfo.firstName ||
        !formData.content.personalInfo.lastName
      ) {
        setSnackbar({
          open: true,
          message: "Please fill in at least your name before submitting.",
          color: "warning",
        });
        return;
      }

      // Prepare payload
      const payload = {
        ...formData,
      };

      console.log("Submitting payload:", payload);

      // Sync resume with backend
      if (currentResumeId) {
        await syncResume(currentResumeId, payload as Resume);
        setSnackbar({
          open: true,
          message: "Resume submitted/synced successfully!",
          color: "success",
        });
      } else {
        // Fallback for edge cases (shouldn't happen with current flow as ID exists on create)
        const result = await resumeApi.createResume(payload);
        if (result.success) {
          setSnackbar({
            open: true,
            message: "Resume submitted successfully!",
            color: "success",
          });
        } else {
          setSnackbar({
            open: true,
            message: `Error: ${result.error || "Failed to submit resume"}`,
            color: "danger",
          });
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      console.error("Resume submission error:", error);
      setSnackbar({
        open: true,
        message: `Error: ${errorMessage}`,
        color: "danger",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load resume data when currentResumeId changes
  useEffect(() => {
    if (currentResumeId) {
      const data = loadResume(currentResumeId);
      if (data) {
        reset(data);
      }
    }
  }, [currentResumeId, loadResume, reset]);

  // Auto-save every 2 seconds when data changes
  useEffect(() => {
    if (!currentResumeId) return;

    const timeoutId = setTimeout(() => {
      saveCurrentResume(currentResumeId, formData);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [formData, currentResumeId, saveCurrentResume]);

  const addAdditionalSection = (sectionId: string): void => {
    if (!additionalSections.includes(sectionId)) {
      const newAdditionalSections = [...additionalSections, sectionId];
      setAdditionalSections(newAdditionalSections);

      const newOrder = sectionOrder.filter(id => id !== "additional");
      newOrder.push(sectionId, "additional");
      setSectionOrder(newOrder);
    }
  };

  const renderContent = () => {
    if (isReviewMode) {
      return (
        <ReviewMode
          formData={formData}
          sectionOrder={sectionOrder}
          setSectionOrder={setSectionOrder}
          onBack={() => setIsReviewMode(false)}
          onSubmit={handleSubmitResume}
          isSubmitting={isSubmitting}
        />
      );
    }

    return (
      <div className="flex-1 h-screen bg-gray-50 overflow-hidden pt-10">
        <div className="h-full flex flex-col p-8">
          {onBack && (
            <div className="mb-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                <span className="font-medium text-xs">Back to My Resumes</span>
              </button>
            </div>
          )}

          <div className="flex-1 grid grid-cols-2 gap-1 min-h-0 overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-full overflow-hidden">
              <ResumeForm
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                additionalSections={additionalSections}
                addAdditionalSection={addAdditionalSection}
                control={control}
                watch={watch}
                setValue={setValue}
                onReview={() => setIsReviewMode(true)}
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <ResumePreview formData={formData} sectionOrder={sectionOrder} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderContent()}
      <CustomSnackbar
        open={snackbar.open}
        snackbarMessage={snackbar.message}
        snackbarColor={snackbar.color}
        close={() => setSnackbar(prev => ({ ...prev, open: false }))}
      />
    </>
  );
};
