"use client";

import Checkbox from "@/components/reusable/Checkbox";
import React, { useState } from "react";
import TruckIcon from "@/components/icons/TruckIcon";
import ParcelIcon from "@/components/icons/ParcelIcon";
import { OrderSummaryCard } from "./OrderSummaryCard";
import { useUpdateShippingDetailsMutation } from "@/redux/features/order/orderApi";
import { UpdateShippingDetailsRequest } from "@/redux/features/order/orderType";
import { toast } from "sonner";

export default function ChooseShippingMehtod({
  address,
  setAddress,
  selectedMethod,
  setSelectedMethod,
  handleProceed: externalHandleProceed,
  cartData,
}: {
  address: string;
  setAddress: (address: string) => void;
  selectedMethod: "own" | "label";
  setSelectedMethod: (method: "own" | "label") => void;
  handleProceed: () => void;
  cartData: any;
}) {
  const [updateShippingDetails, { isLoading }] = useUpdateShippingDetailsMutation();
  // const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  const handleMethodChange = (method: "own" | "label") => {
    setSelectedMethod(method);
    setAddressError("");
    // Clear address when switching to own method
    if (method === "own") {
      setAddress("");
    }
  };

  const handleProceedWithAddress = async () => {
    const cartId = cartData?.id;
    if (cartId == null) {
      toast.error("Cart not found");
      return;
    }

    // Prepare request body based on selected method
    let requestBody: UpdateShippingDetailsRequest;

    if (selectedMethod === "own") {
      requestBody = {
        shipping_method: "own_courier",
        shipping_address: "" , // Empty string for own shipping
        shipping_price: 0,
      };
    } else {
      // Validate address for shipping label
      if (!address.trim()) {
        setAddressError("Please enter your shipping address");
        return;
      }

      requestBody = {
        shipping_method: "shipping_label",
        shipping_address: address, // Full address for shipping label
        shipping_price: 25,
      };
    }

    try {
      await updateShippingDetails({ cartId, ...requestBody }).unwrap();
      toast.success("Shipping details updated successfully");
      
      // This will now just move to next step, not make another API call
      externalHandleProceed();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update shipping details");
    }
  };

  return (
    <>
      <section className="w-full max-w-[1326px] mx-auto flex-col gap-8 border border-[#DFE1E7] p-8 rounded-[32px]">
        <h3 className="text-[#1D1F2C] font-syne text-2xl font-semibold mb-6 md:mb-8">
          Choose shipping method
        </h3>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
          <div onClick={() => handleMethodChange("own")}>
            <OwnCourierCard
              selected={selectedMethod === "own"}
            />
          </div>

          <div onClick={() => handleMethodChange("label")}>
            <ThirdPartyCourierCard
              selected={selectedMethod === "label"}
              address={address}
              onAddressChange={setAddress}
              addressError={selectedMethod === "label" ? addressError : ""}
            />
          </div>
        </div>

        {/* Proceed Button */}
        <div className="flex justify-end mt-10">
          <button
            onClick={handleProceedWithAddress}
            disabled={isLoading}
            className="px-10 py-4 rounded-full bg-[linear-gradient(180deg,#84B6DE_0%,#1C5E96_100%)] text-white text-lg font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Updating..." : "Continue"}
          </button>
        </div>
      </section>

      <OrderSummaryCard
        subtotal={cartData?.total_price}
        shipping={selectedMethod === "own" ? 0 : 25}
        method={selectedMethod}
        handleProceed={handleProceedWithAddress}
        handleCancel={() => { }}
      />
    </>
  );
}

// ... rest of your component code (OwnCourierCard, ThirdPartyCourierCard, etc.) stays the same

