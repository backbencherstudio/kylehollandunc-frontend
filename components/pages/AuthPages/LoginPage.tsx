"use client";

import React from "react";
import Link from "next/link";
import { FormInput } from "./AuthReusable";
import { AuthHeader } from "./AuthReusable";

export default function LoginPage() {
    return (
        <div className="max-w-[1320px] mx-auto px-4 md:px-0 w-full py-16">

            <div className="flex flex-col gap-12 ">

                {/* Header */}
                <AuthHeader
                    title="Log In to Your Account"

                />

                {/* Card */}
                <div className="w-[360px] sm:w-[550px] mx-auto bg-[#F8F9FB] rounded-2xl p-6 sm:p-8">

                    <form className="flex flex-col gap-6 w-full">

                        {/* Inputs */}
                        <FormInput placeholder="Email" />
                        <FormInput placeholder="Password" type="password" />

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <Link href="/password/forgot" className="text-[#2382B0] text-sm sm:text-base">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="auth-btn cursor-pointer"
                        >
                            Log In
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
