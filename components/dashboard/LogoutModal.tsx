import { AlertCircle } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'


interface LogoutModalProps {
    setLogoutOpen: (open: boolean) => void;
    handleLogout: () => void;
}

export default function LogoutModal({ setLogoutOpen, handleLogout }: LogoutModalProps) {
    return (
        <div className='flex flex-col items-center justify-center gap-6'>
            <div className='flex flex-col items-center justify-center gap-3'>
                <div className='flex items-center gap-2.5 border border-[#ECEFF3] bg-[#EB3D4D] p-3 rounded-xl border-solid'>

                    <AlertCircle className="md:w-8 md:h-8 w-6 h-6 shrink-0 text-white" />

                </div>
                <div>
                    <h3 className='self-stretch text-[#1D1F2C] text-center font-semibold leading-[140%] tracking-[0.12px] mb-2'>Logout your Account</h3>
                    <p className='self-stretch text-[#5B5A64] text-center text-base font-normal leading-[150%] tracking-[-0.32px]'>Are you sure you want to logout?</p>
                </div>

            </div>
            <div className="flex items-center justify-center gap-4 w-full">
                <Button variant="outline" className='w-full flex-1 cursor-pointer md:h-12 h-10' onClick={() => setLogoutOpen(false)}>Cancel</Button>
                <Button variant="destructive" className='w-full flex-1 cursor-pointer md:h-12 h-10 [background:var(--gradient,linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.20)_100%),linear-gradient(180deg,#84B6DE_0%,#1C5E96_100%))] ' onClick={handleLogout}>Confirm</Button>
            </div>
        </div>
    )
}
