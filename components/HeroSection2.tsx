"use client";

import React from "react";
import Link from "next/link";

const HeroSection = () => {
    return (
        <section className="relative w-full h-screen max-h-[740px] md:max-h-[847px] overflow-hidden">

            {/* Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/video/hero-bg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-[#061a2b]/70"></div>

            {/* Content */}
            <div className="relative z-10 max-w-[1320px] mx-auto px-4 md:px-0 h-full flex items-center">
                <div className="max-w-[727px] text-white">

                    {/* Small Tagline */}
                    <span className="inline-block mb-3 px-3 py-1 text-sm bg-white/10 backdrop-blur-[5px] rounded-full text-[#E9E9EA]  font-normal leading-[150%] tracking-[0.07px]">
                        Identity, purity, potency, contaminants, stability (scope dependent)
                    </span>

                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-7xl font-bold leading-[120%]  font-syne">
                        Peptide testing <br /> that earns trust.
                    </h1>

                    {/* Divider */}
                    <div className="w-full h-px bg-white/40 my-8 md:my-16"></div>

                    {/* Description */}
                    <p className="text-[#E9E9EA] text-lg font-medium leading-[150%] tracking-[0.09px] mb-10.5">
                        Lake Norman Labs provides third-party analytical verification for
                        peptides — built for research suppliers, telehealth clinics, and
                        compounding pharmacies that need reliable data and readable reporting.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/services"
                            className="px-6 py-3 rounded-full [background:var(--gradient,linear-gradient(180deg,#84B6DE_0%,#1C5E96_100%))] hover:opacity-90 transition"
                        >
                            <span className="text-[#FFFFFF] font-medium leading-[150%] tracking-[0.09px]">View Services</span>
                        </Link>

                        <Link
                            href="/verify"
                            className="px-6 py-3 rounded-full border border-white/40 hover:bg-white/10 transition"
                        >
                            <span className="text-[#FFFFFF] font-medium leading-[150%] tracking-[0.09px]">Verify A Report</span>
                        </Link>

                        <Link
                            href="/request"
                            className="px-6 py-3 rounded-full border border-white/40 hover:bg-white/10 transition"
                        >
                            <span className="text-[#FFFFFF] font-medium leading-[150%] tracking-[0.09px]">Request Testing</span>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;
