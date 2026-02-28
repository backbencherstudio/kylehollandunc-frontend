"use client";

import React from "react";
import Checkbox from "@/components/reusable/Checkbox";

type Addon = {
  id: number;
  name: string;
  price: number;
};

const addOns: Addon[] = [
  { id: 1, name: "Endotoxin Analysis", price: 75 },
  // { id: 2, name: "TFA Analysis", price: 75 },
];

export default function AddOnService({
  basePrice,
  quantity,
  selectedAddons,
  setSelectedAddons,
}: {
  basePrice: number;
  quantity: number;
  selectedAddons: Addon[];
  setSelectedAddons: React.Dispatch<React.SetStateAction<Addon[]>>;
}) {
  const toggleOption = (addon: Addon) => {
    setSelectedAddons((prev) =>
      prev.some((item) => item.id === addon.id)
        ? prev.filter((item) => item.id !== addon.id)
        : [...prev, addon]
    );
  };

 

 
  return (
    <div className="w-full max-w-[900px] mx-auto px-4 md:px-0">
      <div className="border border-[#E5E7EB] rounded-2xl bg-white p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 mb-6">
          <div>
            <h3 className="text-[#4A4C56] font-syne text-xl sm:text-2xl font-semibold mb-2">
              Add-On Testing Services
            </h3>
            <p className="text-[#777980] text-sm sm:text-base">
              Enhance your analysis with additional specialized tests
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-[#1D1F2C] font-syne text-3xl sm:text-5xl font-bold mb-1">
              $75
            </p>
            <p className="text-[#777980] text-sm sm:text-lg">
              per add-on service
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addOns.map((addon) => {
            const isSelected = selectedAddons.some(
              (item) => item.id === addon.id
            );

            return (
              <button
                key={addon.id}
                type="button"
                onClick={() => toggleOption(addon)}
                className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl border-2 transition w-full
                ${
                  isSelected
                    ? "border-[#22CAAD] bg-[#22caae46]/20"
                    : "border-[#E5E7EB] bg-white hover:border-[#22CAAD]"
                }`}
              >
                <Checkbox isSelected={isSelected} />

                <span className="text-[#777980] text-sm sm:text-base lg:text-lg text-left">
                  {addon.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    
    </div>
  );
}