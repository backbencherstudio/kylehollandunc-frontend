import React, { Suspense } from 'react'
import LoginPage from '@/components/pages/AuthPages/LoginPage'
import Loader from '@/components/reusable/Loader'

export default function page() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <LoginPage />
      </Suspense>
    </div>
  )
}
