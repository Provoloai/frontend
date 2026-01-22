import { Controller } from "react-hook-form";
import { Trash2, Briefcase, Calendar, MapPin, Building2, ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import { motion, AnimatePresence, Reorder, useDragControls } from "motion/react";
import React, { useState } from "react";
import CustomButton from "@/Reusables/CustomButton";
import TextInputField from "@/Reusables/TextInputField";

interface ExperienceFormProps {
  control: any;
  watch: any;
  setValue: any;
}

interface ExperienceItemProps {
  exp: any;
  index: number;
  control: any;
  isExpanded: boolean;
  onToggle: () => void;
  onRemove: (id: string) => void;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  exp,
  index,
  control,
  isExpanded,
  onToggle,
  onRemove
}) => {
  const controls = useDragControls();

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  return (
    <Reorder.Item
      value={exp}
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
        className={`border-2 rounded-xl transition-all duration-200 overflow-hidden ${isExpanded ? "border-blue-300 bg-white shadow-md text-gray-900" : "border-gray-200 bg-gray-50 hover:border-gray-300"
          }`}
      >
        {/* Accordion Header */}
        <div
          className="flex items-center justify-between p-4 cursor-pointer select-none"
          onClick={onToggle}
        >
          <div className="flex items-center gap-3 pr-8">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isExpanded ? "bg-blue-100" : "bg-gray-200"
              }`}>
              <Briefcase className={`w-4 h-4 ${isExpanded ? "text-blue-600" : "text-gray-500"}`} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900 line-clamp-1">
                {exp.jobTitle || "Job Title"}
              </span>
              <span className="text-xs text-gray-500 line-clamp-1">
                {exp.employer || "Company / Employer"}
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
                {/* Job Title & Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    name={`experience.${index}.jobTitle`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`jobTitle-${index}`}
                        label="Job Title"
                        placeholder="e.g. Software Engineer"
                        iconStart={<Briefcase className="w-4 h-4 text-gray-400" />}
                      />
                    )}
                  />

                  <Controller
                    name={`experience.${index}.employer`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`employer-${index}`}
                        label="Company"
                        placeholder="e.g. Google"
                        iconStart={<Building2 className="w-4 h-4 text-gray-400" />}
                      />
                    )}
                  />
                </div>

                {/* Location */}
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name={`experience.${index}.city`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`exp-city-${index}`}
                        label="City"
                        placeholder="City"
                        iconStart={<MapPin className="w-4 h-4 text-gray-400" />}
                      />
                    )}
                  />

                  <Controller
                    name={`experience.${index}.country`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`exp-country-${index}`}
                        label="Country"
                        placeholder="Country"
                        iconStart={<MapPin className="w-4 h-4 text-gray-400" />}
                      />
                    )}
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name={`experience.${index}.startDate`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`exp-startDate-${index}`}
                        label="Start Date"
                        type="date"
                        iconStart={<Calendar className="w-4 h-4 text-gray-400" />}
                      />
                    )}
                  />

                  <Controller
                    name={`experience.${index}.endDate`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`exp-endDate-${index}`}
                        label="End Date"
                        type="date"
                        disabled={exp.currentlyWorking}
                        iconStart={<Calendar className="w-4 h-4 text-gray-400" />}
                      />
                    )}
                  />
                </div>

                {/* Currently Working */}
                <label className="flex items-center gap-2 cursor-pointer group/cb">
                  <Controller
                    name={`experience.${index}.currentlyWorking`}
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
                    I currently work here
                  </span>
                </label>

                <div className="space-y-2">
                  <Controller
                    name={`experience.${index}.description`}
                    control={control}
                    render={({ field, fieldState }: { field: any; fieldState: any }) => (
                      <TextInputField
                        {...field}
                        id={`exp-desc-${index}`}
                        label="Description"
                        variant="rich-text"
                        placeholder="• Developed and maintained web applications&#10;• Collaborated with cross-functional teams&#10;• Improved system performance by 40%"
                        helperText="Use bullet points to list your key responsibilities and achievements"
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
        className={`absolute -left-2 -top-2 p-1.5 bg-white border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full shadow-md transition-all duration-300 z-10 cursor-grab active:cursor-grabbing ${isExpanded ? "opacity-100 scale-100" : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
          }`}
        title="Drag to reorder"
        onPointerDown={(e) => controls.start(e)}
      >
        <GripVertical className="w-4 h-4" />
      </div>

      {/* Floating Trash Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          onRemove(exp.id);
        }}
        className={`absolute -right-2 -top-2 p-1.5 bg-white border border-gray-200 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full shadow-md transition-all duration-300 z-10 ${isExpanded ? "opacity-100 scale-100" : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
          }`}
        title="Remove Experience"
      >
        <Trash2 className="w-4 h-4" />
      </motion.button>
    </Reorder.Item>
  );
};

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ control, watch, setValue }) => {
  const experience = watch('experience') || [];
  const [expandedId, setExpandedId] = useState<string | null>(experience[0]?.id || null);

  const addExperience = () => {
    const newId = Date.now().toString();
    setValue('experience', [
      {
        id: newId,
        jobTitle: '',
        employer: '',
        city: '',
        country: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        description: '',
      },
      ...experience, // Add existing items after the new one
    ]);
    setExpandedId(newId);
  };

  const removeExperience = (id: string) => {
    setValue('experience', experience.filter((exp: any) => exp.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const handleReorder = (newOrder: any[]) => {
    setValue('experience', newOrder, { shouldDirty: true, shouldValidate: true });
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
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
          <h3 className="text-base font-semibold text-gray-900">Experiences</h3>
          <p className="text-xs text-gray-600 mt-1">Add your relevant work history</p>
        </div>

        <div className="w-fit flex justify-end">
          <CustomButton onClick={addExperience} className="btn-primary">
            Add Experience
          </CustomButton>
        </div>
      </div>

      {/* Experience List */}
      <Reorder.Group
        axis="y"
        values={experience}
        onReorder={handleReorder}
        className="space-y-4 px-2"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {experience.map((exp: any, index: number) => (
            <ExperienceItem
              key={exp.id}
              exp={exp}
              index={index}
              control={control}
              isExpanded={expandedId === exp.id}
              onToggle={() => toggleExpand(exp.id)}
              onRemove={removeExperience}
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>

      {/* Empty State */}
      {experience.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
        >
          <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600 mb-1">No work experience added yet</p>
          <p className="text-xs text-gray-500">Click "Add Experience" to get started</p>
        </motion.div>
      )}
    </motion.div>
  );
};