import React, { useState, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import CustomButton from "@/Reusables/CustomButton";
import { authApi } from "@/api";
import AuthLayout from "@/components/auth/AuthLayout";
import CustomSnackbar from "@/Reusables/CustomSnackbar";

const VerificationPage: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [touched, setTouched] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;

    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleBlur = (index: number): void => {
    const newTouched = [...touched];
    newTouched[index] = true;
    setTouched(newTouched);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }

    setOtp(newOtp);

    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex(val => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };
  const navigate = useNavigate();
  const handleVerify = async () => {
    setTouched([true, true, true, true, true, true]);
    const otpCode = otp.join("");
    try {
      const res = await authApi.verify(otpCode);
      if (res?.success) {
        navigate({ to: "/optimizer", replace: true });
        <CustomSnackbar
          open={res.success}
          snackbarColor="success"
          snackbarMessage={res?.message || ""}
        />;
      } else {
        <CustomSnackbar
          open={!res.success}
          snackbarColor="danger"
          snackbarMessage={res?.message || ""}
        />;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResend = async () => {
    const res = await authApi.sendVerificationCode();

    if (res?.success) {
      <CustomSnackbar
        open={res.success}
        snackbarColor="success"
        snackbarMessage={res?.message || ""}
      />;
    } else {
      <CustomSnackbar
        open={!res.success}
        snackbarColor="danger"
        snackbarMessage={res?.message || ""}
      />;
    }
  };

  const isComplete = otp.every(digit => digit !== "");
  const hasError = touched.some((t, idx) => t && !otp[idx]);

  return (
    <AuthLayout>
      <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-white lg:p-10 md:p-8 p-5 mt-10 rounded-md border z-30">
        {/* Card */}
        <div className="p-8">
          <h1 className="text-2xl font-medium text-center mb-2">
            Verify Your Email
          </h1>
          <p className="text-sm text-gray-600 text-center mb-8">
            We've sent a 6-digit code to your email address.
            <br />
            Please enter it below.
          </p>

          {/* OTP Input */}
          <div className="mb-3 md:mb-6">
            <label className="block text-sm mb-2">
              Enter Verification Code
            </label>
            <div className="flex gap-2 justify-between">
              {otp.map((digit, index) => (
                <div key={index} className="flex-1">
                  <input
                    ref={el => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleChange(index, e)}
                    onKeyDown={e => handleKeyDown(index, e)}
                    onBlur={() => handleBlur(index)}
                    onPaste={handlePaste}
                    className={`w-full h-10 md:h-14 text-center text-md font-semibold p-3 border rounded-md transition duration-150 ease-in-out bg-gray-50 ${
                      touched[index] && !digit
                        ? "ring-1 ring-red-600/10 ring-inset bg-red-50 border-red-300"
                        : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    } focus:outline-none`}
                  />
                </div>
              ))}
            </div>
            {hasError && (
              <p className="text-xs text-red-700 mt-1 text-center">
                Please enter all 6 digits
              </p>
            )}
          </div>

          {/* Verify Button */}
          <CustomButton
            type="submit"
            onClick={handleVerify}
            disabled={!isComplete}
            className={`w-full py-3 rounded-md font-medium transition duration-150 ${
              isComplete
                ? "bg-black text-white hover:bg-gray-800 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Verify
          </CustomButton>

          {/* Resend Link */}
          <div className="text-center mt-6 flex gap-1 justify-center">
            <span className="text-sm text-gray-600">
              Didn't receive the code?{" "}
            </span>
            <p
              onClick={handleResend}
              className="text-sm text-gray-900 underline hover:text-gray-700 cursor-pointer"
            >
              Resend Code
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerificationPage;
