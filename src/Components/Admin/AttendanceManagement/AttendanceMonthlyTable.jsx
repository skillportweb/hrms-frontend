import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCheck, FaTimes, FaSpinner } from "react-icons/fa";
import { GetAttendance } from "../../../Apis/apiHandlers";

const AttendanceCard = ({ date, day, status, punchIn, punchOut }) => {
  const isPresent = status === "Present";

  return (
    <div
      className={`relative rounded-xl shadow-md border p-4 w-full max-w-xs mx-auto ${
        isPresent ? "bg-green-50 border-green-400" : "bg-red-50 border-red-400"
      }`}
    >
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center shadow bg-white">
        {isPresent ? (
          <FaCheck className="text-green-600" />
        ) : (
          <FaTimes className="text-red-500" />
        )}
      </div>

      <div className="pt-6 text-center">
        <p className="text-sm font-bold text-gray-800 mb-1">{date}</p>
        <p className="text-xs text-gray-600 mb-2">{day}</p>
        <p className="text-xs text-gray-700">
          <span className="font-medium">Punch In:</span> {punchIn || "--"}
        </p>
        <p className="text-xs text-gray-700">
          <span className="font-medium">Punch Out:</span> {punchOut || "--"}
        </p>
      </div>
    </div>
  );
};

export default function AttendanceMonthView() {
  const { userId } = useParams();
  const parsedUserId = parseInt(userId, 10);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!parsedUserId || isNaN(parsedUserId)) {
        setError("Invalid user ID.");
        setLoading(false);
        return;
      }

      try {
        const res = await GetAttendance(parsedUserId);
        console.log("=== FULL API RESPONSE ===", res);
        console.log("=== API ATTENDANCE DATA ===", res.attendance);
        
        // Log individual items to see their structure
        if (Array.isArray(res.attendance) && res.attendance.length > 0) {
          console.log("=== FIRST ATTENDANCE ITEM ===", res.attendance[0]);
          console.log("=== SAMPLE DATE FROM API ===", res.attendance[0]?.date);
          console.log("=== DATE TYPE ===", typeof res.attendance[0]?.date);
        }
        
        const data = Array.isArray(res.attendance) ? res.attendance : [];
        setAttendanceData(data);
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to fetch attendance.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [parsedUserId]);

  const getFilteredMonthData = () => {
    const [year, month] = selectedMonth.split("-").map(Number);
    
    console.log("=== FIXED DATE MATCHING ===");
    console.log("Selected month:", selectedMonth);
    console.log("API attendance data:", attendanceData);
    
    const daysInMonth = new Date(year, month, 0).getDate();

    const allDates = Array.from({ length: daysInMonth }, (_, i) => {
      const dayNumber = i + 1;
      const date = new Date(year, month - 1, dayNumber);
      
      // FIX: Use local date string to avoid timezone issues
      const localDateString = `${year}-${String(month).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
      
      console.log(`Day ${dayNumber}: Generated date = ${localDateString}`);
      
      // FIX: Match directly with API's date field (not converted dates)
      const match = attendanceData.find((d) => {
        console.log(`  Comparing with API date: ${d.date}`);
        const isMatch = d.date === localDateString;
        if (isMatch) {
          console.log(` MATCH FOUND! Day ${dayNumber} = ${d.date} (${d.status})`);
        }
        return isMatch;
      });

      const result = {
        date: date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        day: date.toLocaleDateString("en-GB", { weekday: "long" }),
        status: match?.status || "Absent",
        punchIn: match?.punchIn,
        punchOut: match?.punchOut,
        // Debug info
        debugDay: dayNumber,
        debugGeneratedDate: localDateString,
        debugApiDate: match?.date || "No match"
      };

      if (match) {
        console.log(`Final result for day ${dayNumber}:`, result);
      }

      return result;
    });

    console.log("=== SUMMARY ===");
    const presentDays = allDates.filter(d => d.status === "Present");
    console.log("Days marked as Present:", presentDays.map(d => `${d.debugDay} (${d.debugApiDate})`));

    return allDates;
  };

  const filteredData = getFilteredMonthData();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold mb-4"><Link to="/attendance">Attendance</Link>/Attendance by Month</h3>
        <div className="mb-4">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-60"
          />
        </div>
      </div>
      <hr />

      {loading ? (
        <div className="flex justify-center py-10">
          <FaSpinner className="animate-spin text-blue-600 text-2xl" />
        </div>
      ) : error ? (
        <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No data found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {filteredData.map((item, idx) => (
            <AttendanceCard key={idx} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}