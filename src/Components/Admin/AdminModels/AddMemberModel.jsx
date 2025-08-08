import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import {
  GetAllUsernamesWithId,
  GetUsersByDepartmentId,
  AddDepartmentMembers,
} from "../../../Apis/apiHandlers";

export default function AddMemberModal({ isOpen, onClose, departmentId, onMembersUpdated }) {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [departmentMembers, setDepartmentMembers] = useState([]);
  const [originalMembers, setOriginalMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSelectedUsers([]);
      setSearchTerm("");
      fetchUsers();
      fetchDepartmentMembers();
    }
  }, [isOpen, departmentId]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await GetAllUsernamesWithId();
      const userList = res?.data?.data || res?.data || [];
      setUsers(userList);
    } catch (error) {
      console.error("Error loading users:", error);
      toast.error("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartmentMembers = async () => {
    if (!departmentId) return;
    
    setLoadingMembers(true);
    try {
      const res = await GetUsersByDepartmentId(departmentId);
      const members = res?.data?.data || res?.data || [];
      setDepartmentMembers(members);
      setOriginalMembers(members);
    } catch (error) {
      console.error("Error loading department members:", error);
      toast.error("Failed to load department members. Please try again.");
    } finally {
      setLoadingMembers(false);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id?.toString().includes(searchTerm)
  );

  const availableUsers = filteredUsers.filter(
    user => !departmentMembers.some(member => member.id === user.id)
  );

  const handleAddMember = useCallback(() => {
    if (selectedUsers.length === 0) {
      toast.warning("Please select users to add.");
      return;
    }

    const newMembers = users.filter(
      user =>
        selectedUsers.includes(user.id) &&
        !departmentMembers.some(member => member.id === user.id)
    );

    if (newMembers.length === 0) {
      toast.info("Selected users are already department members.");
      return;
    }

    setDepartmentMembers(prev => [...prev, ...newMembers]);
    setSelectedUsers([]);
    toast.success(`Added ${newMembers.length} member(s) to department.`);
  }, [selectedUsers, users, departmentMembers]);

  const handleRemoveMember = useCallback(() => {
    if (selectedUsers.length === 0) {
      toast.warning("Please select members to remove.");
      return;
    }

    const membersToRemove = departmentMembers.filter(member =>
      selectedUsers.includes(member.id)
    );

    if (membersToRemove.length === 0) {
      toast.info("No selected members to remove.");
      return;
    }

    setDepartmentMembers(prev =>
      prev.filter(member => !selectedUsers.includes(member.id))
    );
    setSelectedUsers([]);
    toast.success(`Removed ${membersToRemove.length} member(s) from department.`);
  }, [selectedUsers, departmentMembers]);

  const handleAddAll = useCallback(() => {
    if (users.length === departmentMembers.length) {
      toast.info("All users are already department members.");
      return;
    }
    
    setDepartmentMembers(users);
    setSelectedUsers([]);
    toast.success("Added all users to department.");
  }, [users, departmentMembers.length]);

  const handleRemoveAll = useCallback(() => {
    if (departmentMembers.length === 0) {
      toast.info("No members to remove.");
      return;
    }
    
    setDepartmentMembers([]);
    setSelectedUsers([]);
    toast.success("Removed all members from department.");
  }, [departmentMembers.length]);

  const handleUserSelect = useCallback((id) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    );
  }, []);

  const handleSubmit = async () => {
    if (submitting) return;
    
    setSubmitting(true);
    try {
      const currentIds = departmentMembers.map(u => u.id);
      const originalIds = originalMembers.map(u => u.id);

      const userIds = currentIds.filter(id => !originalIds.includes(id));
      const removedUserIds = originalIds.filter(id => !currentIds.includes(id));

      // Only make API call if there are changes
      if (userIds.length === 0 && removedUserIds.length === 0) {
        toast.info("No changes to save.");
        onClose();
        return;
      }

      const payload = {
        departmentId,
        userIds,
        removedUserIds,
      };

      await AddDepartmentMembers(payload);
      toast.success(
        `Department updated successfully! Added: ${userIds.length}, Removed: ${removedUserIds.length}`
      );
      
      // Call callback to refresh parent component if provided
      if (onMembersUpdated) {
        onMembersUpdated();
      }
      
      onClose();
    } catch (error) {
      console.error("Error updating department members:", error);
      toast.error("Failed to update department members. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (submitting) return;
    onClose();
  };

  const hasChanges = () => {
    const currentIds = departmentMembers.map(u => u.id).sort();
    const originalIds = originalMembers.map(u => u.id).sort();
    return JSON.stringify(currentIds) !== JSON.stringify(originalIds);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full h-full sm:h-auto sm:max-h-[95vh] max-w-4xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
              Manage Department Members
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Department ID: {departmentId}
            </p>
          </div>
          <button
            onClick={handleClose}
            disabled={submitting}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold p-1 disabled:cursor-not-allowed flex-shrink-0 ml-4"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b flex-shrink-0">
          <input
            type="text"
            placeholder="Search users by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>

        {/* Content - Responsive Layout */}
        <div className="flex-1 overflow-hidden">
          {/* Desktop Layout */}
          <div className="hidden lg:block h-full p-4 sm:p-6">
            <div className="grid grid-cols-5 gap-4 h-full min-h-0">
              {/* Available Users List */}
              <div className="col-span-2 border rounded-lg p-4 flex flex-col h-[220px]">
                <div className="flex justify-between items-center mb-3 flex-shrink-0">
                  <h3 className="text-md font-semibold">
                    Available Users ({availableUsers.length})
                  </h3>
                </div>
                <hr className="mb-3 flex-shrink-0" />
                <div className="flex-1 overflow-y-auto min-h-0">
                  {loading ? (
                    <div className="flex items-center justify-center h-32">
                      <p className="text-gray-500">Loading users...</p>
                    </div>
                  ) : availableUsers.length === 0 ? (
                    <div className="flex items-center justify-center h-32">
                      <p className="text-gray-500 text-center">
                        {searchTerm ? "No users match your search." : "No available users."}
                      </p>
                    </div>
                  ) : (
                    <ul className="space-y-1">
                      {availableUsers.map((user) => (
                        <li
                          key={user.id}
                          onClick={() => handleUserSelect(user.id)}
                          className={`cursor-pointer p-2 rounded transition-colors ${
                            selectedUsers.includes(user.id)
                              ? "bg-blue-100 border border-blue-300"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <div className="font-medium text-sm">{user.firstname} {user.lastname}</div>
                          <div className="text-xs text-gray-500">ID: {user.id}</div>
                          {user.email && (
                            <div className="text-xs text-gray-500 truncate">{user.email}</div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Center Action Buttons */}
              <div className="flex flex-col items-center justify-center gap-3">
                <button
                  onClick={handleAddMember}
                  disabled={selectedUsers.length === 0 || submitting}
                  className="bg-blue-500 text-white w-full px-2 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
                  title="Add selected users"
                >
                  Add →
                </button>
                <button
                  onClick={handleRemoveMember}
                  disabled={selectedUsers.length === 0 || submitting}
                  className="bg-red-500 text-white w-full px-2 py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
                  title="Remove selected members"
                >
                  ← Remove
                </button>
                <div className="w-full border-t my-2"></div>
                <button
                  onClick={handleAddAll}
                  disabled={submitting}
                  className="bg-green-500 text-white w-full px-2 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-xs"
                  title="Add all users"
                >
                  Add All →
                </button>
                <button
                  onClick={handleRemoveAll}
                  disabled={submitting}
                  className="bg-yellow-500 text-white w-full px-2 py-2 rounded-lg hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-xs"
                  title="Remove all members"
                >
                  ← Remove All
                </button>
              </div>

              {/* Department Members List */}
              <div className="col-span-2 border rounded-lg p-4 flex flex-col h-[220px]">
                <div className="flex justify-between items-center mb-3 flex-shrink-0">
                  <h3 className="text-md font-semibold">
                    Department Members ({departmentMembers.length})
                  </h3>
                  {hasChanges() && (
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                      Unsaved changes
                    </span>
                  )}
                </div>
                <hr className="mb-3 flex-shrink-0" />
                <div className="flex-1 overflow-y-auto min-h-0">
                  {loadingMembers ? (
                    <div className="flex items-center justify-center h-32">
                      <p className="text-gray-500">Loading members...</p>
                    </div>
                  ) : departmentMembers.length === 0 ? (
                    <div className="flex items-center justify-center h-32">
                      <p className="text-gray-500">No members added yet.</p>
                    </div>
                  ) : (
                    <ul className="space-y-1">
                      {departmentMembers.map((user) => (
                        <li
                          key={user.id}
                          onClick={() => handleUserSelect(user.id)}
                          className={`cursor-pointer p-2 rounded transition-colors ${
                            selectedUsers.includes(user.id)
                              ? "bg-red-100 border border-red-300"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <div className="font-medium text-sm">{user.firstname} {user.lastname}</div>
                          <div className="text-xs text-gray-500">ID: {user.id}</div>
                          {user.email && (
                            <div className="text-xs text-gray-500 truncate">{user.email}</div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden h-full flex flex-col">
            {/* Action Buttons Row */}
            <div className="flex-shrink-0 p-4 border-b">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={handleAddMember}
                  disabled={selectedUsers.length === 0 || submitting}
                  className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  Add →
                </button>
                <button
                  onClick={handleRemoveMember}
                  disabled={selectedUsers.length === 0 || submitting}
                  className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  ← Remove
                </button>
                <button
                  onClick={handleAddAll}
                  disabled={submitting}
                  className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  Add All
                </button>
                <button
                  onClick={handleRemoveAll}
                  disabled={submitting}
                  className="bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  Remove All
                </button>
              </div>
            </div>

            {/* Lists Container */}
            <div className="flex-1 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 h-full">
                {/* Available Users */}
                <div className="border rounded-lg p-4 flex flex-col min-h-0">
                  <div className="flex justify-between items-center mb-3 flex-shrink-0">
                    <h3 className="text-md font-semibold">
                      Available Users ({availableUsers.length})
                    </h3>
                  </div>
                  <hr className="mb-3 flex-shrink-0" />
                  <div className="flex-1 overflow-y-auto min-h-0">
                    {loading ? (
                      <div className="flex items-center justify-center h-32">
                        <p className="text-gray-500">Loading users...</p>
                      </div>
                    ) : availableUsers.length === 0 ? (
                      <div className="flex items-center justify-center h-32">
                        <p className="text-gray-500 text-center text-sm">
                          {searchTerm ? "No users match your search." : "No available users."}
                        </p>
                      </div>
                    ) : (
                      <ul className="space-y-2">
                        {availableUsers.map((user) => (
                          <li
                            key={user.id}
                            onClick={() => handleUserSelect(user.id)}
                            className={`cursor-pointer p-3 rounded transition-colors ${
                              selectedUsers.includes(user.id)
                                ? "bg-blue-100 border border-blue-300"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            <div className="font-medium text-sm">{user.firstname} {user.lastname}</div>
                            <div className="text-xs text-gray-500">ID: {user.id}</div>
                            {user.email && (
                              <div className="text-xs text-gray-500 truncate">{user.email}</div>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Department Members */}
                <div className="border rounded-lg p-4 flex flex-col min-h-0">
                  <div className="flex justify-between items-center mb-3 flex-shrink-0">
                    <h3 className="text-md font-semibold">
                      Department Members ({departmentMembers.length})
                    </h3>
                    {hasChanges() && (
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                        Unsaved changes
                      </span>
                    )}
                  </div>
                  <hr className="mb-3 flex-shrink-0" />
                  <div className="flex-1 overflow-y-auto min-h-0">
                    {loadingMembers ? (
                      <div className="flex items-center justify-center h-32">
                        <p className="text-gray-500">Loading members...</p>
                      </div>
                    ) : departmentMembers.length === 0 ? (
                      <div className="flex items-center justify-center h-32">
                        <p className="text-gray-500 text-sm">No members added yet.</p>
                      </div>
                    ) : (
                      <ul className="space-y-2">
                        {departmentMembers.map((user) => (
                          <li
                            key={user.id}
                            onClick={() => handleUserSelect(user.id)}
                            className={`cursor-pointer p-3 rounded transition-colors ${
                              selectedUsers.includes(user.id)
                                ? "bg-red-100 border border-red-300"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            <div className="font-medium text-sm">{user.firstname} {user.lastname}</div>
                            <div className="text-xs text-gray-500">ID: {user.id}</div>
                            {user.email && (
                              <div className="text-xs text-gray-500 truncate">{user.email}</div>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 flex-shrink-0 gap-3 sm:gap-0">
          <div className="text-xs sm:text-sm text-gray-600">
            {selectedUsers.length > 0 && (
              <span>{selectedUsers.length} user(s) selected</span>
            )}
          </div>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={handleClose}
              disabled={submitting}
              className="flex-1 sm:flex-none px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 sm:flex-none px-4 sm:px-6 py-2 bg-[#2c3e50]  text-white rounded-lg hover:bg-[#3c4c5b]  disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}