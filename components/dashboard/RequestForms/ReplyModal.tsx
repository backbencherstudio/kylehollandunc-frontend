"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import FormInput from "@/components/reusable/FormInput";
import { Mail } from "lucide-react";

export interface RequestDetails {
    fullName: string;
    email: string;
    organization: string;
    peptide: string;
    detail: string;
}

interface ViewDetailsProps {
    data: RequestDetails;
    onCancel?: () => void;
    onReply?: () => void;
}

export default function ViewDetails({
    data,
    onCancel,
    onReply,

}: ViewDetailsProps) {


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")  
    const [detail, setDetail] = useState("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onReply?.();
        console.log("Reply", name, email, detail);
    };
    return (
        <div
            className="space-y-4">

            {/* header */}

            <div>
                <h2 className="dashboard-modal-title mb-4">
                    Message 
                </h2>
                <div>
                    <p className="text-[#2A2A33] text-base font-normal leading-[120%] mb-2"><span>Peptide to test :</span> BPC-157 </p>

                    <p className="text-sm font-light leading-[150%]">Identity and purity verification with potency analysis...</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="dashboard-modal-title">
                    Reply
                </h2>

                {/* Fields */}
                <FormInput
                    label="Full Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}

                />
                <FormInput
                    label="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <FormInput
                    label="Detail"
                    name="detail"
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    as="textarea"
                />


                {/* Footer */}
                <div className="flex justify-end gap-3 pt-2">
                    <Button
                        variant="outline"
                        onClick={onCancel}
                        className="rounded-lg"
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={onReply}
                        className="rounded-lg bg-linear-to-b from-[#4F7FA3] to-[#2F5F86] text-white"
                    >
                        <Mail className="h-4 w-4 mr-2" />
                        Reply
                    </Button>
                </div>
            </form>
        </div>
    );
}

