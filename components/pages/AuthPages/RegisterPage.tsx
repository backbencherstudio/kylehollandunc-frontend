"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { FormInput, AuthHeader } from "./AuthReusable";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  agree: boolean;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const [registerUser, { isLoading, error, isSuccess }] =
    useRegisterMutation();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      }).unwrap();
    } catch (err) {
      console.error("Register error:", err);
    }
  };

  return (
    <div className="max-w-[1320px] mx-auto px-4 md:px-0 w-full">
      <div className="flex flex-col items-center justify-center gap-12">
        <AuthHeader
          title="Create Your Account"
          description="Create an account to view your test results, track and manage orders, and unlock exclusive features."
        />

        <div className="w-full max-w-[550px] bg-[#F8F9FB] rounded-2xl p-6 sm:p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full"
          >
            {/* Full Name */}
            <div>
              <FormInput
                placeholder="Full Name"
                {...register("name", {
                  required: "Full name is required",
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <FormInput
                placeholder="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <FormInput
                placeholder="Password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-2.5 p-2.5">
              <input
                type="checkbox"
                className="mt-1"
                {...register("agree", {
                  required: "You must accept terms and conditions",
                })}
              />

              <p className="text-[#4A4C56] text-base leading-[150%] tracking-[0.08px]">
                I agree to the{" "}
                <Link href="#" className="text-[#2382B0]">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-[#2382B0]">
                  Terms and Conditions
                </Link>
                .
              </p>
            </div>

            {errors.agree && (
              <p className="text-red-500 text-sm">
                {errors.agree.message}
              </p>
            )}

            {/* API Success */}
            {isSuccess && (
              <p className="text-green-600 text-sm text-center">
                Registration successful!
              </p>
            )}

            {/* API Error */}
            {error && (
              <p className="text-red-500 text-sm text-center">
                Something went wrong.
              </p>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="auth-btn cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>

            {/* Bottom Link */}
            <p className="text-[#4A4C56] text-base leading-[160%] tracking-[0.08px]">
              I already have an account.{" "}
              <Link href="/login" className="text-[#2382B0]">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}