"use client";

import React, { useState } from 'react'
import Link from 'next/link';
import { FormInput } from './AuthReusable';
import { AuthHeader } from './AuthReusable';

export default function RegisterPage() {

    const [agree, setAgree] = useState(true);


    return (
        <div className='max-w-[1320px] mx-auto px-4 md:px-0 w-full '>
            <div className='flex flex-col items-center justify-center gap-12'
            >

                {/* title and description */}
                <AuthHeader
                    title="Create Your Account"
                    description="Create an account to view your test results, track and manage orders, and unlock exclusive features."
                />

                {/* input fields */}


                <div className="w-full max-w-[550px] bg-[#F8F9FB] rounded-2xl p-6 sm:p-8">

                    <form className="flex flex-col gap-4 w-full">




                        <FormInput placeholder="Full Name" />
                        <FormInput placeholder="Email" />
                        <FormInput placeholder="Password" type="password" />

                        {/* Checkbox */}
                        <div className="flex items-start gap-2.5 p-2.5  ">
                            <button
                                type="button"
                                onClick={() => setAgree(!agree)}
                                className={`w-5 h-5 flex items-center justify-center rounded-md mt-1 transition ${agree ? "bg-[#22CAAD]" : "border border-[#D1D5DB]"
                                    }`}
                            >
                                {agree && (
                                    <svg
                                        className="w-4 h-4 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>

                            <p className="text-[#4A4C56] text-base leading-[150%] tracking-[0.08px] font-inter ">
                                I agree to the{" "}
                                <Link href="#" className="text-[#2382B0] ">
                                    Privacy Policy
                                </Link>{" "}
                                and{" "}
                                <Link href="#" className="text-[#2382B0] ">
                                    Terms and Conditions
                                </Link>
                                .
                            </p>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="auth-btn cursor-pointer"
                        >
                            Sign Up
                        </button>


                        {/* Bottom Link */}
                        <p className=" text-[#4A4C56] text-base leading-[160%] tracking-[0.08px]">
                            I already have an account.{" "}
                            <Link href="/login" className="text-[#2382B0] ">
                                Log in
                            </Link>
                        </p>

                    </form>
                </div>

            </div>
        </div>
    )
}



