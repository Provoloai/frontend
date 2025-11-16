import React from "react";
import CustomButton from "@/Reusables/CustomButton";

interface VerificationFormProps {
  otp: string[];
  touched: boolean[];
  isLoading: boolean;
  hasError: boolean;
  isComplete: boolean;
  resendCountdown: number;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  onInputChange: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur: (index: number) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  onVerify: () => void;
  onResend: () => void;
}

const VerificationForm: React.FC<VerificationFormProps> = ({
  otp,
  touched,
  isLoading,
  hasError,
  isComplete,
  resendCountdown,
  inputRefs,
  onInputChange,
  onKeyDown,
  onBlur,
  onPaste,
  onVerify,
  onResend,
}) => {
  return (
    <div className="bg-white p-8">
      <div className="text-center">
        <h1 className="text-2xl font-medium text-center mb-2">
          Verify Your Email
        </h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          We've sent a 6-digit code to your email address.
          <br />
          Please enter it below.
        </p>

        {/* OTP Input */}
        <div className="mb-3 md:mb-6 text-left">
          <label className="block text-sm mb-2 text-left">Enter Verification Code</label>
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
                  onChange={e => onInputChange(index, e)}
                  onKeyDown={e => onKeyDown(index, e)}
                  onBlur={() => onBlur(index)}
                  onPaste={onPaste}
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
            <p className="text-xs text-red-700 mt-1 text-left">
              Please enter all 6 digits
            </p>
          )}
        </div>

        {/* Verify Button */}
        <CustomButton
          type="submit"
          onClick={onVerify}
          disabled={!isComplete}
          className="btn-primary"
          isLoading={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify"}
        </CustomButton>

        {/* Resend Link */}
        <div className="text-center mt-6 flex gap-1 justify-center">
          <span className="text-xs text-gray-500">
            Didn't receive the code?{" "}
          </span>
          {resendCountdown > 0 ? (
            <span className="text-xs text-gray-500">
              Resend code in {resendCountdown}s
            </span>
          ) : (
            <p
              onClick={onResend}
              className="text-xs text-gray-600 underline hover:text-gray-500 cursor-pointer"
            >
              Resend Code
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationForm;
