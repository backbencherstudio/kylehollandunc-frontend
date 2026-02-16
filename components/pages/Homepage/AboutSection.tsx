import SectionLabel from "@/components/reusable/SectionLabel";
import React from "react";

export default function AboutSection() {
  return (
    <section>
      <div className="max-w-[1320px] mx-auto px-4 lg:px-0 py-12 md:py-16 lg:py-15">

        {/* Top Content */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-10 mb-10 md:mb-12">
          <SectionLabel className='w-fit'>About Us</SectionLabel>

          <div>
            <h3 className="max-w-[875px] text-[color:var(--Gray-Black-500,#1D1F2C)] [font-family:Syne] text-2xl sm:text-3xl md:text-4xl font-bold leading-[120%]">
              At Lake Norman Lab, your confidence and accurate testing results
              are our top priority. We believe lab testing should be smooth,
              reliable, and focused on your peace of mind.
            </h3>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard
            title="24-72 hours"
            description="Typical turnaround (scope-dependent)"
          />
          <InfoCard
            title="ID"
            description="Verification reference on reports"
          />
          <InfoCard
            title="QC"
            description="Batch and cadence programs"
          />
        </div>

      </div>
    </section>
  );
}

interface InfoCardProps {
  title: string;
  description: string;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  className = "",
}) => {
  return (
    <div
      className={`flex w-full flex-col items-start gap-3 border-t border-solid border-t-[color:var(--Gray-Black-50,#E9E9EA)] pt-6 ${className}`}
    >
      <h2 className="text-[color:var(--Gray-Black-500,#1D1F2C)] [font-family:Syne] text-3xl sm:text-4xl md:text-5xl font-semibold leading-[124%] tracking-[0.24px]">
        {title}
      </h2>

      <p className="text-[color:var(--Gray-Black-400,#4A4C56)] [font-family:Inter] text-base md:text-lg font-normal leading-[150%] tracking-[0.09px]">
        {description}
      </p>
    </div>
  );
};
