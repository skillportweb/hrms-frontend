import React, { useState } from "react";

export default function PromotionModel({ isOpen, onClose, firstName }) {
  const [formData, setFormData] = useState({
    newDesignation: "",
    promotionDate: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Promotion Data Submitted:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Promotion Form for {firstName || "User"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black text-3xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* New Designation input col-6 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Designation
              </label>
              <input
                type="text"
                name="newDesignation"
                value={formData.newDesignation}
                onChange={handleChange}
                placeholder="Enter new designation"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            {/* Promotion Date input col-6 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Promotion Date
              </label>
              <input
                type="date"
                name="promotionDate"
                value={formData.promotionDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Notes textarea col-12 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes / Comments (optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Add any notes regarding the promotion"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#2c3e50] text-white rounded hover:bg-[#43596f]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
