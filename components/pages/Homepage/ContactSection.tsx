"use client";

import SectionLabel, { SectionHeading } from "@/components/reusable/SectionLabel";
import Image from "next/image";
import React from "react";

export default function ContactSection() {
    return (
        <section id="contact-us" className="relative w-full min-h-[750px] overflow-hidden">

            {/* ================= Background Image ================= */}
            <Image
                src="/images/contact-bg.png" 
                alt="Lab technician"
                fill
                priority
                className="object-cover h-full w-full"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-[rgba(2,51,71,0.40)]" />

            {/* ================= Content ================= */}
            <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-[140px] py-20 lg:py-[120px] flex flex-col lg:flex-row justify-between gap-14">

                {/* Left Side */}
                <div className="max-w-[556px] text-white">
                    <SectionLabel className='w-fit mb-2 text-white border-white'>Contact us</SectionLabel>
                    <SectionHeading className='text-white mb-3'>Get in Touch with Us
                    Contact Us for Custom Pricing on High-Volume Orders</SectionHeading>

                    <p className="self-stretch text-white text-base font-normal leading-[124%] tracking-[0.08px]">Need assistance with your sample or testing request? Submit your inquiry and our team will provide fast intake, secure coordination, and transparent communication from start to finish.</p>


                </div>

                {/* Right Side Form Card */}
                <div className="w-full max-w-[700px]  backdrop-blur-xl border border-white/20 rounded-2xl  text-white [background:rgba(234,233,233,0.30)] px-8 py-16 ">

                    <form className="flex flex-col gap-8">

                        {/* Input Field */}
                        <InputField placeholder="Full Name" />
                        <InputField placeholder="Email" />
                        <InputField placeholder="Your Order ID (optional)" />
                        <InputField placeholder="Your message" textarea />

                        <button
                            type="submit"
                            className="w-fit px-8 py-3 rounded-full bg-[linear-gradient(180deg,#84B6DE_0%,#1C5E96_100%)] text-white hover:opacity-90 transition"
                        >
                            Send
                        </button>

                    </form>
                </div>
            </div>
        </section>
    );
}

interface InputFieldProps {
    placeholder: string;
    textarea?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    placeholder,
    textarea = false,
}) => {
    if (textarea) {
        return (
            <textarea
                placeholder={placeholder}
                rows={3}
                className="bg-transparent border-b border-[#D2D2D5] focus:outline-none focus:border-white text-white placeholder-white resize-none"
            />
        );
    }

    return (
        <input
            type="text"
            placeholder={placeholder}
            className="bg-transparent border-b border-[#D2D2D5] focus:outline-none focus:border-white text-white placeholder-white pb-2"
        />
    );
};
