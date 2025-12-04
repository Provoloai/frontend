import { Link } from "@tanstack/react-router";
import { Key, Mail } from "lucide-react";
// import { FcGoogle } from "react-icons/fc";
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
  // onGoogleSignIn,
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
              onChange={e => onInputChange("email", e.target.value)}
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
              onChange={e => onInputChange("password", e.target.value)}
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
          <CustomButton
            type="submit"
            disabled={isLoading}
            className="btn-primary text-sm"
          >
            {isLoading ? LOGIN_CONFIG.loadingText : LOGIN_CONFIG.submitText}
          </CustomButton>
        </div>

        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div>
          <CustomButton
            type="button"
            onClick={onGoogleSignIn}
            disabled={isLoading}
            isLoading={isLoading}
            loadingText="Signing in..."
            className="w-full flex justify-center items-center gap-3 bg-white border border-gray-300 !text-black hover:bg-gray-50 text-sm font-medium"
          >
            <span className="flex items-center gap-2">
              <FcGoogle size={20} />
              <p className="text-black text-sm">Sign in with Google</p>
            </span>
          </CustomButton>
        </div> */}
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
