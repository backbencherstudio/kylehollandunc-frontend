import DashboardTtile from '@/components/reusable/DashboardTtile'
import React from 'react'
import { RequestFormsTable } from './RequestFormsTable'

    export default function RequestFormsPage() {
  return (
    <div>
        <DashboardTtile
            baseTitle="Home"
            page="Request Forms"
            heading="Manage request forms"
            className="mb-8"
        />

        <RequestFormsTable />
    </div>
  )
}
