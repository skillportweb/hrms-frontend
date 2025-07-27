import React, { useState, useEffect } from "react";
import { GetApprovedAndRejectedLeaverequests } from "../../Apis/apiHandlers"; 

const ITEMS_PER_PAGE = 8;

export default function ApprovedAndRejectedRequest() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await GetApprovedAndRejectedLeaverequests();
        let requests = [];

        if (response?.data?.leaveRequests) {
          requests = response.data.leaveRequests;
        } else if (response?.leaveRequests) {
          requests = response.leaveRequests;
        } else if (Array.isArray(response?.data)) {
          requests = response.data;
        } else if (Array.isArray(response)) {
          requests = response;
        } else {
          console.warn("Unexpected response structure:", response);
        }

        setLeaveRequests(requests);
      } catch (err) {
        setError("Failed to load leave requests.");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  const filteredLeaves = leaveRequests.filter(
    (leave) =>
      leave?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave?.leaveType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLeaves.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedLeaves = filteredLeaves.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h2 className="text-xl font-semibold">Approved & Rejected Leave Requests</h2>
        <input
          type="text"
          placeholder="Search by name or leave type"
          className="w-full sm:w-64 p-2 h-9 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); 
          }}
        />
      </div>

      {loading ? (
        <p className="mt-6 text-gray-500">Loading leave requests...</p>
      ) : error ? (
        <p className="mt-6 text-red-500">{error}</p>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedLeaves.length > 0 ? (
              paginatedLeaves.map((leave) => (
                <div
                  key={leave.leaveId || leave.id || Math.random()}
                  className={`border-l-4 p-4 rounded shadow ${
                    leave.status === "approved"
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-md font-bold">{leave.name || "N/A"}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        leave.status === "approved"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {leave.status?.toUpperCase() || "UNKNOWN"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{leave.designation || "N/A"}</p>
                  <div className="text-xs text-gray-800 space-y-1">
                    <p><strong>Type:</strong> {leave.leaveType || "N/A"}</p>
                    <p><strong>From:</strong> {leave.startDate || "N/A"}</p>
                    <p><strong>To:</strong> {leave.endDate || "N/A"}</p>
                    <p><strong>Reason:</strong> {leave.message || "N/A"}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-gray-500">No leave requests found.</p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex justify-end items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
