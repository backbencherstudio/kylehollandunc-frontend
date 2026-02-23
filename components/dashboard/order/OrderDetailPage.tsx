"use client"

import DashboardTtile from '@/components/reusable/DashboardTtile'
import FormInput from '@/components/reusable/FormInput'
import { useParams } from 'next/navigation'
import React from 'react'

export default function OrderDetailsPage() {
    const params = useParams();
    const id = params.id as string
    return (
        <div>
            <DashboardTtile
                baseTitle="Home"
                page="Order"
                heading="Order Details"
                className="mb-8"
            />
            {/* info */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                <FormInput
                    label="Full Name"
                    name="name"
                    value="John Doe"
                    readOnly
                />
                <FormInput
                    label="Report ID"
                    name="reportId"
                    value="LNL-000123"
                    readOnly
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                {/* Product Detail Card */}
                <div className="bg-white rounded-xl border border-[#E6E8EC] p-6">
                    <h3 className="text-lg font-semibold text-[#1D1F2C] mb-4">
                        Product detail
                    </h3>

                    <div className="grid grid-cols-2 text-sm">
                        <p className="text-muted-foreground font-medium">Product</p>
                        <p className="text-muted-foreground font-medium text-right">
                            Quantity
                        </p>

                        <p className="text-[#1D1F2C] mt-3">
                            Standard Panel
                        </p>
                        <p className="text-[#1D1F2C] mt-3 text-right">
                            1
                        </p>

                        <p className="text-[#6B7280] mt-2">
                            Sterility Testing (Add On)
                        </p>
                        <p className="text-[#6B7280] mt-2 text-right">
                            1
                        </p>
                    </div>
                </div>
                {/* Shipping Method Card */}
                <div className="bg-white rounded-xl border border-[#E6E8EC] p-6">
                    <h3 className="text-lg font-semibold text-[#1D1F2C] mb-4">
                        Shipping method
                    </h3>

                    <div className="space-y-3 text-sm">
                        <p className="text-blue-600 font-medium cursor-pointer">
                            Shipping Label Added
                        </p>

                        <div>
                            <p className="text-muted-foreground font-medium">
                                Address
                            </p>
                            <p className="text-[#6B7280] mt-1">
                                123 street, Utah 84620, USA
                            </p>
                        </div>
                    </div>
                </div>

            </div>


            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border border-[#E6E8EC]/50 rounded-xl p-4'>
                <FormInput
                    label="Payment Method"
                    name="paymentMethod"
                    value="Paypal"
                    readOnly
                />
                <div className="bg-white rounded-xl border border-[#E6E8EC] p-6 w-full ">

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-[#1D1F2C] mb-6">
                        Order Summary
                    </h3>

                    {/* Subtotal */}
                    <div className="flex items-center justify-between text-sm mb-3">
                        <span className="text-[#6B7280]">Subtotal</span>
                        <span className="text-[#1D1F2C] font-medium">
                            $274
                        </span>
                    </div>

                    {/* Shipping */}
                    <div className="flex items-center justify-between text-sm mb-4">
                        <span className="text-[#6B7280]">Shipping</span>
                        <span className="text-[#1D1F2C] font-medium">
                            $25
                        </span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-[#E6E8EC] my-4" />

                    {/* Total */}
                    <div className="flex items-center justify-between">
                        <span className="text-base font-medium text-[#1D1F2C]">
                            Total
                        </span>
                        <span className="text-xl font-semibold text-[#1D1F2C]">
                            $300
                        </span>
                    </div>
                </div>
            </div>

            {/* sample details */}

            <div className='space-y-4'>
                <h3 className='text-[#4A4C56] text-xl font-semibold leading-[120%]'>Sample Details</h3>

                <FormInput
                    label="Organization"
                    name="sampleName"
                    value="Supplier"
                    readOnly
                />
                <FormInput
                    label="Peptide to test"
                    name="sampleDescription"
                    value="BPC-157"
                    readOnly
                />
                <FormInput
                    label="Detail"
                    name="sampleDescription"
                    value="Identity and purity verification with potency analysis. Please include contaminant screening (heavy metals and residual solvents). Standard turnaround time (5–7 business days) is acceptable."
                    readOnly
                    as="textarea"

                />
            </div>



        </div>
    )
}
