import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserPromotion } from "../../../Apis/apiHandlers";

export default function PromotionModel({ isOpen, onClose, firstName, currentPayroll, userId }) {
  console.log("Current Payroll (prop):", currentPayroll);

  const [formData, setFormData] = useState({
    newDesignation: "",
    promotionDate: "",
    notes: "",
    currentPayroll: "",
    promotedPayroll: "",
  });

  // Prefill currentPayroll from props
  useEffect(() => {
    if (currentPayroll !== undefined && currentPayroll !== null) {
      setFormData((prev) => ({
        ...prev,
        currentPayroll: currentPayroll,
      }));
    }
  }, [currentPayroll]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Promotion Data Submitted:", formData);

    try {
      await UserPromotion(userId, formData);
      toast.success("Promotion applied successfully!");
      onClose();
    } catch (error) {
      console.error("Error during promotion:", error);
      toast.error(error.response?.data?.message || "Failed to apply promotion");
    }
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
          {/* Row 1: New Designation + Promotion Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

          {/* Row 2: Current Payroll + Promoted Payroll */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Payroll
              </label>
              <input
                type="number"
                name="currentPayroll"
                value={formData.currentPayroll}
                onChange={handleChange}
                placeholder="Enter current payroll amount"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Promoted Payroll
              </label>
              <input
                type="number"
                name="promotedPayroll"
                value={formData.promotedPayroll}
                onChange={handleChange}
                placeholder="Enter promoted payroll amount"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Notes */}
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
