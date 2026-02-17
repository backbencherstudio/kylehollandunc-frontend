import SectionLabel from '@/components/reusable/SectionLabel'
import React from 'react'
import Image from 'next/image'
import ChevronLeft from '@/components/icons/ChevronLeft'
export default function RequestForm() {
    return (
        <section className='bg-white max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[140px] py-12 sm:pt-22.5 sm:pb-25'>



            {/* Content */}
            <div className='max-w-[1320px] mx-auto '>


            <h2 className="font-syne mb-10 md:mb-12 text-center text-[#1D1F2C] text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[124%] tracking-[0.24px]">
            Start a peptide testing request</h2>

                <div className='flex  md:flex-row flex-col gap-16'>
                
                    {/* LEFT SIDE */}
                    <div className="relative w-full lg:max-w-[628px] h-[540px] sm:h-[653px] rounded-2xl overflow-hidden">

                        {/* Background Image */}
                        <Image
                            src="/images/others/testtubes.png"
                            alt="Request Test"
                            fill
                            className="object-cover"
                            // sizes="(max-width: 1024px) 100vw, 658px"
                            priority
                        />

                        {/* Dark Overlay (optional but recommended) */}
                        <div className="absolute inset-0 bg-black/30" />

                        {/* Content Box */}
                        <div className="absolute inset-0 p-6 sm:p-8 lg:p-12">

                            <div className='w-full  backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl p-8 text-white h-full'>

                                <div className=''
                                >
                                    <h2 className='text-white font-syne text-2xl  sm:text-4xl font-semibold leading-[124%] tracking-[0.18px] mb-6'>What to include</h2>

                                    <div className='flex flex-col gap-4'>


                                        {
                                            [{
                                                name: 'Peptide name', description: 'Include concentration and vial size if known.'
                                            },
                                            {
                                                name: 'Lot / batch info', description: 'Any identifiers help preserve traceability.'
                                            },
                                            {
                                                name: 'Desired scope ', description: 'Identityr purity, potency, contaminants, stability.'
                                            },
                                            {
                                                name: 'Timeline', description: 'Standard vs expedited (if available).'
                                            }].map((item, index) => (
                                                <div key={index} className='flex items-start justify-start gap-2.5'>
                                                    <div>
                                                        <ChevronLeft />
                                                    </div>
                                                    <div>
                                                        <p className='mb-2 self-stretch text-[color:var(--W,#FFF)]  text-base sm:text-lg font-semibold leading-[150%] tracking-[0.09px] '>{item.name}</p>
                                                        <p className='self-stretch text-[color:var(--W,#FFF)]  text-base sm:text-lg font-normal leading-[150%] tracking-[0.09px]'>{item.description}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                    {/* RIGHT SIDE */}
                    <div className='w-full lg:max-w-[628px] '>
                        <RequestFormCard />
                    </div>

                </div>

            </div>
        </section>
    )
}





const RequestFormCard = () => {
    return (
        <section className="max-w-[800px] mx-auto px-6 py-16">

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-syne font-semibold text-[#1D1F2C] mb-12">
                Request form
            </h2>

            {/* Form */}
            <form className="flex flex-col gap-8 md:gap-10">

                <FormInput placeholder="Full Name" />
                <FormInput placeholder="Email" />
                <FormInput placeholder="Organization (supplier/clinic/pharmacy)" />
                <FormInput placeholder="Peptide to test (e g , BPC-157, Semaglutide)" />
                <textarea
                    placeholder="What do you need verified? (identity/ purity/ potency/ contaminants/ stability/ desired turnaround)"
                    rows={2}
                    className="w-full bg-transparent border-b border-[#E5E7EB] pb-3 text-[#4A4C56] placeholder-[#9CA3AF] text-base md:text-lg focus:outline-none focus:border-[#1C5E96] resize-none leading-[150%] h-[100px] md:h-auto"
                />


                {/* Button */}
                <div>
                    <button
                        type="submit"
                        className="px-8 py-4 rounded-full bg-[linear-gradient(180deg,#84B6DE_0%,#1C5E96_100%)] text-white text-lg font-medium hover:opacity-90 transition cursor-pointer"
                    >
                        Send Request
                    </button>
                </div>

            </form>
        </section>
    );
};



/* ================= Reusable Input ================= */

interface FormInputProps {
    placeholder: string;
    className?: string;
}

const FormInput: React.FC<FormInputProps> = ({ placeholder, className = '' }) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            className={`bg-transparent border-b border-[#E5E7EB] pb-3 text-[#4A4C56] placeholder-[#9CA3AF] text-base md:text-lg focus:outline-none focus:border-[#1C5E96] transition  ${className}`}
        />
    );
};
