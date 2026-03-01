'use client'

import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'


interface DashboardTtileProps {
    baseTitle: string
    page: string
    heading: string
    className?: string
    description?: string
    isBackButton?: boolean
}

export default function DashboardTtile({ baseTitle, page, heading, className, description, isBackButton }: DashboardTtileProps) {
    const router = useRouter();
    return (
        <div className='flex justify-between items-start'>
          <div className={className}>
            <p className='text-[#1D1F2C] text-sm font-normal leading-[160%] tracking-[-0.28px]'><span className='text-[#1D1F2C]/70'>{baseTitle}  / </span>{page}</p>


            <h3 className='text-[#1D1F2C] text-base font-medium leading-[150%] tracking-[0.07px]'>{heading}</h3>

          {
            description && (
              <p className='text-[#777980] text-sm font-normal leading-[128%] tracking-[-0.28px] mt-1'>{description}</p>
            )
          }
        </div>


        {
          isBackButton && (
            <Button onClick={() => router.back()} variant="outline" size="sm" className="rounded-md text-sm font-medium leading-[150%] tracking-[0.07px] text-[#1D1F2C] cursor-pointer">
              <ArrowLeftIcon className="w-4 h-4" />
              Back
            </Button>
          )
        }
        </div>
    )
}
