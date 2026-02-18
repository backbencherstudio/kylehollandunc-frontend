import SectionLabel, { SectionHeading } from "@/components/reusable/SectionLabel";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function OurServices() {
  return (
    <section>
      <div className="max-w-[1320px] mx-auto px-4 lg:px-0 h-full py-16 md:py-20 lg:py-25 ">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 lg:gap-10 mb-10 md:mb-12 lg:mb-14 ">
          <div>
            <SectionLabel className="mb-2">Our Services</SectionLabel>
            <SectionHeading>Our Services</SectionHeading>
          </div>

          <p className="max-w-[351px] text-[#4A4C56] [font-family:Inter] text-base md:text-lg font-normal leading-[150%] tracking-[0.09px] lg:shrink-0">
            Comprehensive lab services designed for accuracy and peace of mind.
          </p>
        </div>

        {/* services cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          <ServiceCard
            title="Peptide Testing"
            image="/images/services/service1.jpg"
            href="/services"
          />
          <ServiceCard
            title="Peptide Testing"
            image="/images/services/service2.jpg"
            href="/services"
          />
          <ServiceCard
            title="Peptide Testing"
            image="/images/services/service3.jpg"
            href="/services"
          />
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  title: string;
  image: string;
  href?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, image, href = "#" }) => {
  return (
    <Link
      href={href}
      className="relative w-full h-[380px] md:h-[450px] xl:h-[500px] rounded-xl overflow-hidden flex items-end p-6 group"
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
      />

      {/* Dark Overlay Layer */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 text-white">
        <h3 className="self-stretch text-[color:var(--W,#FFF)] text-left [font-family:Inter] text-xl md:text-2xl font-semibold leading-[120%] tracking-[0.12px] mb-3">
          {title}
        </h3>
        <span className="text-[color:var(--W,#FFF)] text-left [font-family:Inter] text-base md:text-lg font-medium leading-[120%] tracking-[0.09px] underline underline-offset-4">
          Learn More
        </span>
      </div>
    </Link>
  );
};
