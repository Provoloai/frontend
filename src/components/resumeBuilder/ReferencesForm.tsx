import { Controller } from "react-hook-form";
import { Trash2, Users, Mail, Phone, Briefcase, ChevronDown, ChevronUp, GripVertical, Lightbulb } from "lucide-react";
import { motion, AnimatePresence, Reorder, useDragControls } from "motion/react";
import React, { useState } from "react";
import CustomButton from "@/Reusables/CustomButton";
import TextInputField from "@/Reusables/TextInputField";

interface ReferencesFormProps {
  control: any;
  watch: any;
  setValue: any;
}

interface ReferenceItemProps {
  reference: any;
  index: number;
  control: any;
  isExpanded: boolean;
  onToggle: () => void;
  onRemove: (id: string) => void;
}

const ReferenceItem: React.FC<ReferenceItemProps> = ({
  reference,
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
      value={reference}
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
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isExpanded ? "bg-cyan-100" : "bg-gray-200"
              }`}>
              <Users className={`w-4 h-4 ${isExpanded ? "text-cyan-600" : "text-gray-500"}`} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900 line-clamp-1">
                {reference.name || "Full Name"}
              </span>
              <span className="text-xs text-gray-500 line-clamp-1">
                {reference.position || "Position"}{reference.company ? ` at ${reference.company}` : ""}
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
                {/* Name */}
                <Controller
                  name={`references.${index}.name`}
                  control={control}
                  render={({ field }: { field: any }) => (
                    <TextInputField
                      {...field}
                      id={`reference-name-${index}`}
                      label="Full Name"
                      placeholder="e.g. John Doe"
                      iconStart={<Users className="w-4 h-4 text-gray-400" />}
                    />
                  )}
                />

                {/* Position & Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    name={`references.${index}.position`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`reference-position-${index}`}
                        label="Position"
                        placeholder="e.g. Senior Manager"
                        iconStart={<Briefcase className="w-4 h-4 text-gray-400" />}
                      />
                    )}
                  />

                  <Controller
                    name={`references.${index}.company`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`reference-company-${index}`}
                        label="Company"
                        placeholder="e.g. Google"
                        iconStart={<Briefcase className="w-4 h-4 text-gray-400" />}
                      />
                    )}
                  />
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    name={`references.${index}.email`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`reference-email-${index}`}
                        label="Email"
                        type="email"
                        placeholder="reference@email.com"
                        iconStart={<Mail className="w-4 h-4 text-gray-400" />}
                      />
                    )}
                  />

                  <Controller
                    name={`references.${index}.phone`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`reference-phone-${index}`}
                        label="Phone (Optional)"
                        placeholder="+1 (555) 000-0000"
                        iconStart={<Phone className="w-4 h-4 text-gray-400" />}
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
          onRemove(reference.id);
        }}
        className={`absolute -right-2 -top-2 p-1.5 bg-white border border-gray-200 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full shadow-md transition-all duration-300 z-10 ${isExpanded ? "opacity-100 scale-100" : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
          }`}
        title="Remove Reference"
      >
        <Trash2 className="w-4 h-4" />
      </motion.button>
    </Reorder.Item>
  );
};

export const ReferencesForm: React.FC<ReferencesFormProps> = ({ control, watch, setValue }) => {
  const references = watch('references') || [];
  const [expandedId, setExpandedId] = useState<string | null>(references[0]?.id || null);

  const addReference = () => {
    const newId = Date.now().toString();
    setValue('references', [
      ...references,
      {
        id: newId,
        name: '',
        position: '',
        company: '',
        email: '',
        phone: '',
      }
    ]);
    setExpandedId(newId);
  };

  const removeReference = (id: string) => {
    setValue('references', references.filter((ref: any) => ref.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const handleReorder = (newOrder: any[]) => {
    setValue('references', newOrder, { shouldDirty: true, shouldValidate: true });
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
          <h3 className="text-base font-semibold text-gray-900">References</h3>
          <p className="text-xs text-gray-600 mt-1">Add professional references</p>
        </div>

        <div className="w-fit flex justify-end">
          <CustomButton onClick={addReference} className="btn-primary">
            Add Reference
          </CustomButton>
        </div>
      </div>

      {/* References List */}
      <Reorder.Group
        axis="y"
        values={references}
        onReorder={handleReorder}
        className="space-y-4 px-2"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {references.map((ref: any, index: number) => (
            <ReferenceItem
              key={ref.id}
              reference={ref}
              index={index}
              control={control}
              isExpanded={expandedId === ref.id}
              onToggle={() => toggleExpand(ref.id)}
              onRemove={removeReference}
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>

      {/* Empty State */}
      {references.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
        >
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600 mb-1">No references added yet</p>
          <p className="text-xs text-gray-500">Click "Add Reference" to get started</p>
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
          <span className="text-[11px] font-bold text-blue-900 underline decoration-blue-200 underline-offset-2 uppercase tracking-tight">Pro Tips</span>
        </div>

        <div className="space-y-2 px-1">
          <div className="flex items-start gap-3">
            <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Always **ask permission** before listing someone as a reference
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Choose references who can speak to your **work ethic and skills**
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Verify that their **contact information** is up to date
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
