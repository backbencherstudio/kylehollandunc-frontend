"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import clsx from "clsx";

interface ReusableModalProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function ReusableModal({
  open,
  onOpenChange,
  title,
  children,
  className,
}: ReusableModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={clsx(
          "sm:max-w-[687px] rounded-xl p-6",
          className
        )}
      >
        {title && (
          <DialogHeader className="border-b border-[#E5E5E5] pb-4">
            <DialogTitle className="text-[#1D1F2C] font-semibold leading-[128%] tracking-[-0.36px]   -mt-2">
              {title}
            </DialogTitle>
          </DialogHeader>
        )}

        <div className="mt-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}