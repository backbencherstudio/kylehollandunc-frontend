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
import { useState, useMemo, useEffect } from 'react'
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

// Debounce function to prevent too many re-renders while typing
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export function UserManagementTable() {

    const [search, setSearch] = useState("");   
    const debouncedSearch = useDebounce(search, 300); // Debounce search input
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

    // Filter users based on search input
    const filteredUsers = useMemo(() => {
        const users = usersData?.data || [];
        
        if (!debouncedSearch.trim()) {
            return users;
        }

        const searchTerm = debouncedSearch.toLowerCase().trim();
        
        return users.filter((user: User) => {
            return (
                user.id.toString().includes(searchTerm) ||
                user.name.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm) ||
                format(new Date(user.created_at), 'dd MMM yyyy').toLowerCase().includes(searchTerm)
            );
        });
    }, [usersData, debouncedSearch]);

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
                    data={filteredUsers}
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