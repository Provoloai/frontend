import { Controller } from "react-hook-form";
import { Trash2, Users, Mail, Phone, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import CustomButton from "@/Reusables/CustomButton";
import TextInputField from "@/Reusables/TextInputField";

interface ReferencesFormProps {
  control: any;
  watch: any;
  setValue: any;
}

export const ReferencesForm: React.FC<ReferencesFormProps> = ({
  control,
  watch,
  setValue,
}) => {
  const references = watch("references") || [];

  const addReference = () => {
    setValue("references", [
      ...references,
      {
        id: Date.now().toString(),
        name: "",
        position: "",
        company: "",
        email: "",
        phone: "",
      },
    ]);
  };

  const removeReference = (id: string) => {
    setValue(
      "references",
      references.filter((reference: any) => reference.id !== id)
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
          <h3 className="text-base font-semibold text-gray-900">References</h3>
          <p className="text-xs text-gray-600 mt-1">
            Add professional references
          </p>
        </div>
        <div className="w-fit flex justify-end">
          <CustomButton onClick={addReference} className="btn-primary">
            {/* <Plus className="w-4 h-4" /> */}
            Add Reference
          </CustomButton>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {references.map((reference: any, index: number) => (
          <motion.div
            key={reference.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gray-50 border-2 border-gray-200 rounded-xl p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
                  <Users className="w-4 h-4 text-cyan-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  Reference {index + 1}
                </span>
              </div>
              <button
                onClick={() => removeReference(reference.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <Controller
              name={`references.${index}.name`}
              control={control}
              render={({ field }) => (
                <TextInputField
                  {...field}
                  id={`reference-name-${index}`}
                  label="Full Name"
                  placeholder="e.g. John Doe"
                  iconStart={<Users className="w-4 h-4 text-gray-400" />}
                />
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name={`references.${index}.position`}
                control={control}
                render={({ field }) => (
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
                render={({ field }) => (
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

            <Controller
              name={`references.${index}.email`}
              control={control}
              render={({ field }) => (
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
              render={({ field }) => (
                <TextInputField
                  {...field}
                  id={`reference-phone-${index}`}
                  label="Phone (Optional)"
                  placeholder="+1 (555) 000-0000"
                  iconStart={<Phone className="w-4 h-4 text-gray-400" />}
                />
              )}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {references.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600">No references added yet</p>
        </div>
      )}
    </motion.div>
  );
};
