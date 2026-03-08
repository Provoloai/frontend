import {
  Control,
  Controller,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import {
  Trash2,
  Briefcase,
  Calendar,
  MapPin,
  Building2,
  ChevronDown,
  ChevronUp,
  GripVertical,
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
import { Resume, Internship } from "@/types";

interface InternshipsFormProps {
  control: Control<Resume>;
  watch: UseFormWatch<Resume>;
  setValue: UseFormSetValue<Resume>;
}

interface InternshipItemProps {
  internship: Internship;
  index: number;
  control: Control<Resume>;
  isExpanded: boolean;
  onToggle: () => void;
  onRemove: (id: string) => void;
}

const InternshipItem: React.FC<InternshipItemProps> = ({
  internship,
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
      value={internship}
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
                isExpanded ? "bg-orange-100" : "bg-gray-200"
              }`}
            >
              <Briefcase
                className={`w-4 h-4 ${isExpanded ? "text-orange-600" : "text-gray-500"}`}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900 line-clamp-1">
                {internship.position || "Position"}
              </span>
              <span className="text-xs text-gray-500 line-clamp-1">
                {internship.company || "Employer / Company"}
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
                {/* Position & Employer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    name={`content.internships.${index}.position`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`internship-position-${index}`}
                        label="Position"
                        placeholder="e.g. Software Engineering Intern"
                        iconStart={
                          <Briefcase className="w-4 h-4 text-gray-400" />
                        }
                      />
                    )}
                  />

                  <Controller
                    name={`content.internships.${index}.company`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`internship-company-${index}`}
                        label="Company"
                        placeholder="e.g. Microsoft"
                        iconStart={
                          <Building2 className="w-4 h-4 text-gray-400" />
                        }
                      />
                    )}
                  />
                </div>

                {/* Location */}
                <div className="grid grid-cols-1 gap-4">
                  <Controller
                    name={`content.internships.${index}.location`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`internship-location-${index}`}
                        label="Location"
                        placeholder="e.g. New York, NY"
                        iconStart={<MapPin className="w-4 h-4 text-gray-400" />}
                      />
                    )}
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name={`content.internships.${index}.startDate`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`internship-startDate-${index}`}
                        label="Start Date"
                        type="date"
                        iconStart={
                          <Calendar className="w-4 h-4 text-gray-400" />
                        }
                      />
                    )}
                  />

                  <Controller
                    name={`content.internships.${index}.endDate`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`internship-endDate-${index}`}
                        label="End Date"
                        type="date"
                        iconStart={
                          <Calendar className="w-4 h-4 text-gray-400" />
                        }
                      />
                    )}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Controller
                    name={`content.internships.${index}.description`}
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
                        id={`internship-desc-${index}`}
                        label="Description"
                        variant="rich-text"
                        placeholder="• Key responsibilities and projects&#10;• Skills gained&#10;• Achievements"
                        helperText="Describe your daily tasks and any specific projects you owned."
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
          onRemove(internship.id || "");
        }}
        className={`absolute -right-2 -top-2 p-1.5 bg-white border border-gray-200 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full shadow-md transition-all duration-300 z-10 ${
          isExpanded
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
        }`}
        title="Remove Internship"
      >
        <Trash2 className="w-4 h-4" />
      </motion.button>
    </Reorder.Item>
  );
};

export const InternshipsForm: React.FC<InternshipsFormProps> = ({
  control,
  watch,
  setValue,
}) => {
  const internships = watch("content.internships") || [];
  const [expandedId, setExpandedId] = useState<string | null>(
    internships[0]?.id || null
  );

  const addInternship = () => {
    const newId = Date.now().toString();
    const newInternship: Internship = {
      id: newId,
      position: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    };
    setValue("content.internships", [
      newInternship,
      ...internships, // Add existing items after the new one
    ]);
    setExpandedId(newId);
  };

  const removeInternship = (id: string) => {
    setValue(
      "content.internships",
      internships.filter(internship => internship.id !== id)
    );
    if (expandedId === id) setExpandedId(null);
  };

  const handleReorder = (newOrder: Internship[]) => {
    setValue("content.internships", newOrder, {
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
          <h3 className="text-base font-semibold text-gray-900">Internships</h3>
          <p className="text-xs text-gray-600 mt-1">
            Add your internship experiences
          </p>
        </div>

        <div className="w-fit flex justify-end">
          <CustomButton onClick={addInternship} className="btn-primary">
            Add Internship
          </CustomButton>
        </div>
      </div>

      {/* Internships List */}
      <Reorder.Group
        axis="y"
        values={internships}
        onReorder={handleReorder}
        className="space-y-4 px-2"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {internships.map((internship: Internship, index: number) => (
            <InternshipItem
              key={internship.id}
              internship={internship}
              index={index}
              control={control}
              isExpanded={expandedId === internship.id}
              onToggle={() => toggleExpand(internship.id || "")}
              onRemove={removeInternship}
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>

      {/* Empty State */}
      {internships.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
        >
          <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600 mb-1">No internships added yet</p>
          <p className="text-xs text-gray-500">
            Click "Add Internship" to get started
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};
