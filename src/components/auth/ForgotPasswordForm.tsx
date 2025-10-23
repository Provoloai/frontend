import { Mail } from "lucide-react";
import TextInputField from "@/Reusables/TextInputField";
import CustomButton from "@/Reusables/CustomButton";
import { FORGOT_PASSWORD_CONFIG } from "@/constants/auth";
import type { ForgotPasswordFormProps } from "@/types/auth";

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  formData,
  touched,
  validationErrors,
  isLoading,
  error,
  emailSent,
  success,
  onInputChange,
  onBlur,
  onSubmit,
}) => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-white lg:p-10 md:p-8 p-5 mt-10 rounded-md border z-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          {emailSent ? FORGOT_PASSWORD_CONFIG.emailSentTitle : FORGOT_PASSWORD_CONFIG.title}
        </h2>
        {emailSent && (
          <p className="mt-2 text-center text-sm text-gray-600">
            {FORGOT_PASSWORD_CONFIG.emailSentSubtitle}
          </p>
        )}
      </div>

      {!emailSent ? (
        <form onSubmit={onSubmit} className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="text-sm text-green-700">{success}</div>
            </div>
          )}

          <div>
            <div className="mt-2">
              <TextInputField
                id="email"
                name="email"
                required
                type="email"
                value={formData.email}
                label="Email"
                iconStart={<Mail size={20} />}
                placeholder={FORGOT_PASSWORD_CONFIG.emailPlaceholder}
                onChange={(e) => onInputChange("email", e.target.value)}
                onBlur={() => onBlur("email")}
                touched={touched.email}
                error={validationErrors.email}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <CustomButton
              type="submit"
              disabled={isLoading || emailSent}
              className="bg-red-600 hover:bg-red-500 transition-all duration-300 text-sm"
            >
              {isLoading
                ? FORGOT_PASSWORD_CONFIG.loadingText
                : emailSent
                ? FORGOT_PASSWORD_CONFIG.emailSentText
                : FORGOT_PASSWORD_CONFIG.submitText}
            </CustomButton>
          </div>
        </form>
      ) : (
        <div className="text-center py-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <Mail className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-sm text-gray-600">{FORGOT_PASSWORD_CONFIG.checkEmailMessage}</p>
        </div>
      )}

      <p className="mt-5 text-center text-xs text-gray-500">
        {FORGOT_PASSWORD_CONFIG.rememberPasswordText}{" "}
        <button
          onClick={() => window.location.href = "/login"}
          className="underline text-gray-600 hover:text-gray-500"
        >
          {FORGOT_PASSWORD_CONFIG.signInText}
        </button>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
