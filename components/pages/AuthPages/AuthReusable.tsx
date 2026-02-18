

import React from "react";

interface AuthHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  description,
  className = "",
}) => {
  return (
    <div className={`text-center ${className}`}>
      <h1 className="text-[#1D1F2C] font-syne text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[124%] tracking-[0.24px] mb-3">
        {title}
      </h1>

      <p className="text-[#1D1F2C] text-base sm:text-lg font-normal leading-[150%] tracking-[0.08px] max-w-[510px] mx-auto">
        {description}
      </p>
    </div>
  );
};





/* ================= Reusable Input ================= */

interface FormInputProps {
    placeholder: string;
    type?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
    placeholder,
    type = "text",
}) => {
    return (
        //   <input
        //     type={type}
        //     placeholder={placeholder}
        //     className="w-full bg-transparent border-b border-[#E5E7EB]  text-[#1D1F2C] placeholder-[#9CA3AF] text-base focus:outline-none focus:border-[#1C5E96] transition p-2.5 "
        //   />


        <div className="p-2.5">
            <input type={type} placeholder={placeholder} className="w-full bg-transparent border-b border-[#E5E7EB]  text-[#1D1F2C] placeholder-[#5D6873]/80 text-base focus:outline-none focus:border-[#1C5E96] transition  pb-2.5 " />
        </div>
    );
};





