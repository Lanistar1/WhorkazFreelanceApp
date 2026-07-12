"use client";

import { useEffect, useRef, useState } from "react";

interface VerifyPhoneOtpModalProps {
  open: boolean;
  phoneNumber: string;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (otp: string) => void;
  onResend: () => void;
}

export default function VerifyPhoneOtpModal({
  open,
  phoneNumber,
  loading = false,
  onClose,
  onSubmit,
  onResend,
}: VerifyPhoneOtpModalProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;

    setOtp(["", "", "", "", "", ""]);
    setCountdown(60);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [open]);

  if (!open) return null;

  const handleChange = (
    value: string,
    index: number
  ) => {
    if (!/^\d?$/.test(value)) return;

    const copy = [...otp];
    copy[index] = value;

    setOtp(copy);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const submit = () => {
    onSubmit(otp.join(""));
  };

  const resend = () => {
    if (countdown > 0) return;

    onResend();

    setCountdown(60);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center px-4">

      <div className="bg-white rounded-2xl w-full max-w-md p-8">

        <h2 className="text-2xl font-semibold text-center">
          Verify Phone Number
        </h2>

        <p className="text-center text-gray-500 mt-3">
          Enter the 6-digit code sent to
        </p>

        <p className="text-center font-semibold mt-1">
          {phoneNumber}
        </p>

        <div className="flex justify-center gap-3 mt-8">

          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              value={digit}
              maxLength={1}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
              onKeyDown={(e) =>
                handleBackspace(e, index)
              }
              className="w-12 h-14 border rounded-lg text-center text-xl font-semibold outline-none focus:border-[#3900DC]"
            />
          ))}

        </div>

        <div className="text-center mt-6 text-sm text-gray-500">
          Didn&apos;t receive the code?
        </div>

        <button
          disabled={countdown > 0}
          onClick={resend}
          className={`block mx-auto mt-2 text-sm font-medium cursor-pointer ${
            countdown > 0
              ? "text-gray-400"
              : "text-[#3900DC]"
          }`}
        >
          {countdown > 0
            ? `Resend in ${countdown}s`
            : "Resend Code"}
        </button>

        <div className="flex gap-3 mt-8">

          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 rounded-full py-3 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={loading || otp.join("").length < 6}
            className="flex-1 bg-[#3900DC] text-white rounded-full py-3 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Verifying..." : "Submit"}
          </button>

        </div>

      </div>

    </div>
  );
}