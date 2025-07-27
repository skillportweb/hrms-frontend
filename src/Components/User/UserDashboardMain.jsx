import React from 'react';

export default function UserDashboardMain() {
  return (
    <>
      <div className="mt-2">
        <h1 className="pb-5 pl-2 text-lg font-semibold">Welcome, User</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-200 text-gray-800 rounded-xl shadow-[0_0_20px_0_rgba(0,0,0,0.10)]  border border-gray-400 p-6 text-center ">
            <h3 className="text-lg font-semibold">Your Attendance</h3>
            <p className="text-2xl mt-2 font-bold">96%</p>
          </div>
          <div className="bg-orange-200 text-gray-800 rounded-xl shadow-[0_0_20px_0_rgba(0,0,0,0.10)] border border-gray-400 p-6 text-center">
            <h3 className="text-lg font-semibold">Leave Balance</h3>
            <p className="text-2xl mt-2 font-bold">6 Days</p>
          </div>
          <div className="bg-green-200 text-gray-800 rounded-xl shadow-[0_0_20px_0_rgba(0,0,0,0.10)] border border-gray-400 p-6 text-center">
            <h3 className="text-lg font-semibold">Current Payroll</h3>
            <p className="text-2xl mt-2 font-bold">₹50,000</p>
          </div>
        </div>
      </div>
    </>
  );
}
