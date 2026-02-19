import { Check } from "lucide-react";

const steps = [
  { id: 1, label: "Add to Cart" },
  { id: 2, label: "Sample Details" },
  { id: 3, label: "Make Payment" },
];

interface StepperProps {
  currentStep: number;
  setStep: (step: number) => void;
}

export function Stepper({ currentStep, setStep }: StepperProps) {
  return (
    <div className="w-full max-w-[800px] mx-auto px-4 mb-6 md:mb-12">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const isClickable = step.id <= currentStep;

          return (
            <div key={step.id} className="flex-1 flex flex-col items-center relative">
              
              {/* Connecting Line (Hidden for the last item) */}
              {index !== steps.length - 1 && (
                <div
                  className={`absolute top-5 h-[6px]  rounded-full ${isCompleted ? "bg-[#1D1F2C]" : "bg-[#E5E7EB]"}`}
                  style={{
                    // Creates the gap: Starts 30px after center, ends 30px before next center
                    left: "calc(50% + 35px)",
                    width: "calc(100% - 70px)",
                  }}
                />
              )}

              {/* Circle Button */}
              <button
                disabled={!isClickable}
                onClick={() => isClickable && setStep(step.id)}
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all
                ${
                  isCompleted || isActive
                    ? "bg-[#1D1F2C] text-white" // Completed Step (Dark)
                    : "bg-[#E9EBED] text-[#1D1F2C]" // Current & Pending (Light Gray)
                }
                ${!isClickable ? "cursor-not-allowed" : "cursor-pointer hover:scale-105 active:scale-95"}
                `}
              >
                {isCompleted || isActive ? (
                  <Check size={20} strokeWidth={3} />
                ) : (
                  <span>{step.id}</span>
                )}
              </button>

              {/* Label */}
              <span
                className={`mt-4 text-sm sm:text-[17px] text-center whitespace-nowrap
                ${
                  isActive || isCompleted
                    ? "text-[#1D1F2C] font-semibold"
                    : "text-[#1D1F2C] font-normal"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}