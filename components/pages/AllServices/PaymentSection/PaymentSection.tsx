"use client";

import { useState } from "react";
import Checkbox from "@/components/reusable/Checkbox";
import CardIcon from "@/components/icons/CardIcon";
import PaypalIcon from "@/components/icons/PaypalIcon";
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import StripePaymentForm from "./StripePaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import PaypalPaymentForm from "./PayPalPaymentForm";

type PaymentMethod = "card" | "paypal";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "");

export default function PaymentSection({ cartId }: { cartId: string }) {
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
        <Elements stripe={stripePromise}>
          <StripePaymentForm cartId={cartId} />
        </Elements>
      )}

      {method === "paypal" && (
        <Elements stripe={stripePromise}>
          <PaypalPaymentForm cartId={cartId} />
        </Elements>
      )}
    </section>
  );
}
