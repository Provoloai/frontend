import { motion } from "motion/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInputField from "../../Reusables/TextInputField";
import CustomButton from "../../Reusables/CustomButton";
import CustomSnackbar from "../../Reusables/CustomSnackbar";
import {
  optimizerContainerVariants,
  optimizerItemVariants,
  optimizerCardVariants,
} from "@/constants/animations";
import { portfolioInputSchema, type PortfolioFormData } from "@/schemas/portfolioSchema";

interface OptimizerFormProps {
  isLoading: boolean;
  error: string;
  onSubmit: (data: PortfolioFormData) => void;
  onErrorClose: () => void;
}

const OptimizerForm: React.FC<OptimizerFormProps> = ({
  isLoading,
  error,
  onSubmit,
  onErrorClose,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioInputSchema),
    mode: "onBlur", // Validate on blur for better UX
    defaultValues: {
      freelancerName: "",
      profileTitle: "",
      profileDescription: "",
    },
  });

  // Watch the description field for word/character counter
  const descriptionValue = watch("profileDescription") || "";
  const characterCount = descriptionValue.length;
  const wordCount = descriptionValue.trim() ? descriptionValue.trim().split(/\s+/).length : 0;
  const minChars = 50;
  const maxChars = 5000;
  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-8 p-5 bg-white rounded-lg border border-gray-200"
      variants={optimizerCardVariants}
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        variants={optimizerContainerVariants}
      >
        <motion.div variants={optimizerItemVariants}>
          <Controller
            name="freelancerName"
            control={control}
            render={({ field }) => (
              <TextInputField
                id="freelancerName"
                label="Full Name"
                placeholder="Nina Nonymous"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                touched={!!errors.freelancerName}
                error={errors.freelancerName?.message}
                required
              />
            )}
          />
        </motion.div>

        <motion.div variants={optimizerItemVariants}>
          <Controller
            name="profileTitle"
            control={control}
            render={({ field }) => (
              <TextInputField
                id="profileTitle"
                label="Professional Title"
                placeholder="UiUx Designer | WordPress Developer..."
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                touched={!!errors.profileTitle}
                error={errors.profileTitle?.message}
                required
              />
            )}
          />
        </motion.div>
      </motion.div>

      <motion.div className="mb-4" variants={optimizerItemVariants}>
        <label htmlFor="profileDescription" className="block text-sm mb-2">
          About You (Profile Overview)
        </label>

        <Controller
          name="profileDescription"
          control={control}
          render={({ field }) => (
            <textarea
              id="profileDescription"
              name={field.name}
              className={`w-full p-3 border rounded-md transition duration-150 ease-in-out bg-gray-50 placeholder:text-sm ${errors.profileDescription
                  ? "ring-1 ring-red-600/10 ring-inset focus:ring-red-500 bg-red-50 placeholder-red-700"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
              rows={8}
              style={{ maxHeight: "28em", resize: "vertical" }}
              placeholder="Paste your profile overview & summary of your services here..."
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />

        {errors.profileDescription && (
          <p className="text-xs text-red-700 mt-1">
            {errors.profileDescription.message}
          </p>
        )}

        {/* Word/Character Counter */}
        <div className="flex justify-between items-center mt-2">
          <div className="text-xs text-gray-500">
            {wordCount} {wordCount === 1 ? "word" : "words"} • {characterCount} {characterCount === 1 ? "character" : "characters"}
          </div>
          <div className={`text-xs ${characterCount < minChars
              ? "text-black"
              : characterCount > maxChars
                ? "text-red-600"
                : "text-gray-500"
            }`}>
            {characterCount} / {maxChars} characters
            {characterCount < minChars && ` (min: ${minChars})`}
          </div>
        </div>
      </motion.div>

      <motion.div variants={optimizerItemVariants}>
        <CustomButton
          type="submit"
          isLoading={isLoading || isSubmitting}
          className="btn-primary"
        >
          Run Optimization
        </CustomButton>
      </motion.div>

      {error && (
        <CustomSnackbar
          open={!!error}
          close={onErrorClose}
          snackbarColor="danger"
          snackbarMessage={error}
        />
      )}
    </motion.form>
  );
};

export default OptimizerForm;
