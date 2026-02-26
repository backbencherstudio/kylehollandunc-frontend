"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import SectionLabel, { SectionHeading } from "@/components/reusable/SectionLabel";
import QuantityStepper from "@/components/reusable/QuantityStepper";
import CircleCheckIcon from "@/components/icons/CircleCheckIcon";
import AddOnService from "./AddOnService";
import { useAddToCartMutation } from "@/redux/features/order/orderApi";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { selectIsAuthenticated } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
export default function ServiceSection() {

  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);


  const basePrice = 199;
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<
    { id: number; name: string; price: number }[]
  >([]);


 


  const [addToCart, { isLoading }] = useAddToCartMutation();
;
  const addonsTotal = useMemo(
    () => selectedAddons.reduce((sum, item) => sum + item.price, 0),
    [selectedAddons]
  );
  
  const totalPrice = useMemo(
    () => basePrice * quantity + addonsTotal,
    [basePrice, quantity, addonsTotal]
  );

  const handleAddToCart = async () => {

    if (!isAuthenticated) {
      // redirect to login, come back here after login
      toast.error("Please login to add to cart");
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    
      return;
    }
    
    const payload = {
      type: "test",
      name: "Standard Testing Panel",
      quantity,
      price: basePrice,
      total_price: totalPrice,
      shipping_method: "own_courier",
      shipping_price: 0,
      meta: {
        test: {
          id: 1,
          title: "Standard Testing Panel",
          base_price: basePrice,
        },
        addons: selectedAddons,
      },
    };

    console.log(payload);

    await addToCart(payload).unwrap().then((res) => {
      toast.success("Added to cart successfully");
      router.push("/services/my-cart");
    }).catch((err) => {
      toast.error(err.data.message);
    });

  };
 

  return (
    <section className="max-w-[1320px] mx-auto px-4 lg:px-0 py-8 md:py-10 lg:py-12.5">

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">

        {/* Image */}
        <div className="w-full lg:max-w-[596px] relative aspect-square lg:h-[596px] rounded-xl overflow-hidden">
          <Image
            src="/images/services/service-medicine.png"
            alt="service"
            fill
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 space-y-8">

          {/* Top */}
          <div>
            <SectionHeading className="mb-4">
              Standard Testing Panel
            </SectionHeading>

            <p className="max-w-[581px] text-[#777980] text-sm sm:text-base leading-[140%] tracking-[0.08px] mb-6">
              Our comprehensive standard testing panel includes identity
              verification and basic purity assessment for your peptide samples.
            </p>

            <div className="mb-3">
              <p className="text-[#1D1F2C] font-syne text-5xl font-bold leading-[120%]">${basePrice * quantity}</p>
              <p className="text-[#4A4C56]  text-lg font-normal leading-[150%] tracking-[0.09px]">Per peptide tested</p>
            </div>

            <QuantityStepper value={quantity} onChange={setQuantity} />
          </div>

          {/* What's Included */}
          <div>
            <h4 className="text-[#4A4C56] font-syne text-xl sm:text-2xl font-bold mb-4">
              What's included?
            </h4>

            <div className="flex flex-col gap-3">
              {[
                "Identity Verification",
                "Purity Assessment",
                "Amount Check",
                "Detailed Report",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2 text-[#777980]">
                  <CircleCheckIcon className="w-5 h-5 mt-1 shrink-0" />
                  <p className="text-sm sm:text-base leading-[150%] tracking-[0.09px]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Add On */}
          <AddOnService
            basePrice={basePrice}
            quantity={quantity}
            selectedAddons={selectedAddons}
            setSelectedAddons={setSelectedAddons}
          />


            {/* Total */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-base sm:text-2xl font-medium text-[#777980]">
            Total
          </span>

          <span className="text-lg sm:text-2xl text-[#1D1F2C]">
            ${totalPrice}
          </span>
        </div>
      </div>
          <Button disabled={isLoading} onClick={handleAddToCart} className="w-full py-3 sm:py-6 rounded-lg bg-gradient-to-b from-[#84B6DE] to-[#1C5E96] text-white font-medium hover:opacity-90 transition text-lg  cursor-pointer h-8">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Add to Cart"}
          </Button>
        </div>

      </div>

    </section>
  );
}
