import { Controller } from "react-hook-form";
import { Trash2, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import CustomButton from "@/Reusables/CustomButton";
import TextInputField from "@/Reusables/TextInputField";

interface HobbiesFormProps {
  control: any;
  watch: any;
  setValue: any;
}

export const HobbiesForm: React.FC<HobbiesFormProps> = ({
  control,
  watch,
  setValue,
}) => {
  const hobbies = watch("hobbies") || [];

  const addHobby = () => {
    setValue("hobbies", [
      ...hobbies,
      {
        id: Date.now().toString(),
        name: "",
        description: "",
      },
    ]);
  };

  const removeHobby = (id: string) => {
    setValue(
      "hobbies",
      hobbies.filter((hobby: any) => hobby.id !== id)
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
          <h3 className="text-base font-semibold text-gray-900">
            Hobbies & Interests
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            Share your personal interests
          </p>
        </div>
        <div className="w-fit flex justify-end">
          <CustomButton onClick={addHobby} className="btn-primary">
            {/* <Plus className="w-4 h-4" /> */}
            Add Hobby
          </CustomButton>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {hobbies.map((hobby: any, index: number) => (
          <motion.div
            key={hobby.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gray-50 border-2 border-gray-200 rounded-xl p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-pink-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  Hobby {index + 1}
                </span>
              </div>
              <button
                onClick={() => removeHobby(hobby.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <Controller
              name={`hobbies.${index}.name`}
              control={control}
              render={({ field }) => (
                <TextInputField
                  {...field}
                  id={`hobby-name-${index}`}
                  label="Hobby/Interest"
                  placeholder="e.g. Photography, Chess, Hiking"
                  iconStart={<Heart className="w-4 h-4 text-gray-400" />}
                />
              )}
            />

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700">
                Description (Optional)
              </label>
              <Controller
                name={`hobbies.${index}.description`}
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="Brief description of your hobby or interest..."
                    rows={2}
                    className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                )}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {hobbies.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Heart className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600">No hobbies added yet</p>
        </div>
      )}
    </motion.div>
  );
};
