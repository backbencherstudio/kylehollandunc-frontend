"use client";

import SectionLabel, { SectionHeading } from "@/components/reusable/SectionLabel";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function WhyChooseSection() {
    return (
        <section className="relative w-full  flex items-end overflow-hidden">

            {/* Background Image */}
            <Image
                src="/images/whychoose-bg.png" 
                alt="Lab technician"
                fill
                quality={100}
                unoptimized
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 100vw"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-[1320px] mx-auto px-4 lg:px-0 pt-[70px] pb-8 ">

                {/* Top Content */}
                <div className="max-w-[600px] mb-25 md:mb-[320px]">
                    <SectionLabel className='w-fit mb-2 text-white border-white'>Why Choose Us</SectionLabel>

                    <SectionHeading className='max-w-[600px] text-white'>Trusted Lab Services <br /> Across the country</SectionHeading>
                </div>

                {/* Bottom Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Card 1 */}
                    <InfoCard
                        label="QUALITY CONTROL PROGRAM"
                        title="Batch testing & ongoing QC."
                        description="Build a repeatable testing cadence that matches your release cycle. Great for suppliers and pharmacies running multiple lots per month."
                    />

                    {/* Card 2 */}
                    <InfoCard
                        label="REPORT VERIFICATION"
                        title="Verify results instantly."
                        description="Share a report ID so partners can confirm a report exists and view the summary you choose to expose."
                    />

                </div>
            </div>
        </section>
    );
}

interface InfoCardProps {
    label: string;
    title: string;
    description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
    label,
    title,
    description,
}) => {

    

    return (
        <div className="bg-white backdrop-blur-2xl rounded-2xl p-6 shadow-lg">

            <p className="mb-8 text-[#2068D5] text-left text-base font-semibold leading-[120%] tracking-[0.08px]">
                {label}
            </p>

            <h3 className="self-stretch text-[#1D1F2C] font-syne text-[32px] font-semibold leading-[120%] mb-3">
                {title}
            </h3>

            <p className="self-stretch text-[#4A4C56] text-lg font-normal leading-[150%] tracking-[0.09px]">
                {description}
            </p>

            <a href="#contact-us" className="button-gradient-primary rounded-[32px] w-fit">
                <span className="button-gradient-primary-text"> Contact  Us</span>
            </a>

        </div>
    );
};
