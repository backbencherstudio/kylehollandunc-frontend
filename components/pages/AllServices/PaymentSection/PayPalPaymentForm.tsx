"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaypalPaymentForm({ cartId }: { cartId: string }) {
  const [message, setMessage] = useState("");
  const [backendOrderId, setBackendOrderId] = useState<string | null>(null);
  const router = useRouter();
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  /* ================================
     CREATE ORDER
  ================================= */
  const createOrder = async (): Promise<string> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cart_id: cartId,
          payment_method: "paypal",
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to create order");
    }

    // 🔥 Store backend order_id
    setBackendOrderId(data.order_id);

    // 🔥 Return PayPal order ID (required by PayPal SDK)
    return data.paypal_order_id;
  };

  /* ================================
     ON APPROVE
  ================================= */
  const onApprove = async (data: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout/paypal`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            order_id: backendOrderId, // ✅ REQUIRED
            paypal_order_id: data.orderID, // ✅ REQUIRED
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Payment verification failed");
      }

      setMessage("Payment successful!");
      router.push("/order");
    } catch (err) {
      setMessage("Payment verification failed");
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
      }}
    >
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
      />
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </PayPalScriptProvider>
  );
}