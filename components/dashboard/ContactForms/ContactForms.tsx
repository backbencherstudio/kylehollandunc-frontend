"use client";
import SearchInput from '@/components/reusable/SearchInput';
import SortFilter from '@/components/reusable/SortFilter';
import { useState } from 'react';
import { MoreVertical, Calendar } from 'lucide-react'
import { RowActions } from '@/components/reusable/RowActions';
import CustomModal from '@/components/reusable/CustomModal';
import React from 'react'
import { useGetContactsQuery } from '@/redux/features/admin/contact/contactApi';
import ReplyContactModal from './ReplyContactModal';
import ViewContactModal from './ViewContactModal';






// {
//     "id": 3,
//     "name": "Kowshick Chowdhury",
//     "email": "kowshickbdcalling@gmail.com",
//     "order_id": "2",
//     "message": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
//     "created_at": "2026-02-26T06:26:54.000000Z",
//     "updated_at": "2026-02-26T06:26:54.000000Z"
// }

export default function ContactForms() {


    const { data: contactsData, isLoading, error } = useGetContactsQuery();

    const contacts = contactsData?.data || [];


    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('newest');

    const [selectedContact, setSelectedContact] = useState<any>(null);

    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isReplyOpen, setIsReplyOpen] = useState(false)

    const handleView = (contact: any) => {
        setSelectedContact(contact);
        setIsViewOpen(true);
    }
    const handleReply = (contact: any) => {
        setSelectedContact(contact);
        setIsReplyOpen(true);
    }



    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {(error as any).message}</div>;
    }


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
                {contacts.map((contact: any) => (
                    <>
                        <ContactFormCard
                            key={contact.id}
                            name={contact.name}
                            email={contact.email}
                            date={contact.created_at}
                            title={contact.message}
                            onView={() => handleView(contact)}
                            onReply={() => handleReply(contact)}
                        />


                    </>
                ))}
            </div>

            <CustomModal
                open={isViewOpen}
                onOpenChange={setIsViewOpen}
                title="Contact Form"
                children={<ViewContactModal
                    data={selectedContact}
                    onCancel={() => setIsViewOpen(false)}
                />}
            />


            <CustomModal
                open={isReplyOpen}
                onOpenChange={setIsReplyOpen}
                title="Reply"
                children={<ReplyContactModal
                    data={selectedContact}
                    onCancel={() => setIsReplyOpen(false)}
                    onReply={() => {
                        setIsReplyOpen(false)
                    }}
                />}
            />



        </section>
    )
}







interface InquiryCardProps {
    name?: string
    email?: string
    date?: string
    title?: string
    message?: string
    avatar?: string
    onView?: () => void
    onReply?: () => void
}

function ContactFormCard({
    name = 'Robert Fox',
    email = 'jackson.graham@example.com',
    date = 'February 28, 2026',
    title = 'Inquiry about bulk pricing.',
    message = 'Hello, do you offer discounts for orders over 100mg?',
    avatar = 'https://i.pravatar.cc/100?img=12',
    onView,
    onReply,
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
                        onClick: onView ? () => onView() : () => { console.log('View') }
                    }, {
                        key: 'reply',
                        label: 'Reply',
                        onClick: onReply ? () => onReply() : () => { console.log('Reply') }
                    }]} item={name} />
                </button>

            </div>

            {/* Content */}
            <div>
                <h4 className="text-base font-semibold text-[#1D1F2C] mb-2">
                    {title?.slice(0, 20)}...
                </h4>

                <p className="text-sm text-[#6B7280] leading-6">
                    {message?.slice(0, 200)}...
                </p>
            </div>
        </div>
    )
}