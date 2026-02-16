import SectionLabel, { SectionHeading } from '@/components/reusable/SectionLabel'
import { Check, CheckCircle } from 'lucide-react'
import CheckCircleIcon from '@/components/icons/CheckCircleIcon'
import React from 'react'
import RightArrowIcon from '@/components/icons/RIghtArrowIcon'

export default function OurPriceSection() {
    return (
        <section className='self-stretch px-6 sm:px-10 md:px-16 lg:px-[140px] py-16 sm:py-20 lg:py-[120px] mx-auto relative overflow-hidden max-w-[2180px]'>


            <div className='max-w-[1320px] mx-auto flex justify-between items-center '>
                <div className='flex-1 flex flex-col gap-4'>
                    <div>
                        <SectionLabel className='w-fit'>Our Price</SectionLabel>
                        <SectionHeading className=''>Our industry best Pricing</SectionHeading>
                    </div>

                    <p className='max-w-[615px] text-[#4A4C56]  text-lg font-normal leading-[150%] tracking-[0.09px]'>At Lake Norman Lab, we believe in transparent, straightforward pricing with no surprises. Our testing fees are clearly listed so you can choose the right service with confidence. Each price reflects the accuracy and reliability our clients across the Carolinas trust.</p>
                </div>


                {/* right side */}

                <div className='flex w-full max-w-[596px] flex-col items-start gap-[42px] [background:#023347] p-6 rounded-xl'>

                    {/* top content */}
                    <div className='flex gap-24'>
                        <div className='flex flex-col justify-between  max-w-[174px]'>
                            <h4 className='self-stretch text-white font-syne text-[32px] font-bold leading-[120%]f'>Standard Panel</h4>


                            <div>
                                <p className='text-white font-syne text-5xl mb-1 font-bold leading-[120%]'>   <span>$</span>199</p>

                                <p className='text-[#E9E9EA] text-lg font-normal leading-[150%] tracking-[0.09px]'>Per sample</p>
                            </div>
                        </div>

                        <div>
                            <p className='text-white mb-4 font-syne text-2xl font-bold leading-[120%]'>What's Includes</p>

                            <div className='flex flex-col item-start gap-3'>
                                {
                                    ['Basic lab diagnostics', 'Essential drug supply', 'Lab report access', 'Expert phone support', 'Advanced test panels'].map((item, index) => (
                                        <div key={index} className='flex items-center gap-2'>
                                            <CheckCircleIcon className='w-5 h-5 text-white' />
                                            <p className='text-white text-lg font-normal leading-[150%] tracking-[0.09px]'>{item}</p>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    </div>

                    {/* bottom content */}

                    <div className=' w-full'>
                        <button className='[background:var(--gradient,linear-gradient(180deg,#84B6DE_0%,#1C5E96_100%))] px-6 py-3 rounded-lg w-full button-gradient-primary-text text-white flex items-center justify-center gap-3 hover:opacity-90 transition-opacity duration-300 cursor-pointer'>View services


                            <RightArrowIcon className='w-5 h-5 text-white' />
                        </button>
                    </div>
                </div>

            </div>

            {/* bg layer */}

            <div className='w-[500px] h-[500px] absolute left-[-183px] bottom-[-134px] [background:#84B6DE] blur-[264.8500061035156px] rounded-[500px]'></div>

            <div className='w-[448px] h-[448px] absolute right-[-88px] top-[-54px] [background:#1C5E96] blur-[264.8500061035156px] rounded-[448px]'></div>

        </section>
    )
}
