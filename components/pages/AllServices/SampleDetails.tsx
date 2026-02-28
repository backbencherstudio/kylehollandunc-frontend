import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import TruckIcon from '@/components/icons/TruckIcon';
import Checkbox from '@/components/reusable/Checkbox';
import Image from 'next/image';
import ChevronLeft from '@/components/icons/ChevronLeft';
import { useUpdateSampleDetailsMutation } from '@/redux/features/order/orderApi';
import { toast } from 'sonner';

interface SampleDetailsProps {
    selectedMethod: "own" | "label";
    handleNext: () => void;
    cartData: any;
    address: string;
}

interface SampleDetailsFormData {
    organization: string;
    peptide: string;
    verificationDetails: string;
}

export default function SampleDetails({ selectedMethod, handleNext, cartData, address }: SampleDetailsProps) {
    const subtotal = cartData?.total_price;
    const [updateSampleDetails, { isLoading }] = useUpdateSampleDetailsMutation();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SampleDetailsFormData>({
        defaultValues: {
            organization: "",
            peptide: "",
            verificationDetails: "",
        }
    });

    const onSubmit: SubmitHandler<SampleDetailsFormData> = async (data) => {
        const cartId = cartData?.id;
        if (cartId == null) {
            toast.error("Cart not found");
            return;
        }

        try {
            await updateSampleDetails({ 
                cart_id: cartId, 
                organization: data.organization, 
                test: data.peptide, 
                details: data.verificationDetails 
            }).unwrap();
            
            toast.success("Sample details updated successfully");
            handleNext();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update sample details");
        }
    };

    return (
        <section className=''>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 md:gap-12 mb-6 md:mb-12">
                <ShippingSummaryCard method={selectedMethod} address={address} />
                <OrderSummaryCard subtotal={subtotal} shipping={25} />
            </div>

            <div className='flex flex-col md:flex-row gap-6 md:gap-16'>
                {/* LEFT SIDE */}
                <div className="relative w-full lg:max-w-[628px] h-[540px] sm:h-[653px] rounded-2xl overflow-hidden">
                    {/* Background Image */}
                    <Image
                        src="/images/others/testtubes.png"
                        alt="Request Test"
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/30" />

                    {/* Content Box */}
                    <div className="absolute inset-0 p-6 sm:p-8 lg:p-12">
                        <div className='w-full backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl p-8 text-white h-full'>
                            <div>
                                <h2 className='text-white font-syne text-2xl sm:text-4xl font-semibold leading-[124%] tracking-[0.18px] mb-6'>
                                    What to include
                                </h2>

                                <div className='flex flex-col gap-4'>
                                    {[
                                        {
                                            name: 'Peptide name', 
                                            description: 'Include concentration and vial size if known.'
                                        },
                                        {
                                            name: 'Lot / batch info', 
                                            description: 'Any identifiers help preserve traceability.'
                                        },
                                        {
                                            name: 'Desired scope', 
                                            description: 'Identity, purity, potency, contaminants, stability.'
                                        },
                                        {
                                            name: 'Timeline', 
                                            description: 'Standard vs expedited (if available).'
                                        }
                                    ].map((item, index) => (
                                        <div key={index} className='flex items-start justify-start gap-2.5'>
                                            <div>
                                                <ChevronLeft />
                                            </div>
                                            <div>
                                                <p className='mb-2 self-stretch text-[#FFF] text-base sm:text-lg font-semibold leading-[150%] tracking-[0.09px]'>
                                                    {item.name}
                                                </p>
                                                <p className='self-stretch text-[#FFF] text-base sm:text-lg font-normal leading-[150%] tracking-[0.09px]'>
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="w-full lg:max-w-[628px]">
                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-syne font-semibold text-[#1D1F2C] mb-10 md:mb-12">
                        Sample Details
                    </h2>

                    {/* Form with React Hook Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 md:gap-10">
                        {/* Organization */}
                        <div className="relative">
                            <FormInput 
                                placeholder="Organization (supplier/clinic/pharmacy)"
                                error={errors.organization?.message}
                                {...register("organization", { 
                                    required: "Organization is required" 
                                })}
                            />
                        </div>

                        {/* Peptide */}
                        <div className="relative">
                            <FormInput 
                                placeholder="Peptide to test (e.g., BPC-157, Semaglutide)"
                                error={errors.peptide?.message}
                                {...register("peptide", { 
                                    required: "Peptide name is required" 
                                })}
                            />
                        </div>

                        {/* What to verify */}
                        <div className="relative">
                            <textarea
                                placeholder="What do you need verified? (identity / purity / potency / contaminants / stability / desired turnaround)"
                                rows={3}
                                className={`w-full bg-transparent border-b pb-3 text-[#4A4C56] placeholder-[#9CA3AF] text-base md:text-lg focus:outline-none focus:border-[#1C5E96] resize-none leading-[150%] h-[100px] md:h-auto ${
                                    errors.verificationDetails 
                                        ? "border-red-500" 
                                        : "border-[#E5E7EB]"
                                }`}
                                {...register("verificationDetails", { 
                                    required: "Verification details are required" 
                                })}
                            />
                            {errors.verificationDetails && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.verificationDetails.message}
                                </p>
                            )}
                        </div>

                        {/* Button */}
                        <div className="flex justify-end mt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-8 py-4 rounded-full bg-[linear-gradient(180deg,#84B6DE_0%,#1C5E96_100%)] text-white text-lg font-medium hover:opacity-90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Saving..." : "Next"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export function ShippingSummaryCard({
    method,
    address,
}: { method: "own" | "label", address: string }) {
    const isLabel = method === "label";

    return (
        <div className="w-full max-w-[900px] border border-[#DFE1E7] rounded-[32px] p-6 sm:p-8 bg-white">
            <h3 className="text-[#1D1F2C] font-syne text-xl sm:text-2xl font-semibold mb-6">
                Shipping method
            </h3>

            {/* Selected Method */}
            <div className="rounded-2xl border-2 border-[#22CAAD] p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F3F4F6] flex items-center justify-center">
                        <TruckIcon className="w-6 h-6 text-[#1D1F2C]" />
                    </div>
                    <h4 className="text-[#1D1F2C] font-syne text-lg sm:text-2xl font-semibold">
                        {isLabel
                            ? "We Provide a Shipping Label"
                            : "Ship with Your Own Courier"}
                    </h4>
                </div>
                <Checkbox isSelected />
            </div>

            {/* Address */}
            {isLabel && address && (
                <div className="mt-6">
                    <p className="text-[#777980] text-sm mb-2">Address</p>
                    <p className="text-[#4A4C56] text-base border-b border-[#E5E7EB] pb-3">
                        {address}
                    </p>
                </div>
            )}
        </div>
    );
}

interface OrderSummaryCardProps {
    subtotal: number;
    shipping: number;
}

export function OrderSummaryCard({
    subtotal,
    shipping,
}: OrderSummaryCardProps) {
    const total = Number(subtotal) + Number(shipping);

    return (
        <div className="w-full max-w-[900px] border border-[#DFE1E7] rounded-[32px] p-6 sm:p-8 bg-white">
            <h3 className="text-[#1D1F2C] font-syne text-xl sm:text-2xl font-semibold mb-6">
                Order Summary
            </h3>

            <div className="flex flex-col gap-4 text-[#4A4C56] text-base">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                </div>

                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping}</span>
                </div>

                <div className="border-t border-[#E5E7EB] pt-4 mt-2 flex justify-between font-semibold text-[#1D1F2C]">
                    <span>Total</span>
                    <span>${total}</span>
                </div>
            </div>
        </div>
    );
}

/* ================= Reusable Input with React Hook Form integration ================= */
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    error?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
    ({ placeholder, className = '', error, ...props }, ref) => {
        return (
            <div className="relative">
                <input
                    ref={ref}
                    type="text"
                    placeholder={placeholder}
                    className={`w-full bg-transparent border-b pb-3 text-[#4A4C56] placeholder-[#9CA3AF] text-base md:text-lg focus:outline-none focus:border-[#1C5E96] transition ${
                        error ? "border-red-500" : "border-[#E5E7EB]"
                    } ${className}`}
                    {...props}
                />
                {error && (
                    <p className="text-red-500 text-sm mt-1 absolute">{error}</p>
                )}
            </div>
        );
    }
);

FormInput.displayName = 'FormInput';