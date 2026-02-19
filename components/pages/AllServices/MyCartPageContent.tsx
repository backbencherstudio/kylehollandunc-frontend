"use client";

import React, { useState } from "react";
import { Stepper } from "./Stepper";
import CartTable from "./CartTable";
import ChooseShippingMehtod from "./ChooseShippingMehtod";
import { OrderSummaryCard } from "./OrderSummaryCard";
import SampleDetails from "./SampleDetails";
import MakePaymentSection from "./MakePaymentSection";

export default function MyCart() {

    // handle stepper logic
    const [currentStep, setCurrentStep] = useState(1);
    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };
    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    // handle add to cart logic
    // const [selectedServices, setSelectedServices] = useState<string[]>([]);
    // const handleAddToCart = (service: string) => {
    //     setSelectedServices([...selectedServices, service]);
    // };


    const [selectedMethod, setSelectedMethod] = useState<"own" | "label">("own");

    return (
        <section className="max-w-[1326px] mx-auto px-4 md:px-0 py-12 ">

            <h2 className="text-3xl sm:text-4xl font-syne font-semibold text-center mb-6 md:mb-12">
                My Cart
            </h2>

            <Stepper currentStep={currentStep} setStep={setCurrentStep} />

            {/* Render Step Content */}
            <div className="mt-8 md:mt-12">

                {/* common content for all steps */}
                <div className="mb-6 md:mb-12">
                    <CartTable />
                </div>

                {/* Render Step Content */}
                {currentStep === 1 && (
                    <div className="flex flex-col gap-6 md:gap-12">
                        <ChooseShippingMehtod selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod}  />
                        <OrderSummaryCard
                         handleCancel={() => {}} handleProceed={() => {nextStep()}} subtotal={100} shipping={10} />
                    </div>
                )}

                {currentStep === 2 && (
                    <SampleDetails selectedMethod={selectedMethod} />
                )}

                {currentStep === 3 && (
                    <MakePaymentSection handleProceed={()=>nextStep()}/>
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
