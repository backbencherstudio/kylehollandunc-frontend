import React from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  )
}
