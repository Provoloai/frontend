import { useState } from "react";
import { useForm } from "react-hook-form";
import { ResumeForm } from "./ResumeForm";
import { ResumePreview } from "./ResumePreview";
import { ReviewMode } from "./ReviewMode";

export const ResumeEditor: React.FC = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [additionalSections, setAdditionalSections] = useState<string[]>([]);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [sectionOrder, setSectionOrder] = useState([
    'personal', 'summary', 'experience', 'education', 'skills'
  ]);

  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
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
    }
  });

  const formData = watch();

  const addAdditionalSection = (sectionId: string) => {
    if (!additionalSections.includes(sectionId)) {
      const newAdditionalSections = [...additionalSections, sectionId];
      setAdditionalSections(newAdditionalSections);
      
      // Insert before 'additional' section
      const newOrder = sectionOrder.filter(id => id !== 'additional');
      newOrder.push(sectionId, 'additional');
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
      />
    );
  }

  return (
    <div className="h-[calc(100vh)] bg-gray-50 overflow-hidden w-full pt-12">
      <div className="h-full flex flex-col p-6">
        <div className="flex-1 grid grid-cols-2 gap-1 min-h-0">
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