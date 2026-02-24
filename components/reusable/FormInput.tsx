"use client";

import React from "react";

interface FormInputProps {
  label?: string;
  name?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
  as?: "input" | "textarea";
  rows?: number;
}

const FormInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  readOnly = false,
  disabled = false,
  className = "",
  as = "input",
  rows = 3,
}: FormInputProps) => {
  const baseStyles = `
    w-full
    py-2
    px-2.5
    rounded-lg
    border
    text-sm
    transition
    outline-none
    resize-none
  `;

  const readOnlyStyles = `
    bg-[#F8FAFB]
    border-[#DFE1E7]
    text-[#1D1F2C]
    placeholder-[#9CA3AF]
    cursor-default
    font-normal
    leading-5
  `;

  const editableStyles = `
    bg-white
    border-gray-300
    focus:border-[#36668E]
    focus:ring-1
    focus:ring-[#36668E]
  `;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-[#1D1F2C] font-medium leading-[150%]"
        >
          {label}
        </label>
      )}

      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          rows={rows}
          className={`
            ${baseStyles}
            ${readOnly ? readOnlyStyles : editableStyles}
            ${disabled ? "opacity-60 cursor-not-allowed" : ""}
            ${className}
          `}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          className={`
            ${baseStyles}
            ${readOnly ? readOnlyStyles : editableStyles}
            ${disabled ? "opacity-60 cursor-not-allowed" : ""}
            ${className}
          `}
        />
      )}
    </div>
  );
};

export default FormInput;