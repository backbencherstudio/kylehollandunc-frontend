"use client";
import DashboardTtile from '@/components/reusable/DashboardTtile'
import FormInput from '@/components/reusable/FormInput'
import React, { useEffect } from 'react'

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, PlusIcon } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import FileUpload from '@/components/reusable/FileUpload';
import { useParams } from 'next/navigation';
import { useGetReportByIdQuery, useUpdateReportMutation } from '@/redux/features/admin/reports/reportApi';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Define the type for result items
interface ResultItem {
    name: string;
    value: string;
}

// Define API response types based on your console log
interface OrderItem {
    id: number;
    order_id: number;
    type: 'test' | 'addon';
    name: string;
    quantity: number;
    price: string;
    total_price: string;
    meta: any;
    created_at: string;
    updated_at: string;
}

interface Order {
    id: number;
    order_number: string;
    user_id: number;
    shipping_method: string;
    subtotal: string;
    shipping_price: string;
    shipping_address: any;
    total: string;
    label_frame_code: any;
    payment_method: string;
    payment_status: string;
    order_status: string;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        role: string;
        created_at: string;
        updated_at: string;
    };
    items: OrderItem[];
    sample: any;
}

interface ReportData {
    id: number;
    name: string;
    order_id: number;
    result_status: 'pass' | 'fail' | null;
    test_date: string;
    lot: string | null;
    progress_status: 'pending' | 'completed';
    result_summary: string | null;
    report_file: string | null;
    created_at: string;
    updated_at: string;
    order: Order;
}

