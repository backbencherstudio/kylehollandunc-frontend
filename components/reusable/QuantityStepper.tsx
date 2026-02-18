"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantityStepperProps) {
  const handleDecrease = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrease = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="inline-flex items-center justify-between w-[180px] h-[64px] px-6 rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">

      {/* Minus */}
      <button
        type="button"
        onClick={handleDecrease}
        className="text-[#777980] hover:text-[#1D1F2C] transition"
      >
        <Minus size={22} />
      </button>

      {/* Value */}
      <span className="md:text-[20px] font-medium text-[#20243cc0]">
        {value}
      </span>

      {/* Plus */}
      <button
        type="button"
        onClick={handleIncrease}
        className="text-[#777980] hover:text-[#1D1F2C] transition"
      >
        <Plus size={22} />
      </button> 

    </div>
  );
}
