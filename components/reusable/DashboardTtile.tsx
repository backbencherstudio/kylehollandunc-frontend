import React from 'react'


interface DashboardTtileProps {
    baseTitle: string
    page: string
    heading: string
    className?: string
    description?: string
}

export default function DashboardTtile({ baseTitle, page, heading, className, description }: DashboardTtileProps) {
    return (
        <div className={className}>
            <p className='text-[#1D1F2C] text-sm font-normal leading-[160%] tracking-[-0.28px]'><span className='text-[#1D1F2C]/70'>{baseTitle}  / </span>{page}</p>


            <h3 className='text-[#1D1F2C] text-base font-medium leading-[150%] tracking-[0.07px]'>{heading}</h3>

          {
            description && (
              <p className='text-[#777980] text-sm font-normal leading-[128%] tracking-[-0.28px] mt-1'>{description}</p>
            )
          }
        </div>
    )
}
