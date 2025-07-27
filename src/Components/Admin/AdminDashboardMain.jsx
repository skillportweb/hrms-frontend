import React from 'react'

export default function AdminDashboardMain() {
  return (
<>
    <div className="mt-2">
          <h1 className="pb-5 pl-2 text-lg font-semibold">Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-200 text-gray-800 rounded-xl shadow-[0_0_20px_0_rgba(0,0,0,0.10)]  border border-gray-400  p-6 text-center">
              <h3 className="text-lg font-semibold">Total Employees</h3>
              <p className="text-2xl mt-2 font-bold">150</p>
            </div>
            <div className="bg-orange-200 text-gray-800 rounded-xl shadow-[0_0_20px_0_rgba(0,0,0,0.10)]  border border-gray-400  p-6 text-center">
              <h3 className="text-lg font-semibold">On Leave Employees</h3>
              <p className="text-2xl mt-2 font-bold">12</p>
            </div>
            <div className="bg-green-200 text-gray-800 rounded-xl shadow-[0_0_20px_0_rgba(0,0,0,0.10)]  border border-gray-400  p-6 text-center">
              <h3 className="text-lg font-semibold">Active Jobs</h3>
              <p className="text-2xl mt-2 font-bold">8</p>
            </div>
            <div className="bg-purple-200 text-gray-800 rounded-xl shadow-[0_0_20px_0_rgba(0,0,0,0.10)]  border border-gray-400  p-6 text-center">
              <h3 className="text-lg font-semibold">Total Job Requests</h3>
              <p className="text-2xl mt-2 font-bold">20</p>
            </div>
          </div>
        </div>
</>
  )
}
