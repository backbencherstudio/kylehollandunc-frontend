interface OrderSummaryCardProps {
    subtotal: number;
    shipping?: number | null;
    handleCancel?: () => void;
    handleProceed?: () => void;
  }
  
  export function OrderSummaryCard({
    handleCancel,
    handleProceed,
    subtotal,
    shipping = null,
  }: OrderSummaryCardProps) {
    const total = subtotal + (shipping ?? 0);
  
    return (
      <div className="w-full  border border-[#DFE1E7] rounded-[32px] p-6 sm:p-8 bg-white">
  
        {/* Title */}
        <h3 className="text-[#1D1F2C] font-syne text-xl sm:text-2xl font-semibold mb-6">
          Order Summary
        </h3>
  
        {/* Summary Rows */}
        <div className="flex flex-col gap-4 text-[#4A4C56] text-base">
  
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
  
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>
              {shipping === null ? "N/A" : `$${shipping}`}
            </span>
          </div>
  
          <div className="border-t border-[#E5E7EB] pt-4 mt-2 flex justify-between font-semibold text-[#1D1F2C]">
            <span>Total</span>
            <span>${total}</span>
          </div>
  
        </div>
  
        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
  
          {/* Cancel */}
          <button
            onClick={handleCancel}
            className="w-full sm:w-1/2 border border-[#E5E7EB] rounded-lg py-3 text-[#4A4C56] hover:bg-gray-50 transition"
          >
            Cancel
          </button>
  
          {/* Proceed */}
          <button
            onClick={handleProceed}
            className="w-full sm:w-1/2 py-3 rounded-lg bg-gradient-to-b from-[#84B6DE] to-[#1C5E96] text-white font-medium hover:opacity-90 transition cursor-pointer"
          >
            Proceed to Checkout
          </button>
  
        </div>
      </div>
    );
  }
  