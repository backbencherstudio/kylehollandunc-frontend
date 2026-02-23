import React from 'react'
import DashboardTtile from '@/components/reusable/DashboardTtile'
import OrderTable from './OrderTable'
export default function OrderPage() {
    return (
        <div>
            <DashboardTtile
                baseTitle="Home"
                page="Order"
                heading="Manage order"
                className="mb-8"
            />

            <OrderTable />
        </div>
    )
}
