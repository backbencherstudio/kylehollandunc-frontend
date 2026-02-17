import React from 'react'
import Image from 'next/image'
import SectionLabel, { SectionHeading } from '@/components/reusable/SectionLabel'
import ResearchIcon from '@/components/icons/ResearchIcon'
import TelehealthIcon from '@/components/icons/TelehealthIcon'
import PhamascisIcon from '@/components/icons/PhamascisIcon'

export default function WhoWeServe() {
    return (
        <section className='relative overflow-hidden [background:var(--Gradient-2,linear-gradient(101deg,#023347_0.72%,#8099A3_114.82%))] px-4 md:px-0 py-16 sm:py-20 lg:py-[120px] mx-auto '>


            <div className='absolute -bottom-[116px] -left-[116px] z-10'>
                <Image src="/images/others/particle1.png" alt="" width={386} height={386} />
            </div>

            {/* Content */}
            <div className='w-full max-w-[1320px] mx-auto relative z-50 '>

                <div className='mb-14 max-w-[596px] mx-auto flex flex-col items-center justify-center '>
                    <SectionLabel className=' mb-2 text-white border-white text-center '>Who We Serve</SectionLabel>

                    <SectionHeading className=' text-white z-50 mb-2'>Who we serve</SectionHeading>

                    <p className='h-[58px] self-stretch text-[#D2D2D5] font-syne text-base font-normal leading-[120%] text-center'>We support research suppliers, telehealth providers, and compounding pharmacies that require dependable third-party peptide testing and verification.</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>


                    <StepCard
                        icon={<ResearchIcon className="w-16 h-16" />}
                        title="Research Suppliers"
                        description="Batch verification and COA support for quality documentation."
                    />
                    <StepCard
                        icon={<TelehealthIcon className="w-16 h-16" />}
                        title="Telehealth Clinics"
                        description="Independent verification for intemal review and patient confidence. "
                    />
                    <StepCard
                        icon={<PhamascisIcon className="w-16 h-16" />}
                        title="Compounding Pharmacies"
                        description="Quality programs aligned to your operational workflows."
                    />





                </div>

            </div>
        </section>
    )
}

interface StepCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    className?: string;
}

const StepCard: React.FC<StepCardProps> = ({
    icon,
    title,
    description,
    className = "",
}) => {
    return (
        <div
            className={`flex w-full flex-col items-center text-center gap-8 rounded-2xl bg-white p-8 ${className}`}
        >
            {/* Icon */}
            <div className="text-[#4A83B6] ">
                {icon}
            </div>

            {/* Content */}
            <div>
                <h3 className="text-center font-syne text-2xl font-semibold leading-[120%] bg-gradient-to-b from-[#84B6DE] to-[#1C5E96] bg-clip-text text-transparent mb-3">
                    {title}
                </h3>


                <p className="self-stretch text-[color:var(--Gray-Black-300,#777980)] text-center [font-family:Inter] text-lg font-normal leading-[150%] tracking-[0.09px]">
                    {description}
                </p>
            </div>
        </div>
    );
};
