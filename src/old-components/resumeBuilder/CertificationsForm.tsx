import {
  Control,
  Controller,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import {
  Trash2,
  Award,
  Calendar,
  Building2,
  LinkIcon,
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
import { Resume, Certification } from "@/types";

interface CertificationsFormProps {
  control: Control<Resume>;
  watch: UseFormWatch<Resume>;
  setValue: UseFormSetValue<Resume>;
}

interface CertificationItemProps {
  certification: Certification;
  index: number;
  control: Control<Resume>;
  isExpanded: boolean;
  onToggle: () => void;
  onRemove: (id: string) => void;
}

const CertificationItem: React.FC<CertificationItemProps> = ({
  certification,
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
      value={certification}
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
                isExpanded ? "bg-amber-100" : "bg-gray-200"
              }`}
            >
              <Award
                className={`w-4 h-4 ${isExpanded ? "text-amber-600" : "text-gray-500"}`}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900 line-clamp-1">
                {certification.name || "Certification Name"}
              </span>
              <span className="text-xs text-gray-500 line-clamp-1">
                {certification.issuingOrganization || "Issuing Organization"}
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
                {/* Certification Name */}
                <Controller
                  name={`content.certifications.${index}.name`}
                  control={control}
                  render={({ field }: { field: any }) => (
                    <TextInputField
                      {...field}
                      id={`cert-name-${index}`}
                      label="Certification Name"
                      placeholder="e.g. AWS Certified Solutions Architect"
                      iconStart={<Award className="w-4 h-4 text-gray-400" />}
                    />
                  )}
                />

                {/* Issuing Organization */}
                <Controller
                  name={`content.certifications.${index}.issuingOrganization`}
                  control={control}
                  render={({ field }: { field: any }) => (
                    <TextInputField
                      {...field}
                      id={`cert-org-${index}`}
                      label="Issuing Organization"
                      placeholder="e.g. Amazon Web Services"
                      iconStart={
                        <Building2 className="w-4 h-4 text-gray-400" />
                      }
                    />
                  )}
                />

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name={`content.certifications.${index}.issueDate`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`cert-issueDate-${index}`}
                        label="Issue Date"
                        type="date"
                        iconStart={
                          <Calendar className="w-4 h-4 text-gray-400" />
                        }
                      />
                    )}
                  />

                  <Controller
                    name={`content.certifications.${index}.expirationDate`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`cert-expDate-${index}`}
                        label="Expiration Date (Optional)"
                        type="date"
                        iconStart={
                          <Calendar className="w-4 h-4 text-gray-400" />
                        }
                      />
                    )}
                  />
                </div>

                {/* Credential ID & URL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    name={`content.certifications.${index}.credentialId`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`cert-credId-${index}`}
                        label="Credential ID (Optional)"
                        placeholder="e.g. ABC123XYZ"
                        iconStart={<Award className="w-4 h-4 text-gray-400" />}
                      />
                    )}
                  />

                  <Controller
                    name={`content.certifications.${index}.credentialUrl`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`cert-url-${index}`}
                        label="Credential URL (Optional)"
                        placeholder="https://..."
                        iconStart={
                          <LinkIcon className="w-4 h-4 text-gray-400" />
                        }
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
          onRemove(certification.id || "");
        }}
        className={`absolute -right-2 -top-2 p-1.5 bg-white border border-gray-200 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full shadow-md transition-all duration-300 z-10 ${
          isExpanded
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
        }`}
        title="Remove Certification"
      >
        <Trash2 className="w-4 h-4" />
      </motion.button>
    </Reorder.Item>
  );
};

export const CertificationsForm: React.FC<CertificationsFormProps> = ({
  control,
  watch,
  setValue,
}) => {
  const certifications = watch("content.certifications") || [];
  const [expandedId, setExpandedId] = useState<string | null>(
    certifications[0]?.id || null
  );

  const addCertification = () => {
    const newId = Date.now().toString();
    const newCertification: Certification = {
      id: newId,
      name: "",
      issuingOrganization: "",
      issueDate: "",
      expirationDate: "",
      credentialId: "",
      credentialUrl: "",
    };
    setValue("content.certifications", [newCertification, ...certifications]);
    setExpandedId(newId);
  };

  const removeCertification = (id: string) => {
    setValue(
      "content.certifications",
      certifications.filter(cert => cert.id !== id)
    );
    if (expandedId === id) setExpandedId(null);
  };

  const handleReorder = (newOrder: Certification[]) => {
    setValue("content.certifications", newOrder, {
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
          <h3 className="text-base font-semibold text-gray-900">
            Certifications
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            List your professional certifications
          </p>
        </div>

        <div className="w-fit flex justify-end">
          <CustomButton onClick={addCertification} className="btn-primary">
            Add Certification
          </CustomButton>
        </div>
      </div>

      {/* Certifications List */}
      <Reorder.Group
        axis="y"
        values={certifications}
        onReorder={handleReorder}
        className="space-y-4 px-2"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {certifications.map((cert: Certification, index: number) => (
            <CertificationItem
              key={cert.id}
              certification={cert}
              index={index}
              control={control}
              isExpanded={expandedId === cert.id}
              onToggle={() => toggleExpand(cert.id || "")}
              onRemove={removeCertification}
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>

      {/* Empty State */}
      {certifications.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
        >
          <Award className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600 mb-1">
            No certifications added yet
          </p>
          <p className="text-xs text-gray-500">
            Click "Add Certification" to get started
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
              Include **credential IDs** and **verification links** for
              authenticity
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              List certifications **most relevant** to your target role first
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Note **expiration dates** if the certification requires renewal
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
