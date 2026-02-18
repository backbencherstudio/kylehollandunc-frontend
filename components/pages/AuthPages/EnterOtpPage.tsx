"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AuthHeader } from "./AuthReusable";

export default function EnterOTPPage() {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 3) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  return (
    <div className="max-w-[1320px] mx-auto px-4 py-16">

      <div className="flex flex-col gap-12">

        <AuthHeader
          title="Enter OTP"
          description='We have just sent you 4 digit code your email bram******@gmail.com'
        />

        <div className="w-full max-w-[550px] mx-auto bg-[#F8F9FB] rounded-2xl p-6 sm:p-8">

          <form className="flex flex-col gap-6 items-center">

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

            <button type="submit" className="auth-btn w-full">
              Verify
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
