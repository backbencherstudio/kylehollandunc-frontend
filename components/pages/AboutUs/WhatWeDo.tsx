import CircleCheckIcon from "@/components/icons/CircleCheckIcon";
import SectionLabel, { SectionHeading } from "@/components/reusable/SectionLabel";

import Image from "next/image";

export default function WhatWeDo() {
    return (
        <div className='relative overflow-hidden max-w-[1600px] mx-auto'>

            {/* content container */}
            <section className='max-w-[1320px] mx-auto px-4 lg:px-0 py-12 md:py-16 lg:py-25  relative z-50 bg'>
                <div className='flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-between'>

                    {/* left side */}
                    <div className='flex flex-col gap-6 w-full lg:max-w-[462px]'>
                        <div>
                            <SectionLabel className='w-fit mb-4'>What We Do</SectionLabel>
                            <SectionHeading className=''>What we do.</SectionHeading>
                        </div>
                        <p className='self-stretch text-[#777980] font-syne text-base font-normal leading-[120%]'>
                            We provide analytical services and structured reporting for peptide verification, quality assurance, and documentation. Our testing protocols are designed to confirm identity, purity, and consistency using validated analytical methods. Each analysis is delivered with clear, traceable documentation to support compliance, research integrity, and informed decision-making.
                        </p>
                    </div>


                    {/* right side */}
                    <div className='flex flex-col gap-6 w-full lg:max-w-[734px]'>
                     
                        <Image src="/images/others/what-we-do2.png" alt="What We Do" width={734} height={454} />
                    </div>
                </div>
            </section>


            {/* background layer image */}
            <div className='absolute -top-[130px] -right-[170px] z-10'>
                <Image src="/images/others/particle1.png" alt="" width={386} height={386} />
            </div>
            <div className='absolute -bottom-[65px] -left-[120px] z-10'>
                <Image src="/images/others/particle2.png" alt="" width={386} height={386} />
            </div>





        </div>
    )
}
