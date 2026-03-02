import React, { Suspense } from 'react'
import EnterOTPPage from '@/components/pages/AuthPages/EnterOtpPage'
import Loader from '@/components/reusable/Loader'

export default function page() {
  return (
    <Suspense fallback={<Loader />}>
      <EnterOTPPage />
    </Suspense>
  )
}
