import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Mail, Key, Check } from "lucide-react";
import CustomButton from "@/Reusables/CustomButton";
import TextInputField from "@/Reusables/TextInputField";
import CustomSnackbar from "@/Reusables/CustomSnackbar";
import { useAccountLinking } from "@/hooks/useAccountLinking";
import { UserData } from "@/types/user";
import { PASSWORD_REQUIREMENTS } from "@/constants/auth";
import { checkPasswordRequirements } from "@/utils/signupValidation.util";

interface AccountLinkingSectionProps {
  user: UserData | null | undefined;
}

export default function AccountLinkingSection({ user }: AccountLinkingSectionProps) {
  const {
    linkGoogle,
    setPassword,
    loading,
    error,
    successMessage,
    clearMessages,
  } = useAccountLinking();

  const [newPassword, setNewPassword] = useState("");


  if (!user) return null;

  const providers = user.providers || [];
  console.log("Current user providers:", providers); // Debugging provider string
  
  // Check for both common variations just in case, or rely on the log to fix it permanently later
  const hasGoogle = providers.some(p => p === "google.com" || p === "google");
  const hasPassword = providers.some(p => p === "password" || p === "email");

  const passwordRequirements = checkPasswordRequirements(newPassword);
  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid) return;
    await setPassword(newPassword);
    setNewPassword("");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Account Linking</h3>
        <p className="text-sm text-gray-500 mt-1">
          Manage your login methods and linked accounts.
        </p>
      </div>

      <div className="space-y-4">
        {/* Google Linking */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <FcGoogle size={20} />
            </div>
            <div>
              <p className="font-medium text-gray-900">Google</p>
              <p className="text-xs text-gray-500">
                {hasGoogle ? "Connected" : "Not connected"}
              </p>
            </div>
          </div>
          {hasGoogle ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-100">
              <Check size={14} />
              Linked
            </div>
          ) : (
            <span className="inline-block">
              <CustomButton
                onClick={linkGoogle}
                disabled={loading}
                className="text-xs px-4 py-2 h-auto min-h-0 bg-white border border-gray-300 text-black hover:bg-gray-50 shadow-sm rounded-md whitespace-nowrap"
              >
                Link Google
              </CustomButton>
            </span>
          )}
        </div>

        {/* Password Linking */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-full shadow-sm">
                <Mail size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Email & Password</p>
                <p className="text-xs text-gray-500">
                  {hasPassword ? "Password set" : "No password set"}
                </p>
              </div>
            </div>
            {hasPassword && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-100">
                <Check size={14} />
                Enabled
              </div>
            )}
          </div>

          {!hasPassword && (
            <form onSubmit={handleSetPassword} className="space-y-3 mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Set a password to login with your email address.
              </p>
              <div className="max-w-md">
                <TextInputField
                  id="new-password"
                  name="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onBlur={() => {}}
                  placeholder="Enter new password"
                  iconStart={<Key size={16} />}
                  label="New Password"
                />
              </div>
              
              {/* Password Requirements */}
              {newPassword && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {PASSWORD_REQUIREMENTS.map((req) => {
                    const met = passwordRequirements[req.key as keyof typeof passwordRequirements];
                    return (
                      <div
                        key={req.key}
                        className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border ${
                          met 
                            ? "bg-green-50 text-green-700 border-green-100" 
                            : "bg-gray-100 text-gray-500 border-gray-200"
                        }`}
                      >
                        {met ? <Check size={10} /> : <div className="w-2.5" />}
                        {req.label}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex justify-end">
                 <CustomButton
                  type="submit"
                  disabled={loading || !newPassword || !isPasswordValid}
                  className="text-xs px-4 py-2 h-auto min-h-0 bg-black text-white hover:bg-gray-800"
                >
                  Set Password
                </CustomButton>
              </div>
            </form>
          )}
        </div>
      </div>

      <CustomSnackbar
        open={!!error}
        snackbarColor="danger"
        snackbarMessage={error}
        close={clearMessages}
      />
      
      <CustomSnackbar
        open={!!successMessage}
        snackbarColor="success"
        snackbarMessage={successMessage}
        close={clearMessages}
      />
    </div>
  );
}
