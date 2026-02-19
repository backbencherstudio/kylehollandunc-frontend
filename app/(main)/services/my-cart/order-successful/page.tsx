"use client";

import Image from "next/image";

export default function SuccessPage() {
    return (
        <section className="mt-[80px] sm:mt-[96px] mb-[60px] px-4 max-w-[1320px] mx-auto">

            {/* ===== Top Section ===== */}
            <div className="flex flex-col items-center justify-center text-center mb-12 pt-6">
                <div className="relative w-full max-w-[280px] h-[140px] sm:h-[160px] md:h-[180px] mx-auto mb-6">
                    <Image
                        src="/images/success.png"
                        alt="Success"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>


                <p className="text-[#4A4C56] text-base sm:text-lg leading-[160%]">
                    Your order has been successfully placed
                </p>
            </div>

            {/* ===== Order Summary Card ===== */}
            <div className=" mx-auto border border-[#E5E7EB] bg-[#FCFCFD] rounded-[24px] p-4 sm:p-6">
                <div className=" mx-auto border border-[#E5E7EB] bg-[#FCFCFD] rounded-[24px] p-4 sm:p-6">

                    <h4 className="text-[#1D1F2C] font-syne text-xl sm:text-2xl font-semibold mb-8">
                        Order Summary
                    </h4>

                    <div className="flex flex-col gap-6 text-base">

                        <div className="flex justify-between">
                            <span className="text-[#777980]">Payment Method</span>
                            <span className="text-[#1D1F2C] font-medium">Card</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-[#777980]">Subtotal</span>
                            <span className="text-[#1D1F2C]">$274</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-[#777980]">Shipping</span>
                            <span className="text-[#1D1F2C]">$25</span>
                        </div>

                        <div className="border-t border-[#E5E7EB] pt-4 flex justify-between text-lg font-semibold text-[#1D1F2C]">
                            <span>Total</span>
                            <span>$299</span>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
