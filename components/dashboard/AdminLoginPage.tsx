"use client";

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { useLoginMutation } from '@/redux/features/auth/authApi';
// Assuming these are your paths for Redux and RTK Query
import { Eye, EyeOff } from "lucide-react";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function AdminLoginPage() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [login, { isLoading, error: apiError }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "admin@gmail.com",
      password: "password",
    },
  });

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.replace(next || "/admin-dashboard");
    }
  }, [isAuthenticated, router, next]);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data).unwrap();
      // Navigation is handled by the useEffect above once isAuthenticated changes,
      // but adding a manual push here as a fallback is fine.
      router.push(next || "/admin-dashboard");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 mt-10">
      <div className="w-full  ">
        
        {/* Branding Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center mb-2">
            <div className="bg-[#1e3a8a] p-2 rounded-lg mr-3 shadow-md">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
           
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Admin Login</h2>
          <p className="text-gray-400 text-sm mb-8">Please enter your credentials to access the portal.</p>

          {/* Display API Error if login fails */}
          {apiError && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
              <p className="font-bold">Login Failed</p>
           

              {
                'data' in apiError ? (apiError.data as any).message : "Invalid email or password. Please try again."
              }
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-auto md:w-105" >
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
  <div className="flex justify-between mb-2">
    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
      Password
    </label>
  </div>

  <div className="relative">
    <input
      {...register("password", { required: "Password is required" })}
      type={showPassword ? "text" : "password"}
      className={`w-full px-4 py-3 pr-12 rounded-xl border ${
        errors.password ? "border-red-500" : "border-gray-200"
      } focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50`}
    />

    {/* Eye Button */}
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? (
        <EyeOff className="w-5 h-5" />
      ) : (
        <Eye className="w-5 h-5" />
      )}
    </button>
  </div>

  {errors.password && (
    <p className="text-red-500 text-xs mt-1">
      {errors.password.message}
    </p>
  )}
</div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#2c5282] to-[#1a365d] text-white font-bold py-3.5 rounded-xl hover:shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : "Sign In to Portal"}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-400 text-xs mt-8 uppercase tracking-tighter">
          Authorized Personnel Only. &copy; 2026 Lake Norman Labs.
        </p>
      </div>
    </div>
  );
}