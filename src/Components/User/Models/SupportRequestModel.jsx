

import React, { useState, useEffect } from "react";
import { FaTimes, FaTicketAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { GetAllDepartmentstitle } from "../../../Apis/apiHandlers";
import { CreateSupportRequest } from "../../../Apis/apiHandlers"; 

export default function SupportRequestModel({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    employeeName: "",
    department: "",
    employeeEmail: "",
    title: "",
    priority: "",
    category: "",
    description: "",
  });

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch departments from API
  const fetchDepartments = async () => {
    try {
      const response = await GetAllDepartmentstitle();
      let departmentData = [];

      if (Array.isArray(response)) {
        departmentData = response.map((dept) => ({
          id: dept.id, // use id in payload
          title: dept.title,
        }));
      }

      setDepartments(departmentData);

      if (departmentData.length === 0) {
        toast.warn("No departments available");
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      toast.error("Failed to load departments");
      setDepartments([]);
    }
  };

  // Fetch on modal open
  useEffect(() => {
    if (isOpen) {
      fetchDepartments();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate before sending
    if (
      !formData.employeeName ||
      !formData.department ||
      !formData.employeeEmail ||
      !formData.title ||
      !formData.category ||
      !formData.description
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      // Add userId from localStorage
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("User ID not found. Please log in again.");
        return;
      }

      const payload = {
        ...formData,
        userId: parseInt(userId, 10),
      };

      await CreateSupportRequest(payload);

      toast.success("Support request submitted successfully!");
      onClose();
      setFormData({
        employeeName: "",
        department: "",
        employeeEmail: "",
        title: "",
        priority: "",
        category: "",
        description: "",
      });
    } catch (error) {
      console.error("Error submitting support request:", error);
      toast.error("Failed to submit support request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full shadow-lg flex flex-col">
        <div className="p-6 overflow-y-auto max-h-[90vh]">
          {/* Header */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <FaTicketAlt className="w-5 h-5 mr-2 text-[#34495e]" />
              Submit Support Request
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
          <hr className="mb-5" />

          {/* Form */}
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.employeeName}
                  onChange={(e) =>
                    setFormData({ ...formData, employeeName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34495e]"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department *
                </label>
                <select
                  required
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34495e]"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Email *
              </label>
              <input
                type="email"
                required
                value={formData.employeeEmail}
                onChange={(e) =>
                  setFormData({ ...formData, employeeEmail: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34495e]"
                placeholder="your.name@company.com"
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issue Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34495e]"
                placeholder="Brief description of your issue"
              />
            </div>

            {/* Priority & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority Level
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34495e]"
                >
                  <option value="">Select Priority Level</option>
                  <option value="Low">Low - Not Urgent</option>
                  <option value="Medium">Medium - Normal</option>
                  <option value="High">High - Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Support Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34495e]"
                >
                  <option value="">Select Category</option>
                  <option value="IT Support">IT Support</option>
                  <option value="HR Support">HR Support</option>
                  <option value="Payroll">Payroll</option>
                  <option value="Benefits">Benefits</option>
                  <option value="Equipment Request">Equipment Request</option>
                  <option value="Access Request">Access Request</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34495e] resize-none"
                placeholder="Please describe your issue in detail..."
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#34495e] text-white py-3 px-4 rounded-lg hover:bg-[#2c3e50] transition-colors font-medium disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

