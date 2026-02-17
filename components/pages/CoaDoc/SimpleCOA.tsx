import SectionLabel, { SectionHeading } from '@/components/reusable/SectionLabel'
import ChevronLeft from '@/components/icons/ChevronLeft'

const HowItworks = () => {
    return (
        <section className='max-w-[1320px] mx-auto px-4 md:px-0  py-10 md:py-16 lg:py-30'>
            <div className='mb-10 md:mb-12 lg:mb-14 flex flex-col items-center justify-center'>
                <SectionLabel className='w-fit mb-2 text-[#1C5E96] border-[#1C5E96] '>Sample COA</SectionLabel>
                <SectionHeading className='max-w-[700px] text-[#1D1F2C] z-50 '>What's Included </SectionHeading>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 '>


            </div>
        </section>
    )
}

export default HowItworks


const StepCard = ({ step, title, description }: { step: number, title: string, description: string }) => {
    return (
        <div className='flex w-[424px] h-[262px] flex-col items-start gap-8 border border-[color:var(--background-pressed-100,#DFE1E7)] [background:#FFF] p-6 rounded-2xl border-solid'>


            {/* top section */}
            <div className='flex justify-between items-center gap-2  w-full'>

                <h2 className="text-[#023347]  text-[64px] font-semibold leading-[120%] tracking-[0.32px]">{step}</h2>


                <div>
                    <ChevronLeft className='w-12 h-12 text-[#023347]  ' />
                </div>

            </div>


            {/* bottom section */}
            <div>
                <h3 className='text-[color:var(--Gray-Black-500,#1D1F2C)]  [font-family:Syne] text-[32px] font-semibold leading-[120%] mb-3'>{title}</h3>
                <p className='self-stretch text-[color:var(--Gray-Black-300,#777980)] [font-family:Inter] text-lg font-normal leading-[150%] tracking-[0.09px]'>{description}</p>
            </div>

        </div>
    )
}