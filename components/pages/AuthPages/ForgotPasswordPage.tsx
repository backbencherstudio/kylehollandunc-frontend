"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthHeader, FormInput } from "./AuthReusable";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            router.push('/password/verify');
        } catch (error) {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-[1320px] mx-auto px-4 py-16">
            <div className="flex flex-col gap-12 items-center"> {/* Added items-center to help centering */}
                
                <AuthHeader
                    title="Set New Password"
                    description="Enter your email address to get OTP."
                />

                {/* FIX APPLIED HERE:
                  1. sm:w-[550px] -> Target width
                  2. sm:min-w-[550px] -> Prevents shrinking below target
                  3. flex-shrink-0 -> Forces flexbox to respect the width
                */}
                <div className="w-[360px] sm:w-[550px] sm:min-w-[550px] shrink-0 mx-auto bg-[#F8F9FB] rounded-2xl p-6 sm:p-8 border border-[#E5E7EB]">
                    <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
                        
                        <FormInput placeholder="Email" type="email"  />

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className={`auth-btn flex items-center justify-center gap-2 h-12 ${
                                isLoading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                        >
                            {isLoading ? (
                                <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                            ) : (
                                "Send"
                            )}
                        </button>

                        <p className="text-[#4A4C56] text-center">
                            Don’t have an account?{" "}
                            <Link href="/register" className="text-[#2382B0] hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}