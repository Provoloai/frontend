import { Reorder } from "motion/react";
import { motion } from "motion/react";
import { Move } from "lucide-react";
import { ResumePreview } from "./ResumePreview";
import CustomButton from "@/Reusables/CustomButton";

interface ReviewModeProps {
  formData: any;
  sectionOrder: string[];
  setSectionOrder: (order: string[]) => void;
  onBack: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  onDownload: () => void;
  isDownloading: boolean;
}

export const ReviewMode: React.FC<ReviewModeProps> = ({
  formData,
  sectionOrder,
  setSectionOrder,
  onBack,
  onSubmit,
  isSubmitting = false,
  onDownload,
  isDownloading,
}) => {
  const sectionLabels: any = {
    personal: "Personal Information",
    summary: "Professional Summary",
    experience: "Work Experience",
    education: "Education",
    skills: "Skills",
    courses: "Courses",
    internships: "Internships",
    projects: "Projects",
    certifications: "Certifications",
    hobbies: "Hobbies",
    languages: "Languages",
    references: "References",
  };

  return (
    <div className="flex-1 h-screen bg-gray-50 overflow-hidden pt-10">
      <div className="h-full flex flex-col p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Review & Arrange Sections
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Drag to reorder your resume sections
          </p>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-1 min-h-0 overflow-hidden">
          <div className="bg-white rounded-lg shadow-sm p-6 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Section Order</h3>
            <Reorder.Group
              axis="y"
              values={sectionOrder}
              onReorder={setSectionOrder}
              className="space-y-3"
            >
              {sectionOrder
                .filter(id => id !== "additional")
                .map(sectionId => (
                  <Reorder.Item key={sectionId} value={sectionId}>
                    <motion.div
                      className="flex items-center gap-3 p-4 bg-gray-50 border-2 border-gray-200 rounded-lg cursor-move hover:border-blue-500 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Move className="w-5 h-5 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {sectionLabels[sectionId] || sectionId}
                      </span>
                    </motion.div>
                  </Reorder.Item>
                ))}
            </Reorder.Group>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-y-auto">
            <ResumePreview formData={formData} sectionOrder={sectionOrder} />
          </div>
        </div>

        <div className="flex justify-between mt-6 pt-6 border-t">
          <div className="w-fit flex justify-end">
            <CustomButton
              onClick={onBack}
              className="btn-primary"
              disabled={isSubmitting}
            >
              Back to Edit
            </CustomButton>
          </div>
          <div className="flex gap-3">
            <div className="w-fit flex justify-end">
              <CustomButton
                onClick={onDownload}
                className="btn-primary"
                disabled={isSubmitting || isDownloading}
              >
                {isDownloading ? "Generating PDF..." : "Download Resume"}
              </CustomButton>
            </div>
            {onSubmit && (
              <div className="w-fit flex justify-end">
                <CustomButton
                  onClick={onSubmit}
                  className="btn-primary bg-green-600 hover:bg-green-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Resume"}
                </CustomButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
