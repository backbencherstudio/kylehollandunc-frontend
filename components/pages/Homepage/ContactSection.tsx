"use client";

import SectionLabel, { SectionHeading } from "@/components/reusable/SectionLabel";
import Image from "next/image";
import React, { useState } from "react";
import { useCreateContactByUserMutation } from "@/redux/features/admin/contact/contactApi";
import { toast } from "sonner";

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        order_id: "",
        message: "",
    });
    const [createContact] = useCreateContactByUserMutation();
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        const payload = {
            name: formData.name,
            email: formData.email,
            order_id: formData.order_id
                ? Number(formData.order_id)
                : null,
            message: formData.message,
        };

      try {
        await createContact({
            name: formData.name,
            email: formData.email,
            order_id: formData.order_id ? Number(formData.order_id) : undefined,
            message: formData.message,
        }).unwrap();
        toast.success("Contact created successfully");
        setFormData({
            name: "",       // reset form       
            email: "",
                order_id: "",
                message: "",
            });
            setLoading(false);
        } catch (error) {
            toast.error((error as any)?.data?.message || "Failed to create contact");
            setLoading(false);
        }
    };

    return (
        <section className="relative w-full min-h-[750px] overflow-hidden">
            <Image
                src="/images/contact-bg.png"
                alt="Lab technician"
                fill
                priority
                className="object-cover"
            />

            <div id="contact-us" className="absolute inset-0 bg-[rgba(2,51,71,0.40)]" />

            <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-[140px] py-20 lg:py-[120px] flex flex-col lg:flex-row justify-between gap-14">

                {/* Left Side */}
                <div className="max-w-[556px] text-white">
                    <SectionLabel className='w-fit mb-2 text-white border-white'>
                        Contact us
                    </SectionLabel>

                    <SectionHeading className='text-white mb-3'>
                        Get in Touch with Us
                    </SectionHeading>

                    <p className="text-white text-base">
                        Need assistance with your sample or testing request?
                    </p>
                </div>

                {/* Form */}
                <div className="w-full max-w-[700px] backdrop-blur-xl border border-white/20 rounded-2xl text-white bg-white/30 px-8 py-16">

                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">

                        <InputField
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                        />

                        <InputField
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />

                        <InputField
                            name="order_id"
                            value={formData.order_id}
                            onChange={handleChange}
                            placeholder="Your Order ID (optional)"
                        />

                        <InputField
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your message"
                            textarea
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-fit px-8 py-3 rounded-full bg-[linear-gradient(180deg,#84B6DE_0%,#1C5E96_100%)] text-white hover:opacity-90 transition disabled:opacity-50"
                        >
                            {loading ? "Sending..." : "Send"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}



interface InputFieldProps {
    name: string;
    value: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    placeholder: string;
    textarea?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    name,
    value,
    onChange,
    placeholder,
    textarea = false,
}) => {
    if (textarea) {
        return (
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                rows={3}
                placeholder={placeholder}
                className="bg-transparent border-b border-[#D2D2D5] focus:outline-none focus:border-white text-white placeholder-white resize-none"
            />
        );
    }

    return (
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="bg-transparent border-b border-[#D2D2D5] focus:outline-none focus:border-white text-white placeholder-white pb-2"
        />
    );
};