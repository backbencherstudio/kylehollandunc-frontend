"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import clsx from "clsx";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  containerClassName?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  value,
  onChange,
  className,
  containerClassName,
}) => {
  return (
    <div
      className={clsx(
        "relative w-full sm:w-[360px]",
        containerClassName
      )}
    >
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#687588]" />

      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(
          "pl-9 h-9 text-sm border-[#E5E5E5] focus:border-2 focus:border-[#1C5E96] focus:ring-0",
          className
        )}
      />
    </div>
  );
};

export default SearchInput;