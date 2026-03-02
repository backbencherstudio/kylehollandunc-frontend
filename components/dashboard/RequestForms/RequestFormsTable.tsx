'use client'

export interface RequestForm {
    id: number
    created_at: string
    email: string
    message: string
    name: string
    organization: string
    test: string
    updated_at: string
    status?: string
}

import { Button } from '@/components/ui/button'
import { Column, ReusableTable } from '@/components/reusable/ReusableTable'
import { StatusBadge } from '@/components/reusable/StatusBadge'
import SearchInput from '@/components/reusable/SearchInput'
import { useState, useMemo } from 'react'
import SortFilter from '@/components/reusable/SortFilter'
import CustomModal from '@/components/reusable/CustomModal'
import ViewDetails, { RequestDetails } from './ViewDetails'
import ReplyModal from './ReplyModal'
import { useGetRequestsQuery } from '@/redux/features/admin/request/requestApi'
import { toast } from 'sonner'
import Loader from '@/components/reusable/Loader'
/* ================= Component ================= */

export function RequestFormsTable() {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("newest");
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<RequestForm | null>(null);

    const { data: requestsData, isLoading, error, refetch } = useGetRequestsQuery();
    const requests = requestsData?.data || [];

    // Filter and sort requests
    const filteredAndSortedRequests = useMemo(() => {
        let filtered = [...requests];

        // Apply search filter
        if (search.trim()) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter((item: RequestForm) => 
                item.name?.toLowerCase().includes(searchLower) ||
                item.email?.toLowerCase().includes(searchLower) ||
                item.organization?.toLowerCase().includes(searchLower) ||
                item.test?.toLowerCase().includes(searchLower)
            );
        }

        // Apply sort
        filtered.sort((a: RequestForm, b: RequestForm) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();
            return sort === 'newest' ? dateB - dateA : dateA - dateB;
        });

        return filtered;
    }, [requests, search, sort]);

    const handleViewDetails = (item: RequestForm) => {
        setSelectedRequest(item);
        setIsViewOpen(true);
    }

    const handleReply = (item: RequestForm) => {
        setSelectedRequest(item);
        setIsReplyOpen(true);
    }

    const handleDelete = async (item: RequestForm) => {
        if (confirm("Are you sure you want to delete this request?")) {
            try {
                // Add your delete mutation here
                // await deleteRequest(item.id).unwrap();
                console.log('Delete', item);
                toast.success("Request deleted successfully");
                refetch();
            } catch (error) {
                toast.error("Failed to delete request");
            }
        }
    }

    // Define columns
    const columns = [
        {
            header: 'Request ID',
            accessor: (item: RequestForm) => (
                <p className="text-gray-600">
                    REQ-{item.id}
                </p>
            ),
            className: '',
        },
        {
            header: 'Name',
            accessor: 'name',
        },
        {
            header: 'Test Details',
            accessor: (item: RequestForm) => (
                <div className="space-y-1">
                    <p className="font-medium">{item.test}</p>
                    {item.message && (
                        <p className="text-xs text-gray-500 line-clamp-1">{item.message.slice(0, 30)}...</p>
                    )}
                </div>
            ),
        },
        {
            header: 'Organization',
            accessor: 'organization',
        },
        {
            header: 'Created At',
            accessor: (item: RequestForm) => {
                const date = new Date(item.created_at);
                return (
                    <div className="space-y-1">
                        <p className="text-sm text-gray-900">
                            {date.toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </p>
                        <p className="text-xs text-gray-500">
                            {date.toLocaleTimeString("en-GB", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                    </div>
                );
            },
        },
        {
            header: 'Status',
            accessor: (item: RequestForm) => (
                <StatusBadge status={item?.status || 'pending'} />
            ),
        },
    ] as Column<RequestForm>[];

    if (isLoading) {
        return (
            <Loader />
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-xl border p-6 min-w-0 overflow-hidden">
                <div className="flex justify-center items-center h-64">
                    <p className="text-red-500">Error loading requests</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border p-6 min-w-0 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[#1D1F2C]">
                    Request Forms
                    <span className="ml-2 text-sm font-normal text-gray-500">
                        ({filteredAndSortedRequests.length} total)
                    </span>
                </h3>

                <div className="flex items-center gap-2">
                    <SearchInput
                        containerClassName="max-w-80"
                        placeholder="Search by name, email, organization..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <SortFilter
                        value={sort}
                        onChange={(value) => setSort(value)}
                    />
                </div>
            </div>

            {/* Table */}
            <ReusableTable
                columns={columns}
                data={filteredAndSortedRequests}
                zebra={false}
                actions={[
                    {
                        key: 'view',
                        label: 'View Details',
                        onClick: (item) => handleViewDetails(item as RequestForm),
                    },
                    {
                        key: 'reply',
                        label: 'Reply',
                        onClick: (item) => handleReply(item as RequestForm),
                    },
                    {
                        key: 'delete',
                        label: 'Delete',
                        danger: true,
                        onClick: (item) => handleDelete(item as RequestForm),
                    },
                ]}
            />

            {/* View Details Modal */}
            <CustomModal
                open={isViewOpen}
                onOpenChange={setIsViewOpen}
                title="Request Form Detail"
                className="w-[687px]"
            >
                <ViewDetails
                    data={selectedRequest as RequestDetails}
                    onCancel={() => setIsViewOpen(false)}
                    onReply={() => {
                        setIsViewOpen(false);
                        setIsReplyOpen(true);
                    }}
                />
            </CustomModal>

            {/* Reply Modal */}
            <CustomModal
                open={isReplyOpen}
                onOpenChange={setIsReplyOpen}
                title="Reply to Request"
                className="w-[600px]"
            >
                <ReplyModal
                    data={selectedRequest as RequestDetails}
                    onCancel={() => setIsReplyOpen(false)}
                    onReply={() => {
                        setIsReplyOpen(false);
                        // refetch(); // Refresh data after reply
                        // toast.success("Reply sent successfully");
                    }}
                />
            </CustomModal>
        </div>
    );
}