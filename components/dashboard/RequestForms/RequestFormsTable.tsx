'use client'


export interface RequestForm {
    id: string
    userId: string
    name: string
    peptide: string
    quantity: string
    purity: string
    organization: string
    submitDate: string
    status: 'pending' | 'in-progress' | 'completed'
}

import { Button } from '@/components/ui/button'
import { Column, ReusableTable } from '@/components/reusable/ReusableTable'
import { StatusBadge } from '@/components/reusable/StatusBadge'
import SearchInput from '@/components/reusable/SearchInput'
import { useState } from 'react'
import SortFilter from '@/components/reusable/SortFilter'
import CustomModal from '@/components/reusable/CustomModal'
import ViewDetails, { RequestDetails } from './ViewDetails'
import ReplyModal from './ReplyModal'

/* ================= Sample Data ================= */

const requestData = [
    {
        id: '1',
        userId: 'LNL-000123',
        name: 'Theresa Webb',
        peptide: 'BPC-157',
        quantity: '10mg',
        purity: '98%',
        organization: 'Supplier',
        submitDate: 'February 28, 2018',
        status: 'pending',
    },
    {
        id: '2',
        userId: 'LNL-000124',
        name: 'Kristin Watson',
        peptide: 'BPC-157',
        quantity: '10mg',
        purity: '98%',
        organization: 'Clinic',
        submitDate: 'March 13, 2014',
        status: 'pending',
    },
    {
        id: '3',
        userId: 'LNL-000125',
        name: 'Theresa Webb',
        peptide: 'BPC-157',
        quantity: '10mg',
        purity: '98%',
        organization: 'Pharmacy',
        submitDate: 'December 2, 2018',
        status: 'in-progress',
    },
    {
        id: '4',
        userId: 'LNL-000126',
        name: 'Guy Hawkins',
        peptide: 'BPC-157',
        quantity: '10mg',
        purity: '98%',
        organization: 'Supplier',
        submitDate: 'May 20, 2015',
        status: 'completed',
    },
]

/* ================= Component ================= */

const columns = [
    {
        header: 'User ID',
        accessor: 'userId',
        className: '',
    },
    {
        header: 'Name',
        accessor: 'name',
    },
    {
        header: 'Peptide Details',
        accessor: (item: RequestForm) => (
            <div className="space-y-1">
                <p>{item.peptide}</p>
                <p className="text-xs text-muted-foreground">
                    Qty: {item.quantity} • Purity: {item.purity}
                </p>
            </div>
        ),
    },
    {
        header: 'Organization',
        accessor: 'organization',
    },
    {
        header: 'Submit Date',
        accessor: 'submitDate',
    },
    {
        header: 'Status',
        accessor: (item: RequestForm) => (
            <StatusBadge status={item.status} />
        ),
    },
]


export function RequestFormsTable() {


    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("newest");
    const [isViweOpen, setIsViweOpen] = useState(false);
    const [isReplyOpen, setIsReplyOpen] = useState(false);


    const handleViewDetails = (item: RequestForm) => {
        setIsViweOpen(true);
    }

    const handleReply = (item: RequestForm) => {
        setIsReplyOpen(true);
    }


    return (
        <div className="bg-white rounded-xl border p-6 min-w-0 overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="table-title">
                    Request Forms
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
                columns={columns as Column<RequestForm>[]}
                data={requestData as RequestForm[]}
                zebra={false}
                actions={[
                    {
                        key: 'view',
                        label: 'View Details',
                        onClick: (item) => handleViewDetails(item),
                    },
                    {
                        key: 'reply',
                        label: 'Reply',
                        onClick: (item) => handleReply(item),
                    },
                    {
                        key: 'delete',
                        label: 'Delete',
                        danger: true,
                        onClick: (item) => console.log('Delete', item),
                    },
                ]}
            />


            {/* View Details Modal */}
            <CustomModal
                open={isViweOpen}
                onOpenChange={setIsViweOpen}
                title="Request Form Detail"
                children={
                    <ViewDetails
                        data={requestData[0] as unknown as RequestDetails}
                        onCancel={() => setIsViweOpen(false)}
                        onReply={() => {
                            setIsViweOpen(false)
                            setIsReplyOpen(true)
                        }}
                    />
                }
                className="w-[687px] "
            />

            {/* Reply Modal */}
            <CustomModal
                open={isReplyOpen}
                onOpenChange={setIsReplyOpen}
                title="Reply"
                children={<ReplyModal
                    data={requestData[0] as unknown as RequestDetails}
                    onCancel={() => setIsReplyOpen(false)}
                    onReply={() => {
                        setIsReplyOpen(false)
                    }}
                />}
            />
        </div>
    )
}