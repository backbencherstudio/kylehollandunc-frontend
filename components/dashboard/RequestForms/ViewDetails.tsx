"use client";

import React from "react";
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
    return (
        <div
            className="space-y-4">

            {/* header */}

            <h2 className="dashboard-modal-title">
                Request form
            </h2>
            {/* Fields */}

            <FormInput
                label="Full Name"
                name="fullName"
                value={data.fullName || "Anonymous"}
                readOnly
            />
            <FormInput
                label="Email"
                name="email"
                value={data.email || "Anonymous"}
                readOnly
            />
            <FormInput
                label="Organization"
                name="organization"
                value={data.organization || "Anonymous"}
                readOnly
            />
            <FormInput
                label="Peptide to test"
                name="peptide"
                value={data.peptide || "Anonymous"}
                readOnly
            />
            <FormInput
                label="Detail"
                name="detail"
                value="Identity and purity verification with potency analysis..."
                as="textarea"
                readOnly
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
        </div>
    );
}

/* ---------- Field Wrapper ---------- */

function Field({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-[#2C2F33]">
                {label}
            </label>

            <div className="bg-[#F5F6F8] border border-[#E2E4E9] rounded-lg px-3 py-2">
                {children}
            </div>
        </div>
    );
}