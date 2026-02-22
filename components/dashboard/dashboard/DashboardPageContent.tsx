import React from 'react'
import UserStats from './UserStats'
import { AnalyticsChart } from './AnalyticsChart'
import TestRequestChart from './TestRequestChart'
import { RequestDataCard } from './RequestDataCard'
// import { GaugeChart } from './RequestDataCard'


export default function DashboardPageContent() {
    return (
        <div>
            <UserStats />
            <div className='flex flex-col md:flex-row gap-4.5'>
                <div className='sm:w-[70%] w-full '>
                    <TestRequestChart />
                </div>
                <div className='sm:w-[30%] w-full'>
                  <RequestDataCard  />
                </div>
            </div>

        </div>
    )
}
