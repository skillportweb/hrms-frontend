// import React, { useState, useEffect } from 'react';
// import DataTable from 'react-data-table-component';
// import {
//   AddUserAttendance,
//   PunchOutAttendance,
//   GetAttendance,
// } from '../../Apis/apiHandlers';

// const monthNames = [
//   'january', 'february', 'march', 'april', 'may', 'june',
//   'july', 'august', 'september', 'october', 'november', 'december'
// ];

// const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// const AttendanceTable = () => {
//   const [selectedMonth, setSelectedMonth] = useState('');
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [userId, setUserId] = useState(null);

//   // Better userId validation and retrieval
//   useEffect(() => {
//     const getUserId = () => {
//       const storedUserId = localStorage.getItem('userId');
//       console.log('Raw userId from localStorage:', storedUserId);

//       // Check if userId exists and is valid
//       if (!storedUserId ||
//           storedUserId === 'null' ||
//           storedUserId === 'undefined' ||
//           storedUserId.trim() === '') {
//         console.error('Invalid or missing userId in localStorage');
//         alert('Please log in again. User session is invalid.');
//         // Optionally redirect to login page
//         // window.location.href = '/login';
//         return null;
//       }

//       return storedUserId.trim();
//     };

//     const validUserId = getUserId();
//     setUserId(validUserId);
//   }, []);

//   useEffect(() => {
//     const currentMonthIndex = new Date().getMonth();
//     setSelectedMonth(monthNames[currentMonthIndex]);
//   }, []);

//   useEffect(() => {
//     if (!selectedMonth || !userId) return;
//     fetchAttendanceData();
//   }, [selectedMonth, userId]);

//   const fetchAttendanceData = async () => {
//     if (!userId) {
//       console.error('Cannot fetch attendance data: Invalid userId');
//       return;
//     }

//     try {
//       const response = await GetAttendance(userId);
//       console.log('Full API Response:', response);

//       // Access the attendance array from the response
//       const fetchedData = response?.attendance || response?.data || [];
//       console.log('Fetched Data:', fetchedData);

//       const monthIndex = monthNames.indexOf(selectedMonth);
//       const year = new Date().getFullYear();
//       const totalDays = new Date(year, monthIndex + 1, 0).getDate();

//       console.log(`Processing ${selectedMonth} ${year} (${totalDays} days)`);

//       const rows = [];
//       for (let day = 1; day <= totalDays; day++) {
//         // Create date string directly to avoid timezone issues
//         const formattedDate = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

//         // Create date object for getting day name (but don't use for date string)
//         const dateObj = new Date(year, monthIndex, day);
//         const dayName = dayNames[dateObj.getDay()];

//         // Find matching record for this date
//         const record = fetchedData.find(d => {
//           console.log(`Comparing: ${d.date} === ${formattedDate}`);
//           return d.date === formattedDate;
//         });

//         console.log(`Day ${day} (${formattedDate}) - ${dayName}:`, record ? 'Found record' : 'No record');

//         rows.push({
//           id: `${userId}-${day}`,
//           userId,
//           date: formattedDate,
//           dayName,
//           punchIn: record?.punchIn || '',
//           punchOut: record?.punchOut || '',
//           punchInDate: record?.punchInDate || null,
//           punchOutDate: record?.punchOutDate || null,
//           punchInLocation: record?.punchInLocation || '',
//           punchOutLocation: record?.punchOutLocation || '',
//           status: record?.status || 'Absent'
//         });
//       }

//       console.log('Final rows:', rows);
//       setAttendanceData(rows);
//     } catch (err) {
//       console.error('Error fetching attendance:', err);
//       alert('Error fetching attendance: ' + err.message);
//     }
//   };

//   const getCurrentTime = () => {
//     const now = new Date();
//     return {
//       formatted: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       fullDate: now
//     };
//   };

