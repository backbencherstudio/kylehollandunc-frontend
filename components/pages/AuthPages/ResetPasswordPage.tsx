"use client";

import Link from "next/link";
import { AuthHeader, FormInput } from "./AuthReusable";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { useState } from "react";

type ResetPasswordFormValues = {
  new_password: string;
  confirm_password: string;
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });

  const newPassword = watch("new_password");

  const onSubmit = async (values: ResetPasswordFormValues) => {
    try {
      setServerError(null);
  
      if (!email) {
        setServerError("Email is missing. Please go back and try again.");
        return;
      }
  
      await resetPassword({
        email,
        new_password: values.new_password,   // ✅ correct key
        confirm_password: values.confirm_password,
      }).unwrap();
  
      router.replace("/login");
    } catch (err: any) {
      setServerError(err?.data?.message ?? "Reset failed");
    }
  };

  return (
    <div className="max-w-[1320px] mx-auto px-4 py-16">
      <div className="flex flex-col gap-12">
        <AuthHeader
          title="Set New Password"
          description="Make sure it's strong and unique to keep your account secure."
        />

        <div className="w-[360px] sm:w-[550px] mx-auto bg-[#F8F9FB] rounded-2xl p-6 sm:p-8">
          <form
            className="flex flex-col gap-6 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* New Password */}
            <div>
              <FormInput
                placeholder="Password"
                type="password"
                {...register("new_password", {
                  required: "New password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
              />
              {errors.new_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.new_password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <FormInput
                placeholder="Confirm Password"
                type="password"
                {...register("confirm_password", {
                  required: "Confirm password is required",
                  validate: (val) =>
                    val === newPassword || "Passwords do not match",
                })}
              />
              {errors.confirm_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>

            {/* Server Error */}
            {serverError && (
              <p className="text-red-500 text-sm mt-1 text-center">
                {serverError}
              </p>
            )}

            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? (
                <span className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                "Submit"
              )}
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