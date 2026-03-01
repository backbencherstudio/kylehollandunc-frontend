'use client'

export interface User {
    id: number
    name: string
    email: string
    created_at: string
}
import { Button } from '@/components/ui/button'
import { Column, ReusableTable } from '@/components/reusable/ReusableTable'
import { StatusBadge } from '@/components/reusable/StatusBadge'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import SearchInput from '@/components/reusable/SearchInput'
import { useState } from 'react'
import { useGetUsersQuery, useDeleteUserMutation } from '@/redux/features/admin/user-management/userApi'
import { format } from 'date-fns'
import { toast } from 'sonner'

/* ================= Component ================= */

const columns: Column<User>[] = [
    {
        header: 'User ID',
        accessor: 'id',
        className: 'font-medium text-[#1D1F2C]',
    },
    {
        header: 'Name',
        accessor: 'name',
    },
    {
        header: 'Email',
        accessor: 'email',
        className: 'text-[#687588]',
    },
    {
        header: 'Created',
        accessor: (item) => (
            <span>{format(new Date(item.created_at), 'dd MMM yyyy')}</span>
          ),
        
    },
]


export function UserManagementTable() {

    const [search, setSearch] = useState("");   
    const { data: usersData, isLoading, error } = useGetUsersQuery();     
    const [deleteUser] = useDeleteUserMutation();

    const handleDelete = async (id: number) => {
        try {
            await deleteUser({ id }).unwrap();
            toast.success("User deleted successfully");
        } catch (error) {
            toast.error("Failed to delete user");
            console.error("Failed to delete user", error);
        }
    }
    const users = usersData?.data || [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {(error as any).message}</div>;
    }
    return (
        <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-6 py-5 border-b border-[#F1F2F4]">
                <h2 className="table-title">
                    User Management
                </h2>

                {/* Search */}
                <SearchInput
                    placeholder="Search users by name, email, or code..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="px-4 py-4">
                <ReusableTable
                    columns={columns as any}
                    data={users}
                    zebra={false}
                    actions={[
                        // {
                        //     key: 'edit',
                        //     label: 'Edit',
                        //     onClick: (user) => console.log('Edit', user),
                        // },
                        {
                            key: 'delete',
                            label: 'Delete',
                            danger: true,
                                onClick: (user) => handleDelete(user?.id as unknown as number),
                        },
                    ]}
                />
            </div>
        </div>
    )
}