//   const getLocation = () =>
//     new Promise((resolve, reject) => {
//       if (!navigator.geolocation) return reject(new Error('Geolocation not supported.'));
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const lat = parseFloat(position.coords.latitude.toFixed(4));
//           const lon = parseFloat(position.coords.longitude.toFixed(4));
//           resolve({ lat, lon, locationStr: `Lat: ${lat}, Long: ${lon}` });
//         },
//         (error) => reject(error)
//       );
//     });

//   const validateUserId = () => {
//     if (!userId) {
//       alert('Invalid user session. Please log in again.');
//       return false;
//     }
//     return true;
//   };

//   const handlePunchIn = async (rowId) => {
//     try {
//       if (!validateUserId()) return;

//       const { formatted, fullDate } = getCurrentTime();
//       const { lat, lon, locationStr } = await getLocation();
//       const row = attendanceData.find(r => r.id === rowId);
//       if (!row) return;

//       const payload = {
//         userId: userId.toString(), // Ensure it's a string
//         date: row.date,
//         dayName: row.dayName,
//         punchIn: formatted,
//         punchInDate: fullDate.toISOString(),
//         punchInLocation: locationStr,
//         latitude: lat,
//         longitude: lon,
//         status: 'Present'
//       };

//       console.log('Punch In Payload:', payload);
//       await AddUserAttendance(payload);
//       fetchAttendanceData();
//     } catch (err) {
//       console.error('Punch In Error:', err);
//       alert('Punch In Error: ' + err.message);
//     }
//   };

//   const handlePunchOut = async (rowId) => {
//     try {
//       if (!validateUserId()) return;

//       const { formatted, fullDate } = getCurrentTime();
//       const { lat, lon, locationStr } = await getLocation();
//       const row = attendanceData.find(r => r.id === rowId);
//       if (!row || !row.punchIn) return;

//       const payload = {
//         userId: userId.toString(), // Ensure it's a string
//         date: row.date,
//         punchOut: formatted,
//         punchOutDate: fullDate.toISOString(),
//         punchOutLocation: locationStr,
//         latitude: lat,
//         longitude: lon
//       };

//       console.log('Punch Out Payload:', payload);
//       await PunchOutAttendance(payload);
//       fetchAttendanceData();
//     } catch (err) {
//       console.error('Punch Out Error:', err);
//       alert('Punch Out Error: ' + err.message);
//     }
//   };

//   const getTotalHours = (row) => {
//     if (row.punchInDate && row.punchOutDate) {
//       const ms = new Date(row.punchOutDate) - new Date(row.punchInDate);
//       const mins = Math.floor(ms / 60000);
//       const hrs = Math.floor(mins / 60);
//       const remainingMins = mins % 60;
//       return `${hrs}h ${remainingMins}m`;
//     }
//     return '-';
//   };

//   const columns = [
//     { name: 'Day', selector: row => row.dayName },
//     { name: 'Date', selector: row => row.date },
//     { name: 'Punch In', selector: row => row.punchIn || '-' },
//     { name: 'Punch Out', selector: row => row.punchOut || '-' },
//     { name: 'In Location', selector: row => row.punchInLocation || '-' },
//     { name: 'Out Location', selector: row => row.punchOutLocation || '-' },
//     {
//       name: 'Total Hours',
//       cell: row => <span>{getTotalHours(row)}</span>,
//     },
//     {
//       name: 'Status',
//       cell: row => (
//         <span className={row.status === 'Present' ? 'text-green-600 font-semibold' : 'text-gray-500'}>
//           {row.status}
//         </span>
//       ),
//     },
//     {
//       name: 'Action',
//       width: '160px',
//       cell: row => {
//         if (!row.punchIn) {
//           return (
//             <button
//               onClick={() => handlePunchIn(row.id)}
//               className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
//               disabled={!userId}
//             >
//               Punch In
//             </button>
//           );
//         } else if (!row.punchOut) {
//           return (
//             <button
//               onClick={() => handlePunchOut(row.id)}
//               className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
//               disabled={!userId}
//             >
//               Punch Out
//             </button>
//           );
//         } else {
//           return <span className="text-gray-500 italic">Done</span>;
//         }
//       },
//     },
//   ];

