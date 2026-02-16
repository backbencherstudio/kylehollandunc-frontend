import SectionLabel, { SectionHeading } from '@/components/reusable/SectionLabel'
import React from 'react'
import Image from 'next/image'

export default function OurServiceSection() {
  const services = [
    {
      image: "/images/teams/member-1.jpg",
      name: "Robert Jhonson",
      role: "CHEMIST EXPERT",
    },
    {
      image: "/images/teams/member-2.jpg",
      name: "Marko Daniel",
      role: "CHEMIST EXPERT",
    },
    {
      image: "/images/teams/member-3.jpg",
      name: "Sony Miltar",
      role: "CHEMIST EXPERT",
    },
    {
      image: "/images/teams/member-4.jpg",
      name: "Jake Nicholsonl",
      role: "CHEMIST EXPERT",
    },
  ];

  return (
    <section className="bg-[#F6F6F6]">
      <div className="max-w-[1380px] mx-auto px-6 ms:px-0 py-16 sm:py-20 lg:py-[120px]">
        
        {/* Heading */}
        <div className="flex flex-col gap-2 items-center justify-center mb-10 sm:mb-14">
          <SectionLabel className="w-fit">Our Services</SectionLabel>
          <SectionHeading className="max-w-[618px] mx-auto text-center">
            We have professionals behind us
          </SectionHeading>
        </div>

   
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:gap-6 gap-8 ">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              image={service.image}
              name={service.name}
              role={service.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
}




interface ServiceCardProps {
  image: string;
  name: string;
  role: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  name,
  role,
}) => {
  return (
    <div className="w-full">
      {/* Image */}
      <div className="overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={name}
          width={312}
          height={364}
          className="h-[350px]  w-full lg:h-[364px] object-cover"
        />
      </div>

      {/* Info */}
      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 rounded-xl bg-white px-2 py-4">
        <h3 className="text-[#1D1F2C] font-syne text-base sm:text-lg font-semibold leading-[120%] tracking-[0.08px]">
          {name}
        </h3>

        <p className="text-[#777980] font-inter text-xs sm:text-sm leading-[150%] tracking-[0.07px] ">
          / {role}
        </p>
      </div>
    </div>
  );
};
