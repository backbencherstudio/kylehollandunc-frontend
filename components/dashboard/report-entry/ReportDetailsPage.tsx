import DashboardTtile from '@/components/reusable/DashboardTtile'
import FormInput from '@/components/reusable/FormInput'
import React from 'react'

export default function ReportDetailsPage() {
    return (
        <div>
            <DashboardTtile
                baseTitle="Home"
                page="Order"
                heading="Manage order"
                className="mb-8"
            />

            <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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

                <div className='bg-white rounded-xl border p-6 min-w-0 overflow-hidden'>
                    <h3 className='table-title mb-6'>Report Details</h3>
                </div>

                <div className='p-4 rounded-2xl bg-[#ECEFF3]'>


                    <p>Product detail</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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
                </div>
            </section>



        </div>
    )
}
