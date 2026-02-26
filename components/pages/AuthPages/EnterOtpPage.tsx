"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AuthHeader } from "./AuthReusable";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyOtpMutation } from "@/redux/features/auth/authApi";

export default function EnterOTPPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) router.replace("/password/forgot");
  }, [email, router]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

      if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const combinedOtp = otp.join("");

    if (combinedOtp.length !== 6) {
      setServerError("Please enter the 6-digit OTP");
      return;
    }

    try {
      setServerError(null);

      await verifyOtp({
        email: email || "",
        otp: combinedOtp,
      }).unwrap();

 

      router.push(`/password/reset?email=${encodeURIComponent(email || "")}`);
    } catch (err: any) {
      setServerError(err?.data?.message ?? "Invalid OTP");
    }
  };

  return (
    <div className="max-w-[1320px] mx-auto px-4 py-16">
      <div className="flex flex-col gap-12">
        <AuthHeader
          title="Enter OTP"
          description="We have just sent you a 4 digit code to your email"
        />

        <div className="w-full sm:w-[550px] mx-auto bg-[#F8F9FB] rounded-2xl p-6 sm:p-8">
          <form
            className="flex flex-col gap-6 items-center"
            onSubmit={handleSubmit}
          >
            {/* OTP Boxes */}
            <div className="flex gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="w-14 h-14 text-center text-xl border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#1C5E96]"
                />
              ))}
            </div>

            {serverError && (
              <p className="text-red-500 text-sm text-center">
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="auth-btn w-full disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>

            <p className="text-[#4A4C56] text-center">
              Don’t have an account?{" "}
              <Link href="/register" className="text-[#2382B0]">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}