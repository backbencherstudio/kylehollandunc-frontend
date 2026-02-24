"use client";

import * as React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import clsx from "clsx";

type SortOption = {
    label: string;
    value: string;
};

interface SortFilterProps {
    value: string;
    onChange: (value: string) => void;
    options?: SortOption[];
    className?: string;
}

const defaultOptions: SortOption[] = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
];

export default function SortFilter({
    value,
    onChange,
    options = defaultOptions,
    className,
}: SortFilterProps) {
    const selected = options.find((opt) => opt.value === value);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={clsx(
                        "flex items-center gap-1",
                        "px-3 py-2",
                        "rounded-[8px]",
                        "border border-[#DFE1E7]",
                        "bg-white",
                        "text-[#1D1F2C]",
                        "text-base font-medium leading-5",
                        className
                    )}
                >
                    <span className=" text-[#687588]">Sort by:</span>
                    <span>{selected?.label}</span>
                    <ChevronDown className="h-4 w-4" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
                {options.map((option) => (
                    <DropdownMenuItem
                        key={option.value}
                        onClick={() => onChange(option.value)}
                        className="flex justify-between items-center"
                    >
                        {option.label}
                        {value === option.value && (
                            <Check className="h-4 w-4" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}