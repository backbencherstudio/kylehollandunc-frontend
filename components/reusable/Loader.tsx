import React from 'react'

export default function Loader() {
    return (
        <div className="bg-white rounded-xl border p-6 min-w-0 overflow-hidden">
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-[#4c5fda] -mr-8"></div>
                <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-[#4c5fda] -ml-8"></div>
            </div>
        </div>
    )
}
