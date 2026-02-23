'use client'

import { useState } from 'react'
import { Column } from '@/components/reusable/ReusableTable'
import { StatusBadge } from '@/components/reusable/StatusBadge'
import SearchInput from '@/components/reusable/SearchInput'
import SortFilter from '@/components/reusable/SortFilter'
import { ReusableTable } from '@/components/reusable/ReusableTable'

    export interface Order {
    id: string
    orderId: string
    name: string
    email: string
    testType: string
    date: string
    status: 'started' | 'pending' | 'active' | 'canceled'
}

const orderData: Order[] = [
    {
        id: '1',
        orderId: 'LNL-000123',
        name: 'Theresa Webb',
        email: 'jackson.graham@example.com',
        testType: 'Standard Panel',
        date: 'February 28, 2018',
        status: 'started',
    },
    {
        id: '2',
        orderId: 'LNL-000123',
        name: 'Kristin Watson',
        email: 'bill.sanders@example.com',
        testType: 'Standard Panel & 2 add ons',
        date: 'March 13, 2014',
        status: 'pending',
    },
    {
        id: '3',
        orderId: 'LNL-000124',
        name: 'Theresa Webb',
        email: 'georgia.young@example.com',
        testType: 'Standard Panel',
        date: 'December 2, 2018',
        status: 'active',
    },
    {
        id: '4',
        orderId: 'LNL-000125',
        name: 'Guy Hawkins',
        email: 'tim.jennings@example.com',
        testType: 'Standard Panel & 3 add ons',
        date: 'May 20, 2015',
        status: 'pending',
    },
    {
        id: '5',
        orderId: 'LNL-000126',
        name: 'Jacob Jones',
        email: 'kenzi.lawson@example.com',
        testType: 'Standard Panel',
        date: 'October 25, 2019',
        status: 'active',
    },
    {
        id: '6',
        orderId: 'LNL-000127',
        name: 'Darlene Robertson',
        email: 'curtis.weaver@example.com',
        testType: 'Standard Panel & 2 add ons',
        date: 'February 29, 2012',
        status: 'canceled',
    },
]

const columns: Column<Order>[] = [
    {
        header: 'Order ID',
        accessor: 'orderId',
    },
    {
        header: 'Name',
        accessor: 'name',
    },
    {
        header: 'Email',
        accessor: 'email',
    },
    {
        header: 'Test type',
        accessor: (item) => {
            const hasAddOns = item.testType.includes('add ons')

            return (
                <span>
                    {hasAddOns ? (
                        <>
                            Standard Panel{' '}
                            <span className="text-blue-600 text-sm font-medium">
                                {item.testType.replace('Standard Panel ', '')}
                            </span>
                        </>
                    ) : (
                        item.testType
                    )}
                </span>
            )
        },
    },
    {
        header: 'Date',
        accessor: 'date',
    },
    {
        header: 'Status',
        accessor: (item) => <StatusBadge status={item.status} />,
    },
]

import React from 'react'

export default function OrderTable() {

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("newest");
    return (
     
        <div className="bg-white rounded-xl border p-6 min-w-0 overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="table-title">
                    Orders
                </h3>

                <div className="flex items-center gap-2">
                    <SearchInput
                        containerClassName="max-w-80"
                        placeholder="Search users by name, email, or code..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <SortFilter
                        value={sort}
                        onChange={(value) => setSort(value)}
                    />
                </div>


            </div>

            {/* Table */}
            <ReusableTable
                columns={columns as Column<Order>[]}
                data={orderData as Order[]}
                zebra={false}
                actions={[
                    {
                        key: 'view',
                        label: 'View Details',
                        onClick: (item) => console.log('View Details', item),
                    },
                    {
                        key: 'reply',
                        label: 'Reply',
                        onClick: (item) => console.log('Reply', item),
                    },
                    {
                        key: 'delete',
                        label: 'Delete',
                        danger: true,
                        onClick: (item) => console.log('Delete', item),
                    },
                ]}
            />


        </div>
    )
}
