"use client";

import React, { useState } from "react";
import Image from "next/image";
import SectionLabel, { SectionHeading } from "@/components/reusable/SectionLabel";
import QuantityStepper from "@/components/reusable/QuantityStepper";
import CircleCheckIcon from "@/components/icons/CircleCheckIcon";
import AddOnService from "./AddOnService";

export default function ServiceSection() {
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="max-w-[1320px] mx-auto px-4 lg:px-0 py-8 md:py-10 lg:py-12.5">

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">

        {/* Image */}
        <div className="w-full lg:max-w-[596px] relative aspect-square lg:h-[596px] rounded-xl overflow-hidden">
          <Image
            src="/images/services/service-medicine.png"
            alt="service"
            fill
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 space-y-8">

          {/* Top */}
          <div>
            <SectionHeading className="mb-4">
              Standard Testing Panel
            </SectionHeading>

            <p className="max-w-[581px] text-[#777980] text-sm sm:text-base leading-[140%] tracking-[0.08px] mb-6">
              Our comprehensive standard testing panel includes identity
              verification and basic purity assessment for your peptide samples.
            </p>

            <div className="mb-3">
              <p className="text-[color:var(--Gray-Black-500,#1D1F2C)] [font-family:Syne] text-5xl font-bold leading-[120%]">$199</p>
              <p className="text-[color:var(--Gray-Black-400,#4A4C56)] [font-family:Inter] text-lg font-normal leading-[150%] tracking-[0.09px]">Per peptide tested</p>
            </div>

            <QuantityStepper value={quantity} onChange={setQuantity} />
          </div>

          {/* What's Included */}
          <div>
            <h4 className="text-[#4A4C56] font-syne text-xl sm:text-2xl font-bold mb-4">
              What's included?
            </h4>

            <div className="flex flex-col gap-3">
              {[
                "Basic lab diagnostics",
                "Essential drug supply",
                "Lab report access",
                "Expert phone support",
                "Advanced test panels",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2 text-[#777980]">
                  <CircleCheckIcon className="w-5 h-5 mt-1 shrink-0" />
                  <p className="text-sm sm:text-base leading-[150%] tracking-[0.09px]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Add On */}
          <AddOnService />

        </div>

      </div>

    </section>
  );
}
