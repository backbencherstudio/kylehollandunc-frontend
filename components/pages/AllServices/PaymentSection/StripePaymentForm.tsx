"use client";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function StripePaymentForm({ cartId }: { cartId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [cardholderName, setCardholderName] = useState("");

  /* ================================
     HELPER: BUILD AUTH HEADERS
  ================================= */
  const getAuthHeaders = () => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const guestToken = localStorage.getItem("guest_token");

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      if (guestToken) {
        headers["X-Guest-Token"] = guestToken;
      }
    }

    return headers;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    if (!cardholderName.trim()) {
      toast.error("Please enter cardholder name");
      return;
    }

    setLoading(true);

    try {
      /* ================================
         1️⃣ CREATE ORDER (PAYMENT INTENT)
      ================================= */
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            cart_id: parseInt(cartId),
            payment_method: "card",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to create payment");
      }

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        toast.error("Card element not found");
        setLoading(false);
        return;
      }

      /* ================================
         2️⃣ CONFIRM STRIPE PAYMENT
      ================================= */
      const { paymentIntent, error } =
        await stripe.confirmCardPayment(data.client_secret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: cardholderName,
            },
          },
        });

      if (error) {
        toast.error(error.message || "Payment failed");
        setLoading(false);
        return;
      }

      /* ================================
         3️⃣ VERIFY PAYMENT ON BACKEND
      ================================= */
      const verifyRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout/stripe`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            payment_intent_id: paymentIntent?.id,
            order_id: data.order_id,
          }),
        }
      );

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok) {
        throw new Error(
          verifyData?.message || "Payment verification failed"
        );
      }

      toast.success("Payment successful!");

      // Optional: clear guest token after successful order
      // localStorage.removeItem("guest_token");


      if(localStorage.getItem("guest_token")) {
        localStorage.removeItem("guest_token");
        router.push("/");
        return;
      }
      
      router.push("/order");
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
      {/* Cardholder Name */}
      <div>
        <input
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          placeholder="Enter cardholder name"
          className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 focus:outline-none focus:border-[#1C5E96] placeholder-[#9CA3AF]"
        />
      </div>

      {/* Stripe Card Element */}
      <div className="border p-4 rounded-xl">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#1D1F2C",
                "::placeholder": {
                  color: "#9CA3AF",
                },
              },
              invalid: {
                color: "#ef4444",
              },
            },
          }}
        />
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-full sm:w-1/2 border border-[#E5E7EB] rounded-lg py-3 text-[#4A4C56] hover:bg-gray-50 transition cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full sm:w-1/2 py-3 rounded-lg bg-gradient-to-b from-[#84B6DE] to-[#1C5E96] text-white font-medium hover:opacity-90 transition cursor-pointer"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </form>
  );
}