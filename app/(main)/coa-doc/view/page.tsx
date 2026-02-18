import { SectionHeading } from "@/components/reusable/SectionLabel";
import Image from "next/image";

export default function page() {
    return (
        <section className="mt-[98px] sm:mt-[136px] mb-[40px] px-4 md:px-0">
            <div className=" sm:mt-[72px] mb-[58px] flex flex-col items-center justify-center">
                <SectionHeading className="text-center mb-2">Sample COA Document</SectionHeading>
                <p className="max-w-[748px] mx-auto text-[#777980] text-center  md:text-lg font-normal leading-[150%] tracking-[0.09px]">This sample demonstrates the comprehensive reporting format used for all peptide
                    testing results. Click below to view or download the full Certificate of Analysis.</p>
            </div>



            {/* Document */}
            <div className="flex items-center justify-center">




                <div className="w-full px-4 sm:px-6 lg:px-0 flex flex-col items-center justify-center gap-8 md:16">
                    <div className="relative w-full max-w-[1324px] aspect-1324/1713 border-4 border-[#DFE1E7] rounded-lg overflow-hidden">

                        <Image
                            src="/images/coa-doc3.png"
                            alt="COA Document"
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 900px"
                            priority
                        />

                    </div>
                    <div className="relative w-full max-w-[1324px] aspect-1324/1713 border-4 border-[#DFE1E7] rounded-lg overflow-hidden">

                        <Image
                            src="/images/coa-doc3.png"
                            alt="COA Document"
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 900px"
                            priority
                        />

                    </div>
                </div>

            </div>


        </section>
    );
}