export default function ReportEditPage() {
    const params = useParams();
    const id = params.id as string;

    const { data: reportResponse, isLoading, error } = useGetReportByIdQuery({ id });
    const [updateReport] = useUpdateReportMutation();
    
    // Log the response to see its structure
    useEffect(() => {
        console.log("Full API Response:", reportResponse);
        console.log("Report Data:", reportResponse?.data);
    }, [reportResponse]);
    
    // State declarations
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [status, setStatus] = useState<string>("");
    const [reportId, setReportId] = useState<string>("");
    const [testType, setTestType] = useState<string>("");
    const [clientName, setClientName] = useState<string>("");
    const [progressStatus, setProgressStatus] = useState<string>("");
    const [lot, setLot] = useState<string>("");
    const [uniqueId, setUniqueId] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [results, setResults] = useState<ResultItem[]>([]);

    // Populate form with API data when report loads
    useEffect(() => {
        // Check different possible response structures
        const reportData = reportResponse?.data || reportResponse;
        
        if (reportData) {
            console.log("Setting form data with:", reportData);
            
            // Set basic info
            setReportId(reportData.order?.order_number || `RPT-${reportData.id}`);
            setClientName(reportData.name || reportData.order?.user?.name || "");
            setProgressStatus(reportData.progress_status || "pending");
            
            // Set date
            if (reportData.test_date) {
                setDate(new Date(reportData.test_date));
            }
            
            // Set unique ID
            setUniqueId(reportData.order?.order_number || "");
            
            // Set lot
            setLot(reportData.lot || "");
            
            // Set result status
            setStatus(reportData.result_status || "");
            
            // Format test type from order items
            if (reportData.order?.items && Array.isArray(reportData.order.items)) {
                const testItems = reportData.order.items.filter((item: OrderItem) => item.type === 'test');
                const addonItems = reportData.order.items.filter((item: OrderItem) => item.type === 'addon');
                
                let formattedTestType = "";
                if (testItems.length > 0) {
                    formattedTestType = testItems[0].name;
                    if (addonItems.length > 0) {
                        const addonNames = addonItems.map((item: OrderItem) => item.name).join(', ');
                        formattedTestType = `${formattedTestType} & ${addonNames}`;
                    }
                } else {
                    formattedTestType = "Standard Panel";
                }
                setTestType(formattedTestType);
            }
            
            // Handle result summary
            if (reportData.result_summary) {
                try {
                    // If result_summary is already an array, use it directly
                    if (Array.isArray(reportData.result_summary)) {
                        setResults(reportData.result_summary);
                    } else {
                        // If it's a JSON string, parse it
                        const parsedResults = JSON.parse(reportData.result_summary);
                        if (Array.isArray(parsedResults)) {
                            setResults(parsedResults);
                        }
                    }
                } catch (e) {
                    console.error("Failed to parse result summary:", e);
                    setResults([]);
                }
            }
        }
    }, [reportResponse]);

    const handleAddRow = () => {
        setResults([...results, { name: "", value: "" }]);
    };

    const handleChange = (
        index: number,  
        field: "name" | "value",
        newValue: string
    ) => {
        const updated = [...results];
        updated[index][field] = newValue;
        setResults(updated);
    };

    const handleRemoveRow = (index: number) => {
        const updated = results.filter((_, i) => i !== index);
        setResults(updated);
    };

    const handleFileChange = (file: File | null) => {
        setFile(file);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await updateReport({
                id,
                report: {
                    test_date: date ? format(date, "yyyy-MM-dd") : "",
                    lot: lot,
                    result_status: status,
                    result_summary: JSON.stringify(results),
                    report_file: file,
                },
            }).unwrap();

            toast.success("Report updated successfully");
        } catch (error) {
            toast.error("Failed to update report");
            console.error("Failed to update report", error);
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4">
                <p className="text-red-700">
                    {'data' in error 
                        ? (error.data as { message?: string })?.message || "Failed to load report"
                        : "An error occurred while loading the report"}
                </p>
            </div>
        );
    }

    return (
        <div>
            <DashboardTtile
                baseTitle="Home"
                page="Report Entry"
                heading="Report Edit"
                className="mb-8"
                description="Edit the report details"
            />

            {/* Information */}
            <section className='p-4 rounded-2xl border border-[#ECEFF3] space-y-4'>
                <p className='text text-[#4A4C56] text-lg font-medium leading-[120%]'>Test Information</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormInput
                        label="Report ID"
                        name="reportId"
                        value={reportId}
                        readOnly
                    />
                    <FormInput
                        label="Test Type"
                        name="testType"
                        value={testType}
                        readOnly
                    />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormInput
                        label="Client Name"
                        name="clientName"
                        value={clientName}
                        readOnly
                    />
                    <FormInput
                        label="Progress Status"
                        name="progressStatus"
                        value={progressStatus}
                        readOnly
                    />
                </div>
            </section>

            <form onSubmit={handleSubmit} className="p-4 rounded-2xl border border-[#ECEFF3] space-y-4 mt-6">
                <p className="text-[#4A4C56] text-lg font-medium leading-[120%]">
                    Update Test Report
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Date Picker */}
                    <div className="w-full">
                        <label className="block mb-2 text-[#1D1F2C] font-medium leading-[150%]">
                            Date
                        </label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <button
                                    type="button"
                                    className="
                                    w-full py-2 px-2.5 rounded-lg border text-sm transition outline-none
                                    bg-white border-gray-300
                                    focus:border-[#36668E] focus:ring-1 focus:ring-[#36668E]
                                    flex items-center justify-between
                                    "
                                >
                                    {date ? format(date, "PPP") : "Select date"}
                                    <CalendarIcon className="w-4 h-4 text-gray-500" />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Unique ID */}
                    <FormInput
                        label="Unique ID"
                        name="uniqueId"
                        value={uniqueId}
                        onChange={(e) => setUniqueId(e.target.value)}
                        placeholder="e.g. Illinois DOL"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Lot */}
                    <FormInput
                        label="Lot"
                        name="lot"
                        value={lot}
                        onChange={(e) => setLot(e.target.value)}
                        placeholder="Enter lot number"
                    />

                    {/* Result Status */}
                    <div className="w-full">
                        <label className="block mb-2 text-[#1D1F2C] font-medium leading-[150%]">
                            Result Status
                        </label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger
                                className="
                                w-full py-2 px-2.5 rounded-lg border text-sm transition outline-none
                                bg-white border-gray-300
                                focus:border-[#36668E] focus:ring-1 focus:ring-[#36668E]
                                "
                            >
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent className='bg-white'>
                                <SelectItem value="pass">Pass</SelectItem>
                                <SelectItem value="fail">Fail</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className='flex justify-between items-center'>
                    <h2 className='flex-[1_0_0] text-[#1D1F2C] text-base font-medium leading-[128%] tracking-[-0.32px]'>
                        Result Summary
                    </h2>
                    <button
                        type="button"
                        onClick={handleAddRow}
                        className="flex w-8 h-8 justify-center items-center gap-1 bg-gradient-to-b text-white from-[#84B6DE] to-[#1C5E96] p-1 rounded-[27px] hover:opacity-90 transition-opacity"
                        title="Add new row"
                    >
                        <PlusIcon size={20} />
                    </button>
                </div>

                {/* Result Summary Rows */}
                {results.length > 0 ? (
                    results.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 border-b border-[#ECEFF3] py-3"
                        >
                            <input
                                type="text"
                                placeholder="Enter Label Name (e.g., GHK-Cu)"
                                value={item.name}
                                onChange={(e) =>
                                    handleChange(index, "name", e.target.value)
                                }
                                className="
                                    flex-1
                                    text-[#777980]
                                    text-base
                                    outline-none
                                    bg-transparent
                                    border border-transparent
                                    focus:border-[#36668E]
                                    focus:ring-1
                                    focus:ring-[#36668E]
                                    rounded
                                    px-2
                                    py-1
                                "
                            />
                            <input
                                type="text"
                                placeholder="Enter Result Value (e.g., 71.36 mg)"
                                value={item.value}
                                onChange={(e) =>
                                    handleChange(index, "value", e.target.value)
                                }
                                className="
                                    flex-1
                                    text-[#1D1F2C]
                                    text-base
                                    text-right
                                    outline-none
                                    bg-transparent
                                    border border-transparent
                                    focus:border-[#36668E]
                                    focus:ring-1
                                    focus:ring-[#36668E]
                                    rounded
                                    px-2
                                    py-1
                                "
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveRow(index)}
                                className="text-red-500 hover:text-red-700 px-2 text-xl"
                                title="Remove row"
                            >
                                ×
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                        No result summary entries. Click the + button to add.
                    </div>
                )}

                {/* File Upload */}
                <div className="mt-6">
                    <label className="block mb-2 text-[#1D1F2C] font-medium leading-[150%]">
                        Report File
                    </label>
                    <FileUpload 
                        value={file} 
                        onChange={handleFileChange}
                        maxSizeMB={5}
                    />
                    {reportResponse?.data?.report_file && !file && (
                        <p className="text-sm text-gray-500 mt-1">
                            Current file: {reportResponse.data.report_file}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4 mt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => window.history.back()}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="px-6 py-2 bg-gradient-to-r from-[#2c5282] to-[#1a365d] text-white rounded-lg hover:opacity-90"
                    >
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
}