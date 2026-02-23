'use client'

export interface User {
    id: string
    userId: string
    name: string
    email: string
    created: string
}
import { Button } from '@/components/ui/button'
import { Column, ReusableTable } from '@/components/reusable/ReusableTable'
import { StatusBadge } from '@/components/reusable/StatusBadge'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

/* ================= Sample Data ================= */

const users: User[] = [
    {
        id: '1',
        userId: 'LNL-000123',
        name: 'Theresa Webb',
        email: 'jackson.graham@example.com',
        created: 'February 28, 2018',
    },
    {
        id: '2',
        userId: 'LNL-000124',
        name: 'Kristin Watson',
        email: 'bill.sanders@example.com',
        created: 'March 13, 2014',
    },
    {
        id: '3',
        userId: 'LNL-000125',
        name: 'Guy Hawkins',
        email: 'tim.jennings@example.com',
        created: 'May 20, 2015',
    },
]
/* ================= Component ================= */

const columns: Column<User>[] = [
    {
        header: 'User ID',
        accessor: 'userId',
        className: 'font-medium text-[#1D1F2C]',
    },
    {
        header: 'Name',
        accessor: 'name',
    },
    {
        header: 'Email',
        accessor: 'email',
        className: 'text-[#687588]',
    },
    {
        header: 'Created',
        accessor: 'created',
    },
]


export function UserManagementTable() {
    return (
        <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-6 py-5 border-b border-[#F1F2F4]">
                <h2 className="table-title">
                    User Management
                </h2>

                {/* Search */}
                <div className="relative w-full sm:w-[360px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#687588]" />
                    <Input
                        placeholder="Search users by name, email, or code..."
                        className="pl-9 h-9 text-sm border-[#E5E5E5] focus:border-2 focus:border-[#1C5E96] focus:ring-0 "
                    />
                </div>
            </div>

            {/* Table */}
            <div className="px-4 py-4">
                <ReusableTable
                    columns={columns}
                    data={users}
                    zebra={false}
                    actions={[
                        {
                            key: 'edit',
                            label: 'Edit',
                            onClick: (user) => console.log('Edit', user),
                        },
                        {
                            key: 'delete',
                            label: 'Delete',
                            danger: true,
                            onClick: (user) => console.log('Delete', user),
                        },
                    ]}
                />
            </div>
        </div>
    )
}