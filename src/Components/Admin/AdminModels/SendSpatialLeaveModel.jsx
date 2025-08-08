

import React from "react";

export default function SendSpatialLeaveModel({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Send Special Leave</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black text-3xl"
          >
            &times;
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            This is your custom leave modal. You can replace this with a form or
            other content.
          </p>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
            }}
            className="px-4 py-1  bg-[#2c3e50] text-white rounded hover:bg-[#43596f]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
