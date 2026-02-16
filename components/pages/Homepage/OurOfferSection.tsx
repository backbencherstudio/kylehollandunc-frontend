import SectionLabel, { SectionHeading } from '@/components/reusable/SectionLabel'
import { BadgeCheck, Check, FileCheck, FlaskConical } from 'lucide-react'
import React from 'react'

export default function OurOfferSection() {
    return (
        <div className='bg-white max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[140px] py-16 sm:py-20 lg:py-[120px]'>

            <div className='flex flex-col lg:flex-row gap-10 lg:gap-16 items-start'>


                {/* left side */}
                <div className='flex flex-col gap-6 w-full lg:max-w-[596px]'>


                    <SectionLabel className='w-fit '>Our Offer</SectionLabel>
                    <div>
                        <SectionHeading className='mb-4  '>What We Offer</SectionHeading>
                        <div className='flex flex-wrap gap-[13px] items-center'>



                            {
                                ['Transparent reporting', 'Quick turnaround', 'Quality control'].map((item, index) => (
                                    <div key={index} className='flex items-center gap-2'>
                                        <p className='text-[#3E658D] text-center  text-base font-semibold leading-[120%] tracking-[0.08px]'>{item}</p>
                                        {index < 2 && <p className='w-1.5 h-1.5 aspect-[1/1] bg-[#3E658D] rounded-full'></p>}
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                    <p className='self-stretch text-[#777980] text-lg font-normal leading-[150%] tracking-[0.09px]'>From sample submission to final results, our process is built for speed, precision, and accountability. We streamline intake to eliminate delays, safeguard every sample with strict handling protocols, and deliver clear, verifiable reports you can trust.</p>
                </div>

                {/* right side */}
                <div className='flex flex-col gap-4 sm:gap-6 w-full lg:flex-1'>

                    <FeatureCard
                        icon={BadgeCheck}
                        title="Supplier QC & COA support"
                        description="Batch verification to support documentation and customer trust."
                    />

                    <FeatureCard
                        icon={FileCheck}
                        title="Clinic-grade documentation"
                        description="Provider-friendly summaries for internal review and patient confidence."
                    />

                    <FeatureCard
                        icon={FlaskConical}
                        title="Pharmacy quality programs"
                        description="Ongoing testing scopes for consistency and QA initiatives."
                    />
                </div>

            </div>
        </div>
    )
}



import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
    icon: Icon,
    title,
    description,
    className = "",
}) => {
    return (
        <div
            className={`flex items-start gap-4 self-stretch rounded-2xl border-2 border-[#D5E0ED] bg-[#E7ECF1] p-6 sm:p-8 ${className}`}
        >
            {/* Icon */}
            <div className="flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-[#0E3E71]" />
            </div>

            {/* Content */}
            <div>
                <h4 className="text-[#0E3E71] text-lg sm:text-xl font-normal leading-[132%] tracking-[0.1px]">
                    {title}
                </h4>

                <p className="mt-2 text-[#5D6873] text-sm sm:text-base leading-[160%] tracking-[0.08px]">
                    {description}
                </p>
            </div>
        </div>
    );
};
