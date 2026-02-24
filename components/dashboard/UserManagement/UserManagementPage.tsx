import React from 'react'
import DashboardTtile from '@/components/reusable/DashboardTtile'
import { UserManagementTable } from './UserManagementTable'

export default function UserManagementPage() {
    return (
        <div >
            <DashboardTtile
                baseTitle="Home"
                page="User Management"
                heading="Manage client access and permissions"
                className="mb-8" />

            <UserManagementTable />
        </div>
    )
}
