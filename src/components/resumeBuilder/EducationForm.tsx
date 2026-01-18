import { Controller } from "react-hook-form";
import { Trash2, GraduationCap, Calendar, MapPin, School } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import CustomButton from "@/Reusables/CustomButton";
import TextInputField from "@/Reusables/TextInputField";

interface EducationFormProps {
  control: any;
  watch: any;
  setValue: any;
}

const EducationForm: React.FC<EducationFormProps> = ({ control, watch, setValue }) => {
  const education = watch('education') || [];

  const addEducation = () => {
    setValue('education', [
      ...education,
      {
        id: Date.now().toString(),
        degree: '',
        school: '',
        city: '',
        country: '',
        startDate: '',
        endDate: '',
        currentlyStudying: false,
        description: '',
      }
    ]);
  };

  const removeEducation = (id: string) => {
    setValue('education', education.filter((edu: any) => edu.id !== id));
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
          <h3 className="text-base font-semibold text-gray-900">Education</h3>
          <p className="text-xs text-gray-600 mt-1">Add your educational background</p>
        </div>
        <div className="w-fit flex justify-end">

        <CustomButton onClick={addEducation} className="btn-primary">
          {/* <Plus className="w-4 h-4" /> */}
          Add Education
        </CustomButton>
        </div>
      </div>

      {/* Education List */}
      <AnimatePresence mode="popLayout">
        {education.map((edu: any, index: number) => (
          <motion.div
            key={edu.id}
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
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  Education {index + 1}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeEducation(edu.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Degree & School */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name={`education.${index}.degree`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    {...field}
                    id={`degree-${index}`}
                    label="Degree"
                    placeholder="e.g. Bachelor of Science"
                    iconStart={<GraduationCap className="w-4 h-4 text-gray-400" />}
                  />
                )}
              />

              <Controller
                name={`education.${index}.school`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    {...field}
                    id={`school-${index}`}
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
                name={`education.${index}.city`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    {...field}
                    id={`edu-city-${index}`}
                    label="City"
                    placeholder="City"
                    iconStart={<MapPin className="w-4 h-4 text-gray-400" />}
                  />
                )}
              />

              <Controller
                name={`education.${index}.country`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    {...field}
                    id={`edu-country-${index}`}
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
                name={`education.${index}.startDate`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    {...field}
                    id={`edu-startDate-${index}`}
                    label="Start Date"
                    type="date"
                    iconStart={<Calendar className="w-4 h-4 text-gray-400" />}
                  />
                )}
              />

              <Controller
                name={`education.${index}.endDate`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    {...field}
                    id={`edu-endDate-${index}`}
                    label="End Date"
                    type="date"
                    disabled={edu.currentlyStudying}
                    iconStart={<Calendar className="w-4 h-4 text-gray-400" />}
                  />
                )}
              />
            </div>

            {/* Currently Studying */}
            <label className="flex items-center gap-2 cursor-pointer group">
              <Controller
                name={`education.${index}.currentlyStudying`}
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
                I currently study here
              </span>
            </label>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700">Additional Details (Optional)</label>
              <Controller
                name={`education.${index}.description`}
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="e.g. GPA: 3.8/4.0, Dean's List, Relevant coursework..."
                    rows={3}
                    className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                  />
                )}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Empty State */}
      {education.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
        >
          <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600 mb-1">No education added yet</p>
          <p className="text-xs text-gray-500">Click "Add Education" to get started</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EducationForm;