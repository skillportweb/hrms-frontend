import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetRequestDetails } from "../../Apis/apiHandlers";
import { toast } from "react-toastify";

export default function ResolvedRequestsDetails() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await GetRequestDetails(id);
        setTicket(response.data);
      } catch (error) {
        console.error("Error fetching ticket details:", error);
        toast.error("Failed to fetch ticket details");
      }
    };

    if (id) fetchTicket();
  }, [id]);

  if (!ticket) {
    return <div className="text-center p-8">No ticket found.</div>;
  }

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high": return "bg-red-100 text-red-800 border border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border border-green-200";
      default: return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getStatusColor = (status) => 
    status === "1" ? "bg-green-100 text-green-800 border border-green-200" : 
                     "bg-orange-100 text-orange-800 border border-orange-200";

  return (
    <div className="min-h-screen py-8">
      <div className=" mx-auto px-4">
        <h1 className=" font-bold text-gray-900 mb-4">{ticket.title}</h1>
        <p className="text-sm text-gray-600 mb-6">Ticket ID: #{ticket.id}</p>

        <div className="flex gap-2 mb-6">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
            {ticket.priority || "Normal"}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
            {ticket.status === "1" ? "✓ Resolved" : "⏳ Pending"}
          </span>
        </div>

        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <div>
            <strong>Employee Name:</strong> {ticket.employeeName}
          </div>
          <div>
            <strong>Email:</strong> {ticket.employeeEmail}
          </div>
          {/* <div>
            <strong>Department:</strong> {ticket.department}
          </div> */}
          <div>
            <strong>Category:</strong> {ticket.category}
          </div>
          <div>
            <strong>Description:</strong> {ticket.description}
          </div>
          <div>
            <strong>Resolution Notes:</strong> {ticket.resolutionNotes || "N/A"}
          </div>
          <div>
            <strong>Created At:</strong> {ticket.createdAt}
          </div>
        </div>
      </div>
    </div>
  );
}
