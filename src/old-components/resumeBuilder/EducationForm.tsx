import {
  Control,
  Controller,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import {
  Trash2,
  GraduationCap,
  Calendar,
  MapPin,
  School,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Lightbulb,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  Reorder,
  useDragControls,
} from "motion/react";
import React, { useState } from "react";
import CustomButton from "@/Reusables/CustomButton";
import TextInputField from "@/Reusables/TextInputField";
import { Resume, Education } from "@/types";

interface EducationFormProps {
  control: Control<Resume>;
  watch: UseFormWatch<Resume>;
  setValue: UseFormSetValue<Resume>;
}

interface EducationItemProps {
  edu: Education;
  index: number;
  control: Control<Resume>;
  isExpanded: boolean;
  onToggle: () => void;
  onRemove: (id: string) => void;
}

const EducationItem: React.FC<EducationItemProps> = ({
  edu,
  index,
  control,
  isExpanded,
  onToggle,
  onRemove,
}) => {
  const controls = useDragControls();

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  return (
    <Reorder.Item
      value={edu}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className="relative group"
      dragListener={false}
      dragControls={controls}
    >
      <div
        className={`border-2 rounded-xl transition-all duration-200 overflow-hidden ${
          isExpanded
            ? "border-blue-300 bg-white shadow-md text-gray-900"
            : "border-gray-200 bg-gray-50 hover:border-gray-300"
        }`}
      >
        {/* Accordion Header */}
        <div
          className="flex items-center justify-between p-4 cursor-pointer select-none"
          onClick={onToggle}
        >
          <div className="flex items-center gap-3 pr-8">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                isExpanded ? "bg-blue-100" : "bg-gray-200"
              }`}
            >
              <GraduationCap
                className={`w-4 h-4 ${isExpanded ? "text-blue-600" : "text-gray-500"}`}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900 line-clamp-1">
                {edu.degree || "Degree"}
              </span>
              <span className="text-xs text-gray-500 line-clamp-1">
                {edu.institution || "School / University"}
              </span>
            </div>
          </div>
          <div className="flex items-center shrink-0">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>

        {/* Accordion Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-5 pb-5 pt-2 space-y-4 border-t border-gray-100">
                {/* Degree & School */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    name={`content.education.${index}.degree`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`degree-${index}`}
                        label="Degree"
                        placeholder="e.g. Bachelor of Science"
                        iconStart={
                          <GraduationCap className="w-4 h-4 text-gray-400" />
                        }
                      />
                    )}
                  />

                  <Controller
                    name={`content.education.${index}.institution`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`institution-${index}`}
                        label="School/University"
                        placeholder="e.g. Harvard University"
                        iconStart={<School className="w-4 h-4 text-gray-400" />}
                      />
                    )}
                  />
                </div>

                {/* Location */}
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name={`content.education.${index}.location`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`edu-city-${index}`} // Keeping ID but field is location
                        label="Location"
                        placeholder="City, Country"
                        iconStart={<MapPin className="w-4 h-4 text-gray-400" />}
                      />
                    )}
                  />
                  {/* Removing separate country field as interface only has location. */}
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name={`content.education.${index}.startDate`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`edu-startDate-${index}`}
                        label="Start Date"
                        type="month"
                        iconStart={
                          <Calendar className="w-4 h-4 text-gray-400" />
                        }
                      />
                    )}
                  />

                  <Controller
                    name={`content.education.${index}.endDate`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`edu-endDate-${index}`}
                        label="End Date"
                        type="month"
                        disabled={edu.current}
                        iconStart={
                          <Calendar className="w-4 h-4 text-gray-400" />
                        }
                      />
                    )}
                  />
                </div>

                {/* Currently Studying */}
                <label className="flex items-center gap-2 cursor-pointer group/cb">
                  <Controller
                    name={`content.education.${index}.current`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      />
                    )}
                  />
                  <span className="text-sm text-gray-700 group-hover/cb:text-blue-600 transition-colors">
                    I currently study here
                  </span>
                </label>

                <div className="space-y-2">
                  <Controller
                    name={`content.education.${index}.description`}
                    control={control}
                    render={({
                      field,
                      fieldState,
                    }: {
                      field: any;
                      fieldState: any;
                    }) => (
                      <TextInputField
                        {...field}
                        id={`edu-desc-${index}`}
                        label="Additional Details (Optional)"
                        variant="rich-text"
                        placeholder="e.g. GPA: 3.8/4.0, Dean's List, Relevant coursework..."
                        helperText="Add any awards, honors, or relevant coursework."
                        touched={fieldState.isTouched}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Drag Handle */}
      <div
        className={`absolute -left-2 -top-2 p-1.5 bg-white border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full shadow-md transition-all duration-300 z-10 cursor-grab active:cursor-grabbing ${
          isExpanded
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
        }`}
        title="Drag to reorder"
        onPointerDown={e => controls.start(e)}
      >
        <GripVertical className="w-4 h-4" />
      </div>

      {/* Floating Trash Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          onRemove(edu.id!);
        }}
        className={`absolute -right-2 -top-2 p-1.5 bg-white border border-gray-200 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full shadow-md transition-all duration-300 z-10 ${
          isExpanded
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
        }`}
        title="Remove Education"
      >
        <Trash2 className="w-4 h-4" />
      </motion.button>
    </Reorder.Item>
  );
};

const EducationForm: React.FC<EducationFormProps> = ({
  control,
  watch,
  setValue,
}) => {
  const education = watch("content.education") || [];
  const [expandedId, setExpandedId] = useState<string | null>(
    education[0]?.id || null
  );

  const addEducation = () => {
    const newId = Date.now().toString();
    const newEducation: Education = {
      id: newId,
      degree: "",
      institution: "",
      fieldOfStudy: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    setValue("content.education", [
      newEducation,
      ...education, // Add existing items after the new one
    ]);
    setExpandedId(newId);
  };

  const removeEducation = (id: string) => {
    setValue(
      "content.education",
      education.filter(edu => edu.id !== id)
    );
    if (expandedId === id) setExpandedId(null);
  };

  const handleReorder = (newOrder: Education[]) => {
    setValue("content.education", newOrder, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Education</h3>
          <p className="text-xs text-gray-600 mt-1">
            Add your educational background
          </p>
        </div>

        <div className="w-fit flex justify-end">
          <CustomButton onClick={addEducation} className="btn-primary">
            Add Education
          </CustomButton>
        </div>
      </div>

      {/* Education List */}
      <Reorder.Group
        axis="y"
        values={education}
        onReorder={handleReorder}
        className="space-y-4 px-2"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {education.map((edu: Education, index: number) => (
            <EducationItem
              key={edu.id}
              edu={edu}
              index={index}
              control={control}
              isExpanded={expandedId === edu.id}
              onToggle={() => toggleExpand(edu.id || "")}
              onRemove={removeEducation}
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>

      {/* Empty State */}
      {education.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
        >
          <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600 mb-1">No education added yet</p>
          <p className="text-xs text-gray-500">
            Click "Add Education" to get started
          </p>
        </motion.div>
      )}
      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-blue-50/80 border border-blue-100 rounded-xl p-4 flex flex-col gap-3 shadow-sm"
      >
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 text-white p-1 rounded-full shrink-0 shadow-sm">
            <Lightbulb className="w-3 h-3 fill-current" />
          </div>
          <span className="text-[11px] font-bold text-blue-900 underline decoration-blue-200 underline-offset-2 uppercase tracking-tight">
            Pro Tips
          </span>
        </div>

        <div className="space-y-2 px-1">
          <div className="flex items-start gap-3">
            <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Mention your **GPA** only if it's 3.5 or higher
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Include relevant **honors, awards, or club leadership** roles
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              List your most recent degree first (Reverse Chronological Order)
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EducationForm;
