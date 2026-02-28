"use client"

import DashboardTtile from '@/components/reusable/DashboardTtile'
import FormInput from '@/components/reusable/FormInput'
import { useParams } from 'next/navigation'
import React from 'react'
import { useGetOrderByIdQuery } from '@/redux/features/admin/order/adminOrderApi'
import { StatusBadge } from '@/components/reusable/StatusBadge'

// Helper function to handle null/undefined values
const formatValue = (value: any, fallback: string = 'N/A'): string => {
    if (value === null || value === undefined || value === '') {
        return fallback
    }
    return String(value)
}

// Format date function with N/A handling
const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return 'N/A'
    try {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    } catch {
        return 'N/A'
    }
}

// Format currency with N/A handling
const formatCurrency = (value: string | null | undefined): string => {
    if (!value) return 'N/A'
    const num = parseFloat(value)
    return isNaN(num) ? 'N/A' : `$${num.toFixed(2)}`
}

export default function OrderDetailsPage() {
    const params = useParams();
    const id = params.id as string

    // Fetch order details
    const { data, isLoading, error } = useGetOrderByIdQuery({ id })

    // Handle loading state
    if (isLoading) {
        return (
            <div>
                <DashboardTtile
                    baseTitle="Home"
                    page="Order"
                    heading="Order Details"
                    className="mb-8"
                />
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1D1F2C]"></div>
                </div>
            </div>
        )
    }

    // Handle error state
    if (error || !data?.success) {
        return (
            <div>
                <DashboardTtile
                    baseTitle="Home"
                    page="Order"
                    heading="Order Details"
                    className="mb-8"
                />
                <div className="text-center text-red-600 py-12">
                    Failed to load order details. Please try again.
                </div>
            </div>
        )
    }

    const order = data.data

    // Separate items by type
    const testItems = order.items?.filter((item:any) => item.type === 'test') || []
    const addonItems = order.items?.filter((item:any) => item.type === 'addon') || []

    // Get user details with fallbacks
    const userName = order.user?.name || 'N/A'
    const userEmail = order.user?.email || 'N/A'
    const userRole = order.user?.role || 'N/A'

    // Map order status for badge
    const getDisplayStatus = (status: string | null | undefined): 'started' | 'pending' | 'active' | 'canceled' => {
        const statusLower = String(status || '').toLowerCase()
        switch (statusLower) {
            case 'pending':
                return 'pending'
            case 'processing':
            case 'shipped':
                return 'active'
            case 'delivered':
            case 'completed':
                return 'active'
            case 'cancelled':
            case 'canceled':
                return 'canceled'
            default:
                return 'started'
        }
    }

    return (
        <div>
            <DashboardTtile
                baseTitle="Home"
                page="Order"
                heading={`Order Details - #${formatValue(order.order_number)}`}
                className="mb-8"
            />

            {/* Status Badge and Dates */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
                <StatusBadge status={getDisplayStatus(order.order_status)} />
                <span className="text-sm text-gray-500">
                    Created: {formatDate(order.created_at)}
                </span>
                {order.updated_at && (
                    <span className="text-sm text-gray-500">
                        Updated: {formatDate(order.updated_at)}
                    </span>
                )}
            </div>

            {/* Customer Info */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                <FormInput
                    label="Full Name"
                    name="name"
                    value={userName}
                    readOnly
                />
                <FormInput
                    label="Email"
                    name="email"
                    value={userEmail}
                    readOnly
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                <FormInput
                    label="Order ID"
                    name="orderId"
                    value={formatValue(order.order_number)}
                    readOnly
                />
                <FormInput
                    label="Report ID"
                    name="reportId"
                    value={order.report ? `RPT-${order.id}` : 'Not generated'}
                    readOnly
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                {/* Product Detail Card */}
                <div className="bg-white rounded-xl border border-[#E6E8EC] p-6">
                    <h3 className="text-lg font-semibold text-[#1D1F2C] mb-4">
                        Product Details
                    </h3>

                    {order.items && order.items.length > 0 ? (
                        <div className="space-y-4">
                            {/* Header */}
                            <div className="grid grid-cols-3 text-sm font-medium text-muted-foreground pb-2 border-b">
                                <span className="col-span-2">Product</span>
                                <span className="text-right">Qty / Price</span>
                            </div>

                            {/* Test Items */}
                            {testItems.map((item:any) => (
                                <div key={item.id} className="grid grid-cols-3 text-sm">
                                    <span className="col-span-2 text-[#1D1F2C] font-medium">
                                        {formatValue(item.name)}
                                        <span className="block text-xs text-gray-500">
                                            Test
                                        </span>
                                    </span>
                                    <span className="text-right text-[#1D1F2C]">
                                        {item.quantity} / {formatCurrency(item.price)}
                                    </span>
                                </div>
                            ))}

                            {/* Addon Items */}
                            {addonItems.map((item:any) => (
                                <div key={item.id} className="grid grid-cols-3 text-sm">
                                    <span className="col-span-2 text-[#6B7280]">
                                        {formatValue(item.name)}
                                        <span className="block text-xs text-gray-400">
                                            Add-on
                                        </span>
                                    </span>
                                    <span className="text-right text-[#6B7280]">
                                        {item.quantity} / {formatCurrency(item.price)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-4">No items found</p>
                    )}
                </div>

                {/* Shipping Method Card */}
                <div className="bg-white rounded-xl border border-[#E6E8EC] p-6">
                    <h3 className="text-lg font-semibold text-[#1D1F2C] mb-4">
                        Shipping Method
                    </h3>

                    <div className="space-y-4 text-sm">
                        {/* Shipping Method */}
                        <div>
                            <p className="text-muted-foreground font-medium">Method</p>
                            <p className="text-[#1D1F2C] mt-1 capitalize">
                                {formatValue(order.shipping_method, 'Not specified').replace('_', ' ')}
                            </p>
                        </div>

                        {/* Shipping Label */}
                        {order.label_frame_code ? (
                            <p className="text-blue-600 font-medium cursor-pointer hover:underline">
                                Shipping Label Added (Code: {order.label_frame_code})
                            </p>
                        ) : (
                            <p className="text-gray-400">No shipping label</p>
                        )}

                        {/* Address */}
                        <div>
                            <p className="text-muted-foreground font-medium">Address</p>
                            <p className="text-[#6B7280] mt-1">
                                {formatValue(order.shipping_address, 'No address provided')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment and Summary Section */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border border-[#E6E8EC]/50 rounded-xl p-4'>
                <div className="space-y-4">
                    <FormInput
                        label="Payment Method"
                        name="paymentMethod"
                        value={formatValue(order.payment_method, 'Not specified').replace('_', ' ').toUpperCase()}
                        readOnly
                    />
                    <FormInput
                        label="Payment Status"
                        name="paymentStatus"
                        value={formatValue(order.payment_status, 'Unknown').replace('_', ' ').toUpperCase()}
                        readOnly
                    />
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-xl border border-[#E6E8EC] p-6 w-full">
                    <h3 className="text-lg font-semibold text-[#1D1F2C] mb-6">
                        Order Summary
                    </h3>

                    {/* Subtotal */}
                    <div className="flex items-center justify-between text-sm mb-3">
                        <span className="text-[#6B7280]">Subtotal</span>
                        <span className="text-[#1D1F2C] font-medium">
                            {formatCurrency(order.subtotal)}
                        </span>
                    </div>

                    {/* Shipping */}
                    <div className="flex items-center justify-between text-sm mb-4">
                        <span className="text-[#6B7280]">Shipping</span>
                        <span className="text-[#1D1F2C] font-medium">
                            {formatCurrency(order.shipping_price)}
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
                            {formatCurrency(order.total)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Sample Details */}
            <div className='space-y-4'>
                <h3 className='text-[#4A4C56] text-xl font-semibold leading-[120%]'>Sample Details</h3>

                {order.sample ? (
                    <>
                        <FormInput
                            label="Organization"
                            name="organization"
                            value={formatValue(order.sample.organization)}
                            readOnly
                        />
                        <FormInput
                            label="Peptide to test"
                            name="peptide"
                            value={formatValue(order.sample.peptide)}
                            readOnly
                        />
                        <FormInput
                            label="Detail"
                            name="sampleDescription"
                            value={formatValue(order.sample.details, 'No details provided')}
                            readOnly
                            as="textarea"
                        />
                    </>
                ) : (
                    <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500">
                        No sample details available
                    </div>
                )}
            </div>

            {/* Additional Metadata (if any) */}
            {order.items?.some((item:any) => item.meta) && (
                <div className="mt-6">
                    <h3 className='text-[#4A4C56] text-lg font-semibold mb-3'>Additional Information</h3>
                    {order.items.map((item:any) => item.meta && (
                        <div key={item.id} className="bg-gray-50 rounded-lg p-4 mb-2">
                            <p className="font-medium">{formatValue(item.name)}</p>
                            <pre className="text-sm text-gray-600 mt-1">
                                {JSON.stringify(item.meta, null, 2)}
                            </pre>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}