import React, { useState, useEffect } from "react";
import ApplyLeaveModel from "./Models/ApplyLeaveModel";
import { GetUserLeaveBalance } from './../../Apis/apiHandlers';
import LeaveApplyApplications from "./LeaveApplyApplications";

export default function UserLeaves() {
    const userId = localStorage.getItem('userId') || 
                JSON.parse(localStorage.getItem('user'))?.id;
  const [showModal, setShowModal] = useState(false);
  const [leaveBalance, setLeaveBalance] = useState({
    totalLeaves: 0,
    usedLeaves: 0,
    remainingLeaves: 0,
    casualLeave: 0,
    sickLeave: 0,
    paidLeave: 0,
    optionalLeave: 0,
  });

  useEffect(() => {
    const fetchLeaveBalance = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          throw new Error("User ID not found in localStorage");
        }

        const response = await GetUserLeaveBalance(userId);
        
        // Debug: Log the entire response to see its structure
        console.log("API Response:", response);
        
        // Handle the actual response structure: {leaveBalance: {...}}
        const data = response?.leaveBalance;
        
        if (!data) {
          throw new Error("Invalid response structure - leaveBalance not found");
        }

        // Ensure all required properties exist with fallback values
        setLeaveBalance({
          totalLeaves: data.totalLeaves || 0,
          usedLeaves: data.usedLeaves || 0,
          remainingLeaves: data.remainingLeaves || 0,
          casualLeave: data.casualLeave || 0,
          sickLeave: data.sickLeave || 0,
          paidLeave: data.paidLeave || 0,
          optionalLeave: data.optionalLeave || 0,
        });
      } catch (error) {
        console.error("Error fetching leave balance:", error);
        // Keep the default values (all zeros) if API fails
      }
    };

    fetchLeaveBalance();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-9 mt-5">
          <h1 className="text-2xl font-semibold text-gray-800">My Leaves</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-slate-700 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2 rounded"
          >
            Apply Leave
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white shadow-[0_0_20px_0_rgba(0,0,0,0.15)] rounded-lg p-4">
            <h2 className="text-lg font-medium text-gray-700">Total Leaves</h2>
            <p className="text-2xl font-bold text-blue-600">{leaveBalance.totalLeaves}</p>
          </div>
          <div className="bg-white shadow-[0_0_20px_0_rgba(0,0,0,0.15)] rounded-lg p-4">
            <h2 className="text-lg font-medium text-gray-700">Used Leaves</h2>
            <p className="text-2xl font-bold text-yellow-500">{leaveBalance.usedLeaves}</p>
          </div>
          <div className="bg-white shadow-[0_0_20px_0_rgba(0,0,0,0.15)] rounded-lg p-4">
            <h2 className="text-lg font-medium text-gray-700">Remaining Leaves</h2>
            <p className="text-2xl font-bold text-green-600">{leaveBalance.remainingLeaves}</p>
          </div>
        </div>

        {/* Leave Types Table */}
        <div className="bg-white shadow-md rounded-lg overflow-x-auto mb-10">
          <h2 className="text-xl font-semibold text-gray-800 p-4 border-b">
            Type of Leaves
          </h2>
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#2c3e50] text-white">
              <tr>
                <th className="px-6 py-3">Casual Leave</th>
                <th className="px-6 py-3">Sick Leave</th>
                <th className="px-6 py-3">Paid Leave</th>
                <th className="px-6 py-3">Optional Leave</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">{leaveBalance.casualLeave}</td>
                <td className="px-6 py-4">{leaveBalance.sickLeave}</td>
                <td className="px-6 py-4">{leaveBalance.paidLeave}</td>
                <td className="px-6 py-4">{leaveBalance.optionalLeave}</td>
              </tr>
            </tbody>
          </table>
        </div>

       <LeaveApplyApplications/>

      </div>

      <ApplyLeaveModel isOpen={showModal} onClose={() => setShowModal(false)} userId={userId} />
    </div>
  );
}