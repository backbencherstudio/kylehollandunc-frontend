'use client'

import { Column, ReusableTable } from "@/components/reusable/ReusableTable"
import { StatusBadge } from "@/components/reusable/StatusBadge"
import { useState } from "react"
import { useRouter } from "next/navigation"

export interface Report {
    id: string
    reportId: string
    name: string
    uniqueId: string
    resultStatus: 'pass' | 'fail'
    testType: string
    testDate: string
    progressStatus: 'completed' | 'pending'
  }

  const reportData: Report[] = [
    {
      id: '1',
      reportId: 'LNL-000123',
      name: 'Theresa Webb',
      uniqueId: 'LNL-000123',
      resultStatus: 'pass',
      testType: 'Standard Panel',
      testDate: 'February 28, 2018',
      progressStatus: 'completed',
    },
    {
      id: '2',
      reportId: 'LNL-000123',
      name: 'Kristin Watson',
      uniqueId: 'LNL-000123',
      resultStatus: 'fail',
      testType: 'Standard Panel & 2 add ons',
      testDate: 'March 13, 2014',
      progressStatus: 'pending',
    },
    {
      id: '3',
      reportId: 'LNL-000124',
      name: 'Theresa Webb',
      uniqueId: 'LNL-000123',
      resultStatus: 'pass',
      testType: 'Standard Panel',
      testDate: 'December 2, 2018',
      progressStatus: 'pending',
    },
    {
      id: '4',
      reportId: 'LNL-000125',
      name: 'Guy Hawkins',
      uniqueId: 'LNL-000123',
      resultStatus: 'pass',
      testType: 'Standard Panel & 2 add ons',
      testDate: 'May 20, 2015',
      progressStatus: 'completed',
    },
    {
      id: '5',
      reportId: 'LNL-000126',
      name: 'Jacob Jones',
      uniqueId: 'LNL-000123',
      resultStatus: 'fail',
      testType: 'Standard Panel',
      testDate: 'October 25, 2019',
      progressStatus: 'pending',
    },
  ]

  const columns: Column<Report>[] = [
    {
      header: 'Report ID',
      accessor: 'reportId',
    },
    {
      header: 'Name',
      accessor: 'name',
    },
    {
      header: 'Unique ID',
      accessor: 'uniqueId',
    },
    {
      header: 'Result Status',
      accessor: (item) => <StatusBadge status={item.resultStatus as 'pass' | 'fail'} />,
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
      header: 'Test date',
      accessor: 'testDate',
    },
    {
      header: 'Progress Status',
      accessor: (item) => (
        <StatusBadge status={item.progressStatus as 'completed' | 'pending' } />
      ),
    },
  ]


  export function ReportEntryTable() {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("newest");

    const router = useRouter();
    return (
      <div className="bg-white rounded-xl border p-6 min-w-0 overflow-hidden">
        <h3 className="table-title mb-6">Report Table</h3>
  
        <ReusableTable
          columns={columns as Column<Report>[]}
          data={reportData as Report[]}
          zebra={false}
          actions={[
            {
              key: 'view',
              label: 'View details',
              onClick: (item) => router.push(`/admin-dashboard/report-entry/${item.id}`),
            },
            {
              key: 'edit',
              label: 'Edit',
              onClick: (item) => router.push(`/admin-dashboard/report-entry/${item.id}/edit`),
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