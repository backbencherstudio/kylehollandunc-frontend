import React, { Suspense } from 'react'
import LoginPage from '@/components/pages/AuthPages/LoginPage'

export default function page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginPage />
      </Suspense>
    </div>
  )
}
