import { motion, AnimatePresence } from "motion/react";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { SummaryForm } from "./SummaryForm";
import { ExperienceForm } from "./ExperienceForm";
import EducationForm from "./EducationForm";
import SkillsForm from "./SkillsForm";
import CustomButton from "@/Reusables/CustomButton";
import { AdditionalSectionsForm } from "./AdditionalSectionForm";
import { CoursesForm } from "./CoursesForm";
import { HobbiesForm } from "./HobbiesForm";
import { InternshipsForm } from "./InternshipsForm";
import { LanguagesForm } from "./LanguagesForm";
import { ReferencesForm } from "./ReferencesForm";



interface Section {
  id: string;
  label: string;
  shortLabel: string;
}

interface ResumeFormProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  additionalSections: string[];
  addAdditionalSection: (sectionId: string) => void;
  control: any;
  watch: any;
  setValue: any;
  onReview: () => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({
  activeSection,
  setActiveSection,
  additionalSections,
  addAdditionalSection,
  control,
  watch,
  setValue,
  onReview,
}) => {
  const availableSections = [
    { id: 'courses', label: 'Courses', icon: 'FileText' },
    { id: 'internships', label: 'Internships', icon: 'Briefcase' },
    { id: 'hobbies', label: 'Hobbies', icon: 'Zap' },
    { id: 'languages', label: 'Languages', icon: 'Globe' },
    { id: 'references', label: 'References', icon: 'Users' },
  ];

  const baseSections: Section[] = [
    { id: 'personal', label: 'Personal Information', shortLabel: 'Personal' },
    { id: 'summary', label: 'Professional Summary', shortLabel: 'Summary' },
    { id: 'experience', label: 'Work Experience', shortLabel: 'Experience' },
    { id: 'education', label: 'Education', shortLabel: 'Education' },
    { id: 'skills', label: 'Skills', shortLabel: 'Skills' },
  ];

  const addedSectionObjects = additionalSections.map(id => ({
    id,
    label: availableSections.find(s => s.id === id)?.label || id,
    shortLabel: availableSections.find(s => s.id === id)?.label || id,
  }));

  const sections: Section[] = [
    ...baseSections,
    ...addedSectionObjects,
    { id: 'additional', label: 'Additional Sections', shortLabel: 'Additional' },
  ];

  const currentIndex = sections.findIndex(s => s.id === activeSection);
  const isLastStep = activeSection === 'additional';

  const handleNext = () => {
    if (isLastStep) {
      onReview();
    } else if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id);
    }
  };

  return (
    <>
      <motion.div
        key={`title-${activeSection}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-900">
          {sections[currentIndex]?.label}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Step {currentIndex + 1} of {sections.length}
        </p>
      </motion.div>

      <div className="flex-1 overflow-y-auto mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection === 'personal' && <PersonalInfoForm control={control} />}
            {activeSection === 'summary' && <SummaryForm control={control} />}
            {activeSection === 'experience' && <ExperienceForm control={control} watch={watch} setValue={setValue} />}
            {activeSection === 'education' && <EducationForm control={control} watch={watch} setValue={setValue} />}
            {activeSection === 'skills' && <SkillsForm control={control} watch={watch} setValue={setValue} />}
            {activeSection === 'courses' && <CoursesForm control={control} watch={watch} setValue={setValue} />}
            {activeSection === 'internships' && <InternshipsForm control={control} watch={watch} setValue={setValue} />}
            {activeSection === 'hobbies' && <HobbiesForm control={control} watch={watch} setValue={setValue} />}
            {activeSection === 'languages' && <LanguagesForm control={control} watch={watch} setValue={setValue} />}
            {activeSection === 'references' && <ReferencesForm control={control} watch={watch} setValue={setValue} />}
            {activeSection === 'additional' && (
              <AdditionalSectionsForm
                availableSections={availableSections}
                addedSections={additionalSections}
                onAddSection={(sectionId) => {
                  addAdditionalSection(sectionId);
                  // Immediately navigate to the newly added section
                  setActiveSection(sectionId);
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <div className="w-fit flex justify-end">
          <CustomButton
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`btn-primary ${currentIndex === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : " text-gray-700"
              }`}
          >
            Previous
          </CustomButton>
        </div>

        <div className="flex items-center gap-2">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-primary"
                  : index < currentIndex
                    ? "w-1.5 bg-primary"
                    : "w-1.5 bg-gray-300"
                }`}
            />
          ))}
        </div>
        <div className="w-fit flex justify-end">
          <CustomButton onClick={handleNext} className="btn-primary">
            {isLastStep ? (
              <>
                Review
              </>
            ) : (
              <>
                Next
              </>
            )}
          </CustomButton>
        </div>
      </div>
    </>
  );
};