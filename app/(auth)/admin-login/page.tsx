import React, { Suspense } from 'react'
import AdminLoginPage from '@/components/dashboard/AdminLoginPage'
import Loader from '@/components/reusable/Loader'
export default function page() {
  return (
    <div>
        <Suspense fallback={<Loader />}>
          <AdminLoginPage />
        </Suspense>
    </div>
  )
}
