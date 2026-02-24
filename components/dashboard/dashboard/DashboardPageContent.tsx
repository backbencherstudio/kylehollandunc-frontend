import React from 'react'
import UserStats from './UserStats'
import { AnalyticsChart } from './AnalyticsChart'
import TestRequestChart from './TestRequestChart'
import { RequestDataCard } from './RequestDataCard'
import { RecentRequestTable } from './RecentRequestTable'
import RecentReq from './RecentReq'
        // import { GaugeChart } from './RequestDataCard'


export default function DashboardPageContent() {
    return (
        <div className="w-full min-w-0 space-y-6">
            <UserStats />
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="w-full min-w-0 md:flex-1 md:min-w-0">
                    <TestRequestChart />
                </div>
                <div className="w-full min-w-0 md:w-[30%] md:shrink-0 md:min-w-0">
                    <RequestDataCard />
                </div>
            </div>
         

            <div>
                <RecentRequestTable />
            </div>
        </div>
    )
}
