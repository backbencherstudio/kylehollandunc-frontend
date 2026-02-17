"use client";

import Image from "next/image";
import React from "react";

export default function RequestHeroSection() {
  return (
    <section className="relative w-full h-[220px] sm:h-screen md:max-h-[420px] overflow-hidden">

      {/* Background Image */}
      <Image
        src="/images/herobg.jpg" // replace with your image
        alt="About Lake Norman Labs"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Centered Title */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <h1 className="text-white font-syne text-3xl md:text-5xl font-semibold tracking-[0.5px]">
          Request Test
        </h1>
      </div>

    </section>
  );
}
