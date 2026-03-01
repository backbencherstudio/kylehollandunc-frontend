import DashboardPageContent from '@/components/dashboard/dashboard/DashboardPageContent'
import React from 'react'
import PrivateRoute from '@/components/pages/AuthPages/PrivateRoute'
export default function page() {
  return (
    <PrivateRoute allowedRoles={["admin"]} redirectTo="/admin-login">  
          <DashboardPageContent />  
    </PrivateRoute>
  )
}
