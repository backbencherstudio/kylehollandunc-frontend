import SectionLabel, { SectionHeading } from "@/components/reusable/SectionLabel";
import CircleCheckIcon from "@/components/icons/CircleCheckIcon";
import Image from "next/image";
import CheckCircleIcon from "@/components/icons/CheckCircleIcon";

export default function WhatWeDo() {
    return (
        <div className='relative overflow-hidden max-w-[1600px] mx-auto'>

            {/* content container */}
            <section className='max-w-[1320px] mx-auto px-4 lg:px-0 py-12 md:py-16 lg:py-25  relative z-50 bg'>
                <div className='flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-between'>





                    {/* left side */}
                    <div className='flex flex-col gap-6 w-full lg:max-w-[734px]'>
                        <Image src="/images/others/how-we-work.png" alt="What We Do" width={734} height={454} />
                    </div>


                    {/* right side */}
                    <div className='flex flex-col gap-6 w-full lg:max-w-[462px]'>
                        <div>
                            <SectionLabel className='w-fit mb-4'>What We Do</SectionLabel>
                            <SectionHeading className=''>What we do.</SectionHeading>
                        </div>
                        <div className="flex flex-col gap-2.5">
                            <div className="flex items-center gap-2.5">
                                <CheckCircleIcon />
                                <p className="leading-[120%] font-syne text-base font-normal text-[#777980]">Consistent intake</p>
                            </div>
                            <div className="flex items-center gap-2.5">
                                    <CheckCircleIcon />
                                <p className="leading-[120%] font-syne text-base font-normal text-[#777980]">Verified results</p>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <CheckCircleIcon />
                                <p className="leading-[120%] font-syne text-base font-normal text-[#777980]">Comprehensive documentation</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* background layer image */}
            <div className='absolute -bottom-[20px] -right-[100px] z-10'>
                <Image src="/images/others/particle1.png" alt="" width={386} height={386} />
            </div>




        </div>
    )
}
