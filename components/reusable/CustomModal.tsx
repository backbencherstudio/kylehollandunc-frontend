"use client";
import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import clsx from "clsx";

interface ReusableModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  hideCloseButton?: boolean; // Add this to hide the close button
  closeButtonClassName?: string; // Custom styling for close button
}

export default function ReusableModal({
  open,
  onOpenChange,
  onClose,
  title,
  children,
  className,
  hideCloseButton = false,
}: ReusableModalProps) {
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && onClose) {
      onClose();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent 
        className={clsx(
          "sm:max-w-[687px] rounded-xl p-6",
          className
        )}
      
        showCloseButton={!hideCloseButton}
        // closeClassName={closeButtonClassName}
      >
        {title && (
          <DialogHeader className="border-b border-[#E5E5E5] pb-4 mb-4">
            <DialogTitle className="text-[#1D1F2C] font-semibold leading-[128%] tracking-[-0.36px] -mt-2">
              {title}
            </DialogTitle>
          </DialogHeader>
        )}
        <div className="">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}