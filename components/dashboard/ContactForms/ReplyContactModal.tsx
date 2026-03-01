"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/reusable/FormInput";
import { Mail } from "lucide-react";
import { useReplyToContactMutation } from "@/redux/features/admin/contact/contactApi";
import { toast } from "sonner";



interface ReplyContactModalProps {
    data: any;
    onCancel?: () => void;
    onReply?: () => void;
}

export default function ReplyContactModal({
    data,
    onCancel,
    onReply,

}: ReplyContactModalProps) {

    const [replyToContact, { isLoading }] = useReplyToContactMutation();

    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const body = {
            email: email,
            subject: subject,
            description: message,
        }

      try {
        await replyToContact({
            id: data.id,
            body: body
        }).unwrap()
        toast.success("Reply sent successfully");
        onReply?.();
      } catch (error) {
        toast.error((error as any) ?.data?.message || "Failed to send reply");
      }

    }
   


return (
    <div
        className="space-y-4">

        {/* header */}

        <div>
            <h2 className="dashboard-modal-title mb-4">
                Message
            </h2>
            <div>
                <p className="text-[#2A2A33] text-base font-normal leading-[120%] mb-2"><span>To :</span> {data.name} </p>
                {/* <p className="text-[#2A2A33] text-base font-normal leading-[120%] mb-2"><span>To :</span> {data.email} </p> */}
            </div>
        </div>
        {/* Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
                label="Subject"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            />
            <FormInput
                label="Message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                as="textarea"
            />
            <div className="flex justify-end gap-3 pt-2">
                <Button

                    type="submit"
                    className="rounded-lg bg-linear-to-b from-[#4F7FA3] to-[#2F5F86] text-white"
                    disabled={isLoading}
                >
                    <Mail className="h-4 w-4 mr-2" />
                    {isLoading ? "Sending..." : "Reply"}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="rounded-lg"
                    disabled={isLoading}
                >
                    Cancel
                </Button>
            </div>
        </form>
    </div>
);
}