//   // Show loading or error state if userId is not available
//   if (userId === null) {
//     return (
//       <div className="p-4">
//         <div className="text-center text-red-500">
//           Invalid user session. Please log in again.
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-5">
//         <h3 className="text-lg font-semibold mb-4">Monthly Attendance</h3>
//         <select
//           className="border rounded px-3 py-1"
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(e.target.value)}
//         >
//           <option value="" disabled>Select Month</option>
//           {monthNames.map(month => (
//             <option key={month} value={month}>
//               {month[0].toUpperCase() + month.slice(1)}
//             </option>
//           ))}
//         </select>
//       </div>

//       <hr className="mb-4" />

//       <DataTable
//         columns={columns}
//         data={attendanceData}
//         pagination
//         highlightOnHover
//         striped
//         responsive
//       />
//     </div>
//   );
// };

// export default AttendanceTable;

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AddUserAttendance,
  PunchOutAttendance,
  GetAttendance,
} from "../../Apis/apiHandlers";

const monthNames = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const AttendanceTable = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [userId, setUserId] = useState(null);

  // Better userId validation and retrieval
  useEffect(() => {
    const getUserId = () => {
      const storedUserId = localStorage.getItem("userId");
      console.log("Raw userId from localStorage:", storedUserId);

      // Check if userId exists and is valid
      if (
        !storedUserId ||
        storedUserId === "null" ||
        storedUserId === "undefined" ||
        storedUserId.trim() === ""
      ) {
        console.error("Invalid or missing userId in localStorage");
        toast.error("Please log in again. User session is invalid.");
        return null;
      }

      return storedUserId.trim();
    };

    const validUserId = getUserId();
    setUserId(validUserId);
  }, []);

  useEffect(() => {
    const currentMonthIndex = new Date().getMonth();
    setSelectedMonth(monthNames[currentMonthIndex]);
  }, []);

  useEffect(() => {
    if (!selectedMonth || !userId) return;
    fetchAttendanceData();
  }, [selectedMonth, userId]);

  const fetchAttendanceData = async () => {
    if (!userId) {
      console.error("Cannot fetch attendance data: Invalid userId");
      return;
    }

    try {
      const response = await GetAttendance(userId);
      console.log("Full API Response:", response);

      let fetchedData = [];

      // Handle different response formats
      if (response?.attendance) {
        // Normal case: attendance array exists
        fetchedData = response.attendance;
      } else if (response?.data) {
        // Alternative: data array exists
        fetchedData = response.data;
      } else if (
        response?.message &&
        response.message.includes("No attendance records found")
      ) {
        // Case: No records found message
        console.log("No attendance records found, showing empty table");
        fetchedData = [];
      } else if (Array.isArray(response)) {
        // Case: response is directly an array
        fetchedData = response;
      } else {
        // Unknown format, default to empty
        console.warn("Unknown response format:", response);
        fetchedData = [];
      }

      console.log("Processed Data:", fetchedData);

      const monthIndex = monthNames.indexOf(selectedMonth);
      const year = new Date().getFullYear();
      const totalDays = new Date(year, monthIndex + 1, 0).getDate();

      console.log(`Processing ${selectedMonth} ${year} (${totalDays} days)`);

      const rows = [];
      for (let day = 1; day <= totalDays; day++) {
        // Create date string directly to avoid timezone issues
        const formattedDate = `${year}-${String(monthIndex + 1).padStart(
          2,
          "0"
        )}-${String(day).padStart(2, "0")}`;

        // Create date object for getting day name (but don't use for date string)
        const dateObj = new Date(year, monthIndex, day);
        const dayName = dayNames[dateObj.getDay()];

        // Find matching record for this date
        const record = fetchedData.find((d) => {
          console.log(`Comparing: ${d.date} === ${formattedDate}`);
          return d.date === formattedDate;
        });

        console.log(
          `Day ${day} (${formattedDate}) - ${dayName}:`,
          record ? "Found record" : "No record"
        );

        rows.push({
          id: `${userId}-${day}`,
          userId,
          date: formattedDate,
          dayName,
          punchIn: record?.punchIn || "",
          punchOut: record?.punchOut || "",
          punchInDate: record?.punchInDate || null,
          punchOutDate: record?.punchOutDate || null,
          punchInLocation: record?.punchInLocation || "",
          punchOutLocation: record?.punchOutLocation || "",
          status: record?.status || "Absent",
        });
      }

      console.log("Final rows:", rows);
      setAttendanceData(rows);

      // Show info message if no records found but don't treat as error
      if (fetchedData.length === 0) {
        toast.info(`No attendance records found for ${selectedMonth} ${year}`);
      }
    } catch (err) {
      console.error("Error fetching attendance:", err);
      toast.error("You have no attendance records.");

      // Even on error, show empty table structure
      const monthIndex = monthNames.indexOf(selectedMonth);
      const year = new Date().getFullYear();
      const totalDays = new Date(year, monthIndex + 1, 0).getDate();

      const emptyRows = [];
      for (let day = 1; day <= totalDays; day++) {
        const formattedDate = `${year}-${String(monthIndex + 1).padStart(
          2,
          "0"
        )}-${String(day).padStart(2, "0")}`;
        const dateObj = new Date(year, monthIndex, day);
        const dayName = dayNames[dateObj.getDay()];

        emptyRows.push({
          id: `${userId}-${day}`,
          userId,
          date: formattedDate,
          dayName,
          punchIn: "",
          punchOut: "",
          punchInDate: null,
          punchOutDate: null,
          punchInLocation: "",
          punchOutLocation: "",
          status: "Absent",
        });
      }

      setAttendanceData(emptyRows);
    }
  };

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
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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

  const validateUserId = () => {
    if (!userId) {
      toast.error("Invalid user session. Please log in again.");
      return false;
    }
    return true;
  };

  const handlePunchIn = async (rowId) => {
    try {
      if (!validateUserId()) return;

      const { formatted, fullDate } = getCurrentTime();
      const { lat, lon, locationStr } = await getLocation();
      const row = attendanceData.find((r) => r.id === rowId);
      if (!row) return;

      // Check if it's current date
      const currentDate = getCurrentDate();
      if (row.date !== currentDate) {
        toast.warning("You can only punch in for today's date.");
        return;
      }

      const payload = {
        userId: userId.toString(),
        date: row.date,
        dayName: row.dayName,
        punchIn: formatted,
        punchInDate: fullDate.toISOString(),
        punchInLocation: locationStr,
        latitude: lat,
        longitude: lon,
        status: "Present",
      };

      console.log("Punch In Payload:", payload);
      await AddUserAttendance(payload);
      toast.success("Punched in successfully!");
      fetchAttendanceData();
    } catch (err) {
      console.error("Punch In Error:", err);

      // Handle 403 location error specifically
      if (err.response?.status === 403 || err.status === 403) {
        const errorMessage =
          err.response?.data?.error || err.error || err.message;
        if (
          errorMessage.includes("not at the allowed location") ||
          errorMessage.includes("office")
        ) {
          toast.error(
            "You are not at the allowed location. Please go to the office to punch in."
          );
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error(
          "Punch In Error: " +
            (err.message ||
              "Not at allowed location. Go to office to punch in.")
        );
      }
    }
  };

  const handlePunchOut = async (rowId) => {
    try {
      if (!validateUserId()) return;

      const { formatted, fullDate } = getCurrentTime();
      const { lat, lon, locationStr } = await getLocation();
      const row = attendanceData.find((r) => r.id === rowId);
      if (!row || !row.punchIn) return;

      // Check if it's current date
      const currentDate = getCurrentDate();
      if (row.date !== currentDate) {
        toast.warning("You can only punch out for today's date.");
        return;
      }

      const payload = {
        userId: userId.toString(),
        date: row.date,
        punchOut: formatted,
        punchOutDate: fullDate.toISOString(),
        punchOutLocation: locationStr,
        latitude: lat,
        longitude: lon,
      };

      console.log("Punch Out Payload:", payload);
      await PunchOutAttendance(payload);
      toast.success("Punched out successfully!");
      fetchAttendanceData();
    } catch (err) {
      console.error("Punch Out Error:", err);

      // Handle 403 location error specifically
      if (err.response?.status === 403 || err.status === 403) {
        const errorMessage =
          err.response?.data?.error || err.error || err.message;
        if (
          errorMessage.includes("not at the allowed location") ||
          errorMessage.includes("office")
        ) {
          toast.error(
            "You are not at the allowed location. Please go to the office to punch out."
          );
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error(
          err.message || "Not at allowed location. Go to office to punch out."
        );
      }
    }
  };

  const getTotalHours = (row) => {
    if (row.punchInDate && row.punchOutDate) {
      const ms = new Date(row.punchOutDate) - new Date(row.punchInDate);
      const mins = Math.floor(ms / 60000);
      const hrs = Math.floor(mins / 60);
      const remainingMins = mins % 60;
      return `${hrs}h ${remainingMins}m`;
    }
    return "-";
  };

  const columns = [
    { name: "Day", selector: (row) => row.dayName },
    { name: "Date", selector: (row) => row.date },
    { name: "Punch In", selector: (row) => row.punchIn || "-" },
    { name: "Punch Out", selector: (row) => row.punchOut || "-" },
    { name: "In Location", selector: (row) => row.punchInLocation || "-" },
    { name: "Out Location", selector: (row) => row.punchOutLocation || "-" },
    {
      name: "Total Hours",
      cell: (row) => <span>{getTotalHours(row)}</span>,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={
            row.status === "Present"
              ? "text-green-600 font-semibold"
              : "text-gray-500"
          }
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Action",
      width: "160px",
      cell: (row) => {
        const currentDate = getCurrentDate();
        const isCurrentDate = row.date === currentDate;

        if (!row.punchIn) {
          return (
            <button
              onClick={() => handlePunchIn(row.id)}
              className={`px-3 py-1 rounded text-sm ${
                isCurrentDate
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!userId || !isCurrentDate}
              title={
                !isCurrentDate
                  ? "Can only punch in for current date"
                  : "Punch In"
              }
            >
              Punch In
            </button>
          );
        } else if (!row.punchOut) {
          return (
            <button
              onClick={() => handlePunchOut(row.id)}
              className={`px-3 py-1 rounded text-sm ${
                isCurrentDate
                  ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!userId || !isCurrentDate}
              title={
                !isCurrentDate
                  ? "Can only punch out for current date"
                  : "Punch Out"
              }
            >
              Punch Out
            </button>
          );
        } else {
          return <span className="text-gray-500 italic">Done</span>;
        }
      },
    },
  ];

  // Show loading or error state if userId is not available
  if (userId === null) {
    return (
      <div className="p-4">
        <div className="text-center text-red-500">
          Invalid user session. Please log in again.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold mb-4">Monthly Attendance</h3>
        <select
          className="border rounded px-3 py-1"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="" disabled>
            Select Month
          </option>
          {monthNames.map((month) => (
            <option key={month} value={month}>
              {month[0].toUpperCase() + month.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <hr className="mb-4" />

      <DataTable
        columns={columns}
        data={attendanceData}
        pagination
        highlightOnHover
        striped
        responsive
      />

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
      />
    </div>
  );
};

export default AttendanceTable;
