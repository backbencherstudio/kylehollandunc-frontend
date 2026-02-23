import React from 'react'
import DashboardTtile from '@/components/reusable/DashboardTtile'
import { ReportEntryTable } from './ReportEntryTable'

export default function ReportEntryPage() {
    return (
        <div>
            <DashboardTtile
                baseTitle="Home"
                page="Order"
                heading="Manage order"
                className="mb-8"
            />

            <ReportEntryTable />
        </div>
    )
}
