"use client";

    import { User, LogIn } from "lucide-react";
    import { Button } from "@/components/ui/button";  

interface CheckoutAuthModalProps {
  setOpen: (open: boolean) => void;
  handleLogin: () => void;
  handleGuest: () => void;
  isLoading?: boolean;
}

export default function CheckoutAuthModal({
  setOpen,
  handleLogin,
  handleGuest,
  isLoading,
}: CheckoutAuthModalProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 ">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">
          Continue to Checkout
        </h3>
        <p className="text-sm text-[#5B5A64]">
          Login to your account or continue as guest.
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <Button
          onClick={handleLogin}
          className="w-full md:h-12 h-10 cursor-pointer"
        >
          <LogIn className="w-4 h-4 mr-2" />
          Login
        </Button>

        <Button
          variant="outline"
          onClick={handleGuest}
          disabled={isLoading}
          className="w-full md:h-12 h-10 cursor-pointer"
        >
          <User className="w-4 h-4 mr-2" />
          {isLoading ? "Please wait..." : "Continue as Guest"}
        </Button>

        <Button
          variant="ghost"
          onClick={() => setOpen(false)}
          className="w-full"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}