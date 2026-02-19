"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function RequestTestSection() {

  const router = useRouter();

  return (
    <section className="max-w-[1488px] mx-auto px-6 md:px-0 py-10 md:py-25 ">

      <div className="relative rounded-2xl md:rounded-[40px] overflow-hidden min-h-[350px] md:min-h-[450px] flex items-center">

        {/* Background Image */}
        <Image
          src="/images/request-bg1.png" // replace with your image
          alt="Molecule background"
          fill
          quality={100}
          unoptimized
          className="object-cover h-full w-full"
          priority
        />

        {/* Gradient Overlay (strong left fade) */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#023347]/90 via-[#023347]/60 to-transparent" /> */}

        {/* Content */}
        <div className="relative z-10  px-8 md:px-[140px] py-10 md:py-26 text-white">
          <div className="max-w-[520px]">
            <h2 className="text-2xl md:text-4xl font-semibold leading-[120%] mb-6">
              Request Your Test
            </h2>

            <p className="text-white/80 text-base md:text-lg leading-[150%] mb-8">
              Submit your sample details to begin testing. We'll confirm
              the scope, ensure secure handling, and provide a clear
              timeline tailored to your workflow.
            </p>

            <button onClick={() => router.push("/request-test")} className="px-8 py-3 rounded-full bg-[linear-gradient(180deg,#84B6DE_0%,#1C5E96_100%)] text-white hover:opacity-90 transition cursor-pointer">
              Start request
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
