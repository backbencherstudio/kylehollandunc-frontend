"use client";
import DashboardTtile from '@/components/reusable/DashboardTtile'
import FormInput from '@/components/reusable/FormInput'
import React from 'react'

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
import { Button } from "@/components/ui/button";
import FileUpload from '@/components/reusable/FileUpload';


export default function ReportEditPage() {


    const [date, setDate] = useState<Date | undefined>();
    const [status, setStatus] = useState<string>("");
    const [reportId, setReportId] = useState<string>("Lasdfadfad");
    const [testType, setTestType] = useState<string>("Standard Panel & 2 add ons");
    const [clientName, setClientName] = useState<string>("Theresa Webb");
    const [progressStatus, setProgressStatus] = useState<string>("Completed");
    const [file, setFile] = useState<File | null>(null);
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
                <p className='text  text-[#4A4C56]  text-lg font-medium leading-[120%]'>Test Information</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormInput
                        label="Report ID"
                        name="reportId"
                        value={reportId}
                        onChange={(e) => setReportId(e.target.value)}
                    />
                    <FormInput
                        label="Test Type"
                        name="testType"
                        value={testType}
                        onChange={(e) => setTestType(e.target.value)}
                    />

                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                    <FormInput
                        label="Client Name"
                        name="testDate"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                    />
                    <FormInput
                        label="Progress Status"
                        name="testTime"
                        value={progressStatus}
                        onChange={(e) => setProgressStatus(e.target.value)}
                    />
                </div>
            </section>
            <section className="p-4 rounded-2xl border border-[#ECEFF3] space-y-4 mt-6">
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
                        placeholder="e.g. Illinois DOL"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Lot */}
                    <FormInput
                        label="Lot"
                        name="lot"
                        placeholder="290"
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

                            <SelectContent className='bg-white ' >
                                <SelectItem className='bg-[#E9FAF7] text-[#22CAAD] mb-1 w-25' value="pass">Pass</SelectItem>
                                <SelectItem className='bg-[#FEECEE] text-[#EB3D4D] w-25' value="fail">Fail</SelectItem>

                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className='flex justify-between items-center'>
                    <h2 className='flex-[1_0_0] text-[#1D1F2C] text-base font-medium leading-[128%] tracking-[-0.32px]'>Result Summery</h2>

                    <button className='flex w-8 h-8 justify-center items-center gap-1 bg-linear-to-b text-white from-[#84B6DE] to-[#1C5E96] p-1 rounded-[27px]'> <PlusIcon size={20} /></button>
                </div>


                <div className='flex justify-between items-center self-stretch border-b-[#ECEFF3] px-0 py-3 border-b border-solid'><label className='text-[ #777980] text-center text-base font-normal leading-[120%]' htmlFor="">GHK-Cu</label>

                    <p className='text-[#1D1F2C] text-center text-base font-normal leading-[120%]'>71.36 mg</p>
                </div>
                <div className='flex justify-between items-center self-stretch border-b-[#ECEFF3] px-0 py-3 border-b border-solid'><label className='text-[ #777980] text-center text-base font-normal leading-[120%]' htmlFor="">BPC-157</label>

                    <p className='text-[#1D1F2C] text-center text-base font-normal leading-[120%]'>12.41 mg</p>
                </div>

                <div>
                    <FileUpload value={file} onChange={setFile} />
                </div>
            </section>


        </div>
    )
}
