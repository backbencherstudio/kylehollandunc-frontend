import SectionLabel, { SectionHeading } from '@/components/reusable/SectionLabel'

import React from 'react'

import ChevronLeft from '@/components/icons/ChevronLeft'
import DoubleTickIcon from '@/components/icons/DoubleTickIcon'

const HowItworks = () => {
    return (
        <section className='max-w-[1320px] mx-auto px-4 md:px-0  py-10 md:py-16 lg:py-25'>
            <div className='mb-10 md:mb-12 lg:mb-14 flex flex-col items-center justify-center'>
                <SectionLabel className='w-fit mb-2 text-[#1C5E96] border-[#1C5E96] '>How It Works</SectionLabel>
                <SectionHeading className='max-w-[700px] text-[#1D1F2C] z-50 text-center'>How Simple process. Serious standards.</SectionHeading>
            </div>


            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 place-items-center '>

                <StepCard title="Enter Report ID" description="Use the unique ID from your test report" />
                <StepCard title="Purity Assessment" description="HPLC analysis with detailed impurity profiling." />
                <StepCard title="Verification ID" description="Unique report ID for third-pany verification." /> 
                <StepCard title="Method Details" description="Complete methodology and equipment documentation." />

            </div>
        </section>
    )
}

export default HowItworks


const StepCard = ({ title, description }: { title: string, description: string }) => {
    return (
        <div className='max-w-[312px]  flex flex-col justify-center items-center gap-6 flex-[1_0_0] border border-[color:var(--background-pressed-100,#DFE1E7)] [background:#FFF] px-8 py-6 rounded-2xl border-solid'>


            {/* top section */}

            <div>
                <DoubleTickIcon />
            </div>



            <div>
                <h3 className='text-[#023347] text-center [font-family:Syne] text-2xl font-semibold leading-[120%] mb-3'>{title}</h3>
                <p className='self-stretch text-[color:var(--Gray-Black-300,#777980)] text-center [font-family:Inter] text-base font-normal leading-[150%] tracking-[0.08px]'>{description}</p>
            </div>




        </div>
    )
}