import React, { useState } from "react";
import { toast } from "react-toastify";
import { Addholidays } from "../../../Apis/apiHandlers"; 

export default function AddHolidayModel({ isOpen, onClose, onAddHoliday }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) return toast.error("Please enter a holiday title");
    if (!formData.date) return toast.error("Please select a date");
    if (!formData.message.trim()) return toast.error("Please enter a message");

    setLoading(true);
    try {
      console.log("Sending holiday data:", formData);
      const response = await Addholidays(formData);
      console.log("Full API response:", response);
      console.log("Response status:", response?.status);
      console.log("Response data:", response?.data);

      // Check for successful response - API returns just the data object
      if (response && response.message) {
        console.log(" Success detected, showing toast");
        toast.success(response.message || "Holiday added successfully!");

        // Reset form
        setFormData({ title: "", date: "", message: "" });

        // Refresh holidays list
        if (onAddHoliday) {
          console.log("Calling onAddHoliday to refresh list");
          onAddHoliday();
        }

        // Close modal
        onClose();
      } else {
        console.log(" No success message in response:", response);
        toast.error("Failed to add holiday");
      }
    } catch (error) {
      console.error(" Error adding holiday:", error);
      
      // Handle different error scenarios
      if (error?.response?.status === 401) {
        toast.error("Authentication failed. Please login again.");
      } else if (error?.response?.status === 400) {
        toast.error(error?.response?.data?.message || "Invalid data provided");
      } else if (error?.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else if (error?.message === "User is not authenticated") {
        toast.error("Please login to continue");
      } else {
        toast.error(
          error?.response?.data?.message ||
          error?.message ||
          "Failed to add holiday. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ title: "", date: "", message: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Add Government Holiday
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-black text-3xl"
            disabled={loading}
          >
            &times;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter title"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              disabled={loading}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter message"
              disabled={loading}
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Adding..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}