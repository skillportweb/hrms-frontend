import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AddUserAttendance,
  PunchOutAttendance,
  GetAttendance,
} from "../../Apis/apiHandlers";
import ApplyMissPunchOut from "./Models/ApplyMissPunchOut";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getCurrentTime = () => {
  const now = new Date();
  return {
    formatted: now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    fullDate: now,
  };
};

const getCurrentDate = () => {
  return new Date().toISOString().split("T")[0];
};

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

const AttendanceCard = ({
  row,
  handlePunchIn,
  handlePunchOut,
  onMissPunchClick,
}) => {
  const currentDate = getCurrentDate();
  const isCurrentDate = row.date === currentDate;

  return (
    <div
      className={`border rounded-xl p-4 shadow w-full max-w-sm mx-auto ${
        row.status === "Present"
          ? "bg-green-50 border-green-400"
          : "bg-red-50 border-red-400"
      }`}
    >
      <div className="text-center">
        <h4 className="text-[15px] font-semibold mb-1">{row.dayName}</h4>
        <p className="text-[12px] text-gray-600 mb-2">{row.date}</p>
        <p className="text-[13px]">
          Punch In: <strong>{row.punchIn || "--"}</strong>
        </p>
        <p className="text-[13px] mb-2">
          Punch Out: <strong>{row.punchOut || "--"}</strong>
        </p>

        <div className="mt-3">
          {!row.punchIn ? (
            <button
              onClick={() => handlePunchIn(row)}
              disabled={!isCurrentDate}
              className={`px-4 py-1 rounded text-sm ${
                isCurrentDate
                  ? "bg-yellow-500 text-white hover:bg-yellow-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Punch In
            </button>
          ) : !row.punchOut ? (
            isCurrentDate ? (
              <button
                onClick={() => handlePunchOut(row)}
                className="px-4 py-1 rounded text-sm bg-green-500 text-white hover:bg-green-600"
              >
                Punch Out
              </button>
            ) : (
              <button
                 onClick={() => onMissPunchClick(row.id)}
                className="px-4 py-1 rounded text-sm bg-red-500 text-white hover:bg-red-600"
              >
                Apply Miss Punch Out
              </button>
            )
          ) : (
            <span className="text-gray-500 italic">Done</span>
          )}
        </div>
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
  const [userId, setUserId] = useState(null);
  const [showMissPunchModal, setShowMissPunchModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (selectedMonth && userId) fetchAttendanceData();
  }, [selectedMonth, userId]);

  const fetchAttendanceData = async () => {
    try {
      const response = await GetAttendance(userId);
      const data = Array.isArray(response?.attendance)
        ? response.attendance
        : [];

      const [year, month] = selectedMonth.split("-").map(Number);
      const totalDays = new Date(year, month, 0).getDate();
      const todayStr = getCurrentDate();

      const rows = Array.from({ length: totalDays }, (_, i) => {
        const date = `${year}-${String(month).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
        if (date > todayStr) return null;

        const record = data.find((d) => d.date === date);
        const dateObj = new Date(year, month - 1, i + 1);

        return {
          id: `${userId}-${i + 1}`,
          date,
          dayName: dayNames[dateObj.getDay()],
          punchIn: record?.punchIn || "",
          punchOut: record?.punchOut || "",
          status: record?.status || "Absent",
        };
      }).filter(Boolean);

      setAttendanceData(rows);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to fetch attendance.");
    }
  };

  const handlePunchIn = async (row) => {
    try {
      const { formatted, fullDate } = getCurrentTime();
      const { lat, lon, locationStr } = await getLocation();

      const payload = {
        userId,
        date: row.date,
        dayName: row.dayName,
        punchIn: formatted,
        punchInDate: fullDate.toISOString(),
        punchInLocation: locationStr,
        latitude: lat,
        longitude: lon,
        status: "Present",
      };

      const res = await AddUserAttendance(payload);
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
    try {
      const { formatted, fullDate } = getCurrentTime();
      const { lat, lon, locationStr } = await getLocation();

      const payload = {
        userId,
        date: row.date,
        punchOut: formatted,
        punchOutDate: fullDate.toISOString(),
        punchOutLocation: locationStr,
        latitude: lat,
        longitude: lon,
      };

      const res = await PunchOutAttendance(payload);
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
          className="border rounded px-3 py-1 w-60"
        />
      </div>

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
