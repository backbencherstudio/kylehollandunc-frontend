"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/reusable/FormInput";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { useRequestReplyMutation } from "@/redux/features/admin/request/requestApi";

export interface RequestDetails {
    id: number;
    name: string;
    email: string;
    organization: string;
    test: string;
}

interface ReplyModalProps {
    data: RequestDetails;
    onCancel?: () => void;
    onReply?: () => void;
}

export default function ReplyModal({
    data,
    onCancel,
    onReply,
}: ReplyModalProps) {
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [requestReply, { isLoading }] = useRequestReplyMutation();

    // Pre-fill email when data changes
    useEffect(() => {
        if (data?.email) {
            setEmail(data.email);
        }
    }, [data]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Validate fields
        if (!email.trim()) {
            toast.error("Email is required");
            return;
        }
        
  
        try {
            // Convert id to string as expected by the API
            const payload = {
                id: data.id.toString(),
                body: {
                    email: email,
                    subject: subject,
                    description: description || null, // Include description, default to null if empty
                }
            };

            await requestReply(payload).unwrap();
            
            toast.success("Reply sent successfully");
            onReply?.();
        } catch (error: any) {
            toast.error(error?.data?.message || error?.message || "Failed to send reply");
        }
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div>
                <h2 className="text-lg font-semibold text-[#1D1F2C] mb-4">
                    Message
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-sm font-medium text-[#1D1F2C]">{data?.name}</p>
                    <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Test:</span> {data?.test}
                    </p>
                    
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-lg font-semibold text-[#1D1F2C]">
                    Reply
                </h2>

                {/* Fields */}
                <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="recipient@example.com"
                    required
                />
                <FormInput
                    label="Subject"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject"
                    required
                />

               

                <FormInput
                    label="Description (Optional)"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    as="textarea"
                    rows={2}
                    placeholder="Additional notes or description..."
                />

                {/* Footer */}
                <div className="flex justify-end gap-3 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        className="rounded-lg border-gray-300 hover:bg-gray-50"
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-lg bg-gradient-to-b from-[#4F7FA3] to-[#2F5F86] text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        <Mail className="h-4 w-4 mr-2" />
                        {isLoading ? "Sending..." : "Reply"}
                    </Button>
                </div>
            </form>
        </div>
    );
}