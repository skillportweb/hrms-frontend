import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCheck, FaTimes, FaSpinner } from "react-icons/fa";
import { GetAttendance } from "../../../Apis/apiHandlers";

const AttendanceCard = ({ date, day, status, punchIn, punchOut, missPunchStatus ,id}) => {
  const isWeekend = day === "Saturday" || day === "Sunday";
  const isPresent = status === "Present";

  const cardStyle = isWeekend
    ? "bg-yellow-100 border-yellow-400"
    : isPresent
    ? "bg-green-50 border-green-400"
    : "bg-red-50 border-red-400";

  const icon = isWeekend ? null : isPresent ? (
    <FaCheck className="text-green-600" />
  ) : (
    <FaTimes className="text-red-500" />
  );

  return (
    <div
      className={`relative rounded-xl shadow-md border p-4 w-full max-w-xs mx-auto ${cardStyle}`}
    >
      {!isWeekend && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center shadow bg-white">
          {icon}
        </div>
      )}

      <div className="pt-6 text-center">
        <p className="text-sm font-bold text-gray-800 mb-1">{date}</p>
        <p className="text-xs text-gray-600 mb-2">{day}</p>

        {isWeekend ? (
          <p className="text-xs text-gray-700 font-medium mt-4">Weekend</p>
        ) : (
          <>
            <p className="text-xs text-gray-700">
              <span className="font-medium">Punch In:</span> {punchIn || "--"}
            </p>
            <p className="text-xs text-gray-700">
              <span className="font-medium">Punch Out:</span> {punchOut || "--"}
            </p>

            {/* Conditional Button Display */}
            {missPunchStatus == 1 && (
              <div className="mt-3 flex justify-center gap-2">
                <button className="px-3 py-1 w-full text-xs bg-green-600 text-white rounded hover:bg-green-700">
                  Approve
                </button>
                <Link to={`/view/${id}`} className="px-3 py-1 w-full text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                  View
                </Link>
              </div>
            )}
          </>
        )}
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
        const data = Array.isArray(res.attendance) ? res.attendance : [];
          console.log("Fetched setAttendanceData data:", data);
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
    const daysInMonth = new Date(year, month, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => {
      const dayNumber = i + 1;
      const date = new Date(year, month - 1, dayNumber);
      const localDateString = `${year}-${String(month).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;

      const match = attendanceData.find((d) => d.date === localDateString);
      const day = date.toLocaleDateString("en-GB", { weekday: "long" });

      return {
        date: date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        day,
        status: match?.status || (day === "Saturday" || day === "Sunday" ? "Weekend" : "Absent"),
        punchIn: match?.punchIn,
        punchOut: match?.punchOut,
        missPunchStatus: match?.missPunchStatus ?? 0,
          id: match?.id, 
      };
    });
  };

  const filteredData = getFilteredMonthData();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold mb-4">
          <Link to="/attendance">Attendance</Link> / Attendance by Month
        </h3>
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

