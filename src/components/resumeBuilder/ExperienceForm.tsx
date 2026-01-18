import { Controller } from "react-hook-form";
import { Trash2, Briefcase, Calendar, MapPin, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import CustomButton from "@/Reusables/CustomButton";
import TextInputField from "@/Reusables/TextInputField";

interface ExperienceFormProps {
  control: any;
  watch: any;
  setValue: any;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ control, watch, setValue }) => {
  const experience = watch('experience') || [];

  const addExperience = () => {
    setValue('experience', [
      ...experience,
      {
        id: Date.now().toString(),
        jobTitle: '',
        employer: '',
        city: '',
        country: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        description: '',
      }
    ]);
  };

  const removeExperience = (id: string) => {
    setValue('experience', experience.filter((exp: any) => exp.id !== id));
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
          <h3 className="text-base font-semibold text-gray-900">Work Experience</h3>
          <p className="text-xs text-gray-600 mt-1">Add your relevant work history</p>
        </div>

        <div className="w-fit flex justify-end">

        <CustomButton onClick={addExperience} className="btn-primary">
          {/* <Plus className="w-4 h-4" /> */}
          Add Experience
        </CustomButton>
        </div>
      </div>

      {/* Experience List */}
      <AnimatePresence mode="popLayout">
        {experience.map((exp: any, index: number) => (
          <motion.div
            key={exp.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            className="bg-gray-50 border-2 border-gray-200 rounded-xl p-5 space-y-4 hover:border-blue-300 transition-colors"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  Position {index + 1}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeExperience(exp.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Job Title & Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name={`experience.${index}.jobTitle`}
                control={control}
                render={({ field }) => (
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
                render={({ field }) => (
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
                render={({ field }) => (
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
                render={({ field }) => (
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
                render={({ field }) => (
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
                render={({ field }) => (
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
            <label className="flex items-center gap-2 cursor-pointer group">
              <Controller
                name={`experience.${index}.currentlyWorking`}
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                )}
              />
              <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                I currently work here
              </span>
            </label>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700">Description</label>
              <Controller
                name={`experience.${index}.description`}
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="• Developed and maintained web applications&#10;• Collaborated with cross-functional teams&#10;• Improved system performance by 40%"
                    rows={5}
                    className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                  />
                )}
              />
              <p className="text-xs text-gray-500">Use bullet points to list your key responsibilities and achievements</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

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