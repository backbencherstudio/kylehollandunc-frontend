import React from "react";

interface SectionLabelProps {
    children: React.ReactNode;
    className?: string;
}

const SectionLabel: React.FC<SectionLabelProps> = ({
    children,
    className = "",
}) => {
    return (
        <div
            className={`inline-flex items-center justify-center px-6 py-2 rounded-full border border-[#84B6DE] 
      text-sm font-medium leading-[150%] tracking-[0.07px] 
      bg-gradient-to-b from-[#84B6DE] to-[#1C5E96] 
      bg-clip-text text-transparent text-nowrap ${className}`}
        >
            {children}
        </div>
    );
};

export default SectionLabel;



interface SectionHeadingProps {
    children: React.ReactNode;
    className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
    children,
    className = "",
  }) => {
    return (
      <h2
        className={`
          
          text-[#1D1F2C]
          font-syne
          text-4xl  md:text-5xl
          font-bold
          leading-[120%]
          ${className}
        `}
      >
        {children}
      </h2>
    );
  };
  