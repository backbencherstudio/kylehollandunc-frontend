"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PasswordUpdatet() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    console.log("Form submitted:", formData);

    // TODO: Call API here

    // Reset
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const isDisabled =
    !formData.currentPassword ||
    !formData.newPassword ||
    !formData.confirmPassword;

  return (
    <section className="flex md:flex-row flex-col items-start gap-6 self-stretch bg-white p-6 rounded-xl">
      <div className="md:w-[300px] w-full">
        <h4 className="mb-1 text-[#0D0D12] text-lg font-semibold leading-[135%]">
          Password
        </h4>
        <p className="text-[#666D80] text-sm font-medium leading-[150%] tracking-[0.28px]">
          Change or view your password
        </p>
      </div>

      <div className="flex-1 w-full">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="space-y-5 max-w-[920px]">
            <PasswordInput
              label="Current Password"
              required
              value={formData.currentPassword}
              onChange={(e) =>
                handleChange("currentPassword", e.target.value)
              }
            />

            <PasswordInput
              label="New Password"
              required
              value={formData.newPassword}
              onChange={(e) =>
                handleChange("newPassword", e.target.value)
              }
              error={errors.newPassword}
              note="Must be at least 8 characters"
            />

            <PasswordInput
              label="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={(e) =>
                handleChange("confirmPassword", e.target.value)
              }
              error={errors.confirmPassword}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isDisabled}
              >
                Update Password
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}



// Reusable Password Input Component
interface PasswordInputProps {
    label: string;
    placeholder?: string;
    note?: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
  }
  
  function PasswordInput({
    label,
    placeholder,
    note,
    required = false,
    value,
    onChange,
    error,
  }: PasswordInputProps) {
    const [show, setShow] = useState(false);
  
    return (
      <div className="space-y-2">
        <label className="text-[#0D0D12] sm:text-lg text-base font-semibold leading-[135%] block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
  
        <div
          className={`flex sm:h-[48px] h-[44px] items-center gap-2 px-3 py-2 rounded-xl border ${
            error
              ? "border-red-500"
              : "border-[#DFE1E7]"
          } bg-white`}
        >
          <input
            type={show ? "text" : "password"}
            className="w-full bg-transparent outline-none text-[#0D0D12] text-base"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
  
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="shrink-0 w-9 h-9 grid place-items-center rounded-lg hover:bg-black/5 transition"
          >
            {show ? (
              <EyeOff className="w-5 h-5 text-[#818898]" />
            ) : (
              <Eye className="w-5 h-5 text-[#818898]" />
            )}
          </button>
        </div>
  
        {error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : (
          note && (
            <p className="text-[#818898] text-sm leading-[150%] tracking-[0.28px]">
              {note}
            </p>
          )
        )}
      </div>
    );
  }