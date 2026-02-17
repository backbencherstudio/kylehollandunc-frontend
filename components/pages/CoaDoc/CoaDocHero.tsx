import React from 'react'

export default function CoaDocHero() {
    return (
        <section className='bg-[#023347]'>
            <div className='flex max-w-[1600px] flex-col justify-center items-center md:gap-14 gap-10 px-6 sm:px-10 md:px-16 lg:px-[140px] py-10 sm:py-12 md:py-16 lg:py-[100px] mx-auto'>

                <div className='flex flex-col items-center justify-center gap-7.5 mx-auto max-w-[596px]'>

                    <h3 className='text-[#FFF] font-syne text-4xl md:text-5xl font-semibold leading-[124%] tracking-[0.24px] text-center  '>Sample COA Document</h3>
                    <p className=' text-[#D2D2D5] text-center font-inter text-sm sm:text-lg font-normal leading-[150%] tracking-[0.09px]'>This sample demonstrates the comprehensive reporting format used for all peptide
                        testing results. Click below to view or download the full Certificate of Analysis.</p>


                    <button className='md:px-8 px-6 md:py-4 py-3 rounded-full bg-[linear-gradient(180deg,#84B6DE_0%,#1C5E96_100%)] text-white text-lg font-medium hover:opacity-90 transition cursor-pointer mx-auto text-center'       >
                        View COA Document
                    </button>
                </div>
            </div>
        </section>
    );
}
