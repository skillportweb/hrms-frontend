import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AddUserAttendance,
  PunchOutAttendance,
  GetAttendance,
  GetAllHoliday,
} from "../../Apis/apiHandlers";
import ApplyMissPunchOut from "./Models/ApplyMissPunchOut";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const getCurrentTime = () => {
  const now = new Date();
  return {
    formatted: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    fullDate: now,
  };
};

const getCurrentDate = () => new Date().toISOString().split("T")[0];

const getLocation = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation)
      return reject(new Error("Geolocation not supported."));
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = parseFloat(position.coords.latitude.toFixed(4));
        const lon = parseFloat(position.coords.longitude.toFixed(4));
        resolve({ lat, lon, locationStr: `Lat: ${lat}, Long: ${lon}` });
      },
      (error) => reject(error)
    );
  });

const AttendanceCard = ({ row, handlePunchIn, handlePunchOut, onMissPunchClick }) => {
  const currentDate = getCurrentDate();
  const isCurrentDate = row.date === currentDate;

  const bgColor = row.isHoliday
    ? "bg-blue-100 border border-blue-300"
    : row.isWeekend
    ? "bg-yellow-100 border border-yellow-300"
    : row.status === "Present"
    ? "bg-green-100 border border-green-300"
    : "bg-red-100 border border-red-300";

  return (
    <div className={`rounded-xl p-4 shadow w-full max-w-sm mx-auto  flex items-center justify-center ${bgColor}`}>
      <div className="text-center">
        <h4 className="text-sm font-bold mb-1">{row.dayName}</h4>
        <p className="text-xs text-gray-700 mb-2">{row.date}</p>

        {row.isHoliday ? (
          <>
            <p className="text-xs font-medium text-blue-700 mb-2">{row.holidayTitle}</p>
            <p className="text-sm font-semibold text-blue-800">Holiday</p>
          </>
        ) : row.isWeekend ? (
          <p className="text-sm font-semibold text-yellow-800">Weekend</p>
        ) : (
          <>
            <p className="text-sm">Punch In: <strong>{row.punchIn || "--"}</strong></p>
            <p className="text-sm mb-2">Punch Out: <strong>{row.punchOut || "--"}</strong></p>

            <div className="mt-3">
              {!row.punchIn ? (
                <button
                  onClick={() => handlePunchIn(row)}
                  disabled={!isCurrentDate}
                  className={`px-4 py-1 rounded text-sm w-full ${
                    isCurrentDate ? "bg-yellow-500 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Punch In
                </button>
              ) : !row.punchOut ? (
                isCurrentDate ? (
                  <button
                    onClick={() => handlePunchOut(row)}
                    className="px-4 py-1 rounded text-sm w-full bg-green-500 text-white"
                  >
                    Punch Out
                  </button>
                ) : (
                  <button
                    onClick={() => onMissPunchClick(row.id)}
                    className="px-4 py-1 rounded text-sm w-full bg-red-500 text-white"
                  >
                    Apply Miss Punch
                  </button>
                )
              ) : (
                <span className="text-gray-600 italic">Done</span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const AttendanceCardView = () => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  const [attendanceData, setAttendanceData] = useState([]);
  const [holidayData, setHolidayData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showMissPunchModal, setShowMissPunchModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (selectedMonth && userId) fetchAllData();
  }, [selectedMonth, userId]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const holidayRes = await GetAllHoliday();
      const holidays = Array.isArray(holidayRes?.holidays) ? holidayRes.holidays : [];
      setHolidayData(holidays);
      await fetchAttendanceData(holidays);
    } catch (err) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendanceData = async (holidays = holidayData) => {
    try {
      const res = await GetAttendance(userId);
      const data = Array.isArray(res?.attendance) ? res.attendance : [];

      const [year, month] = selectedMonth.split("-").map(Number);
      const totalDays = new Date(year, month, 0).getDate();
      const todayStr = getCurrentDate();

      const rows = Array.from({ length: totalDays }, (_, i) => {
        const date = `${year}-${String(month).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
        if (date > todayStr) return null;

        const record = data.find((d) => d.date === date);
        const holiday = holidays.find((h) => h.date === date);
        const dateObj = new Date(year, month - 1, i + 1);
        const dayName = dayNames[dateObj.getDay()];
        const isWeekend = dayName === "Saturday" || dayName === "Sunday";
        const isHoliday = !!holiday;

        return {
          id: `${userId}-${i + 1}`,
          date,
          dayName,
          punchIn: record?.punchIn || "",
          punchOut: record?.punchOut || "",
          status: record?.status || (isWeekend ? "Present" : "Absent"),
          isWeekend,
          isHoliday,
          holidayTitle: holiday?.title || "",
        };
      }).filter(Boolean);

      setAttendanceData(rows);
    } catch (err) {
      toast.error("Failed to fetch attendance.");
    }
  };

  const handlePunchIn = async (row) => {
    if (row.isHoliday) return toast.info("Cannot punch in on holidays.");
    try {
      const { formatted, fullDate } = getCurrentTime();
      const { lat, lon, locationStr } = await getLocation();

      const res = await AddUserAttendance({
        userId,
        date: row.date,
        dayName: row.dayName,
        punchIn: formatted,
        punchInDate: fullDate.toISOString(),
        punchInLocation: locationStr,
        latitude: lat,
        longitude: lon,
        status: "Present",
      });

      if (res?.success || res?.status === 200) {
        toast.success("Punch In successful");
        fetchAttendanceData();
      } else {
        toast.error(res?.message || "Punch In failed");
      }
    } catch (err) {
      toast.error(err?.message || "Punch In failed.");
    }
  };

  const handlePunchOut = async (row) => {
    if (row.isHoliday) return toast.info("Cannot punch out on holidays.");
    try {
      const { formatted, fullDate } = getCurrentTime();
      const { lat, lon, locationStr } = await getLocation();

      const res = await PunchOutAttendance({
        userId,
        date: row.date,
        punchOut: formatted,
        punchOutDate: fullDate.toISOString(),
        punchOutLocation: locationStr,
        latitude: lat,
        longitude: lon,
      });

      if (res?.success || res?.status === 200) {
        toast.success("Punch Out successful");
        fetchAttendanceData();
      } else {
        toast.error(res?.message || "Punch Out failed");
      }
    } catch (err) {
      toast.error(err?.message || "Punch Out failed.");
    }
  };

  const handleMissPunchClick = (row) => {
    setSelectedRow(row);
    setShowMissPunchModal(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Monthly Attendance</h3>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border px-3 py-1 rounded w-60"
        />
      </div>
      <hr className="mb-4" />

      {loading && <div className="text-center py-4">Loading attendance data...</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {attendanceData.map((row) => (
          <AttendanceCard
            key={row.id}
            row={row}
            handlePunchIn={handlePunchIn}
            handlePunchOut={handlePunchOut}
            onMissPunchClick={handleMissPunchClick}
          />
        ))}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />

      {showMissPunchModal && (
        <ApplyMissPunchOut
          isOpen={showMissPunchModal}
          onClose={() => setShowMissPunchModal(false)}
          rowData={selectedRow}
          userId={userId}
          onSuccess={() => {
            setShowMissPunchModal(false);
            fetchAttendanceData();
          }}
        />
      )}
    </div>
  );
};

export default AttendanceCardView;
