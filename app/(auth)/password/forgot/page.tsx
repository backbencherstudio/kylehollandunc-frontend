import React, { Suspense } from 'react'
import ForgotPasswordPage from '@/components/pages/AuthPages/ForgotPasswordPage'

export default function page() {
  return (

    <Suspense fallback={<div>Loading...</div>}>


      <ForgotPasswordPage />
    </Suspense>
  )
}
