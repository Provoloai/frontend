import { Controller } from "react-hook-form";
import { FileText, Lightbulb } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import TextInputField from "@/Reusables/TextInputField";

interface SummaryFormProps {
  control: any;
}

export const SummaryForm: React.FC<SummaryFormProps> = ({ control }) => {
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
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
      <motion.div variants={itemVariants} className="space-y-2">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-semibold text-gray-900">
            Tell Your Story
          </h3>
        </div>
        <p className="text-sm text-gray-600">
          Write a compelling summary that highlights your key achievements, skills, and career goals.
        </p>
      </motion.div>

      {/* Textarea */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Controller
          name="summary"
          control={control}
          render={({ field, fieldState }) => (
            <TextInputField
              id="summary"
              label="Professional Summary"
              variant="rich-text"
              placeholder="Example: Results-driven software engineer with 5+ years of experience in full-stack development..."
              helperText="Briefly describe your career background and key goals."
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              touched={fieldState.isTouched}
              error={fieldState.error?.message}
            />
          )}
        />
        <div className="flex justify-end pt-1">
          <div className="text-xs text-gray-500">
            {charCount}/{maxChars}
          </div>
        </div>
      </motion.div>

      {/* Tips Section */}
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
          <span className="text-[11px] font-bold text-blue-900 underline decoration-blue-200 underline-offset-2 uppercase tracking-tight">Writing Tips</span>
        </div>

        <div className="space-y-2 px-1">
          <div className="flex items-start gap-3">
            <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              <span className="font-bold">Be specific:</span> Include years of experience and key technical skills
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              <span className="font-bold">Show impact:</span> Mention notable achievements or results
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              <span className="font-bold">Keep it focused:</span> Aim for 3-5 sentences that capture your value
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};