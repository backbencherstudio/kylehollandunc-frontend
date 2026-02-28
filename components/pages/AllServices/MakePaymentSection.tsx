"use client"


import { useState } from "react";
import { CreditCard } from "lucide-react";

import { useRouter } from "next/navigation";
import PaymentSection from "./PaymentSection/PaymentSection";
interface FinalOrderSummaryProps {
  subtotal: number;
  shipping: number;
  onCancel?: () => void;
  onPay?: () => void;
}

type PaymentMethod = "card" | "paypal";

export default function   MakePaymentSection({cartData, handleProceed, shippingMethod}:{cartData: any, handleProceed:() => void, shippingMethod: "own" | "label"}) {


  const subtotal = cartData?.total_price;
  // const shipping = cartData?.shipping_price;
  // console.log("this is payment", handleProceed )

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-6 #FCFCFD)]  rounded-lg border-solid'>

      <PaymentSection cartId={cartData?.id} />

      <FinalOrderSummary  subtotal={subtotal} shipping={shippingMethod === "own" ? 0 : 25} onPay={handleProceed} />
    </section>
  )
}








function FinalOrderSummary({
  subtotal,
  shipping,
  onCancel,
  onPay,
}: FinalOrderSummaryProps) {
  const total = Number(subtotal) + Number(shipping);
  const router = useRouter();


  const handleMakePayment = () => {
    console.log("payment done")

    router.push("/order")
 
  }
  return (
    <div className="w-full max-w-[900px] mx-auto border border-[#DFE1E7] rounded-[32px] p-6 sm:p-8 bg-white flex flex-col justify-between min-h-[420px]">

      {/* Top Section */}
      <div>
        <h3 className="text-[#1D1F2C] font-syne text-xl sm:text-2xl font-semibold mb-8">
          Order Summary
        </h3>

        <div className="flex flex-col gap-6 text-[#4A4C56] text-base">

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shipping}</span>
          </div>

          <div className="border-t border-[#E5E7EB] pt-4 flex justify-between font-semibold text-[#1D1F2C] text-lg">
            <span>Total</span>
            <span>${total}</span>
          </div>

        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">

        {/* Cancel */}
        {/* <button
          onClick={onCancel}
          className="w-full sm:w-1/2 border border-[#E5E7EB] rounded-lg py-3 text-[#4A4C56] hover:bg-gray-50 transition"
        >
          Cancel
        </button> */}

        {/* Make Payment */}
        {/* <button
          onClick={handleMakePayment}
          className="w-full sm:w-1/2 py-3 rounded-lg bg-linear-to-b from-[#84B6DE] to-[#1C5E96] text-white font-medium hover:opacity-90 transition cursor-pointer"
        >
          Make Payment
        </button> */}


      </div>

    </div>
  );
}
