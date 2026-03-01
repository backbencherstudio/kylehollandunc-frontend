import React from "react";
import { Button } from "@/components/ui/button";

interface ContactData {
    name?: string;
    email?: string;
    message?: string;
}

interface ViewContactModalProps {
    data?: ContactData;
    onCancel?: () => void;
}

export default function ViewContactModal({
    data,
    onCancel,
}: ViewContactModalProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h2 className="dashboard-modal-title">Contact Form</h2>

                <div>
                    <p className="text-[#2A2A33] text-base font-normal leading-[120%] mb-2">
                        <span className="font-medium">Name :</span>{" "}
                        {data?.name || "N/A"}
                    </p>
                </div>

                <div>
                    <p className="text-[#2A2A33] text-base font-normal leading-[120%] mb-2">
                        <span className="font-medium">Email :</span>{" "}
                        {data?.email || "N/A"}
                    </p>
                </div>

                <div>
                    <p className="text-[#2A2A33] text-base font-normal leading-[120%] mb-2">
                        <span className="font-medium">Message :</span>{" "} <br />
                        <span className="text-sm font-light leading-[150%]">   {data?.message || "N/A"}</span>
                    </p>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="rounded-lg"
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}