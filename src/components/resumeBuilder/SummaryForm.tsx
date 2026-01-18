import { Controller } from "react-hook-form";
import { FileText, Lightbulb } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

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
        <label className="block text-sm font-medium text-gray-700">
          Professional Summary
        </label>
        <div className="relative">
          <Controller
            name="summary"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  setCharCount(e.target.value.length);
                }}
                placeholder="Example: Results-driven software engineer with 5+ years of experience in full-stack development. Passionate about building scalable applications and mentoring junior developers..."
                maxLength={maxChars}
                rows={10}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
              />
            )}
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-500">
            {charCount}/{maxChars}
          </div>
        </div>
      </motion.div>

      {/* Tips Section */}
      <motion.div variants={itemVariants} className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <Lightbulb className="w-4 h-4 text-yellow-500" />
          Writing Tips
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
            <p className="text-xs text-gray-700">
              <span className="font-semibold">Be specific:</span> Include years of experience and key technical skills
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
            <p className="text-xs text-gray-700">
              <span className="font-semibold">Show impact:</span> Mention notable achievements or results
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
            <p className="text-xs text-gray-700">
              <span className="font-semibold">Keep it focused:</span> Aim for 3-5 sentences that capture your value
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
            <p className="text-xs text-gray-700">
              <span className="font-semibold">Make it relevant:</span> Tailor your summary to your target role
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};