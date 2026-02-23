import React from 'react'

export default function DashboardTtile({ baseTitle, page, heading, className }: { baseTitle: string, page: string, heading: string, className?: string }) {
    return (
        <div className={className}>
            <p className='text-[#1D1F2C] text-sm font-normal leading-[160%] tracking-[-0.28px]'><span className='text-[#1D1F2C]/70'>{baseTitle}  / </span>{page}</p>


            <h3 className='text-[#1D1F2C] text-base font-medium leading-[150%] tracking-[0.07px]'>{heading}</h3>
        </div>
    )
}
