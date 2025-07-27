import React, { useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApplyUserLeave } from './../../../Apis/apiHandlers';

export default function ApplyLeaveModel({ isOpen, onClose, userId }) {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!leaveType || !startDate || !endDate || !message.trim()) {
      toast.error("All fields are required.");
      return;
    }

    const leaveData = {
      leaveType: leaveType.trim(),
      startDate,
      endDate,
      message: message.trim(),
    };

    try {
      await ApplyUserLeave(userId, leaveData);
      toast.success("Leave request submitted successfully");
      onClose();
      setLeaveType("");
      setStartDate("");
      setEndDate("");
      setMessage("");
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to submit leave request"
      );
      console.error("Error applying leave:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-sm w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold">Apply for Leave</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            ✕
          </button>
        </div>

        <div className="p-4 space-y-4">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Leave Type */}
            <div>
              <label htmlFor="leaveType" className="block mb-2 text-sm font-medium">
                Leave Type
              </label>
              <select
                id="leaveType"
                name="leaveType"
                className="w-full border rounded p-2"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
              >
                <option value="">Select leave type</option>
                <option value="casualLeave">Casual Leave</option>
                <option value="sickLeave">Sick Leave</option>
                <option value="paidLeave">Paid Leave</option>
                <option value="optionalLeave">Optional Leave</option>
                <option value="lopLeave">LOP Leave</option>
              </select>
            </div>

            {/* Start & End Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  className="w-full border rounded p-2"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  className="w-full border rounded p-2"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                className="w-full border rounded p-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
          </form>
        </div>

        {/* Buttons */}
        <div className="flex justify-end p-4 border-t">
          <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
