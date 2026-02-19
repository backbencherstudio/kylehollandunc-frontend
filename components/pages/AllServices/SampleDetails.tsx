import React from 'react'
import TruckIcon from '@/components/icons/TruckIcon';
import Checkbox from '@/components/reusable/Checkbox';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
export default function SampleDetails({ selectedMethod }: { selectedMethod: "own" | "label" }) {
    return (
        <section className=''>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 md:gap-12 mb-6 md:mb-12">
                <ShippingSummaryCard method={selectedMethod} address="123 Main St, Anytown, USA" />
                <OrderSummaryCard subtotal={100} shipping={10} />
            </div>

            <div className='flex flex-col md:flex-row gap-6 md:gap-16'>

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
                                                    <p className='mb-2 self-stretch text-[#FFF]  text-base sm:text-lg font-semibold leading-[150%] tracking-[0.09px] '>{item.name}</p>
                                                    <p className='self-stretch text-[#FFF]  text-base sm:text-lg font-normal leading-[150%] tracking-[0.09px]'>{item.description}</p>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                        </div>

                    </div>
                </div>


                {/* RIGHT SIDE  */}

                <div>
                    <h2 className='text-[#1D1F2C] font-syne text-2xl  sm:text-4xl font-semibold leading-[124%] tracking-[0.18px] mb-6 md:mb-8'>Sample Details</h2>

                    <div className='flex flex-col gap-2.5'>
                        <div className='p-2.5 border-b border-[#DFE1E7]'>
                            <p className='self-stretch text-[#5D6873] text-base font-normal leading-[160%] tracking-[0.08px]'>Organization (supplier/clinic/pharmacy)</p>
                        </div>
                        <div className='p-2.5 border-b border-[#DFE1E7]'>
                            <p className='self-stretch text-[#5D6873] text-base font-normal leading-[160%] tracking-[0.08px]'>Peptide to test (e g , BPC-157, Semaglutide)</p>
                        </div>
                        <div className='p-2.5 border-b border-[#DFE1E7]'>
                            <p className='self-stretch text-[#5D6873] text-base font-normal leading-[160%] tracking-[0.08px]'>What do you need verified?
                                (identity/ purity/ potency/ contaminants/ stability/desired turnaround)</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export function ShippingSummaryCard({
    method,
    address,
}: { method: "own" | "label", address: string }) {
    const isLabel = method === "label";

    return (
        <div className="w-full max-w-[900px] border border-[#DFE1E7] rounded-[32px] p-6 sm:p-8 bg-white">

            <h3 className="text-[#1D1F2C] font-syne text-xl sm:text-2xl font-semibold mb-6">
                Shipping method
            </h3>

            {/* Selected Method */}
            <div className="rounded-2xl border-2 border-[#22CAAD] p-6 flex items-center justify-between">

                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F3F4F6] flex items-center justify-center">
                        <TruckIcon className="w-6 h-6 text-[#1D1F2C]" />
                    </div>

                    <h4 className="text-[#1D1F2C] font-syne text-lg sm:text-2xl font-semibold">
                        {isLabel
                            ? "We Provide a Shipping Label"
                            : "Ship with Your Own Courier"}
                    </h4>
                </div>

                <Checkbox isSelected />
            </div>

            {/* Address */}
            {isLabel && address && (
                <div className="mt-6">
                    <p className="text-[#777980] text-sm mb-2">Address</p>
                    <p className="text-[#4A4C56] text-base border-b border-[#E5E7EB] pb-3">
                        {address}
                    </p>
                </div>
            )}
        </div>
    );
}



interface OrderSummaryCardProps {
    subtotal: number;
    shipping: number;
}

export function OrderSummaryCard({
    subtotal,
    shipping,
}: OrderSummaryCardProps) {
    const total = subtotal + shipping;

    return (
        <div className="w-full max-w-[900px] border border-[#DFE1E7] rounded-[32px] p-6 sm:p-8 bg-white">

            <h3 className="text-[#1D1F2C] font-syne text-xl sm:text-2xl font-semibold mb-6">
                Order Summary
            </h3>

            <div className="flex flex-col gap-4 text-[#4A4C56] text-base">

                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                </div>

                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping}</span>
                </div>

                <div className="border-t border-[#E5E7EB] pt-4 mt-2 flex justify-between font-semibold text-[#1D1F2C]">
                    <span>Total</span>
                    <span>${total}</span>
                </div>

            </div>
        </div>
    );
}
