import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetSingleLeaveRequest, ChangeLeaveStatus } from "../../Apis/apiHandlers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SingleLeaveDetails() {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Get role from localStorage
  const role = Number(localStorage.getItem("role"));

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await GetSingleLeaveRequest(id);
        setLeave(response?.leaveRequest);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching single leave request:", err);
        setError("Failed to fetch leave details.");
        setLoading(false);
      }
    };

    fetchLeave();
  }, [id]);

  const handleAction = async (action) => {
    setActionLoading(true);
    try {
      await ChangeLeaveStatus(id, action);
      setLeave((prev) => ({ ...prev, status: action }));

      toast.success(`Leave ${action === "approved" ? "Approved" : "Rejected"} Successfully!`);
    } catch (err) {
      console.error(`Error updating status to ${action}:`, err);
      toast.error("Failed to update leave status.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <p className="text-gray-600 p-4">Loading...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-[0_0_20px_0_rgba(0,0,0,0.15)] rounded-lg space-y-4 mt-8">
      <h2 className="text-xl font-semibold mb-2">Leave Request Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <p><strong>Name:</strong> {leave.name}</p>
        <p><strong>Designation:</strong> {leave.designation}</p>
        <p><strong>Leave Type:</strong> {leave.leaveType}</p>
        <p><strong>Status:</strong> {leave.status}</p>
        <p><strong>Start Date:</strong> {leave.startDate}</p>
        <p><strong>End Date:</strong> {leave.endDate}</p>
      </div>

      <p className="text-sm text-gray-700">
        <strong>Message:</strong> {leave.message}
      </p>

      {/* Show buttons only if role === 1 */}
      {role === 1 && (
        <div className="flex gap-4 pt-2">
          <button
            onClick={() => handleAction("approved")}
            className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded disabled:opacity-50"
            disabled={actionLoading}
          >
            Approve
          </button>
          <button
            onClick={() => handleAction("rejected")}
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded disabled:opacity-50"
            disabled={actionLoading}
          >
            Reject
          </button>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar closeOnClick />
    </div>
  );
}
