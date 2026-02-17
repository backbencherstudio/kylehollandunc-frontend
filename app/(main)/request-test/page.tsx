import React from 'react'
import RequestForm from '@/components/pages/RequestTest/RequestForm'

import RequestHeroSection from '@/components/pages/RequestTest/RequestHeroSection'

export default function page() {
    return (
        <div className='mt-[80px] sm:mt-[96px]'>
            <RequestHeroSection />

            <RequestForm />
        </div>
    )
}
