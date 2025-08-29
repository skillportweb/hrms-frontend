import React, { useState } from "react";

export default function SupportCenter() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      employeeName: "John Doe",
      department: "IT",
      employeeEmail: "john.doe@company.com",
      title: "Laptop not starting",
      priority: "High",
      category: "IT Support",
      description: "My laptop won't turn on even after charging.",
      status: "In Progress",
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      department: "HR",
      employeeEmail: "jane.smith@company.com",
      title: "Payroll Issue",
      priority: "Medium",
      category: "Payroll",
      description: "My salary for August seems incorrect.",
      status: "In Progress",
    },
    {
      id: 3,
      employeeName: "Mike Johnson",
      department: "Finance",
      employeeEmail: "mike.johnson@company.com",
      title: "Access to accounting software",
      priority: "Low",
      category: "Access Request",
      description: "Need access to QuickBooks for monthly reports.",
      status: "Open",
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleResolve = (id) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "Resolved" } : req
      )
    );
  };

  const handleView = (request) => {
    setSelectedRequest(request);
  };

  const closeModal = () => {
    setSelectedRequest(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-50 text-red-700 border border-red-200";
      case "Medium":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "Low":
        return "bg-green-50 text-green-700 border border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "In Progress":
        return "bg-purple-50 text-purple-700 border border-purple-200";
      case "Resolved":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  return (
    <div className="min-h-screen">
      <div className=" mx-auto">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-lg font-semibold text-slate-900 mb-2">
            Support Center
          </h1>
          <p className="text-slate-600">
            Manage and track support requests from your team
          </p>
        </div>
        <hr className="mb-5" />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-600 mb-1">Total Requests</h3>
            <p className="text-2xl font-bold text-slate-900">{requests.length}</p>
          </div>
      
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-600 mb-1">In Progress</h3>
            <p className="text-2xl font-bold text-purple-600">
              {requests.filter(r => r.status === "In Progress").length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-600 mb-1">Resolved</h3>
            <p className="text-2xl font-bold text-emerald-600">
              {requests.filter(r => r.status === "Resolved").length}
            </p>
          </div>
        </div>

        {/* Support Requests Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">
              Support Requests
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Request
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-slate-900">
                          {request.employeeName}
                        </div>
                        <div className="text-sm text-slate-500">
                          {request.department} • {request.employeeEmail}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-slate-900">
                          {request.title}
                        </div>
                        <div className="text-sm text-slate-500">
                          {request.category}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(request.priority)}`}>
                        {request.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(request)}
                          className="inline-flex items-center px-3 py-1.5 border border-slate-300 text-xs font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors"
                        >
                          View
                        </button>
                        {request.status !== "Resolved" && (
                          <button
                            onClick={() => handleResolve(request.id)}
                            className="inline-flex items-center px-3 py-1.5 border border-emerald-300 text-xs font-medium rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                          >
                            Resolve
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white  shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {selectedRequest.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Request #{selectedRequest.id}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="px-6 py-6 space-y-6">
              {/* Employee Info */}
              <div>
                <h4 className="text-sm font-medium text-slate-900 mb-3">Employee Information</h4>
                <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Name:</span>
                    <span className="text-sm font-medium text-slate-900">{selectedRequest.employeeName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Department:</span>
                    <span className="text-sm font-medium text-slate-900">{selectedRequest.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Email:</span>
                    <span className="text-sm font-medium text-slate-900">{selectedRequest.employeeEmail}</span>
                  </div>
                </div>
              </div>

              {/* Request Details */}
              <div>
                <h4 className="text-sm font-medium text-slate-900 mb-3">Request Details</h4>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(selectedRequest.priority)}`}>
                      {selectedRequest.priority} Priority
                    </span>
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedRequest.status)}`}>
                      {selectedRequest.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-900 block mb-1">Category:</span>
                    <span className="text-sm text-slate-600">{selectedRequest.category}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-900 block mb-1">Description:</span>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {selectedRequest.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
              {/* {selectedRequest.status !== "Resolved" && (
                <button
                  onClick={() => {
                    handleResolve(selectedRequest.id);
                    closeModal();
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Mark as Resolved
                </button>
              )} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}