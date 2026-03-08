import React, { useState, useRef, useCallback } from "react";
import VerificationDialog from "@/components/auth/VerificationDialog";
import VerificationForm from "@/components/auth/VerificationForm";
import CustomSnackbar from "@/Reusables/CustomSnackbar";
import { authApi } from "@/api";
import { auth } from "@/lib/firebase";
import { useQueryClient } from "@tanstack/react-query";

const EmailVerification: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [touched, setTouched] = useState<boolean[]>(Array(6).fill(false));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const queryClient = useQueryClient();
  const [resendCountdown, setResendCountdown] = useState<number>(0);
  const countdownRef = useRef<number>(0);
  const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    color: "primary" | "neutral" | "danger" | "success" | "warning";
  }>({
    open: false,
    message: "",
    color: "success",
  });

  const handleChange = useCallback(
    (index: number, e: React.ChangeEvent<HTMLInputElement>): void => {
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
    },
    [otp]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>): void => {
      // Handle backspace
      if (e.key === "Backspace") {
        if (!otp[index] && index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      }
    },
    [otp]
  );

  const handleBlur = useCallback(
    (index: number): void => {
      const newTouched = [...touched];
      newTouched[index] = true;
      setTouched(newTouched);
    },
    [touched]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>): void => {
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
    },
    [otp]
  );

  const handleVerify = useCallback(async () => {
    setTouched(Array(6).fill(true));
    const otpCode = otp.join("");
    setIsLoading(true);

    try {
      await authApi.verify(otpCode);

      // Force reload to sync emailVerified status from backend if it updated it
      await auth.currentUser?.reload();
      // Optionally refresh token to get new claims
      await auth.currentUser?.getIdToken(true);

      setSnackbar({
        open: true,
        message: "Email verified successfully!",
        color: "success",
      });
      await queryClient.invalidateQueries({ queryKey: ["session"] });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again.";
      setSnackbar({
        open: true,
        message: errorMessage,
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  }, [otp, queryClient]);

  const startCountdown = useCallback(() => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
    }

    countdownRef.current = 60;
    setResendCountdown(60);

    countdownTimerRef.current = setInterval(() => {
      countdownRef.current -= 1;

      if (countdownRef.current <= 0) {
        countdownRef.current = 0;
        setResendCountdown(0);
        if (countdownTimerRef.current) {
          clearInterval(countdownTimerRef.current);
          countdownTimerRef.current = null;
        }
      } else {
        setResendCountdown(countdownRef.current);
      }
    }, 1000);
  }, []);

  const stopCountdown = useCallback(() => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    countdownRef.current = 0;
    setResendCountdown(0);
  }, []);

  const handleResend = useCallback(async () => {
    if (countdownRef.current > 0) return;

    startCountdown();

    try {
      const res = await authApi.sendVerificationCode();
      setSnackbar({
        open: true,
        message: res?.message || "Verification code sent!",
        color: "success",
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again.";
      setSnackbar({
        open: true,
        message: errorMessage,
        color: "danger",
      });
      stopCountdown();
    }
  }, [startCountdown, stopCountdown]);

  const isComplete = otp.every(digit => digit !== "");
  const hasError = touched.some((t, idx) => t && !otp[idx]);

  return (
    <div>
      <VerificationDialog isOpen={true}>
        <VerificationForm
          otp={otp}
          touched={touched}
          isLoading={isLoading}
          hasError={hasError}
          isComplete={isComplete}
          inputRefs={inputRefs}
          resendCountdown={resendCountdown}
          onInputChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onPaste={handlePaste}
          onVerify={handleVerify}
          onResend={handleResend}
        />
      </VerificationDialog>

      <CustomSnackbar
        open={snackbar.open}
        snackbarMessage={snackbar.message}
        snackbarColor={snackbar.color}
        close={() => setSnackbar(prev => ({ ...prev, open: false }))}
      />
    </div>
  );
};

export default EmailVerification;
