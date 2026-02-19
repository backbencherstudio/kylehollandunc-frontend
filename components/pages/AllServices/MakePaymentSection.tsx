"use client"


import { useState } from "react";
import { CreditCard } from "lucide-react";
import Checkbox from "@/components/reusable/Checkbox";
import CardIcon from "@/components/icons/CardIcon";
import PaypalIcon from "@/components/icons/PaypalIcon";

interface FinalOrderSummaryProps {
  subtotal: number;
  shipping: number;
  onCancel?: () => void;
  onPay?: () => void;
}

type PaymentMethod = "card" | "paypal";

export default function MakePaymentSection({handleProceed}:{handleProceed:() => void}) {



  console.log("this is payment", handleProceed )

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-6 #FCFCFD)]  rounded-lg border-solid'>

      <PaymentSection ></PaymentSection>

      <FinalOrderSummary  subtotal={1000} shipping={123} onPay={handleProceed} />
    </section>
  )
}




function PaymentSection() {
  const [method, setMethod] = useState<PaymentMethod>("card");

  return (
    <section className="w-full max-w-[900px] mx-auto border border-[#DFE1E7] rounded-[32px] p-6 sm:p-8 bg-white">

      {/* ================= Payment Method ================= */}
      <div className="mb-8">

        <div className="bg-[#F3F4F6] rounded-xl px-4 py-3 mb-6">
          <h3 className="text-[#1D1F2C] font-syne text-lg sm:text-xl font-semibold">
            Payment Method
          </h3>
        </div>

        

        {/* Card Payment */}
        <button
          type="button"
          onClick={() => setMethod("card")}
          className={`w-full flex items-center justify-between rounded-xl border-2 p-4 transition
            ${method === "card"
              ? "border-[#22CAAD] bg-[#E8F6F3]"
              : "border-[#E5E7EB] bg-white"
            }
          `}
        >
          <div className="flex items-center gap-3">
            {/* <CreditCard className="w-5 h-5 text-[#1D1F2C]" /> */}

            <CardIcon />
            <span className="text-[#1D1F2C] text-base font-medium">
              Card Payment
            </span>
          </div>

          <Checkbox isSelected={method === "card"} />
        </button>

        {/* PayPal */}
        <button
          type="button"
          onClick={() => setMethod("paypal")}
          className={`w-full mt-4 flex items-center justify-between rounded-xl border-2 p-4 transition
            ${method === "paypal"
              ? "border-[#22CAAD] bg-[#E8F6F3]"
              : "border-[#E5E7EB] bg-white"
            }
          `}
        >
          <div className="flex items-center gap-3">
            <PaypalIcon />
            <span className="text-[#1D1F2C] text-base font-medium">
              PayPal
            </span>
          </div>

          <Checkbox isSelected={method === "paypal"} />
        </button>
      </div>

      {/* ================= Payment Details ================= */}
      {method === "card" && (
        <div>

          <div className="bg-[#F3F4F6] rounded-xl px-4 py-3 mb-6">
            <h3 className="text-[#1D1F2C] font-syne text-lg sm:text-xl font-semibold">
              Payment Details
            </h3>
          </div>

          <div className="flex flex-col gap-6">

            {/* Card Number */}
            <div>
              <label className="text-sm text-[#4A4C56]">
                Card Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Card Number"
                className="w-full bg-transparent border-b border-[#E5E7EB] pb-3 mt-2 text-[#4A4C56] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1C5E96]"
              />
            </div>

            {/* Expiry + CVV */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div>
                <label className="text-sm text-[#4A4C56]">
                  Expiry Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Expiry Date"
                  className="w-full bg-transparent border-b border-[#E5E7EB] pb-3 mt-2 text-[#4A4C56] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1C5E96]"
                />
              </div>

              <div>
                <label className="text-sm text-[#4A4C56]">
                  CVV <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter CVV"
                  className="w-full bg-transparent border-b border-[#E5E7EB] pb-3 mt-2 text-[#4A4C56] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1C5E96]"
                />
              </div>

            </div>

            {/* Cardholder Name */}
            <div>
              <label className="text-sm text-[#4A4C56]">
                Cardholder Name
              </label>
              <input
                type="text"
                placeholder="Enter Cardholder Name"
                className="w-full bg-transparent border-b border-[#E5E7EB] pb-3 mt-2 text-[#4A4C56] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1C5E96]"
              />
            </div>

          </div>
        </div>
      )}
    </section>
  );
}




function FinalOrderSummary({
  subtotal,
  shipping,
  onCancel,
  onPay,
}: FinalOrderSummaryProps) {
  const total = subtotal + shipping;


  const handleMakePayment = () => {
    console.log("payment done")
 
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
        <button
          onClick={onCancel}
          className="w-full sm:w-1/2 border border-[#E5E7EB] rounded-lg py-3 text-[#4A4C56] hover:bg-gray-50 transition"
        >
          Cancel
        </button>

        {/* Make Payment */}
        <button
          onClick={handleMakePayment}
          className="w-full sm:w-1/2 py-3 rounded-lg bg-gradient-to-b from-[#84B6DE] to-[#1C5E96] text-white font-medium hover:opacity-90 transition"
        >
          Make Payment
        </button>


      </div>

    </div>
  );
}
