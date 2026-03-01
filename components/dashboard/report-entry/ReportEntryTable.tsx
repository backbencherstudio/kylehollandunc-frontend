'use client'

import { Column, ReusableTable } from "@/components/reusable/ReusableTable"
import { StatusBadge } from "@/components/reusable/StatusBadge"
import { useRouter } from "next/navigation"
import { useGetReportsQuery, useDeleteReportMutation } from "@/redux/features/admin/reports/reportApi"
import { toast } from "sonner"

export interface Report {
  id: string
  reportId: string
  name: string
  orderId: string
  resultStatus: 'pass' | 'fail'
  testType: string
  testDate: string
  progressStatus: 'completed' | 'pending'
}

export function ReportEntryTable() {
  const router = useRouter()

  const { data: reportsResponse, isLoading } = useGetReportsQuery()
  const [deleteReport] = useDeleteReportMutation()

  // 🔥 Format API Data
  const formatReports = (reports: any[]): Report[] => {
    return reports.map((item) => {
      const testItems =
        item.order?.items
          ?.filter((i: any) => i.type === "test" || i.type === "addon")
          ?.map((i: any) => i.name)
          ?.join(" & ") || "N/A"

      return {
        id: String(item.id),
        reportId: item?.id || "N/A",
        name: item.name,
        orderId: item.order?.id || "N/A",
        resultStatus: item.result_status ?? "fail",
        testType: testItems,
        testDate: new Date(item.test_date).toLocaleDateString(),
        progressStatus: item.progress_status,
      }
    })
  }

  const formattedReports = formatReports(
    reportsResponse?.data || reportsResponse || []
  )

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteReport({ id }).unwrap()
      toast.success("Report deleted successfully")
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete report")
    }
  }

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
      header: 'Order ID',
      accessor: 'orderId',
    },
    {
      header: 'Result Status',
      accessor: (item) => (
        <StatusBadge status={item.resultStatus} />
      ),
    },
    {
      header: 'Test Type',
      accessor: (item) => {
        const hasAddon = item.testType.includes('&')

        return (
          <span>
            {hasAddon ? (
              <>
                {item.testType.split('&')[0]}{" "}
                <span className="text-blue-600 text-sm font-medium">
                  & {item.testType.split('&').slice(1).join('&')}
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
      header: 'Test Date',
      accessor: 'testDate',
    },
    {
      header: 'Progress Status',
      accessor: (item) => (
        <StatusBadge status={item.progressStatus} />
      ),
    },
  ]

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border p-6">
        Loading reports...
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border p-6 min-w-0 overflow-hidden">
      <h3 className="table-title mb-6">Report Table</h3>

      <ReusableTable
        columns={columns}
        data={formattedReports}
        zebra={false}
        actions={[
          {
            key: 'view',
            label: 'View details',
            onClick: (item) =>
              router.push(`/admin-dashboard/report-entry/${item.id}`),
          },
          {
            key: 'edit',
            label: 'Edit',
            onClick: (item) =>
              router.push(`/admin-dashboard/report-entry/${item.id}/edit`),
          },
          {
            key: 'delete',
            label: 'Delete',
            danger: true,
            onClick: (item) => handleDelete(item.id),
          },
        ]}
      />
    </div>
  )
}