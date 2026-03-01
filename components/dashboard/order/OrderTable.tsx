'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Column } from '@/components/reusable/ReusableTable'
import { StatusBadge } from '@/components/reusable/StatusBadge'
import SearchInput from '@/components/reusable/SearchInput'
import SortFilter from '@/components/reusable/SortFilter'
import { ReusableTable } from '@/components/reusable/ReusableTable'
import { 
    useGetOrdersQuery, 
    useDeleteOrderMutation,
    useUpdateOrderStatusMutation 
} from '@/redux/features/admin/order/adminOrderApi'
import { toast } from 'sonner'

// Map API order status to UI status
const mapOrderStatus = (status: string): 'started' | 'pending' | 'active' | 'canceled' => {
    switch (status.toLowerCase()) {
        case 'pending':
            return 'pending'
        case 'processing':
        case 'shipped':
            return 'active'
        case 'delivered':
        case 'completed':
            return 'active' // or you might want a 'completed' status
        case 'cancelled':
        case 'canceled':
            return 'canceled'
        default:
            return 'started'
    }
}

// Format date function
const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })
}

// Get test type display text
const getTestTypeDisplay = (order: any): string => {
    if (!order?.items || !Array.isArray(order.items)) {
        return 'No tests'
    }

    const tests = order.items.filter((item: any) => item?.type === 'test')
    const addons = order.items.filter((item: any) => item?.type === 'addon')

    if (tests.length === 0) return 'No tests'

    const mainTest = tests[0]?.name || 'Unknown Test'
    if (addons.length === 0) return mainTest

    return `${mainTest} & ${addons.length} add on${addons.length > 1 ? 's' : ''}`
}
// Table row type
interface TableRow {
    id: string;
    orderId: string;
    name: string;
    email: string;
    testType: string;
    date: string;
    status: 'started' | 'pending' | 'active' | 'canceled';
    original: any;
}

export default function OrderTable() {
    const router = useRouter()
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('newest')
    const [filteredData, setFilteredData] = useState<TableRow[]>([])

    // API hooks
    const { data, isLoading, error, refetch } = useGetOrdersQuery()
    const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation()
    const [updateOrderStatus] = useUpdateOrderStatusMutation()

    // console.log(data?.data?.data)

    // Transform API data to table format
    const tableData = useMemo(() => {
        if (!data?.success || !Array.isArray(data?.data?.data)) return []
    
        return data.data.data.map((order: any) => ({
            id: order?.id?.toString() ?? '',
            orderId: order?.order_number ?? '',
            name: order?.user?.name ?? 'Unknown',
            email: order?.user?.email ?? 'Unknown',
            testType: getTestTypeDisplay(order),
            date: order?.created_at ? formatDate(order.created_at) : 'Unknown',
            status: mapOrderStatus(order?.order_status ?? 'pending'),
            original: order
        }))
    }, [data])

    // Filter and sort data locally
    useEffect(() => {
        let filtered = [...tableData]

        // Apply search filter
        if (search) {
            const searchLower = search.toLowerCase()
            filtered = filtered.filter(item => 
                item.orderId.toLowerCase().includes(searchLower) ||
                item.name.toLowerCase().includes(searchLower) ||
                item.email.toLowerCase().includes(searchLower)
            )
        }

        // Apply sorting
        filtered.sort((a, b) => {
            if (sort === 'newest') {
                return new Date(b.original.created_at).getTime() - new Date(a.original.created_at).getTime()
            } else {
                return new Date(a.original.created_at).getTime() - new Date(b.original.created_at).getTime()
            }
        })

        setFilteredData(filtered)
    }, [tableData, search, sort])

    // Handle loading state
    if (isLoading) {
        return (
            <div className="bg-white rounded-xl border p-6 min-w-0 overflow-hidden">
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4c5fda]"></div>
                </div>
            </div>
        )
    }

    // Handle error state
    if (error) {
        return (
            <div className="bg-white rounded-xl border p-6 min-w-0 overflow-hidden">
                <div className="text-center text-red-600 py-12">
                    Failed to load orders. Please try again.
                </div>
            </div>
        )
    }

    const columns: Column<TableRow>[] = [
        {
            header: 'Order ID',
            accessor: 'orderId',
        },
        {
            header: 'Name',
            accessor: 'name',
        },
        {
            header: 'Email',
            accessor: 'email',
        },
        {
            header: 'Test type',
            accessor: (item) => {
                const hasAddOns = item.testType.includes('add on')
                return (
                    <span>
                        {hasAddOns ? (
                            <>
                                Standard Panel{' '}
                                <span className="text-blue-600 text-sm font-medium">
                                    {item.testType.replace('Standard Panel ', '')}
                                </span>
                            </>
                        ) : (
                            item.testType
                        )}
                    </span>
                )
            },
        },
        {
            header: 'Date',
            accessor: 'date',
        },
        {
            header: 'Status',
            accessor: (item) => <StatusBadge status={item.status} />,
        },
    ]

    const handleViewDetails = (item: TableRow) => {
        router.push(`./orders/${item.id}`)
    }

    const handleUpdateStatus = async (item: TableRow, newStatus: string) => {
        try {
            const result = await updateOrderStatus({ 
                id: item.id, 
                status: newStatus 
            }).unwrap()
            
            if (result.success) {
                toast.success('Order status updated successfully')
                refetch() // Refresh the list
            }
        } catch (error) {
            toast.error('Failed to update order status')
            console.error('Update status error:', error)
        }
    }

    const handleDelete = async (item: TableRow) => {
        if (confirm(`Are you sure you want to delete order #${item.orderId}?`)) {
            try {
                const result = await deleteOrder({ id: item.id }).unwrap()
                
                if (result.success) {
                    toast.success('Order deleted successfully')
                    refetch() // Refresh the list
                }
            } catch (error) {
                toast.error('Failed to delete order')
                console.error('Delete error:', error)
            }
        }
    }

    // Status update options
    const statusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'processing', label: 'Processing' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'cancelled', label: 'Cancelled' },
    ]

    return (
        <div className="bg-white rounded-xl border p-6 min-w-0 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="table-title">
                    Orders ({filteredData.length})
                </h3>

                <div className="flex items-center gap-2">
                    <SearchInput
                        containerClassName="max-w-80"
                        placeholder="Search orders by name, email, or order ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <SortFilter
                        value={sort}
                        onChange={(value) => setSort(value)}
                        options={[
                            { value: 'newest', label: 'Newest First' },
                            { value: 'oldest', label: 'Oldest First' },
                        ]}
                    />
                </div>
            </div>

            {/* Table */}
            <ReusableTable
                columns={columns}
                data={filteredData}
                zebra={false}
                isLoading={isLoading || isDeleting}
                actions={[
                    {
                        key: 'view',
                        label: 'View Details',
                        onClick: handleViewDetails,
                    },
                    {
                        key: 'update_status',
                        label: 'Start Order',
                        onClick: (item:any) => handleUpdateStatus(item, 'started'),
                        // children: statusOptions.map((option:any) => ({
                        //     key: `status_${option.value}`,
                        //     label: option.label,
                        //     onClick: (item:any) => handleUpdateStatus(item, option.value)
                        // }))
                    },
                    {
                        key: 'delete',
                        label: 'Delete',
                        danger: true,
                        onClick: handleDelete,
                    },
                ]}
            />

            {/* Empty state */}
            {!isLoading && filteredData.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    {search ? 'No orders match your search' : 'No orders found'}
                </div>
            )}
        </div>
    )
}