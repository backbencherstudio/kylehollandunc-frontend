import React from 'react';
import { MoreVertical } from 'lucide-react'; // Standard icon library
import { DataTable, ColumnDef } from '@/components/reusable/DataTable'; // Assuming it's in the same folder

// 1. Define the shape of our fake data
interface RequestForm {
  userId: string;
  name: string;
  peptide: {
    name: string;
    qty: string;
    purity: string;
  };
  organization: string;
  submitDate: string;
  status: 'pending' | 'In Progress' | 'Completed';
}

// 2. Create the fake data array
const fakeData: RequestForm[] = [
  {
    userId: 'LNL-000123',
    name: 'Theresa Webb',
    peptide: { name: 'BPC-157', qty: '10mg', purity: '98%' },
    organization: 'Supplier',
    submitDate: 'February 28, 2018',
    status: 'pending',
  },
  {
    userId: 'LNL-000123',
    name: 'Kristin Watson',
    peptide: { name: 'BPC-157', qty: '10mg', purity: '98%' },
    organization: 'Clinic',
    submitDate: 'March 13, 2014',
    status: 'pending',
  },
  {
    userId: 'LNL-000124',
    name: 'Theresa Webb',
    peptide: { name: 'BPC-157', qty: '10mg', purity: '98%' },
    organization: 'Pharmacy',
    submitDate: 'December 2, 2018',
    status: 'In Progress',
  },
  {
    userId: 'LNL-000125',
    name: 'Guy Hawkins',
    peptide: { name: 'BPC-157', qty: '10mg', purity: '98%' },
    organization: 'Supplier',
    submitDate: 'May 20, 2015',
    status: 'Completed',
  },
];

// 3. Helper function for status badge styles
const getStatusStyles = (status: RequestForm['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-[#FFF8E6] text-[#F7C464]';
    case 'In Progress':
      return 'bg-[#EBF4FF] text-[#8CB4F6]';
    case 'Completed':
      return 'bg-[#E6F9F3] text-[#4FCBA1]';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

// 4. Main Component
export default function RecentRequestForms() {
  
  // Define how each column should render its data
  const columns: ColumnDef<RequestForm>[] = [
    {
      header: 'User ID',
      render: (item) => <span className="font-bold text-gray-900">{item.userId}</span>,
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Peptide Details',
      render: (item) => (
        <div className="flex flex-col gap-0.5">
          <span className="text-gray-900 font-medium">{item.peptide.name}</span>
          <span className="text-gray-500 text-xs">
            Qty: {item.peptide.qty} • Purity: {item.peptide.purity}
          </span>
        </div>
      ),
    },
    {
      header: 'Organization',
      accessorKey: 'organization',
    },
    {
      header: 'Submit Date',
      accessorKey: 'submitDate',
    },
    {
      header: 'Status',
      render: (item) => (
        <span className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize ${getStatusStyles(item.status)}`}>
          {item.status}
        </span>
      ),
    },
    {
      header: 'Action',
      render: () => (
        <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100">
          <MoreVertical size={18} />
        </button>
      ),
    },
  ];

  return (
    <div className="w-full min-w-0 p-4 sm:p-6 bg-white font-sans rounded-xl">
      {/* Header Area - stacks on small screens */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-[22px] font-bold text-slate-800">Recent Request Forms</h2>
        <button className="w-full sm:w-auto px-5 py-2 text-sm font-semibold text-slate-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm shrink-0">
          View All
        </button>
      </div>

      {/* Render the reusable table */}
      <div className="min-w-0">
        <DataTable data={fakeData} columns={columns} />
      </div>
    </div>
  );
}