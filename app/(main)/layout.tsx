import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            <div className='min-h-[calc(100vh-200px)]  -mt-1'>
                {children}
            </div>
            <Footer />
        </div>
    );
}