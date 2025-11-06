import { Link } from "@tanstack/react-router";
import { Key, Mail } from "lucide-react";
import TextInputField from "@/Reusables/TextInputField";
import CustomButton from "@/Reusables/CustomButton";
import CustomSnackbar from "@/Reusables/CustomSnackbar";
import { LOGIN_CONFIG } from "@/constants/auth";
import type { LoginFormProps } from "@/types/auth";

const LoginForm: React.FC<LoginFormProps> = ({
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
    <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-white lg:p-10 md:p-8 p-5 mt-10 rounded-md border z-30">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl/9 font-medium tracking-tight text-gray-900">
          {LOGIN_CONFIG.title}
        </h2>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-6">
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
              placeholder={LOGIN_CONFIG.emailPlaceholder}
              onChange={(e) => onInputChange("email", e.target.value)}
              onBlur={() => onBlur("email")}
              touched={touched.email || !!error}
            />
          </div>
        </div>

        <div>
          <div className="mt-2">
            <TextInputField
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={(e) => onInputChange("password", e.target.value)}
              type="password"
              label="Password"
              iconStart={<Key size={20} />}
              placeholder={LOGIN_CONFIG.passwordPlaceholder}
              onBlur={() => onBlur("password")}
              touched={touched.password || !!error}
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="underline text-gray-600 hover:text-gray-500 text-xs text-right"
          >
            {LOGIN_CONFIG.forgotPasswordText}
          </Link>
        </div>

        <div>
          <CustomButton type="submit" disabled={isLoading} className="btn-primary text-sm">
            {isLoading ? LOGIN_CONFIG.loadingText : LOGIN_CONFIG.submitText}
          </CustomButton>
        </div>
      </form>

      <p className="mt-5 text-center text-xs text-gray-500">
        {LOGIN_CONFIG.signUpText}{" "}
        <Link to="/signup">
          <span className="underline text-gray-600 hover:text-gray-500">
            {LOGIN_CONFIG.signUpLinkText}
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

export default LoginForm;
