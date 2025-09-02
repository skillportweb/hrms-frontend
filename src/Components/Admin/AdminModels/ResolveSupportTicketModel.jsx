import React, { useState } from "react";
import { toast } from "react-toastify";
import { SupportRequestSolve } from "../../../Apis/apiHandlers";

export default function ResolveSupportTicketModel({ isOpen, onClose, ticket }) {
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      if (!ticket?.id) {
        toast.error("Ticket ID is missing!");
        return;
      }

      const payload = {
        resolutionNotes: notes,
        status: "1", 
      };

      await SupportRequestSolve(ticket.id, payload);

      toast.success("Ticket resolved successfully ");
      setNotes(""); // reset notes
      onClose(); // close modal
    } catch (error) {
      console.error("Error solving ticket:", error);
      toast.error("Failed to resolve ticket ");
    }
  };

  console.log("Ticket Data:", ticket?.id, ticket?.employeeEmail);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Resolve Support Ticket
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black text-3xl"
          >
            &times;
          </button>
        </div>

        {/* Ticket Info */}
        <div className="mb-4 space-y-4">
          {/* Row with ID + Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ticket ID
              </label>
              <input
                type="text"
                value={ticket?.id || ""}
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={ticket?.employeeEmail || ""}
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm sm:text-sm"
              />
            </div>
          </div>

          {/* Resolution Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Resolution Notes
            </label>
            <textarea
              rows="4"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter resolution details..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-[#34495e] focus:border-[#34495e]"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#34495e] text-white rounded hover:bg-[#1c2732]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
