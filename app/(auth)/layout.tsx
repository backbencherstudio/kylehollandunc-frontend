import Navbar from '@/components/Navbar'
import React from 'react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>

            <Navbar />
            <section className='flex flex-col items-center justify-center mt-[138px]'>

                {children}

            </section>
        </div>
    )
}
