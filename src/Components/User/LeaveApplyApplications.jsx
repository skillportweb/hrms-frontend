
import React, { useEffect, useState } from 'react';
import { GetApplyUserLeaves } from '../../Apis/apiHandlers';
import { Link } from 'react-router-dom';

export default function LeaveApplyApplications() {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const response = await GetApplyUserLeaves(userId);
                console.log("API Raw Response:", response);

                const leaveData =
                    response?.data?.userLeaveRequests ||
                    response?.userLeaveRequests ||
                    [];

                setLeaveRequests(leaveData);
            } catch (error) {
                console.error(" Failed to fetch leave data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchLeaves();
        } else {
            console.warn("No userId found in localStorage.");
            setLoading(false);
        }
    }, [userId]);

    return (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            <h2 className="text-xl font-semibold text-gray-800 p-4 border-b">
                Leave Applications
            </h2>

            {loading ? (
                <div className="p-4 text-gray-500">Loading...</div>
            ) : leaveRequests.length === 0 ? (
                <div className="p-4 text-gray-500">No leave applications found.</div>
            ) : (
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-[#2c3e50] text-white">
                        <tr>
                            <th className="px-6 py-3">Leave Type</th>
                            <th className="px-6 py-3">From</th>
                            <th className="px-6 py-3">To</th>
                            <th className="px-6 py-3">Days</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {leaveRequests.map((leave) => (
                            <tr key={leave.leaveId} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4 capitalize">{leave.leaveType}</td>
                                <td className="px-6 py-4">{leave.startDate}</td>
                                <td className="px-6 py-4">{leave.endDate}</td>
                                <td className="px-6 py-4">{leave.days}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`text-[13px] font-medium px-3 py-1 rounded-full ${leave.status === 'pending'
                                                ? 'text-yellow-600 bg-yellow-100'
                                                : leave.status === 'approved'
                                                    ? 'text-green-600 bg-green-100'
                                                    : 'text-red-600 bg-red-100'
                                            }`}
                                    >
                                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <Link to={`/single-leave-details/${leave.leaveId}`} className="bg-blue-500 text-white px-4 font-semibold py-2 text-xs rounded hover:bg-blue-600">
                                        View
                                    </Link>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
