import React, { useEffect, useState } from "react";
import { ChangeLeaveStatus, GetPendingLeaveRequests } from "./../../Apis/apiHandlers";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null); 

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await GetPendingLeaveRequests();
        const leaveRequestsArray = Array.isArray(response?.leaveRequests)
          ? response.leaveRequests
          : [];
        setLeaveRequests(leaveRequestsArray);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching leave requests:", err);
        setError("Failed to fetch leave requests.");
        setLeaveRequests([]);
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleApprove = async (id) => {
    setActionLoading(id); 
    try {
      await ChangeLeaveStatus(id, "approved");
      
    
      setLeaveRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.leaveId === id
            ? { ...request, status: "approved" }
            : request
        )
      );
      
      toast.success("Leave Approved Successfully!");
    } catch (err) {
      console.error("Error approving leave request:", err);
      toast.error("Failed to approve leave request.");
    } finally {
      setActionLoading(null); 
    }
  };



  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <p className="text-gray-600">Loading leave requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Leave Requests
      </h2>
      <hr className="border-gray-300" />

      <div className="space-y-4 mt-4 max-h-[550px] overflow-y-auto pr-1 hide-scrollbar">
        {leaveRequests.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No leave requests found.</p>
          </div>
        ) : (
          leaveRequests.map((request) => {
            const shortDesc = request.message
              ? request.message.split(" ").slice(0, 10).join(" ") +
                (request.message.split(" ").length > 10 ? "..." : "")
              : "No message provided";

            return (
              <div
                key={request.leaveId}
                className="bg-gray-50 shadow rounded-lg p-4 space-y-2 w-full border hover:shadow-md transition-shadow"
              >
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Name:</span>{" "}
                  {request.name || "N/A"}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Leave Type:</span>{" "}
                  {request.leaveType || "N/A"}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Start Date:</span>{" "}
                  {request.startDate || "N/A"}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">End Date:</span>{" "}
                  {request.endDate || "N/A"}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Status:</span>{" "}
                  <span className={`font-medium ${
                    request.status === "approved" ? "text-green-600" : 
                    request.status === "rejected" ? "text-red-600" : 
                    "text-yellow-600"
                  }`}>
                    {request.status || "Pending"}
                  </span>
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Message:</span> {shortDesc}
                </p>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => handleApprove(request.leaveId)}
                    className="bg-green-500 hover:bg-green-600 text-white w-full text-sm font-medium px-2 py-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={actionLoading === request.leaveId || request.status === "approved"}
                  >
                    {actionLoading === request.leaveId ? "Approving..." : "Approve"}
                  </button>
                  <Link
                    to={`/single-leave-details/${request.leaveId}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium text-center px-2 py-1 w-full rounded transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar closeOnClick />
    </div>
  );
}