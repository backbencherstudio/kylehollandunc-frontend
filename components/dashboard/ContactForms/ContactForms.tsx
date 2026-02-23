"use client";
import SearchInput from '@/components/reusable/SearchInput';
import SortFilter from '@/components/reusable/SortFilter';
import { useState } from 'react';

import React from 'react'

export default function ContactForms() {

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('newest');

    return (
        <section className='p-4 rounded-xl bg-white'>
            <div className='flex flex-col md:flex-row justify-between md:items-center mb-6 gap-2'>
                <h2 className='text-2xl font-bold'>Contact Forms</h2>


                <div className='flex flex-col md:flex-row md:items-center gap-2'>
                    <SearchInput
                        placeholder='Search contact forms'
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    />
                    <SortFilter
                        className='w-fit'
                        value={sort}
                        onChange={(value: string) => setSort(value as 'newest' | 'oldest')}
                    />
                </div>
            </div>


            {/* cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <ContactFormCard />
                <ContactFormCard />
                <ContactFormCard />
            </div>
        </section>
    )
}





import { MoreVertical, Calendar } from 'lucide-react'
import { RowActions } from '@/components/reusable/RowActions';

interface InquiryCardProps {
    name?: string
    email?: string
    date?: string
    title?: string
    message?: string
    avatar?: string
}

function ContactFormCard({
    name = 'Robert Fox',
    email = 'jackson.graham@example.com',
    date = 'February 28, 2026',
    title = 'Inquiry about bulk pricing.',
    message = 'Hello, do you offer discounts for orders over 100mg?',
    avatar = 'https://i.pravatar.cc/100?img=12',
}: InquiryCardProps) {
    return (
        <div className="bg-[#F6F8FA] pl-3 pr-5 py-3 rounded-xl w-full">

            {/* Header */}
            <div className="flex items-start justify-between mb-4">

                <div className="flex items-start gap-3">

                    {/* Avatar */}
                    <img
                        src={avatar}
                        alt={name}
                        className="w-10 h-10 rounded-full object-cover"
                    />

                    <div>
                        <p className="font-semibold text-[#1D1F2C]">
                            {name}{' '}
                            <span className="font-normal text-[#6B7280]">
                                ({email})
                            </span>
                        </p>

                        <div className="flex items-center gap-2 text-sm text-[#6B7280] mt-1">
                            <Calendar size={16} />
                            <span>{date}</span>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <button className="text-[#6B7280] hover:text-[#1D1F2C] transition">
                    <RowActions actions={[{
                        key: 'view',
                        label: 'View',
                        onClick: () => {
                            console.log('View')
                        }
                    }]} item={name} />
                </button>
            </div>

            {/* Content */}
            <div>
                <h4 className="text-base font-semibold text-[#1D1F2C] mb-2">
                    {title}
                </h4>

                <p className="text-sm text-[#6B7280] leading-6">
                    {message}
                </p>
            </div>
        </div>
    )
}