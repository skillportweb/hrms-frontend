import React, { useEffect, useState } from "react";
import { GetLeaveRequestSummary } from "../../Apis/apiHandlers"; // adjust path if needed

export default function LeavesCards() {
  const [summary, setSummary] = useState({
    newRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0,
    totalRequests: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await GetLeaveRequestSummary();
        
        // More robust data extraction with fallbacks
        let summaryData = null;
        
        // Check various possible response structures
        if (res?.data?.data) {
          summaryData = res.data.data;
        } else if (res?.data) {
          summaryData = res.data;
        } else if (res) {
          summaryData = res;
        }
        
        // Validate that we have the expected properties
        if (summaryData && typeof summaryData === 'object') {
          setSummary({
            newRequests: summaryData.newRequests || 0,
            approvedRequests: summaryData.approvedRequests || 0,
            rejectedRequests: summaryData.rejectedRequests || 0,
            totalRequests: summaryData.totalRequests || 0,
          });
        } else {
          // If data structure is unexpected, set default values
          console.warn("Unexpected API response structure:", res);
          setSummary({
            newRequests: 0,
            approvedRequests: 0,
            rejectedRequests: 0,
            totalRequests: 0,
          });
        }
      } catch (error) {
        console.error("Error fetching leave summary:", error);
        setError("Failed to load leave summary");
        // Keep default summary values on error
        setSummary({
          newRequests: 0,
          approvedRequests: 0,
          rejectedRequests: 0,
          totalRequests: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Loading leave report...</p>;
  }

  if (error) {
    return (
      <div className="mt-5">
        <p className="text-center text-red-600">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 mx-auto block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <h1 className="pb-5 pl-2 text-lg font-semibold mt-4">Total Leave Report</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* New Requests */}
        <div className="bg-purple-200 text-gray-800 rounded-xl shadow-[0_0_20px_0_rgba(0,0,0,0.10)] border border-gray-400 p-2 flex items-center gap-4">
          <div className="border w-12 h-12 flex items-center justify-center rounded-full text-xl text-purple-700 bg-white">
            <i className="fas fa-plane-departure"></i>
          </div>
          <div>
            <h3 className="text-[17px] font-semibold">New Requests</h3>
            <p className="text-2xl mt-1 font-bold">{summary?.newRequests || 0}</p>
          </div>
        </div>

        {/* Approved Requests */}
        <div className="bg-green-200 text-gray-800 rounded-xl shadow-[0_0_20px_0_rgba(0,0,0,0.10)] border border-gray-400 p-2 flex items-center gap-4">
          <div className="border w-12 h-12 flex items-center justify-center rounded-full text-xl text-green-700 bg-white">
            <i className="fa-solid fa-check"></i>
          </div>
          <div>
            <h3 className="text-[17px] font-semibold">Approved Requests</h3>
            <p className="text-2xl mt-1 font-bold">{summary?.approvedRequests || 0}</p>
          </div>
        </div>

        {/* Rejected Requests */}
        <div className="bg-red-200 text-gray-800 rounded-xl shadow-[0_0_20px_0_rgba(0,0,0,0.10)] border border-gray-400 p-2 flex items-center gap-4">
          <div className="border w-12 h-12 flex items-center justify-center rounded-full text-xl text-red-700 bg-white">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <div>
            <h3 className="text-[17px] font-semibold">Rejected Requests</h3>
            <p className="text-2xl mt-1 font-bold">{summary?.rejectedRequests || 0}</p>
          </div>
        </div>

        {/* Total Requests */}
        <div className="bg-yellow-200 text-gray-800 rounded-xl shadow-[0_0_20px_0_rgba(0,0,0,0.10)] border border-gray-400 p-2 flex items-center gap-4">
          <div className="border w-12 h-12 flex items-center justify-center rounded-full text-xl text-yellow-700 bg-white">
            <i className="fas fa-calendar-check"></i>
          </div>
          <div>
            <h3 className="text-[17px] font-semibold">Total Requests</h3>
            <p className="text-2xl mt-1 font-bold">{summary?.totalRequests || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}