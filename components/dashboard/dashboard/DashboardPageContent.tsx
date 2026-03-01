"use client"
import React, { useMemo } from 'react'
import UserStats from './UserStats'
import { AnalyticsChart } from './AnalyticsChart'
import TestRequestChart from './TestRequestChart'
import { RequestDataCard } from './RequestDataCard'
import { RecentRequestTable } from './RecentRequestTable'
import RecentReq from './RecentReq'
// import { GaugeChart } from './RequestDataCard'
import { useGetDashboardDataQuery } from '@/redux/features/admin/dashboard/dashboardApi';


export const formatRequestChartData = (dashboardData: any) => {
    const testCount = dashboardData?.test_requests?.count ?? 0;
    const contactCount = dashboardData?.contact_requests?.count ?? 0;
  
    return {
      chartData: [
        {
          name: "Contact Form",
          value: contactCount,
          fill: "#FFC567",
        },
        {
          name: "Request Form",
          value: testCount,
          fill: "#50CBA1",
        },
      ],
      TOTAL_REQUESTS: testCount + contactCount,
    };
  };

export default function DashboardPageContent() {

    const { data: dashboardData, isLoading, error } = useGetDashboardDataQuery();

    return (
        <div className="w-full min-w-0 space-y-6">
            <UserStats
                statsData={{
                    totalUsers: dashboardData?.total_users,
                    activeUsers: dashboardData?.active_users,
                    pendingOrders: dashboardData?.pending_orders,
                }}
            />
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="w-full min-w-0 md:flex-1 md:min-w-0">
                    {/* <TestRequestChart /> */}
                    <TestRequestChart data={dashboardData} />
                </div>
                <div className="w-full min-w-0 md:w-[30%] md:shrink-0 md:min-w-0">
                    <RequestDataCard requestChartData={formatRequestChartData(dashboardData)} />
                </div>
            </div>


            <div>
                <RecentRequestTable />
            </div>
        </div>
    )
}
