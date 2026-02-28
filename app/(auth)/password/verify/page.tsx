import React, { Suspense } from 'react'
import EnterOTPPage from '@/components/pages/AuthPages/EnterOtpPage'

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EnterOTPPage />
    </Suspense>
  )
}
