"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaypalPaymentForm({ cartId }: { cartId: string }) {
  const [message, setMessage] = useState("");
  const [backendOrderId, setBackendOrderId] = useState<string | null>(null);
  const router = useRouter();

  /* ================================
     HELPER: BUILD HEADERS
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

  /* ================================
     CREATE ORDER
  ================================= */
  const createOrder = async (): Promise<string> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        method: "POST",
        headers: getAuthHeaders(),
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

    // Store backend order_id
    setBackendOrderId(data.order_id);

    // Return PayPal order ID
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
          headers: getAuthHeaders(),
          body: JSON.stringify({
            order_id: backendOrderId,
            paypal_order_id: data.orderID,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.message || "Payment verification failed");
      }

      setMessage("Payment successful!");

      // Optional: clear guest token after successful payment
      // localStorage.removeItem("guest_token");

      if(localStorage.getItem("guest_token")) {
        localStorage.removeItem("guest_token");
        router.push("/");
        return;
      }

      router.push("/order");

    } catch (err: any) {
      setMessage(err?.message || "Payment verification failed");
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
      {message && (
        <p className="mt-4 text-green-600">{message}</p>
      )}
    </PayPalScriptProvider>
  );
}