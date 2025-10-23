import { motion } from "motion/react";
import TextInputField from "../../Reusables/TextInputField";
import CustomButton from "../../Reusables/CustomButton";
import CustomSnackbar from "../../Reusables/CustomSnackbar";
import {
  optimizerContainerVariants,
  optimizerItemVariants,
  optimizerCardVariants,
} from "@/constants/animations";
import type {
  OptimizerFormData,
  OptimizerTouchedFields,
} from "@/types/optimizer";

interface OptimizerFormProps {
  formData: OptimizerFormData;
  touched: OptimizerTouchedFields;
  isLoading: boolean;
  error: string;
  onInputChange: (field: keyof OptimizerFormData, value: string) => void;
  onBlur: (field: keyof OptimizerTouchedFields) => void;
  onSubmit: () => void;
  onErrorClose: () => void;
}

const OptimizerForm: React.FC<OptimizerFormProps> = ({
  formData,
  touched,
  isLoading,
  error,
  onInputChange,
  onBlur,
  onSubmit,
  onErrorClose,
}) => {
  return (
    <motion.div
      className="mb-8 p-5 bg-white rounded-lg border border-gray-200"
      variants={optimizerCardVariants}
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        variants={optimizerContainerVariants}
      >
        <motion.div variants={optimizerItemVariants}>
          <TextInputField
            id="freelancerName"
            label="Full Name"
            placeholder="John Doe"
            value={formData.freelancerName}
            onChange={(e) => onInputChange("freelancerName", e.target.value)}
            onBlur={() => onBlur("name")}
            touched={touched.name || !!error}
            required
          />
        </motion.div>

        <motion.div variants={optimizerItemVariants}>
          <TextInputField
            id="profileTitle"
            label="Professional Title"
            placeholder="Senior Full-Stack Developer | React & Node.js Expert"
            value={formData.profileTitle}
            onChange={(e) => onInputChange("profileTitle", e.target.value)}
            onBlur={() => onBlur("title")}
            touched={touched.title || !!error}
            required
          />
        </motion.div>
      </motion.div>

      <motion.div className="mb-4" variants={optimizerItemVariants}>
        <label htmlFor="profileDescription" className="block text-sm mb-2">
          About You (Profile Overview)
        </label>

        <textarea
          required
          id="profileDescription"
          className={`w-full p-3 border rounded-md transition duration-150 ease-in-out bg-gray-50 placeholder:text-sm ${
            error ||
            (touched.description && !formData?.profileDescription?.trim())
              ? "ring-1 ring-red-600/10 ring-inset focus:ring-red-500 bg-red-50 placeholder-red-700"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          }`}
          rows={8}
          style={{ maxHeight: "28em", resize: "vertical" }}
          placeholder="Paste your profile overview & summary of your services here..."
          value={formData.profileDescription}
          onChange={(e) => onInputChange("profileDescription", e.target.value)}
          onBlur={() => onBlur("description")}
        />

        {(error ||
          (touched.description && !formData.profileDescription.trim())) && (
          <p className="text-xs text-red-700">Required</p>
        )}
      </motion.div>

      <motion.div variants={optimizerItemVariants}>
        <CustomButton
          onClick={onSubmit}
          isLoading={isLoading}
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
    </motion.div>
  );
};

export default OptimizerForm;
