import React, { Suspense } from 'react'
import ResetPasswordPage from '@/components/pages/AuthPages/ResetPasswordPage'

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  )
}
