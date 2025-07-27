import React, { useState, useEffect } from "react";
import { SendYearlyLeave } from "../../../Apis/apiHandlers";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function SendMainLeaveModel({ isOpen, onClose, userId, onLeaveGiven }) {
  if (!isOpen) return null;
  
  const [formData, setFormData] = useState({
    totalLeaves: "",
    casualLeave: "",
    sickLeave: "",
    paidLeave: "",
    optionalLeave: "",
  });
  const [loading, setLoading] = useState(false);
  const [alreadySent, setAlreadySent] = useState(false);

  useEffect(() => {
    if (isOpen && userId) {
      const sentMainLeave = JSON.parse(localStorage.getItem('sentMainLeave') || '[]');
      const wasAlreadySent = sentMainLeave.includes(userId);
      setAlreadySent(wasAlreadySent);
      
    
      if (!wasAlreadySent) {
        setFormData({
          totalLeaves: "",
          casualLeave: "",
          sickLeave: "",
          paidLeave: "",
          optionalLeave: "",
        });
        setLoading(false);
      }
    }
  }, [isOpen, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const casual = Number(formData.casualLeave || 0);
      const sick = Number(formData.sickLeave || 0);
      const paid = Number(formData.paidLeave || 0);
      const optional = Number(formData.optionalLeave || 0);
      const totalLeaves = Number(formData.totalLeaves || 0);
      const usedLeaves = 0;
      const remainingLeaves = totalLeaves;

      const payload = {
        totalLeaves,
        usedLeaves,
        remainingLeaves,
        casualLeave: casual,
        sickLeave: sick,
        paidLeave: paid,
        optionalLeave: optional,
      };

      await SendYearlyLeave(userId, payload);
      
      toast.success("Yearly leave record submitted successfully!");
      setAlreadySent(true);
      
      // Call the callback to update parent component
      if (onLeaveGiven) {
        onLeaveGiven(userId);
      }
      
      // Add a small delay before closing to show the success state
      setTimeout(() => {
        onClose();
      }, 1500);
      
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit leave record.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Send Yearly Leave</h2>
            <button 
              onClick={onClose} 
              className="text-gray-600 hover:text-black text-3xl"
              disabled={loading}
            >
              &times;
            </button>
          </div>

          {alreadySent ? (
            <div className="text-center py-8">
              <div className="text-green-600 text-lg font-semibold mb-4">
                ✓ Leave Already Sent
              </div>
              <p className="text-gray-600 mb-4">
                Yearly leave has already been sent to this user.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-4">
                {["totalLeaves", "casualLeave", "sickLeave", "paidLeave", "optionalLeave"].map((field) => (
                  <input
                    key={field}
                    type="number"
                    name={field}
                    placeholder={field.replace(/([A-Z])/g, " $1")}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                ))}
              </div>
              
              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      
      {/* Move ToastContainer outside modal with higher z-index */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />
    </>
  );
}