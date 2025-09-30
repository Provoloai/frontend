import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { z } from "zod";
import { auth } from "../../lib/firebase";
import Logo from "../../Reusables/Logo";
import TextInputField from "../../Reusables/TextInputField";
import CustomButton from "../../Reusables/CustomButton";
import { useNavigate } from "@tanstack/react-router";
import { getCleanErrorMessage } from "../../utils/firebaseError.util";
import { Mail } from "lucide-react";

// Zod schema for email validation
const forgotPasswordSchema = z.object({
  email: z.email("Enter a valid email address"),
});

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [success, setSuccess] = useState("");
    const [touched, setTouched] = useState({});
    const [validationErrors, setValidationErrors] = useState({});

    // Validation function
    const validateField = (name, value) => {
        try {
            if (name === "email") {
                forgotPasswordSchema.pick({ email: true }).parse({ email: value });
                setValidationErrors((prev) => ({ ...prev, email: "" }));
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                let errorMessage = "Invalid input";
                
                if (error.errors && error.errors.length > 0 && error.errors[0].message) {
                    errorMessage = error.errors[0].message;
                } else if (error.issues && error.issues.length > 0 && error.issues[0].message) {
                    errorMessage = error.issues[0].message;
                }
                
                setValidationErrors((prev) => ({
                    ...prev,
                    [name]: errorMessage,
                }));
            }
        }
    };

    // Updated function to send password reset email
    const sendResetEmail = async (email) => {
        try {
            setLoading(true);
            setError("");
            
            await sendPasswordResetEmail(auth, email);
            
            // Use existing success state instead of toast
            setSuccess("Password reset email sent! Check your inbox and spam folder.");
            setEmailSent(true);
            
            // Navigate to login after a short delay
            setTimeout(() => {
                navigate({ to: "/login" });
            }, 15_000);
            
        } catch (error) {
            setError(getCleanErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Run form validation
        const validationResult = forgotPasswordSchema.safeParse({ email });
        
        if (!validationResult.success) {
            const newErrors = {};
            
            validationResult.error?.errors?.forEach((error) => {
                const field = error.path[0];
                newErrors[field] = error.message;
            });
            
            setValidationErrors(newErrors);
            setError("Please fix the errors below");
            return;
        }
        
        // Clear any previous errors
        setValidationErrors({});
        setError("");
        
        await sendResetEmail(email);
    };

    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
            <Logo />
            <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-white p-10 mt-10 rounded-md border">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        {emailSent ? "Email Sent!" : "Forgot Password?"}
                    </h2>
                    {emailSent && (
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Redirecting you to login...
                        </p>
                    )}
                </div>
                
                {!emailSent ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="rounded-md bg-red-50 p-4">
                                <div className="text-sm text-red-700">{error}</div>
                            </div>
                        )}
                        
                        <div>
                            <div className="mt-2">
                                <TextInputField
                                    id="email"
                                    name="email"
                                    required
                                    type="email"
                                    value={email}
                                    autoComplete="email"
                                    label="Email"
                                    iconStart={<Mail size={20} />}
                                    placeholder="example@mail.com"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        validateField("email", e.target.value);
                                    }}
                                    onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                                    touched={touched.email || validationErrors.email}
                                    error={validationErrors.email}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div>
                            <CustomButton 
                                type="submit" 
                                disabled={loading || emailSent} 
                                className="bg-red-600 hover:bg-red-500 transition-all duration-300"
                            >
                                {loading ? "Sending..." : emailSent ? "Email Sent" : "Send Reset Email"}
                            </CustomButton>
                        </div>
                    </form>
                ) : (
                    <div className="text-center py-8">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                            <Mail className="h-6 w-6 text-green-600" />
                        </div>
                        <p className="text-sm text-gray-600">
                            Check your email for the password reset link.
                        </p>
                    </div>
                )}
                
                <p className="mt-5 text-center text-xs text-gray-500">
                    Remember your password?{" "}
                    <button 
                        onClick={() => navigate({ to: "/login" })}
                        className="underline text-gray-600 hover:text-gray-500"
                    >
                        Sign In
                    </button>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
