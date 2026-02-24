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


export function RecentRequestTable() {


   


  return (
    <div className="bg-white rounded-xl border p-6 min-w-0 overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="table-title">
          Recent Request Forms
        </h3>
                                 
        <Button
          variant="outline"
          size="sm"
          className="rounded-md text-sm font-medium leading-[150%] tracking-[0.07px] text-[#1D1F2C] cursor-pointer"
        >
          View All
        </Button>
      </div>

      {/* Table */}
      <ReusableTable
        columns={columns as Column<RequestForm>[]}
        data={requestData as RequestForm[]}
        zebra={false}
        actions={[
          {
            key: 'view',
            label: 'View',
            onClick: (item) => console.log('View', item),
          },
          {
            key: 'edit',
            label: 'Edit',
            onClick: (item) => console.log('Edit', item),
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