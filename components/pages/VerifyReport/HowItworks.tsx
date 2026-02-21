import SectionLabel, { SectionHeading } from '@/components/reusable/SectionLabel'

import React from 'react'

import ChevronLeft from '@/components/icons/ChevronLeft'
import DoubleTickIcon from '@/components/icons/DoubleTickIcon'

const HowItworks = () => {
    return (
        <section className='max-w-[1320px] mx-auto px-4 md:px-0  py-10 md:py-16 lg:py-25'>
            <div className='mb-10 md:mb-12 lg:mb-14 flex flex-col  justify-center '>
                <SectionLabel className='w-fit mb-2 text-[#1C5E96] border-[#1C5E96] '>How It Works</SectionLabel>
                <SectionHeading className='max-w-[700px] text-[#1D1F2C] z-50 '>How verification works</SectionHeading>
            </div>


            <div className='grid grid-cols-1  md:grid-cols-3 gap-6 place-items-center '>

                <StepCard step={1} title="Enter Report ID" description="Use the unique ID from your test report" />

                <StepCard step={2} title="View Summary" description="See the verification status and authorized summary." />

                <StepCard step={3} title="Share with Confidence" description="Provide verification links to partners and customers." />

            </div>
        </section>
    )
}

export default HowItworks





const StepCard = ({ step, title, description }: { step: number, title: string, description: string }) => {
    return (
        <div className='flex max-w-[424px] min-h-[262px] flex-col items-start gap-8 border border-[#DFE1E7] [background:#FFF] p-6 rounded-2xl border-solid '>

            <div className='flex justify-between items-center gap-2  w-full'>
                <h2 className='text-[#023347] [font-family:Inter] text-[64px] font-semibold leading-[120%] tracking-[0.32px]'>{step}</h2>
                <ChevronLeft className='w-12 h-12 text-[#023347]  ' />
            </div>
            {/* bottom section */}

            <div>
                <h3 className='text-[#1D1F2C] z-50 [font-family:Syne] text-[32px] font-semibold leading-[120%] mb-3'>{title}</h3>

                <p className='self-stretch text-[#777980] [font-family:Inter] text-lg font-normal leading-[150%] tracking-[0.09px]'>{description}</p>
            </div>
        </div>
    )
}