/* ------------ Own Courier Card (No address input) ------------ */
const OwnCourierCard = ({
  selected,
}: {
  selected: boolean;
}) => {
  return (
    <div
      className={`relative cursor-pointer rounded-2xl border-2 md:p-6 p-4 h-full transition
            ${selected
          ? "border-[#22CAAD] bg-white"
          : "border-[#E5E7EB] bg-white"
        }`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-xl bg-[#F3F4F6] flex items-center justify-center">
          <ParcelIcon className="w-10 h-7 text-[#1D1F2C]" />
        </div>
        <Checkbox isSelected={selected} />
      </div>

      <h3 className="text-[#1D1F2C] font-syne text-xl sm:text-2xl font-semibold mb-3">
        Ship with Your Own Courier
      </h3>

      <p className="text-[#777980] text-sm sm:text-base mb-6 leading-[150%]">
        Use your preferred shipping carrier. Lab address will be shared after confirmation.
      </p>

      <div className="flex flex-col gap-4">
        <InfoBox title="Flexible carrier choice" text="Use any carrier you prefer" />
        <InfoBox title="Full control" text="Track & manage your own shipment" />
        <PackagingBox />
      </div>
    </div>
  );
};

/* ------------ Third Party Courier Card (with address input) ------------ */
const ThirdPartyCourierCard = ({
  selected,
  address,
  onAddressChange,
  addressError
}: {
  selected: boolean;
  address: string;
  onAddressChange: (value: string) => void;
  addressError?: string;
}) => {
  return (
    <div
      className={`relative cursor-pointer rounded-2xl border-2 md:p-6 p-4 h-full transition
            ${selected
          ? "border-[#22CAAD] bg-white"
          : "border-[#E5E7EB] bg-white"
        }`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-xl bg-[#F3F4F6] flex items-center justify-center">
          <TruckIcon className="w-10 h-7 text-[#1D1F2C]" />
        </div>
        <Checkbox isSelected={selected} />
      </div>

      <h3 className="text-[#1D1F2C] font-syne text-xl sm:text-2xl font-semibold mb-3">
        We Provide a Shipping Label
      </h3>

      <p className="text-[#777980] text-sm sm:text-base mb-6 leading-[150%]">
        Request a prepaid shipping label from us. Print, attach, and ship easily.
      </p>

      {/* Address Input - Only shown when selected */}
      {selected && (
        <div className="mb-6">
          <label className="text-[#777980] text-sm mb-2 block">
            Shipping Address <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Enter your full shipping address"
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            rows={2}
            className={`w-full border rounded-lg p-3 text-[#4A4C56] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1C5E96] resize-none ${addressError ? "border-red-500" : "border-[#E5E7EB]"
              }`}
            onClick={(e) => e.stopPropagation()} // Prevent card selection when clicking textarea
          />
          {addressError && (
            <p className="text-red-500 text-sm mt-1">{addressError}</p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <InfoBox title="Prepaid & hassle-free" text="No carrier account needed" />
        <InfoBox title="Cold chain ready" text="Labels match temperature needs" />
        <InfoBox title="Tracking included" text="End-to-end tracking" />
      </div>

      <div className="rounded-xl bg-[#E6F4F1] border border-[#CFE9E4] p-4 flex justify-between items-center">
        <span className="text-[#1D1F2C] font-medium">Label fee added to invoice</span>
        <span className="text-[#166534] text-3xl font-medium">$25</span>
      </div>
    </div>
  );
};

/* ------------ Reusable UI Boxes ------------ */
const InfoBox = ({ title, text }: { title: string; text: string }) => (
  <div className="rounded-xl border border-[#E5E7EB] p-4 bg-[#F9FAFB]">
    <h4 className="text-[#1C5E96] font-medium mb-1">{title}</h4>
    <p className="text-[#777980] text-sm">{text}</p>
  </div>
);

const PackagingBox = () => (
  <div className="rounded-xl border border-[#E5E7EB] p-4 bg-[#F9FAFB]">
    <h4 className="text-[#1C5E96] font-medium mb-2">Packaging Guidelines</h4>
    <ul className="list-disc pl-5 space-y-1 text-[#777980] text-sm">
      <li>Use insulated packaging with cold packs</li>
      <li>Secure vials to prevent breakage</li>
      <li>Include order confirmation</li>
      <li>Label: "FRAGILE – LAB SAMPLES"</li>
    </ul>
  </div>
);