import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { AtSign, Sparkles } from "lucide-react";
import CustomButton from "../../Reusables/CustomButton";
import TextInputField from "../../Reusables/TextInputField";
import { auth, db } from "../../lib/firebase";
import { updateUserDisplayName } from "../../utils/firebase.util";
import { getCleanErrorMessage } from "../../utils/firebaseError.util";
import useAuthStore from "../../stores/authStore";

export default function UserName() {
  const [open,] = useState(true);
  const [username, setUsername] = useState("");
  const [touched, setTouched] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const setUser = useAuthStore((state) => state.setUser);

  // Demo function to console log the displayname and update it
  const handleContinue = async () => {
    if (!username.trim()) {
      setValidationErrors({ username: "Username is required" });
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const currentUser = auth.currentUser;
      if (currentUser) {
        // Pass db as the third parameter
        await updateUserDisplayName(currentUser, username, db);
        
        // Update the auth store with the new user data
        const updatedUserData = {
          uid: currentUser.uid,
          email: currentUser.email,
          emailVerified: currentUser.emailVerified,
          displayName: username,
          photoURL: currentUser.photoURL,
          createdAt: currentUser.metadata.creationTime,
          lastLoginAt: currentUser.metadata.lastSignInTime,
        };
        
        setUser(updatedUserData);
        setValidationErrors({});
      } else {
        setError("No authenticated user found. Please sign in again.");
      }
    } catch (error) {
      setError(getCleanErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={() => {}} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="text-center">
                  <div className="w-full flex items-center flex-col">
                    <div className=" flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:size-10">
                      <Sparkles />
                    </div>
                  </div>

                  <div className="text-center sm:mt-0 sm:text-left w-full">
                    <DialogTitle as="h3" className="text-2xl/9 font-medium tracking-tight text-gray-900 text-center mt-4">
                      What should we call you?
                    </DialogTitle>

                    {error && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}

                    <div className="my-5">
                      <TextInputField
                        id="username"
                        name="username"
                        required
                        autoComplete="current-username"
                        value={username}
                        iconStart={<AtSign size={20} />}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          validateField("username", e.target.value);
                        }}
                        onBlur={() => setTouched((prev) => ({ ...prev, username: true }))}
                        type="text"
                        label="Username"
                        placeholder="danielafriheart"
                        touched={touched.username}
                        error={validationErrors.username}
                      />
                    </div>

                    <CustomButton 
                      onClick={handleContinue} 
                      type="submit" 
                      className="btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Continue"}
                    </CustomButton>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
