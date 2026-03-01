"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { AuthHeader, FormInput } from "./AuthReusable";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  

  const searchParams = useSearchParams();
  const next = searchParams.get("next") ; 
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>(
    {
      defaultValues: {
        email: "",
        password: "",
      },
    }
  );

  const [login, { isLoading, error }] = useLoginMutation();
  const router = useRouter();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data).unwrap();
      if (next) {
        router.push(next);
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };


  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);
  return (
    <div className="max-w-[1320px] mx-auto px-4 md:px-0 w-full py-16">
      <div className="flex flex-col gap-12">
        {/* Header */}
        <AuthHeader title="Log In to Your Account" />

        {/* Card */}
        <div className="w-[360px] sm:w-[550px] mx-auto bg-[#F8F9FB] rounded-2xl p-6 sm:p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 w-full"
          >
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
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="/password/forgot"
                className="text-[#2382B0] text-sm sm:text-base"
              >
                Forgot Password?
              </Link>
            </div>

            {/* API Error */}
            {error && (
              <p className="text-red-500 text-sm text-center">
                Invalid email or password
              </p>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="auth-btn cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                "Log In"
              )}
            </button>

            {/* Bottom Link */}
            <p className="text-[#4A4C56] text-base leading-[160%] tracking-[0.08px] text-center">
              Don’t have an account?{" "}
              <Link href="/register" className="text-[#2382B0]">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}