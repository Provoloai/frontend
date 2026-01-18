import { Controller } from "react-hook-form";
import { Trash2, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import CustomButton from "@/Reusables/CustomButton";
import TextInputField from "@/Reusables/TextInputField";

interface SkillsFormProps {
  control: any;
  watch: any;
  setValue: any;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ control, watch, setValue }) => {
  const skills = watch('skills') || [];

  const addSkill = () => {
    setValue('skills', [
      ...skills,
      { id: Date.now().toString(), name: '', level: 3 }
    ]);
  };

  const removeSkill = (id: string) => {
    setValue('skills', skills.filter((skill: any) => skill.id !== id));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 }
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
          <h3 className="text-base font-semibold text-gray-900">Skills & Expertise</h3>
          <p className="text-xs text-gray-600 mt-1">Showcase your technical and soft skills</p>
        </div>
        <div className="w-fit flex justify-end">

        <CustomButton onClick={addSkill} className="btn-primary">
          Add Skill
        </CustomButton>
        </div>
      </div>

      {/* Skills List */}
      <AnimatePresence mode="popLayout">
        {skills.map((skill: any, index: number) => (
          <motion.div
            key={skill.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-5 space-y-4 hover:border-blue-300 hover:shadow-md transition-all"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  Skill {index + 1}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeSkill(skill.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Skill Name */}
            <Controller
              name={`skills.${index}.name`}
              control={control}
              render={({ field }) => (
                <TextInputField
                  {...field}
                  id={`skill-${index}`}
                  label="Skill Name"
                  placeholder="e.g. JavaScript, Project Management, Communication"
                  iconStart={<Zap className="w-4 h-4 text-gray-400" />}
                />
              )}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Empty State */}
      {skills.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
        >
          <Zap className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600 mb-1">No skills added yet</p>
          <p className="text-xs text-gray-500">Click "Add Skill" to showcase your expertise</p>
        </motion.div>
      )}

      {/* Tips */}
      <motion.div 
        variants={itemVariants}
        className="bg-blue-50 border border-blue-200 rounded-lg p-4"
      >
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-xs font-semibold text-blue-900">Pro Tips:</p>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Include both technical and soft skills</li>
              <li>• Be honest about your proficiency levels</li>
              <li>• Focus on skills relevant to your target role</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkillsForm;