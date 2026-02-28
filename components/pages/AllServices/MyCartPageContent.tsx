"use client";

import React, { useState } from "react";
import { Stepper } from "./Stepper";
import CartTable from "./CartTable";
import ChooseShippingMehtod from "./ChooseShippingMehtod";
import SampleDetails from "./SampleDetails";
import MakePaymentSection from "./MakePaymentSection";
import { useGetCartQuery } from "@/redux/features/order/orderApi";

export default function MyCart() {
    const { data: cartData } = useGetCartQuery();

    const [currentStep, setCurrentStep] = useState(3);
    const nextStep = () => setCurrentStep((p) => Math.min(3, p + 1));
    const [selectedMethod, setSelectedMethod] = useState<"own" | "label">("own");
    const [address, setAddress] = useState("");

    // This function now ONLY handles step navigation
    const handleShippingUpdate = () => {
        nextStep();
    };

    return (
        <section className="max-w-[1326px] mx-auto px-4 md:px-0 py-12">
            <h2 className="text-3xl sm:text-4xl font-syne font-semibold text-center mb-6 md:mb-12">
                My Cart
            </h2>

            <Stepper currentStep={currentStep} setStep={setCurrentStep} />

            <div className="mt-8 md:mt-12">
                <div className="mb-6 md:mb-12">
                    <CartTable />
                </div>

                {currentStep === 1 && (
                    <div className="flex flex-col gap-6 md:gap-12">
                        <ChooseShippingMehtod
                            address={address}
                            setAddress={setAddress}
                            selectedMethod={selectedMethod}
                            setSelectedMethod={setSelectedMethod}
                            handleProceed={handleShippingUpdate}
                            cartData={cartData?.data[0]}
                        />
                    </div>
                )}

                {currentStep === 2 && (
                    <SampleDetails
                        address={address}
                        cartData={cartData?.data[0]}
                        selectedMethod={selectedMethod}
                        handleNext={nextStep}
                    />
                )}

                {currentStep === 3 && (<MakePaymentSection cartData={cartData?.data[0]} shippingMethod={selectedMethod} handleProceed={() => { }} />)}
            </div>
        </section>
    );
}