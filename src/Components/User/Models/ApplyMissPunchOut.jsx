// import React, { useRef } from "react";
// import { FaClock } from "react-icons/fa";

// export default function ApplyMissPunchOut({ isOpen, onClose }) {
//     const timeInputRef = useRef(null);

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
//             <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6">

//                 <div className="flex justify-between items-center border-b pb-2 mb-4">
//                     <h2 className="text-xl font-semibold text-gray-900">Apply Miss PunchOut</h2>
//                     <button
//                         onClick={onClose}
//                         className="text-gray-600 hover:text-black text-3xl"
//                     >
//                         &times;
//                     </button>
//                 </div>


//                 <div className="flex flex-wrap gap-4 mb-4">

//                     <div className="flex flex-col flex-1 min-w-[150px]">
//                         <label className="text-sm font-medium text-gray-700 mb-1">Date</label>
//                         <input
//                             type="date"
//                             className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>


//                     <div className="flex flex-col flex-1 min-w-[150px] relative">
//                         <label className="text-sm font-medium text-gray-700 mb-1">Punch Out Time</label>
//                         <input
//                             ref={timeInputRef}
//                             type="time"
//                             className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         <button
//                             type="button"
//                             onClick={() => timeInputRef.current && timeInputRef.current.showPicker?.()}
//                             className="absolute right-2 bottom-3 text-gray-600 hover:text-black"
//                         >
//                             <FaClock />
//                         </button>
//                     </div>
//                 </div>

//                 <div className="mb-4">
//                     <label className="text-sm font-medium text-gray-700 mb-1 block">Reason</label>
//                     <textarea
//                         placeholder="Enter reason"
//                         className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>


//                 <div className="flex justify-end gap-2 pt-4 border-t">
//                     <button
//                         onClick={onClose}
//                         className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         onClick={() => {
//                             onClose();
//                         }}
//                         className="px-4 py-2 bg-[#2c3e50] text-white rounded hover:bg-[#222e3a]"
//                     >
//                         Submit
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }


// import React, { useEffect, useRef, useState } from "react";
// import { FaClock } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { RequestMissPunchout } from "./../../../Apis/apiHandlers";

// export default function ApplyMissPunchOut({ isOpen, onClose, rowData }) {
//     const timeInputRef = useRef(null);
//     const [date, setDate] = useState(rowData?.date || "");
//     const [time, setTime] = useState("");
//     const [reason, setReason] = useState("");

//     const [userId, setUserId] = useState(null); // ✅ Create state

//     useEffect(() => {
//         const storedUserId = localStorage.getItem("userId");
//         if (storedUserId) setUserId(storedUserId);
//     }, []);

//     if (!isOpen) return null;

//     const handleSubmit = async () => {
//         if (!date || !time || !reason) {
//             toast.error("Please fill out all fields.");
//             return;
//         }

//         if (!userId) {
//             toast.error("User ID not found. Please log in again.");
//             return;
//         }

//         try {
//             const response = await RequestMissPunchout(userId, {
//                 date,
//                 punchOut: time,
//                 reason: reason.trim(),
//             });

//             toast.success("Miss PunchOut Request Submitted Successfully!");

//             // Reset form
//             setDate(rowData?.date || "");
//             setTime("");
//             setReason("");

//             onClose();
//         } catch (error) {
//             console.error("API Error:", error);
//             toast.error(
//                 error?.response?.data?.message ||
//                 error?.message ||
//                 "Something went wrong!"
//             );
//         }
//     };

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
//             <ToastContainer />
//             <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6">
//                 <div className="flex justify-between items-center border-b pb-2 mb-4">
//                     <h2 className="text-xl font-semibold text-gray-900">Apply Miss PunchOut</h2>
//                     <button
//                         onClick={onClose}
//                         className="text-gray-600 hover:text-black text-3xl"
//                     >
//                         &times;
//                     </button>
//                 </div>

//                 <div className="flex flex-wrap gap-4 mb-4">
//                     <div className="flex flex-col flex-1 min-w-[150px]">
//                         <label className="text-sm font-medium text-gray-700 mb-1">Date</label>
//                         <input
//                             type="date"
//                             value={date}
//                             onChange={(e) => setDate(e.target.value)}
//                             className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             required
//                         />
//                     </div>

//                     <div className="flex flex-col flex-1 min-w-[150px] relative">
//                         <label className="text-sm font-medium text-gray-700 mb-1">Punch Out Time</label>
//                         <input
//                             ref={timeInputRef}
//                             type="time"
//                             value={time}
//                             onChange={(e) => setTime(e.target.value)}
//                             className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             required
//                         />
//                         <button
//                             type="button"
//                             onClick={() => timeInputRef.current?.showPicker?.()}
//                             className="absolute right-2 bottom-3 text-gray-600 hover:text-black"
//                         >
//                             <FaClock />
//                         </button>
//                     </div>
//                 </div>

//                 <div className="mb-4">
//                     <label className="text-sm font-medium text-gray-700 mb-1 block">Reason</label>
//                     <textarea
//                         placeholder="Enter reason for miss punch out"
//                         value={reason}
//                         onChange={(e) => setReason(e.target.value)}
//                         className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
//                         required
//                     />
//                 </div>

//                 <div className="flex justify-end gap-2 pt-4 border-t">
//                     <button
//                         onClick={onClose}
//                         className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         onClick={handleSubmit}
//                         className="px-4 py-2 bg-[#2c3e50] text-white rounded hover:bg-[#222e3a] transition-colors"
//                         disabled={!date || !time || !reason}
//                     >
//                         Submit
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }



import React, { useEffect, useRef, useState } from "react";
import { FaClock } from "react-icons/fa";
import { toast } from "react-toastify";
import { RequestMissPunchout } from "../../../Apis/apiHandlers";

export default function ApplyMissPunchOut({ isOpen, onClose, rowData, userId }) {
  const timeInputRef = useRef(null);
  const [date, setDate] = useState(rowData?.date || "");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (rowData?.date) {
      setDate(rowData.date);
    }
  }, [rowData]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!date || !time || !reason) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      await RequestMissPunchout(userId, {
        date,
        punchOut: time,
        reason: reason.trim(),
      });

      toast.success("Miss Punch-Out Request Submitted Successfully!");

      setDate(rowData?.date || "");
      setTime("");
      setReason("");

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error("API Error:", error);
      toast.error(
        error?.response?.data?.message || error?.message || "Something went wrong!"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Apply Miss Punch-Out</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black text-3xl"
          >
            &times;
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex flex-col flex-1 min-w-[150px]">
            <label className="text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col flex-1 min-w-[150px] relative">
            <label className="text-sm font-medium text-gray-700 mb-1">Punch-Out Time</label>
            <input
              ref={timeInputRef}
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => timeInputRef.current?.showPicker?.()}
              className="absolute right-2 bottom-3 text-gray-600 hover:text-black"
            >
              <FaClock />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 mb-1 block">Reason</label>
          <textarea
            placeholder="Enter reason for miss punch-out"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
            required
          />
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#2c3e50] text-white rounded hover:bg-[#222e3a] transition-colors"
            disabled={!date || !time || !reason}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}  