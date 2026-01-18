import { Controller } from "react-hook-form";
import { Trash2, Briefcase, Calendar, MapPin, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import CustomButton from "@/Reusables/CustomButton";
import TextInputField from "@/Reusables/TextInputField";

interface InternshipsFormProps {
  control: any;
  watch: any;
  setValue: any;
}

export const InternshipsForm: React.FC<InternshipsFormProps> = ({ control, watch, setValue }) => {
  const internships = watch('internships') || [];

  const addInternship = () => {
    setValue('internships', [
      ...internships,
      {
        id: Date.now().toString(),
        position: '',
        company: '',
        city: '',
        country: '',
        startDate: '',
        endDate: '',
        description: '',
      }
    ]);
  };

  const removeInternship = (id: string) => {
    setValue('internships', internships.filter((internship: any) => internship.id !== id));
  };

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Internships</h3>
          <p className="text-xs text-gray-600 mt-1">Add your internship experiences</p>
        </div>
        <div className="w-fit flex justify-end">
          <CustomButton onClick={addInternship} className="btn-primary">
            {/* <Plus className="w-4 h-4" /> */}
          Add Internship
          </CustomButton>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {internships.map((internship: any, index: number) => (
          <motion.div
            key={internship.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gray-50 border-2 border-gray-200 rounded-xl p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700">Internship {index + 1}</span>
              </div>
              <button
                onClick={() => removeInternship(internship.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name={`internships.${index}.position`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    {...field}
                    id={`internship-position-${index}`}
                    label="Position"
                    placeholder="e.g. Software Engineering Intern"
                    iconStart={<Briefcase className="w-4 h-4 text-gray-400" />}
                  />
                )}
              />

              <Controller
                name={`internships.${index}.company`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    {...field}
                    id={`internship-company-${index}`}
                    label="Company"
                    placeholder="e.g. Microsoft"
                    iconStart={<Building2 className="w-4 h-4 text-gray-400" />}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name={`internships.${index}.city`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    {...field}
                    id={`internship-city-${index}`}
                    label="City"
                    placeholder="City"
                    iconStart={<MapPin className="w-4 h-4 text-gray-400" />}
                  />
                )}
              />

              <Controller
                name={`internships.${index}.country`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    {...field}
                    id={`internship-country-${index}`}
                    label="Country"
                    placeholder="Country"
                    iconStart={<MapPin className="w-4 h-4 text-gray-400" />}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name={`internships.${index}.startDate`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    {...field}
                    id={`internship-startDate-${index}`}
                    label="Start Date"
                    type="date"
                    iconStart={<Calendar className="w-4 h-4 text-gray-400" />}
                  />
                )}
              />

              <Controller
                name={`internships.${index}.endDate`}
                control={control}
                render={({ field }) => (
                  <TextInputField
                    {...field}
                    id={`internship-endDate-${index}`}
                    label="End Date"
                    type="date"
                    iconStart={<Calendar className="w-4 h-4 text-gray-400" />}
                  />
                )}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700">Description</label>
              <Controller
                name={`internships.${index}.description`}
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="• Key responsibilities and projects&#10;• Skills gained&#10;• Achievements"
                    rows={4}
                    className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                )}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {internships.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600">No internships added yet</p>
        </div>
      )}
    </motion.div>
  );
};