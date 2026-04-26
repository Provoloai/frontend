import { useCallback, useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authApi } from "@/api";
import { auth } from "@/lib/firebase";

type VerifyEmailFormProps = {
  email: string;
  onVerified: () => void | Promise<void>;
  onToast: (
    message: string,
    variant?: "success" | "error" | "warning" | "info"
  ) => void;
  autoResendOnMount?: boolean;
};

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

type VerificationStatus = "idle" | "verifying" | "error";

export default function VerifyEmailForm({
  email,
  onVerified,
  onToast,
  autoResendOnMount = false,
}: VerifyEmailFormProps) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [status, setStatus] = useState<VerificationStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [resendCountdown, setResendCountdown] = useState(RESEND_SECONDS);
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const didAutoResendRef = useRef(false);

  const startCountdown = useCallback((seconds: number) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setResendCountdown(seconds);
    timerRef.current = setInterval(() => {
      setResendCountdown(prev => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    startCountdown(RESEND_SECONDS);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startCountdown]);

  useEffect(() => {
    if (!autoResendOnMount || didAutoResendRef.current) return;

    didAutoResendRef.current = true;

    const autoResend = async () => {
      setIsResending(true);
      startCountdown(RESEND_SECONDS);

      try {
        const response = await authApi.sendVerificationCode();
        onToast(
          response?.message || "A new verification code was sent.",
          "info"
        );
      } catch {
        onToast("Failed to resend verification code.", "error");
        setResendCountdown(0);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      } finally {
        setIsResending(false);
      }
    };

    void autoResend();
  }, [autoResendOnMount, onToast, startCountdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;

    const next = [...otp];
    next[index] = value;
    setOtp(next);

    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;

    const next = Array(OTP_LENGTH)
      .fill("")
      .map((_, idx) => pasted[idx] ?? "");

    setOtp(next);

    const nextEmpty = next.findIndex(d => d === "");
    const focusIndex = nextEmpty === -1 ? OTP_LENGTH - 1 : nextEmpty;
    inputRefs.current[focusIndex]?.focus();

    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const isComplete = otp.every(Boolean);

  const handleVerify = async () => {
    if (!isComplete || status === "verifying") return;

    setStatus("verifying");
    setErrorMessage("");

    try {
      await authApi.verify(otp.join(""));
      await auth.currentUser?.reload();
      await auth.currentUser?.getIdToken(true);
      onToast("Email verified successfully!", "success");
      await onVerified();
    } catch {
      setStatus("error");
      setErrorMessage("The code you entered is incorrect. Try again.");
      onToast("Verification failed. Please check your code.", "error");
    }
  };

  const handleResend = async () => {
    if (resendCountdown > 0 || isResending) return;

    setIsResending(true);
    startCountdown(RESEND_SECONDS);

    try {
      const response = await authApi.sendVerificationCode();
      onToast(response?.message || "Verification code resent.", "info");
    } catch {
      onToast("Failed to resend verification code.", "error");
      setResendCountdown(0);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    } finally {
      setIsResending(false);
    }
  };

  const getOtpClassName = (digit: string) => {
    if (status === "error") {
      return "border-[#FECACA] bg-[#FEF2F2] text-[#BE123C]";
    }

    if (status === "verifying") {
      return "border-[#ABEFC6] bg-[#ECFDF3] text-[#065F46]";
    }

    if (digit) {
      return "border-[#D1D5DB] bg-[#F9FAFB] text-dark";
    }

    return "border-[#E5E7EB] bg-[#F9FAFB] text-dark focus:border-primary";
  };

  return (
    <section className="w-full max-w-[30.5rem]">
      <div className="mt-7 w-full rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_0.5px_0.05px_rgba(29,41,61,0.02)]">
        <div className="mb-4 inline-flex size-10 items-center justify-center rounded-full bg-[#DBEAFE] text-primary">
          <Mail size={18} />
        </div>

        <h2 className="text-[1.875rem]/8 font-semibold text-dark">
          Verify your email address
        </h2>
        <p className="mt-1 text-sm text-secondary">
          We sent a 6-digit verification code to{" "}
          <span className="font-medium">{email}</span>. Enter the code below to
          verify your email address.
        </p>

        <div className="mt-4 flex gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleOtpChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`size-[3.25rem] bg-[#f9fafb] border-[#E5E7EB] rounded-lg border text-center text-2xl text-dark font-semibold transition-colors outline-none ${getOtpClassName(digit)}`}
            />
          ))}
        </div>

        {status === "error" && errorMessage && (
          <p className="mt-2 text-xs font-medium text-[#F04438]">
            {errorMessage}
          </p>
        )}

        <Button
          className="mt-4 w-full"
          onClick={handleVerify}
          disabled={!isComplete || status === "verifying"}
        >
          {status === "verifying" ? "Verifying..." : "Verify"}
        </Button>

        <p className="mt-3 text-xs text-secondary">
          Didn&apos;t receive code?{" "}
          {resendCountdown > 0 ? (
            <span>
              Resend code in {String(resendCountdown).padStart(2, "0")}s
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="font-medium text-primary hover:underline disabled:opacity-60"
            >
              Resend
            </button>
          )}
        </p>
      </div>
    </section>
  );
}
