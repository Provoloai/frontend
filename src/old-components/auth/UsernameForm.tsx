import { AtSign, Sparkles, UserRound } from "lucide-react";
import TextInputField from "@/Reusables/TextInputField";
import CustomButton from "@/Reusables/CustomButton";
import { USERNAME_CONFIG } from "@/constants/auth";
import type { UsernameFormProps } from "@/types/auth";

const UsernameForm: React.FC<UsernameFormProps> = ({
  formData,
  touched,
  validationErrors,
  isLoading,
  error,
  onInputChange,
  onBlur,
  onSubmit,
}) => {
  return (
    <div className="bg-white p-8">
      <div className="text-center">
        <div className="w-full flex items-center flex-col">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-50 sm:mx-0 sm:size-10 text-primary">
            <Sparkles />
          </div>
        </div>

        <div className="text-center sm:mt-0 sm:text-left w-full">
          <h3 className="text-2xl/9 font-medium tracking-tight text-gray-900 text-center mt-4">
            {USERNAME_CONFIG.title}
          </h3>

          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="my-6">
            <TextInputField
              id="username"
              name="username"
              required
              value={formData.username}
              iconStart={<UserRound size={20} />}
              onChange={(e) => onInputChange("username", e.target.value)}
              onBlur={() => onBlur("username")}
              type="text"
              label="Full Name"
              placeholder={USERNAME_CONFIG.placeholder}
              touched={touched.username}
              error={validationErrors.username}
            />
          </div>

          <CustomButton
            onClick={onSubmit}
            type="submit"
            className="btn-primary text-sm"
            disabled={isLoading}
          >
            {isLoading ? USERNAME_CONFIG.loadingText : USERNAME_CONFIG.submitText}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default UsernameForm;
