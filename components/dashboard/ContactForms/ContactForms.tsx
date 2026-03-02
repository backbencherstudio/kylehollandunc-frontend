"use client";
import SearchInput from '@/components/reusable/SearchInput';
import SortFilter from '@/components/reusable/SortFilter';
import { useState, useMemo } from 'react';
import { MoreVertical, Calendar } from 'lucide-react'
import { RowActions } from '@/components/reusable/RowActions';
import CustomModal from '@/components/reusable/CustomModal';
import React from 'react'
import { useDeleteContactMutation, useGetContactsQuery } from '@/redux/features/admin/contact/contactApi';
import ReplyContactModal from './ReplyContactModal';
import ViewContactModal from './ViewContactModal';
import { toast } from 'sonner';
import Image from 'next/image';

export default function ContactForms() {
    const { data: contactsData, isLoading, error, refetch } = useGetContactsQuery();
    const contacts = contactsData?.data || [];

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('newest');
    const [selectedContact, setSelectedContact] = useState<any>(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isReplyOpen, setIsReplyOpen] = useState(false);

    // Filter contacts based on search
    const filteredContacts = useMemo(() => {
        if (!search.trim()) return contacts;
        
        const searchLower = search.toLowerCase();
        return contacts.filter((contact: any) => 
            contact.name?.toLowerCase().includes(searchLower) ||
            contact.email?.toLowerCase().includes(searchLower) ||
            contact.message?.toLowerCase().includes(searchLower) ||
            contact.subject?.toLowerCase().includes(searchLower)
        );
    }, [contacts, search]);

    // Sort contacts based on selected sort option
    const sortedAndFilteredContacts = useMemo(() => {
        const contactsToSort = [...filteredContacts];
        
        return contactsToSort.sort((a: any, b: any) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();
            
            if (sort === 'newest') {
                return dateB - dateA;
            } else {
                return dateA - dateB;
            }
        });
    }, [filteredContacts, sort]);

    const handleView = (contact: any) => {
        setSelectedContact(contact);
        setIsViewOpen(true);
    };
    
    const handleReply = (contact: any) => {
        setSelectedContact(contact);
        setIsReplyOpen(true);
    };

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
                        onChange={(value: string) => setSort(value)}
                    />
                </div>
            </div>

            {/* Results count */}
            <div className="mb-4 text-sm text-[#6B7280]">
                Showing {sortedAndFilteredContacts.length} of {contacts.length} contacts
            </div>

            {/* cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {sortedAndFilteredContacts.length > 0 ? (
                    sortedAndFilteredContacts.map((contact: any) => (
                        <ContactFormCard
                            key={contact.id}
                            id={contact.id}
                            name={contact.name}
                            email={contact.email}
                            date={contact.created_at}
                            title={contact.message}
                            onView={() => handleView(contact)}
                            onReply={() => handleReply(contact)}
                        />
                    ))
                ) : (
                    <div className="col-span-2 text-center py-8 text-[#6B7280]">
                        No contacts found matching your search.
                    </div>
                )}
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
                        setIsReplyOpen(false);
                        refetch(); // Refresh contacts after reply
                    }}
                />}
            />
        </section>
    );
}

interface InquiryCardProps {
    id?: number
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
    name ,
    email,
    date ,
    title,
    message ,
    avatar = '/images/user-placeholder.png',
    onView,
    onReply,
    id,
}: InquiryCardProps) {
    const [deleteContact] = useDeleteContactMutation();
    const { refetch } = useGetContactsQuery();
    
    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this contact?")) {
            try {
                await deleteContact({ id: id }).unwrap();
                toast.success("Contact deleted successfully");
                await refetch();
            } catch (error) {
                toast.error("Failed to delete contact");
            }
        }
    };

    // Format date if it's in ISO format
    const formattedDate = useMemo(() => {
        if (!date) return '';
        try {
            return new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return date;
        }
    }, [date]);

    return (
        <div className="bg-[#F6F8FA] pl-3 pr-5 py-3 rounded-xl w-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 ">
                    {/* Avatar */}
                  <div className='w-10 h-10 rounded-full overflow-hidden bg-gray-200 relative'>
                  <Image
                        src={avatar}
                        alt={name || 'User Avatar'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40px"
                        // unoptimized
                    />
                  </div>

                    <div>
                        <p className="font-semibold text-[#1D1F2C]">
                            {name}{' '}
                            <span className="font-normal text-[#6B7280]">
                                ({email})
                            </span>
                        </p>

                        <div className="flex items-center gap-2 text-sm text-[#6B7280] mt-1">
                            <Calendar size={16} />
                            <span>{formattedDate}</span>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <button className="text-[#6B7280] hover:text-[#1D1F2C] transition">
                    <RowActions actions={[
                        {
                            key: 'view',
                            label: 'View',
                            onClick: onView ? () => onView() : () => console.log('View')
                        }, 
                        {
                            key: 'reply',
                            label: 'Reply',
                            onClick: onReply ? () => onReply() : () => console.log('Reply')
                        }, 
                        {
                            key: 'delete',
                            label: 'Delete',
                            danger: true,
                            onClick: () => handleDelete(id as number)
                        }
                    ]} item={name as string} />
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
    );
}