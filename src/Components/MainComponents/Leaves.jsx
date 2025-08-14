import React, { useEffect, useState } from "react";
import LeaveRequests from "../Admin/LeaveRequests";
import SendMainLeaveModel from "../Admin/AdminModels/SendMainLeaveModel";
import SendSpatialLeaveModel from "../Admin/AdminModels/SendSpatialLeaveModel";
import { toast } from "react-toastify";
import { GetAllUsers } from './../../Apis/apiHandlers';
import ApprovedAndRejectedRequest from "../Admin/ApprovedAndRejectedRequest";

export default function Leaves() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpatialModalOpen, setIsSpatialModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [sentMainLeave, setSentMainLeave] = useState(() => {
    const saved = localStorage.getItem('sentMainLeave');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  
  const [sentSpatialLeave, setSentSpatialLeave] = useState(() => {
    const saved = localStorage.getItem('sentSpatialLeave');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });


  useEffect(() => {
    localStorage.setItem('sentMainLeave', JSON.stringify([...sentMainLeave]));
  }, [sentMainLeave]);

  useEffect(() => {
    localStorage.setItem('sentSpatialLeave', JSON.stringify([...sentSpatialLeave]));
  }, [sentSpatialLeave]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await GetAllUsers();
        console.log("Response from API:", response);
        const userData = response?.users;
        if (!Array.isArray(userData)) {
          throw new Error("Invalid user data format");
        }
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message || "Failed to fetch users");
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();
    const search = searchTerm.toLowerCase();

    return (
      user.id?.toString().includes(search) ||
      (user.firstName?.toLowerCase() || "").includes(search) ||
      (user.lastName?.toLowerCase() || "").includes(search) ||
      fullName.includes(search)
    );
  });

  const handleGiveLeave = (userId) => {
    console.log("Give Leave clicked for user ID:", userId);
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleSpatialLeave = (userId) => {
    console.log("Spatial Leave clicked for user ID:", userId);
    setSelectedUserId(userId);
    setIsSpatialModalOpen(true);
  };


  const handleMainLeaveGiven = (userId) => {
    setSentMainLeave(prev => new Set([...prev, userId]));
    console.log("Main leave given to user:", userId);
  };

  const handleSpatialLeaveGiven = (userId) => {
    setSentSpatialLeave(prev => new Set([...prev, userId]));
    console.log("Special leave given to user:", userId);
  };


  return (
    <div className="min-h-screen mt-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Table Section */}
        <div className="md:col-span-9 bg-white shadow rounded-lg p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-800">Total Users</h2>
          
            
            </div>
            <input
              type="text"
              placeholder="Search by ID or Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div className="overflow-x-auto max-h-[550px] overflow-y-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-[#2c3e50] text-white">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">FName</th>
                  <th className="px-6 py-3">LName</th>
                  <th className="px-6 py-3">Designation</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {filteredUsers.map((user) => {
                  const hasMainLeave = sentMainLeave.has(user.id);
                  const hasSpatialLeave = sentSpatialLeave.has(user.id);
                  
                  return (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{user.id}</td>
                      <td className="px-6 py-4">{user.firstname}</td>
                      <td className="px-6 py-4">{user.lastname}</td>
                      <td className="px-6 py-4">{user.designation}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => handleGiveLeave(user.id)}
                          disabled={hasMainLeave}
                          className={`text-xs font-medium px-3 py-1 rounded transition-colors ${
                            hasMainLeave
                              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                              : "bg-green-500 hover:bg-green-600 text-white"
                          }`}
                        >
                          {hasMainLeave ? "Leave Sent" : "Give Leave"}
                        </button>
                        <button
                          onClick={() => handleSpatialLeave(user.id)}
                          disabled={hasSpatialLeave}
                          className={`text-xs font-medium px-3 py-1 rounded transition-colors ${
                            hasSpatialLeave
                              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-600 text-white"
                          }`}
                        >
                          {hasSpatialLeave ? "Special Sent" : "Special Leave"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No matching users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

       
        <div className="md:col-span-3 bg-white shadow rounded-lg p-3">
          <LeaveRequests />
        </div>
      </div>

      <div className=" mt-5">
        <ApprovedAndRejectedRequest/>
      </div>


      <SendMainLeaveModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={selectedUserId}
        onLeaveGiven={handleMainLeaveGiven}
      />
      <SendSpatialLeaveModel
        isOpen={isSpatialModalOpen}
        onClose={() => setIsSpatialModalOpen(false)}
        userId={selectedUserId}
        onLeaveGiven={handleSpatialLeaveGiven}
      />
    </div>
  );
}