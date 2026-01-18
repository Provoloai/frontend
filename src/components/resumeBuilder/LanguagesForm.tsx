import { Controller } from "react-hook-form";
import { Trash2, Globe } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import CustomButton from "@/Reusables/CustomButton";
import TextInputField from "@/Reusables/TextInputField";

interface LanguagesFormProps {
  control: any;
  watch: any;
  setValue: any;
}

export const LanguagesForm: React.FC<LanguagesFormProps> = ({
  control,
  watch,
  setValue,
}) => {
  const languages = watch("languages") || [];

  const addLanguage = () => {
    setValue("languages", [
      ...languages,
      {
        id: Date.now().toString(),
        name: "",
        proficiency: "intermediate",
      },
    ]);
  };

  const removeLanguage = (id: string) => {
    setValue(
      "languages",
      languages.filter((language: any) => language.id !== id)
    );
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Languages</h3>
          <p className="text-xs text-gray-600 mt-1">
            List languages you can speak
          </p>
        </div>
        <div className="w-fit flex justify-end">
          <CustomButton onClick={addLanguage} className="btn-primary">
            {/* <Plus className="w-4 h-4" /> */}
            Add Language
          </CustomButton>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {languages.map((language: any, index: number) => (
          <motion.div
            key={language.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gray-50 border-2 border-gray-200 rounded-xl p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-teal-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  Language {index + 1}
                </span>
              </div>
              <button
                onClick={() => removeLanguage(language.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <Controller
              name={`languages.${index}.name`}
              control={control}
              render={({ field }) => (
                <TextInputField
                  {...field}
                  id={`language-name-${index}`}
                  label="Language"
                  placeholder="e.g. English, Spanish, Mandarin"
                  iconStart={<Globe className="w-4 h-4 text-gray-400" />}
                />
              )}
            />

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700">
                Proficiency Level
              </label>
              <Controller
                name={`languages.${index}.proficiency`}
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full px-4 py-2.5 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="elementary">Elementary</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="fluent">Fluent</option>
                    <option value="native">Native</option>
                  </select>
                )}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {languages.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Globe className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600">No languages added yet</p>
        </div>
      )}
    </motion.div>
  );
};
