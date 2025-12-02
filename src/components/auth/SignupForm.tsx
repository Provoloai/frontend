import { Link } from "@tanstack/react-router";
import { FcGoogle } from "react-icons/fc";
import { Check, Key, Mail, X } from "lucide-react";
import TextInputField from "@/Reusables/TextInputField";
import CustomButton from "@/Reusables/CustomButton";
import CustomSnackbar from "@/Reusables/CustomSnackbar";
import { SIGNUP_CONFIG, PASSWORD_REQUIREMENTS } from "@/constants/auth";
import type { SignupFormProps, RequirementItem } from "@/types/auth";

const SignupForm: React.FC<
  SignupFormProps & { onGoogleSignup?: () => void }
> = ({
  formData,
  touched,
  validationErrors,
  isLoading,
  error,
  requirements,
  onInputChange,
  onBlur,
  onSubmit,
  onErrorClose,
  onGoogleSignup,
}) => {
    const requirementsList: RequirementItem[] = PASSWORD_REQUIREMENTS.map(
      req => ({
        ...req,
        met: requirements[req.key],
      })
    );

    return (
      <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-white lg:p-10 md:p-8 p-5 mt-10 rounded-md border z-30">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl/9 font-medium tracking-tight text-gray-900">
            {SIGNUP_CONFIG.title}
          </h2>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <div className="mt-2">
              <TextInputField
                id="email"
                name="email"
                required
                type="email"
                value={formData.email}
                label="Email"
                placeholder={SIGNUP_CONFIG.emailPlaceholder}
                iconStart={<Mail size={20} />}
                onChange={e => onInputChange("email", e.target.value)}
                onBlur={() => onBlur("email")}
                touched={touched.email || !!validationErrors.email}
                error={validationErrors.email}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="mt-2">
              <TextInputField
                id="password"
                name="password"
                required
                value={formData.password}
                iconStart={<Key size={20} />}
                onChange={e => onInputChange("password", e.target.value)}
                onBlur={() => onBlur("password")}
                type="password"
                label="Password"
                placeholder={SIGNUP_CONFIG.passwordPlaceholder}
                touched={touched.password || !!validationErrors.password}
              />

              {/* Password Requirements */}
              <div className="mt-3 flex flex-wrap gap-2 items-center">
                {requirementsList.map(requirement => (
                  <div
                    key={requirement.key}
                    className={`flex items-center gap-1 h-full px-1.5 py-1 rounded ${requirement.met ? "bg-green-100" : "bg-gray-100"
                      }`}
                  >
                    {requirement.met ? (
                      <Check size={14} className="text-green-600" />
                    ) : (
                      <X size={14} className="text-gray-500" />
                    )}
                    <span
                      className={`text-xs font-medium ${requirement.met ? "text-green-600" : "text-gray-500"
                        }`}
                    >
                      {requirement.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <CustomButton
              type="submit"
              disabled={isLoading}
              className="btn-primary text-sm"
            >
              {isLoading ? SIGNUP_CONFIG.loadingText : SIGNUP_CONFIG.submitText}
            </CustomButton>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <CustomButton
            type="button"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 text-sm mt-2 border border-gray-300 bg-white text-black hover:bg-gray-50"
            onClick={onGoogleSignup}
          >
            <span className="flex items-center gap-2">
              <FcGoogle size={20} />
              <p className="text-black text-sm">Sign up with Google</p>
            </span>
          </CustomButton>
        </form>

        <p className="mt-5 text-center text-xs text-gray-500">
          {SIGNUP_CONFIG.signInText}{" "}
          <Link to="/login">
            <span className="underline text-gray-600 hover:text-gray-500">
              {SIGNUP_CONFIG.signInLinkText}
            </span>
          </Link>
        </p>

        {error && (
          <CustomSnackbar
            open={!!error}
            snackbarColor="danger"
            snackbarMessage={error}
            close={onErrorClose}
          />
        )}
      </div>
    );
  };

export default SignupForm;
