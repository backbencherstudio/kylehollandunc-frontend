"use client";

import React, { useState } from "react";
import { Stepper } from "./Stepper";

export default function MyCart() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <section className="max-w-[1100px] mx-auto px-4 py-12">

      <h2 className="text-3xl sm:text-4xl font-syne font-semibold text-center mb-6">
        My Cart
      </h2>

      <Stepper currentStep={currentStep} setStep={setCurrentStep} />

      {/* Render Step Content */}
      <div className="mt-8">

        {currentStep === 1 && (
          <div>
            <h3>Add to Cart Section</h3>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3>Sample Details Section</h3>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h3>Make Payment Section</h3>
          </div>
        )}

      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-10">

        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-6 py-3 rounded-lg border border-gray-300 disabled:opacity-50"
        >
          Back
        </button>

        <button
          onClick={nextStep}
          disabled={currentStep === 3}
          className="px-6 py-3 rounded-lg bg-gradient-to-b from-[#84B6DE] to-[#1C5E96] text-white disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </section>
  );
}
