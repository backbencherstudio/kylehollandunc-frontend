"use client";

import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function CartTable() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Standard Panel",
      price: 199,
      quantity: 1,
    },
    {
      id: 2,
      name: "Sterility Testing (Add On)",
      price: 75,
      quantity: 1,
    },
  ]);

  const updateQuantity = (id: number, type: "inc" | "dec") => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const newQty =
          type === "inc"
            ? item.quantity + 1
            : Math.max(1, item.quantity - 1);

        return { ...item, quantity: newQty };
      })
    );
  };

  const getRowTotal = (price: number, quantity: number) =>
    price * quantity;

  return (
    <div className="w-full ">

      <div className="bg-white border border-[#E5E7EB] rounded-3xl p-4 sm:p-6 md:p-8">

        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-4 text-[#1D1F2C] font-semibold mb-6 text-center">
          <span>Test</span>
          <span>Price</span>
          <span>Quantity</span>
          <span className="text-right">Total</span>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-6">

          {items.map((item) => (
            <div
              key={item.id}
              className="border-b md:border-0 border-[#E5E7EB] pb-6 md:pb-0"
            >

              {/* Desktop Layout */}
              <div className="hidden md:grid grid-cols-4 items-center text-[#777980]">
                <div className="font-medium text-[#4A4C56] text-center">
                  {item.name}
                </div>

                <div className="text-center">${item.price}</div>

                <div className="text-center">
                  <div className="flex items-center gap-4 justify-center">
                    <button
                      onClick={() => updateQuantity(item.id, "dec")}
                      className="hover:opacity-70"
                    >
                      <Minus size={16} />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item.id, "inc")}
                      className="hover:opacity-70"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="text-right font-medium text-[#4A4C56]">
                  ${getRowTotal(item.price, item.quantity)}
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden flex flex-col gap-3 text-sm">

                <div className="font-medium text-[#4A4C56]">
                  {item.name}
                </div>

                <div className="flex justify-between">
                  <span className="text-[#777980]">Price</span>
                  <span>${item.price}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#777980]">Quantity</span>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQuantity(item.id, "dec")}
                      className="hover:opacity-70"
                    >
                      <Minus size={16} />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item.id, "inc")}
                      className="hover:opacity-70"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between font-medium text-[#4A4C56]">
                  <span>Total</span>
                  <span>
                    ${getRowTotal(item.price, item.quantity)}
                  </span>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}
