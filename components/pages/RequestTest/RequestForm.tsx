"use client";

import SectionLabel from '@/components/reusable/SectionLabel'
import React from 'react'
import Image from 'next/image'
import ChevronLeft from '@/components/icons/ChevronLeft'
import { useCreateRequestByUserMutation } from '@/redux/features/admin/request/requestApi'
import { toast } from 'sonner'
import { useForm, SubmitHandler } from 'react-hook-form'

// Form data interface
interface RequestFormData {
    name: string;
    email: string;
    organization: string;
    test: string;
    message: string;
}

export default function RequestForm() {
    const [createRequestByUser, { isLoading }] = useCreateRequestByUserMutation();

    // Initialize React Hook Form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<RequestFormData>({
        defaultValues: {
            name: "",
            email: "",
            organization: "",
            test: "",
            message: "",
        }
    });

    // Handle form submission
    const onSubmit: SubmitHandler<RequestFormData> = async (data) => {
        try {
            await createRequestByUser(data).unwrap();
            toast.success("Request sent successfully ✅");
            reset(); // Reset form after successful submission
        } catch (error: any) {
            toast.error(error?.data?.message || error?.message || "Something went wrong ❌");
        }
    };

    return (
        <section className="max-w-[800px] mx-auto px-6 py-16">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-syne font-semibold text-[#1D1F2C] mb-12">
                Request form
            </h2>

            {/* Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-8 md:gap-10"
            >
                <FormInput
                    name="name"
                    register={register}
                    validation={{ 
                        required: "Name is required",
                        minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters"
                        }
                    }}
                    error={errors.name}
                    placeholder="Full Name"
                />

                <FormInput
                    name="email"
                    type="email"
                    register={register}
                    validation={{ 
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
                    }}
                    error={errors.email}
                    placeholder="Email"
                />

                <FormInput
                    name="organization"
                    register={register}
                    validation={{ 
                        required: "Organization is required",
                        minLength: {
                            value: 2,
                            message: "Organization must be at least 2 characters"
                        }
                    }}
                    error={errors.organization}
                    placeholder="Organization (supplier/clinic/pharmacy)"
                />

                <FormInput
                    name="test"
                    register={register}
                    validation={{ 
                        required: "Test name is required",
                        minLength: {
                            value: 2,
                            message: "Test name must be at least 2 characters"
                        }
                    }}
                    error={errors.test}
                    placeholder="Peptide to test (e.g., BPC-157, Semaglutide)"
                />

                <FormTextarea
                    name="message"
                    register={register}
                    validation={{ 
                        required: "Message is required",
                        minLength: {
                            value: 10,
                            message: "Message must be at least 10 characters"
                        },
                        maxLength: {
                            value: 500,
                            message: "Message cannot exceed 500 characters"
                        }
                    }}
                    error={errors.message}
                    placeholder="What do you need verified? (identity/purity/potency/contaminants/stability/desired turnaround)"
                    rows={2}
                />

                {/* Button */}
                <div>
                    <button
                        type="submit"
                        disabled={isLoading || isSubmitting}
                        className="px-8 py-4 rounded-full bg-[linear-gradient(180deg,#84B6DE_0%,#1C5E96_100%)] text-white text-lg font-medium hover:opacity-90 transition cursor-pointer disabled:opacity-50"
                    >
                        {isLoading || isSubmitting ? "Sending..." : "Send Request"}
                    </button>
                </div>
            </form>
        </section>
    );
};

/* ================= Reusable Input ================= */
interface FormInputProps {
    placeholder: string;
    name: keyof RequestFormData;
    type?: string;
    register: any;
    validation?: any;
    error?: any;
    className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
    placeholder,
    name,
    type = "text",
    register,
    validation = {},
    error,
    className = "",
}) => {
    return (
        <div className="relative">
            <input
                type={type}
                {...register(name, validation)}
                placeholder={placeholder}
                className={`bg-transparent border-b pb-3 text-[#4A4C56] placeholder-[#9CA3AF] text-base md:text-lg focus:outline-none transition w-full ${
                    error 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-[#E5E7EB] focus:border-[#1C5E96]'
                } ${className}`}
            />
            {error && (
                <p className="text-red-500 text-sm mt-1 absolute">
                    {error.message}
                </p>
            )}
        </div>
    );
};

/* ================= Reusable Textarea ================= */
interface FormTextareaProps {
    placeholder: string;
    name: keyof RequestFormData;
    rows?: number;
    register: any;
    validation?: any;
    error?: any;
    className?: string;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
    placeholder,
    name,
    rows = 2,
    register,
    validation = {},
    error,
    className = "",
}) => {
    return (
        <div className="relative">
            <textarea
                {...register(name, validation)}
                placeholder={placeholder}
                rows={rows}
                className={`w-full bg-transparent border-b pb-3 text-[#4A4C56] placeholder-[#9CA3AF] text-base md:text-lg focus:outline-none transition resize-none leading-[150%] h-[100px] md:h-auto ${
                    error 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-[#E5E7EB] focus:border-[#1C5E96]'
                } ${className}`}
            />
            {error && (
                <p className="text-red-500 text-sm mt-1 absolute">
                    {error.message}
                </p>
            )}
        </div>
    );
};