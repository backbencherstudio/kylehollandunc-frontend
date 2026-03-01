import React from 'react'

export default function UserStats({ statsData }: { statsData: { totalUsers: number, activeUsers: number, pendingOrders: number } }) {
  return (
    // <section className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4.5  '>
    <section className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5  '>
      
      <StatCard title='Total Users' value={statsData?.totalUsers?.toString() || '0'}  />  
      <StatCard title='Active Users' value={statsData?.activeUsers?.toString() || '0'} />                 
      <StatCard title='Pending Orders' value={statsData?.pendingOrders?.toString() || '0'} />  
    </section>
  )
}

const StatCard = ({ title, value }: { title: string, value: string }) => {
  return (
    <div className='w-full  flex flex-col justify-center items-start gap-4 border border-[#E9E9EA] bg-white p-4 rounded-xl border-solid'>
      <p className='text-[#1D1F2C] font-inter text-sm font-medium leading-[150%] tracking-[-0.28px]'>{title}</p>
      <h2 className='text-[#1D1F2C] font-inter text-[32px] font-semibold leading-[160%]'>{value}</h2>
    </div>
  )
}