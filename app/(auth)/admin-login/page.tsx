import React, { Suspense } from 'react'
import AdminLoginPage from '@/components/dashboard/AdminLoginPage'
export default function page() {
  return (
    <div>
        <Suspense fallback={<div>Loading...</div>}>
          <AdminLoginPage />
        </Suspense>
    </div>
  )
}
