"use client";

import Checkbox from '@/components/reusable/Checkbox';
import { Package } from 'lucide-react';
import React, { useState } from 'react'

export default function ChooseShippingMehtod() {

    const [selected, setSelected] = useState(true);

    const toggleOption = () => {
        setSelected(!selected);
    };

    return (
        <section className='flex w-[1326px] flex-col items-end gap-8 border border-[color:var(--background-pressed-100,#DFE1E7)] p-8 rounded-[32px] border-solid'>

            <h3 className='text-[color:var(--Gray-Black-500,#1D1F2C)] [font-family:Syne] text-2xl font-semibold leading-[120%]'>Choose shipping methode</h3>


            <div className='flex items-center justify-center gap-6'>


                <div>
                    <OwnCourierCard selected={selected} />
                </div>


                <div>

                </div>
            </div>

        </section>
    )
}


const OwnCourierCard = ({ selected }: { selected: boolean }) => {
    return (
        <div className={`relative cursor-pointer rounded-2xl border-2 transition p-6 sm:p-8
          ${selected ? "border-[#22CAAD] bg-white" : "border-[#E5E7EB] bg-white"}`}>
        {/* Top Row */}
        <div className="flex justify-between items-start mb-6">
  
          {/* Left Icon */}
          <div className="w-12 h-12 rounded-xl bg-[#F3F4F6] flex items-center justify-center">
            <Package className="w-6 h-6 text-[#1D1F2C]" />
          </div>
  
          {/* Right Checkbox */}
          <Checkbox isSelected={selected} />
        </div>
  
        {/* Title */}
        <h3 className="text-[#1D1F2C] font-syne text-xl sm:text-2xl font-semibold mb-3">
          Ship with Your Own Courier
        </h3>
  
        {/* Description */}
        <p className="text-[#777980] text-sm sm:text-base leading-[150%] mb-6 max-w-[600px]">
          Use your preferred shipping carrier and account. Ship samples directly
          to our lab address. Address will be provided after confirmation.
        </p>
  
        {/* Info Boxes */}
        <div className="flex flex-col gap-4">
  
          {/* Box 1 */}
          <div className="rounded-xl border border-[#E5E7EB] p-4 bg-[#F9FAFB]">
            <h4 className="text-[#1C5E96] font-medium mb-1">
              Flexible carrier choice
            </h4>
            <p className="text-[#777980] text-sm">
              Use FedEx, UPS, USPS, or any carrier you prefer.
            </p>
          </div>
  
          {/* Box 2 */}
          <div className="rounded-xl border border-[#E5E7EB] p-4 bg-[#F9FAFB]">
            <h4 className="text-[#1C5E96] font-medium mb-1">
              Full control
            </h4>
            <p className="text-[#777980] text-sm">
              Track and manage shipments on your terms.
            </p>
          </div>
  
          {/* Box 3 */}
          <div className="rounded-xl border border-[#E5E7EB] p-4 bg-[#F9FAFB]">
            <h4 className="text-[#1C5E96] font-medium mb-2">
              Packaging Guidelines
            </h4>
  
            <ul className="list-disc pl-5 space-y-1 text-[#777980] text-sm">
              <li>
                Use insulated packaging with cold packs for temperature-sensitive peptides
              </li>
              <li>
                Secure vials to prevent breakage during transit
              </li>
              <li>
                Include a copy of your order confirmation inside the package
              </li>
              <li>
                Label package "FRAGILE - LABORATORY SAMPLES"
              </li>
            </ul>
          </div>
  
        </div>
      </div>
    )
}


// const ThirdPartyCourierCard = ({ selected }: { selected: boolean }) => {