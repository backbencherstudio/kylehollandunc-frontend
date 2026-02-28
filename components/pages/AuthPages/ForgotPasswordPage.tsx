"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthHeader, FormInput } from "./AuthReusable";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { useForm } from "react-hook-form";



type ForgotPasswordFormValues = {
    email: string;
};


export default function ForgotPasswordPage() {
    const router = useRouter();
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const [serverError, setServerError] = useState<string | null>(null);


    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormValues>({
        defaultValues: {
            email: "",
        },
    });


    const onSubmit = async (values: ForgotPasswordFormValues) => {
        try {
            setServerError(null);
            await forgotPassword(values).unwrap();

            router.push(
                `/password/verify?email=${encodeURIComponent(values.email)}`

                // http://localhost:3000/password/verify?email=pomones171%40creteanu.com
            );
        } catch (err: any) {
            setServerError(err?.data?.message ?? "Something went wrong");
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
                    <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit(onSubmit)}>

                        <FormInput placeholder="Email" type="email" {...register("email", { required: "Email is required" })} />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                        {serverError && (
                            <p className="text-red-500 text-sm mt-1">
                                {serverError}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`auth-btn flex items-center justify-center gap-2 h-12 ${isLoading ? "opacity-70 cursor-not-allowed" : ""
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