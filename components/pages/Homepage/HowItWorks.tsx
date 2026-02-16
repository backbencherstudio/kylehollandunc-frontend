import React from 'react'
import Image from 'next/image'
import SectionLabel, { SectionHeading } from '@/components/reusable/SectionLabel'

export default function HowItWorks() {
    return (
        <section className='relative overflow-hidden [background:var(--Gradient-2,linear-gradient(101deg,#023347_0.72%,#8099A3_114.82%))] px-6 sm:px-10 md:px-16 lg:px-[100px] xl:px-[140px] py-16 sm:py-20 lg:py-[120px] mx-auto'>


            <div className='absolute -top-[116px] -right-[116px] z-10'>
                <Image src="/images/others/particle1.png" alt="" width={386} height={386} />
            </div>

            {/* Content */}
            <div className='max-w-[1320px] mx-auto relative z-50'>

                <div className='mb-14'>
                    <SectionLabel className='w-fit mb-2 text-white border-white'>How It Works</SectionLabel>

                    <SectionHeading className='max-w-[700px] text-white z-50 '>How Simple process. Serious standards.</SectionHeading>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>


                    <StepCard
                        step={1}
                        title="Define scope"
                        description="Choose a standard panel or request a custom peptide scope."
                    />

                    <StepCard
                        step={2}
                        title="Review proposal"
                        description="We prepare a tailored proposal for your project."
                    />

                    <StepCard
                        step={3}
                        title="Project execution"
                        description="Our team begins synthesis and analysis."
                    />


                </div>

            </div>
        </section>
    )
}


interface StepCardProps {
    step: string | number;
    title: string;
    description: string;
    className?: string;
}

const StepCard: React.FC<StepCardProps> = ({
    step,
    title,
    description,
    className = "",
}) => {
    return (
        <div className={`flex w-full flex-col items-start gap-8 rounded-2xl bg-white p-6 sm:p-8 ${className}`}>

            <h2 className="text-4xl sm:text-5xl lg:text-[64px] font-semibold leading-[120%] tracking-[0.32px] bg-gradient-to-b from-[#1C5E96] to-[#84B6DE]/0 bg-clip-text text-transparent">
                {typeof step === "number" ? step.toString().padStart(2, "0") : step}
            </h2>

            <div>
                <h3 className="text-xl sm:text-2xl lg:text-[32px] font-syne font-semibold leading-[120%] text-[#1D1F2C]">
                    {title}
                </h3>

                <p className="mt-2 text-base sm:text-lg font-inter leading-[150%] tracking-[0.09px] text-[#777980]">
                    {description}
                </p>
            </div>
        </div>
    );
};
