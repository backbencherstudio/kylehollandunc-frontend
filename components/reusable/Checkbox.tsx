import { Check } from "lucide-react";

import React from 'react'

export default function Checkbox({ isSelected }: { isSelected: boolean }) {
  return (
    <div
    className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0
${isSelected
            ? "bg-[#22CAAD] border-[#22CAAD]"
            : "border-[#C9CCD3]"
        }`}
>
    {isSelected && <Check size={16} color="white" />}
</div>
  )
}
