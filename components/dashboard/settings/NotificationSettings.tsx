"use client";

import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
    useGetNotificationsQuery,
    useUpdateNotificationMutation,
} from "@/redux/features/admin/notification/notificationApi";
import { toast } from "sonner";
import Loader from "@/components/reusable/Loader";

type NotificationKey = "user_registration" | "test_request" | "contact_message";

type NotificationSettingsState = Record<NotificationKey, boolean>;

export default function NotificationSettings() {
    const {
        data,
        isLoading: isLoadingNotifications,
        isError: isErrorNotifications,
    } = useGetNotificationsQuery();

    const [updateNotification, { isLoading: isLoadingUpdateNotification }] =
        useUpdateNotificationMutation();

    // console.log("This is the data",    data?.notifications)

    const [settings, setSettings] = useState<NotificationSettingsState>({
        user_registration: false,
        test_request: false,
        contact_message: false,
    });

    // Hydrate local state when API data arrives
    useEffect(() => {
        if (!data?.notifications) return;

        const notifications = data.notifications;

        setSettings({
            user_registration: notifications.user_registration === "1",
            test_request: notifications.test_request === "1",
            contact_message: notifications.contact_message === "1",
        });
    }, [data?.notifications]);

    const handleToggle = async (key: NotificationKey, nextValue: boolean) => {
        // Optimistic UI update
        setSettings((prev) => ({ ...prev, [key]: nextValue }));

        try {
            await updateNotification({
                notificationBody: {
                    [key]: nextValue, // ✅ send boolean
                },
            }).unwrap();
            // toast.success("Notification updated successfully");
        } catch (e) {
            // Revert on error
            setSettings((prev) => ({ ...prev, [key]: !nextValue }));
            toast.error((e as any)?.data?.message || "Failed to update notification");
        }
    };

    if (isLoadingNotifications) {
        return (
            <Loader />
        );
    }

    if (isErrorNotifications) {
        return (
            <section className="bg-[#FFF] p-6 rounded-xl">
                <p className="text-red-500 text-sm">Failed to load settings.</p>
            </section>
        );
    }

    return (
        <section className="bg-[#FFF] p-6 rounded-xl">
            <p className="text-[#1D1F2C] text-lg font-medium leading-[160%] mb-4.5">
                Notification Settings
            </p>

            <div className="space-y-3">
                {/* User Registration */}
                <SettingRow
                    title="New User Registration"
                    desc="Receive alerts when a new user registers on the platform."
                    checked={settings.user_registration}
                    disabled={isLoadingUpdateNotification}
                    onCheckedChange={(val) => handleToggle("user_registration", val)}
                />

                {/* Test Request */}
                <SettingRow
                    title="New Test Request"
                    desc="Receive alerts when a new test request is submitted."
                    checked={settings.test_request}
                    disabled={isLoadingUpdateNotification}
                    onCheckedChange={(val) => handleToggle("test_request", val)}
                />

                {/* Contact Message */}
                <SettingRow
                    title="New Contact Message"
                    desc="Receive alerts when someone submits a contact message."
                    checked={settings.contact_message}
                    disabled={isLoadingUpdateNotification}
                    onCheckedChange={(val) => handleToggle("contact_message", val)}
                />
            </div>
        </section>
    );
}

/* -------- Reusable Row -------- */

function SettingRow({
    title,
    desc,
    checked,
    onCheckedChange,
    disabled,
}: {
    title: string;
    desc: string;
    checked: boolean;
    onCheckedChange: (val: boolean) => void;
    disabled?: boolean;
}) {
    return (
        <div className="flex items-center justify-between gap-2 border border-[#DFE1E7] pl-4 pr-3 py-4 rounded-lg">
            <div>
                <h5 className="text-[#1D1F2C] text-sm font-medium leading-[140%] tracking-[0.07px]">
                    {title}
                </h5>
                <p className="text-[#777980] text-sm font-normal leading-[140%] tracking-[0.07px]">
                    {desc}
                </p>
            </div>

            <Switch
                checked={checked}
                onCheckedChange={onCheckedChange}
                disabled={disabled}
                className="h-[24px] w-[48px] md:h-[32px] md:w-[58px] data-[state=checked]:bg-[#0479F5] cursor-pointer disabled:opacity-50"
            />
        </div>
    );
}