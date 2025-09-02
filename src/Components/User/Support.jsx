import React, { useState, useEffect } from "react";
import {
  FaQuestionCircle,
  FaBook,
  FaClock,
  FaCheckCircle,
  FaPlus,
  FaTicketAlt,
  FaSpinner,
  FaCheck,
  FaUser,
  FaCalendarAlt,
  FaBuilding,
  FaHeadset,
  FaLaptop,
} from "react-icons/fa";
import SupportRequestModel from "./Models/SupportRequestModel";
import { SupportPendingRequest, SupportSolvedRequest} from "../../Apis/apiHandlers";
import { Link } from "react-router-dom";

export default function Support() {
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [pendingTickets, setPendingTickets] = useState([]);
  const [solvedTickets, setSolvedTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tickets when component mounts
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Ensure you store userId after login
        if (!userId) {
          console.error("No userId found in localStorage");
          return;
        }

        setLoading(true);

        const [pendingRes, solvedRes] = await Promise.all([
          SupportPendingRequest(userId),
          SupportSolvedRequest(userId),
        ]);

        setPendingTickets(pendingRes.data || []);
        setSolvedTickets(solvedRes.data || []);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const supportOptions = [
    {
      icon: <FaLaptop className="w-8 h-8 text-blue-500" />,
      title: "IT Support",
      description: "Technical issues, software problems, account access",
      action: "it.support@company.com",
      available: "24/7",
    },
    {
      icon: <FaUser className="w-8 h-8 text-green-500" />,
      title: "HR Support",
      description: "Leave requests, payroll, benefits, policies",
      action: "hr.support@company.com",
      available: "Mon - Fri, 9 AM - 5 PM",
    },
    {
      icon: <FaHeadset className="w-8 h-8 text-purple-500" />,
      title: "General Help",
      description: "Any other workplace questions or concerns",
      action: "help@company.com",
      available: "Mon - Fri, 8 AM - 6 PM",
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-600 bg-red-100";
      case "Medium":
        return "text-yellow-600 bg-yellow-100";
      case "Low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-orange-600 bg-orange-100";
      case "Solved":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Employee Support Center
          </h1>
          <p className="text-[16px] text-gray-600 mx-auto">
            Get help with workplace issues, IT support, HR questions, and more.
            We're here to assist you.
          </p>
        </div>

        <hr className="mb-5" />

        {/* Submit Ticket Button */}
        <div className="text-end mb-8">
          <button
            onClick={() => setShowTicketForm(true)}
            className="inline-flex items-center px-8 py-2 bg-[#34495e] text-white rounded-lg hover:bg-[#2c3e50] transition-colors font-semibold shadow-lg hover:shadow-xl"
          >
            <FaPlus className="w-5 h-5 mr-3" />
            Submit Support Request
          </button>
        </div>

        {/* Support Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {supportOptions.map((option, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{option.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {option.description}
                </p>
                <div className="mt-auto">
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    {option.action}
                  </div>
                  <div className="flex items-center justify-center text-xs text-gray-500">
                    <FaClock className="w-3 h-3 mr-1" />
                    {option.available}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* My Support Requests */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pending Tickets */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FaSpinner className="w-5 h-5 mr-2 text-orange-500 animate-spin" />
              Pending Requests ({pendingTickets.length})
            </h2>

            {loading ? (
              <p className="text-center text-gray-500">Loading tickets...</p>
            ) : pendingTickets.length === 0 ? (
              <div className="text-center py-8">
                <FaTicketAlt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No pending requests</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {ticket.title}
                        </h3>
                        <p className="text-sm text-gray-600">#{ticket.id}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                          ticket.priority
                        )}`}
                      >
                        {ticket.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      {ticket.description}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <div className="flex items-center">
                        <FaBuilding className="w-3 h-3 mr-1" />
                        {ticket.department}
                      </div>
                      <div className="flex items-center">
                        <FaCalendarAlt className="w-3 h-3 mr-1" />
                        {ticket.createdAt}
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Category: {ticket.category}
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            ticket.status
                          )}`}
                        >
                          <FaSpinner className="w-3 h-3 mr-1 animate-spin" />
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Solved Tickets */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FaCheckCircle className="w-5 h-5 mr-2 text-green-500" />
              Resolved Requests ({solvedTickets.length})
            </h2>

            {loading ? (
              <p className="text-center text-gray-500">Loading tickets...</p>
            ) : solvedTickets.length === 0 ? (
              <div className="text-center py-8">
                <FaCheckCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No resolved requests yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {solvedTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="border border-gray-200 rounded-lg p-4 bg-green-50"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {ticket.title}
                        </h3>
                        <p className="text-sm text-gray-600">#{ticket.id}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs flex font-medium ${getStatusColor(
                            ticket.status
                          )}`}
                        >
                          <FaCheck className="w-3 h-3 mr-1" />
                          {ticket.status}
                        </span>
                        <Link
                            to={`/resolved-requests-details/${ticket.id}`}
                          className="px-3 py-1 text-xs font-medium text-white bg-[#34495e] rounded-md hover:bg-[#2c3e50] transition-colors"
                        >
                          View
                        </Link>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <div className="flex items-center">
                        <FaBuilding className="w-3 h-3 mr-1" />
                        {ticket.department}
                      </div>
                      <div className="flex items-center">
                        <FaCalendarAlt className="w-3 h-3 mr-1" />
                        {ticket.createdAt}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Response Time Info */}
        <div className="bg-blue-50 rounded-xl p-6 text-center mt-8">
          <div className="flex items-center justify-center mb-3">
            <FaCheckCircle className="w-6 h-6 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold text-blue-900">
              Our Support Commitment
            </h3>
          </div>
          <p className="text-blue-800">
            We respond to employee requests within 2-4 hours during business
            hours. For urgent IT issues, please contact IT support directly.
          </p>
        </div>
      </div>

      {/* Modal */}
      <SupportRequestModel
        isOpen={showTicketForm}
        onClose={() => setShowTicketForm(false)}
        color="#34495e"
      />
    </div>
  );
}
