import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ResumeForm } from "./ResumeForm";
import { ResumePreview } from "./ResumePreview";
import { ReviewMode } from "./ReviewMode";
import { useResumeStore, ResumeData } from "@/stores/resumeStore";
import { ArrowLeft } from "lucide-react";
import { resumeApi } from "@/api";

interface ResumeEditorProps {
  onBack?: () => void;
}

export const ResumeEditor: React.FC<ResumeEditorProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState("personal");
  const [additionalSections, setAdditionalSections] = useState<string[]>([]);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [sectionOrder, setSectionOrder] = useState([
    "personal",
    "summary",
    "experience",
    "education",
    "skills",
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentResumeId = useResumeStore((state) => state.currentResumeId);
  const loadResume = useResumeStore((state) => state.loadResume);
  const saveCurrentResume = useResumeStore((state) => state.saveCurrentResume);

  const { control, watch, setValue, reset } = useForm<ResumeData>({
    defaultValues: {
      personalInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        country: "",
        jobTitle: "",
        linkedinUrl: "",
      },
      summary: "",
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
  });

  const formData = watch();

  // Handle resume submission to backend
  const handleSubmitResume = async () => {
    setIsSubmitting(true);

    try {
      // Transform form data to match backend expectations (remove any temporary IDs)
      const resumeData: ResumeData = {
        personalInfo: formData.personalInfo,
        summary: formData.summary,
        experience: formData.experience || [],
        education: formData.education || [],
        skills: formData.skills || [],
        courses: formData.courses || [],
        internships: formData.internships || [],
        projects: formData.projects || [],
        certifications: formData.certifications || [],
        hobbies: formData.hobbies || [],
        languages: formData.languages || [],
        references: formData.references || [],
      };

      const result = await resumeApi.createResume(resumeData);

      if (result.success) {
        // Save the backend ID to the store
        if (currentResumeId && result.data?.id) {
          localStorage.setItem(`resume_backend_id_${currentResumeId}`, result.data.id);
        }
        // Show success message
        alert('Resume submitted successfully!');
      } else {
        alert(`Error: ${result.error || 'Failed to submit resume'}`);
      }
    } catch (error: any) {
      alert(`Error: ${error.message || 'An unexpected error occurred'}`);
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

  const addAdditionalSection = (sectionId: string) => {
    if (!additionalSections.includes(sectionId)) {
      const newAdditionalSections = [...additionalSections, sectionId];
      setAdditionalSections(newAdditionalSections);

      const newOrder = sectionOrder.filter((id) => id !== "additional");
      newOrder.push(sectionId, "additional");
      setSectionOrder(newOrder);
    }
  };

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
        {/* Back Button */}
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