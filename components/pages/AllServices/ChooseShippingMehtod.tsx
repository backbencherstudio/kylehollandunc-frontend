"use client";

import Checkbox from '@/components/reusable/Checkbox';
import { Package, Truck } from 'lucide-react';
import React, { useState } from 'react'
import TruckIcon from '@/components/icons/TruckIcon';
import ParcelIcon from '@/components/icons/ParcelIcon';

export default function ChooseShippingMehtod({ setSelectedMethod, selectedMethod }: { setSelectedMethod: (method: "own" | "label") => void, selectedMethod: "own" | "label" }) {



    return (
        <section className='w-full max-w-[1326px] mx-auto flex-col items-end gap-8 border border-[#DFE1E7] p-8 rounded-[32px] border-solid'>

            <h3 className='text-[#1D1F2C] font-syne text-2xl font-semibold leading-[120%] mb-6 md:mb-8'>Choose shipping methode</h3>


            <div className='grid sm:grid-cols-2 grid-cols-1 gap-6'>


                <div onClick={() => setSelectedMethod("own")}>
                    <OwnCourierCard selected={selectedMethod === "own" ? true : false} />
                </div>


                <div onClick={() => setSelectedMethod("label")}>
                    <ThirdPartyCourierCard selected={selectedMethod === "label" ? true : false  } />
                </div>
            </div>

            

        </section>
    )
}


const OwnCourierCard = ({ selected }: { selected: boolean }) => {
    return (
        <div className={`relative cursor-pointer rounded-2xl border-2 transition md:p-6 p-4  h-full
          ${selected ? "border-[#22CAAD] bg-white" : "border-[#E5E7EB] bg-white"}`}>
        {/* Top Row */}
        <div className="flex justify-between items-start mb-6">
  
          {/* Left Icon */}
          <div className="w-12 h-12 rounded-xl bg-[#F3F4F6] flex items-center justify-center">
              <ParcelIcon className="w-10 h-7 text-[#1D1F2C]" />
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


const ThirdPartyCourierCard = ({ selected }: { selected: boolean }) => {
    return (
        <div className={`relative cursor-pointer rounded-2xl border-2 transition md:p-6 p-4  h-full
          ${selected ? "border-[#22CAAD] bg-white" : "border-[#E5E7EB] bg-white"}`}>
      {/* Top Row */}
      <div className="flex justify-between items-start mb-6">

        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-[#F3F4F6] flex items-center justify-center">
          <TruckIcon className="w-10 h-7 text-[#1D1F2C]" />
        </div>

        {/* Checkbox */}
        <Checkbox isSelected={selected} />
      </div>

      {/* Title */}
      <h3 className="text-[#1D1F2C] font-syne text-xl sm:text-2xl font-semibold mb-3">
        We Provide a Shipping Label
      </h3>

      {/* Description */}
      <p className="text-[#777980] text-sm sm:text-base leading-[150%] mb-6 max-w-[650px]">
        Request a prepaid shipping label from us. Simply print, attach,
        and drop off your package.
      </p>

      {/* Feature Boxes */}
      <div className="flex flex-col gap-4 mb-6">

        <div className="rounded-xl border border-[#E5E7EB] p-4 bg-[#F9FAFB]">
          <h4 className="text-[#1C5E96] font-medium mb-1">
            Prepaid & hassle-free
          </h4>
          <p className="text-[#777980] text-sm">
            No shipping accounts needed. We handle the logistics.
          </p>
        </div>

        <div className="rounded-xl border border-[#E5E7EB] p-4 bg-[#F9FAFB]">
          <h4 className="text-[#1C5E96] font-medium mb-1">
            Proper cold chain
          </h4>
          <p className="text-[#777980] text-sm">
            Labels configured for appropriate temperature requirements.
          </p>
        </div>

        <div className="rounded-xl border border-[#E5E7EB] p-4 bg-[#F9FAFB]">
          <h4 className="text-[#1C5E96] font-medium mb-1">
            Tracking included
          </h4>
          <p className="text-[#777980] text-sm">
            Real-time tracking from pickup to lab delivery.
          </p>
        </div>

      </div>

      {/* Bottom Pricing Highlight */}
      <div className="rounded-xl bg-[#E6F4F1] border border-[#CFE9E4] p-4 sm:p-5 flex justify-between items-center">

        <span className="text-[#1D1F2C] font-medium">
          Label fee added to invoice
        </span>

        <div className="flex items-baseline gap-2">
          <span className="text-[#4A4C56] text-sm">
            Starting at
          </span>
          <span className="text-[#166534] text-3xl sm:text-4xl font-medium">
            $25
          </span>
        </div>

      </div>
    </div>
  );
}
