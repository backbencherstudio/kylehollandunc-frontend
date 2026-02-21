"use client";

import React, { use, useState } from "react";
import { Check } from "lucide-react";
import Checkbox from "@/components/reusable/Checkbox";
import { useRouter } from "next/navigation";

const ADD_ON_PRICE = 75;

const addOns = [
    "TFA analysis",
    "Raw Data",
    "Fentanyl presence analysis",
    "Alternative results format: m/m purity",
    "Variance Testing",
    "pH Measurement",
    "Endotoxin Analysis",
    "CHNS Mass Report",
    "Additional report",
    "LCMS Screening For Peptide Contamination",
    "Sterility Testing",
    "Heavy Metals Analysis",
  ];
  
export default function AddOnServices( { basePrice, quantity }: { basePrice: number, quantity: number } ) {
    const [selected, setSelected] = useState<string[]>([]);
    const router  = useRouter();    
    const toggleOption = (option: string) => {
        setSelected((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );
    };

    const total = (basePrice * quantity) +(selected.length * ADD_ON_PRICE);

    const handleAddToCart = () => {
        // Implement add to cart functionality here
        alert(`Added ${selected.length} add-on service(s) to cart. Total: $${total}`);
            router.push('/services/my-cart'); // Redirect to cart page after adding to cart
    }   

    return (
        <div className="w-full max-w-[900px] mx-auto px-4 md:px-0">

            {/* Card */}
            <div className="border border-[#E5E7EB] rounded-2xl bg-white p-4 sm:p-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 mb-6">

                    {/* Left */}
                    <div>
                        <h3 className="text-[#4A4C56] font-syne text-xl sm:text-2xl font-semibold leading-[124%] tracking-[0.12px] mb-2">
                            Add-On Testing Services
                        </h3>

                        <p className="text-[#777980] text-sm sm:text-base leading-[140%]">
                            Enhance your analysis with additional specialized tests
                        </p>
                    </div>

                    {/* Right */}
                    <div className="text-left sm:text-right">
                        <p className="text-[#1D1F2C] font-syne text-3xl sm:text-5xl font-bold leading-[100%] mb-1">
                            $75
                        </p>
                        <p className="text-[#777980] text-sm sm:text-lg leading-[150%]">
                            per add-on service
                        </p>
                    </div>

                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {addOns.map((option) => {
                        const isSelected = selected.includes(option);

                        return (
                            <button
                                key={option}
                                type="button"
                                onClick={() => toggleOption(option)}
                                className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl border-2 transition cursor-pointer w-full
                ${isSelected
                                        ? "border-[#22CAAD]"
                                        : "border-[#E5E7EB] bg-white hover:border-[#22CAAD]"
                                    }`}
                            >
                                {/* Checkbox */}
                                <Checkbox isSelected={isSelected} />

                                <span className="text-[#777980] text-sm sm:text-base lg:text-lg leading-[132%] tracking-[0.1px] break-words">
                                    {option}
                                </span>
                            </button>
                        );
                    })}

                </div>

            </div>

            {/* Total + Button */}
            <div className="mt-6">

                <div className="flex justify-between items-center mb-4">
                    <span className="text-base sm:text-2xl font-medium text-[#777980]">
                        Total
                    </span>

                    <span className="text-lg sm:text-2xl leading-[120%] text-[#1D1F2C]">
                        ${total}
                    </span>
                </div>

                <button onClick={handleAddToCart} className="w-full py-3 sm:py-4 rounded-lg bg-gradient-to-b from-[#84B6DE] to-[#1C5E96] text-white font-medium hover:opacity-90 transition">
                    Add to Cart
                </button>

            </div>

        </div>
    );
}
